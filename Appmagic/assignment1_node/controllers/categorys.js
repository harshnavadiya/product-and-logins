var helper = require('./../helpers/helpers')
var db = require('./../helpers/db_helpers')
var fs = require('fs')
var multiparty = require('multiparty')
var request = require('request')

//const image_save_path = "/usr/share/nginx/html/img/"
//const image_path = "http://139.59.61.96/img/"
const image_save_path = "./public/img/"

module.exports.controller = (app, io, socket_list) => {

    const msg_categories_already_add="Department Already Exist";
    const msg_categories_add="Department Add Sucessfully";
    const msg_fail="Faild";
    app.post('/api/add_department', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ['categories_name'], () => {

            db.query('SELECT `id`, `catagory_name`, `modify_date` FROM `course_catagory` WHERE LOWER(`catagory_name`) =  LOWER(?)', [reqObj.categories_name], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return
                }

                if (result.length > 0) {
                    res.json({
                        'success': 'true',
                        'status': '2',
                        'payload': result[0],
                        'message': msg_categories_already_add
                    });
                } else {

                    db.query('INSERT INTO `course_catagory` (`catagory_name`, `modify_date` ) VALUES (?,?)', [reqObj.categories_name, helper.server_YYYYMMDD_HHmmss()], (err, result) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return
                        }

                        if (result) {
                            res.json({
                                'success': 'true',
                                'status': '1',
                                'message': msg_categories_add,
                                'payload': { 'categories_id': result.insertId, 'categories_name': reqObj.categories_name, 'modify_date': helper.date_mysql_format(helper.server_YYYYMMDD_HHmmss())  }
                            });
                        } else {
                            res.json({
                                'success': 'false',
                                'status': '0',
                                'message': msg_fail
                            });
                        }

                    });

                }
            });

        })
    });


    app.post('/api/admin/edit_department', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ['user_id', 'access_token', 'categories_id', 'categories_name'], () => {

            db.query('UPDATE `categories_detail` SET `categories_name` = ?, `modify_date` = ?  WHERE  `categories_id` = ?',
                [reqObj.categories_name, helper.server_YYYYMMDD_HHmmss(), reqObj.categories_id], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return
                    }

                    if (result.affectedRows > 0) {

                        res.json({
                            'success': 'true',
                            'status': '1',
                            'message': msg_categories_edit
                        });

                    } else {
                        res.json({
                            'success': 'false',
                            'status': '0',
                            'message': msg_fail
                        });
                    }
                })
        })
    })

    app.post('/api/admin/delete_department', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ['user_id', 'access_token', 'categories_id'], () => {

            db.query('UPDATE `categories_detail` SET `status` = 1 , `modify_date` = ? WHERE  `categories_id` = ?',
                [helper.server_YYYYMMDD_HHmmss(), reqObj.categories_id], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return
                    }

                    if (result.affectedRows > 0) {

                        res.json({
                            'success': 'true',
                            'status': '1',
                            'message': msg_categories_delete
                        });

                    } else {
                        res.json({
                            'success': 'false',
                            'status': '0',
                            'message': msg_fail
                        });
                    }

                })
        })
    })

    app.post('/api/admin/list_department', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        helper.CheckParameterValid(res, reqObj, ['user_id', 'access_token'], () => {

            db.query('SELECT  `categories_id` ,`categories_name`, `modify_date` FROM `categories_detail` WHERE `status` != 1  ',
                [], (err, result) => {
                    if (err) {
                        helper.ThrowHtmlError(err, res);
                        return
                    }

                    if (result.length > 0) {

                        res.json({
                            'success': 'true',
                            'status': '1',
                            'payload': result
                        });


                    } else {
                        res.json({
                            'success': 'true',
                            'status': '1',
                            'payload': [],
                            'message': msg_no_data
                        });
                    }

                })
        })
    })
}