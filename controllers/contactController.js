const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Contact = mongoose.model("Contact");

router.get("/", (req, res) => {
  res.render("contact/addOrEdit", {
    viewTitle: "Add New Contact",
  });
});

router.post("/", (req, res) => {

    if (req.body._id == '') {
        insertRecord(req, res);
    } else {
        updateRecord(req, res);
    }
  
});

function insertRecord(req, res) {
  var contact = new Contact();
  contact.fullName = req.body.fullName;
  contact.email = req.body.email;
  contact.mobile = req.body.mobile;
  contact.save((err, doc) => {
    if (!err) {
      res.redirect("contact/list");
    } else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("contact/addOrEdit", {
          viewTitle: "Insert Contact",
          contact: req.body,
        });
      } else {
        console.log("Error during record insertion : " + err);
      }
    }
  });
}


function updateRecord(req, res){
    Contact.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if (!err) {
            res.redirect('contact/list');
        } else {

            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("contact/addOrEdit", {
                    viewTitle: 'Update Contact',
                    contact: req.body
                } );
            }else{
                console.log('Error during record update: ' + err);
            }
            
        }
    } );
}


router.get("/list", (req, res) => {
  
  Contact.find( (err, docs) => {
      if (!err) {
          res.render("contact/list", {
              list: docs
          } );
          
      }else{
          console.log('Error in retrieving employee list :' + err );
      }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;

      case "mobile":
        body["mobileError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;

      default:
        break;
    }
  }
}


router.get('/:id', (req, res) => {
    Contact.findById( req.params.id, (err, doc) => {
        if (!err) {
            res.render("contact/addOrEdit", {
                viewTitle: "Update Contact",
                contact: doc
            } );
            
        }
    })
});

module.exports = router;
