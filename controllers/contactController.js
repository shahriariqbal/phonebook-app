const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');


router.get('/', (req, res) => {

    res.render("contact/addOrEdit", {
        viewTitle: "Add New Contact"
    });

});

router.post('/', (req, res) => {

    insertRecord(req, res);

});

function insertRecord(req, res){
    var contact = new Contact();
    contact.fullName = req.body.fullName;
    contact.email = req.body.email;
    contact.mobile = req.body.mobile;
    contact.save((err, doc) => {

        if(!err){
            res.redirect('contact/list');

        }else{
            console.log('Error during record insertion : ' + err );
        }

    });

}

router.get('/list', (req, res) => {
    res.json('from list');

});

module.exports = router;