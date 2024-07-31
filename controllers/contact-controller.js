const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
    try {
        const contactData = req.body;
        await Contact.create(contactData);
        return res.status(200).json({ message: "Order sent successfully" });
    } catch (error) {
        console.error("Error saving contact data:", error); // Log the error for debugging
        return res.status(500).json({ message: "Order not delivered", error: error.message });
    }
};

module.exports = contactForm;