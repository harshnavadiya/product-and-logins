var helper = require('./../helpers/helpers')
var db = require('./../helpers/db_helpers')
var fs = require('fs')
var multiparty = require('multiparty')
var request = require('request')

//const image_save_path = "/usr/share/nginx/html/img/"
//const image_path = "http://139.59.61.96/img/"
const image_save_path = "./public/img/"

module.exports.controller = (app, io, socket_list) => {
     app.post('/get_product', (req, res) => {
        helper.Dlog(req.body)
        var reqObj = req.body;
        // helper.Dlog()
        // res.send("Done sucess");
        // helper.Dlog(db);
        db.collection_find("product_detail",(err,result)=>{
            // console.log(result);
            if(err){
                 helper.ThrowHtmlError(err, result);
                    return
            }else{
                    res.json({
                        'success': 'true',
                        'status': '2',
                        'payload': result,
                        'message': "Data Get Sucess"
                    });
                }
        })
        // helper.CheckParameterValid(res, reqObj, ['categories_name'], () => {
            
        // });
     });
}