const mongoose = require('mongoose');
const router = require('express').Router();  
const shortURL = require('shortid'); 
const message = require('../models/message');
const Messages = mongoose.model('Messages');
var dayjs = require('dayjs');
const { db } = require('../models/message');


// Add new message
router.post('/add', function(req, res, next){

    let message = req.body.message;
    let username = req.body.username;
    let urlFlag = req.body.urlFlag;
    let expiration = new Date((dayjs().add(req.body.expTime, 'minute')).toISOString());
    let url = shortURL.generate();

    const newMessage = new Messages({
        message: message,
        url : url,
        username: username,
        urlFlag: urlFlag,
        expiration: expiration
    });

    try {
    
        newMessage.save()
            .then((message) => {
                res.json({ url: message.url });
            });

    } catch (err) {
        
        res.json({ msg: err });
    
    }

});


router.get('/get_message',(req,res)=>{
    let url = req.query.url;

    Messages.findOne({url: url}, function(err, message) {
            
        if (err) {
            res.json({message :" No such link",urlFlag:false,err:true});
        }
        if (message) {
            if(dayjs().isBefore(dayjs(message.expiration))){

                message.clicks++;
                message.save();

                if(message.urlFlag){
                    res.json({message : message.message , urlFlag:message.urlFlag,err:false});
                }
                else{
                    res.json({message : message.message , urlFlag:message.urlFlag,err:false});
                }

            }
        else{
            res.json({message :"Link expired",urlFlag:false,err:true});
        }

        } else {
            res.json({message :" No such link",urlFlag:false,err:true});
        }
        
    });

});

router.get('/get_message_by_user',(req,res)=>{
    let username = req.query.username;

    Messages.find({username:username}).then(results =>{

        res.json(results);
    })
});



module.exports = router;