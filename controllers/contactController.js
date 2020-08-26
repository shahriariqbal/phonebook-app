const express = require('express');
var router = express.Router();


router.get('/', (req, res) => {

    res.render("contact/addOrEdit", {
        viewTitle: "Add New Contact"
    });

});

module.exports = router;