const mongoose = require('mongoose');

var contactsSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    }

});

mongoose.model('Contact',  contactsSchema);