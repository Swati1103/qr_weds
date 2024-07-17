const {z} = require("zod");

// Creating an object schema

const loginSchema = z.object({
    phone: z
    .string({ required_error: "Phone is required"})
    .trim()
    .min(10, {message: "Phone must be at least of 10 chars. "})
    .max(20, {message: "Phone must not be more than 20 characters"}),
    password: z
    .string({ required_error: "Password is required"})
    .min(7, {message: "Password must be at least of 7 chars. "})
    .max(1024,"Password can't be greater than 1024 characters"),
});

const signupSchema = loginSchema.extend({
    username: z
    .string({ required_error: "Name is required"})
    .trim()
    .min(3, {message: "Name must be at least of 3 chars. "})
    .max(255, {message: "Name must not be more than 255 characters"}),
});


module.exports = {signupSchema, loginSchema};