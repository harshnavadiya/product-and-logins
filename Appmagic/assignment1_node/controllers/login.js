var helper = require('./../helpers/helpers')
var db = require('./../helpers/db_helpers')
var fs = require('fs')
var multiparty = require('multiparty')
var request = require('request')

//const image_save_path = "/usr/share/nginx/html/img/"
//const image_path = "http://139.59.61.96/img/"
const image_save_path = "./public/img/"

module.exports.controller = (app, io, socket_list) => {
 //String value
 const msg_success = "successfully"
 const msg_fail = "fail"
 const msg_login_other_device = "Login other device"
 const msg_invalid_user_password = "invalid username or password"
 const msg_user_already_exits = "Already Exist."
 const msg_already_exits = "Email Already Exist."
 const msg_invalid_user = "invalid user"
 const msg_otp_code_fail = "Invalid OTP Code"
 const msg_otp_code = "OTP verify successfully"
 const msg_forgot_password = "forgot password successfully. please check your email inbox"
 const msg_email_send = "Email send Successfully"
 const msg_change_password = "Password change successfully"
 const msg_old_password_wrong = "Old password is wrong"
 const msg_user_success = "new user create successfully"

    // console.log("Hello");
    app.post('/api/get_login_data', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;

        // helper.CheckParameterValid(res, reqObj, ['email', 'password'], () => {

            // var auth_token = helper.create_request_token();


          
            db.query('SELECT `f_name`,`en_no` FROM `students_tbl` WHERE `is_deleted` = ?', [0], (err, result) => {
                if (err) {
                    helper.ThrowHtmlError(err, res);
                    return;
                }
                

                    db.query('SELECT `f_name`,`fid` FROM `faculty_tbl` WHERE `is_deleted` = ?', [0], (err, fac_result) => {
                        if (err) {
                            helper.ThrowHtmlError(err, res);
                            return;
                        }
                        if (fac_result.length > 0 || result.length > 0) {
                            
                            var data=result.concat(fac_result);
                            data.forEach(element => {
                                if(element.en_no != ""){
                                    var name=element.en_no+'-'+element.f_name;
                                    element.value = name;
                                }else{
                                    var name=element.fid+'-'+element.f_name;
                                    element.value = name;
                                }
                            });
                            
                            res.json({
                                "success": "true",
                                "status": 1,
                                "message": msg_success,
                                "payload": data
                            })
                        } else {
                            res.json({
                                "sucess": "false",
                                "status": '0',
                                "message": msg_fail
        
                            })
                        }
                    });
                   
            });

        // })
    });
}