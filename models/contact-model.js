const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
    username: {type: String, required: true},
    phone: {type: String, required: true},
    message: {type: String},
});

// create a model or a collection
const Contact = model("Contact", contactSchema);
module.exports = Contact;