const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
    username: {type: String, required: true},
    phone: {type: String, required: true},
    phone: {type: String, required: true},
    whatsappNo: {type: String, required: true},
    designNo: {type: String, required: true},
});

// create a model or a collection
const Contact = new model("Contact", contactSchema);
module.exports = Contact;