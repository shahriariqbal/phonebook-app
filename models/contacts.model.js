const mongoose = require("mongoose");

var contactsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This field is required.",
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
    required: "This field is required.",
  },
});

// Custom validation for email
contactsSchema.path("email").validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

// Custom validation for mobile
contactsSchema.path("mobile").validate((val) => {
  mobileRegex = /^(?:\+88|01)?(?:\d{11}|\d{13})$/;
  return mobileRegex.test(val);
}, "Invalid BD mobile number.");

mongoose.model("Contact", contactsSchema);
