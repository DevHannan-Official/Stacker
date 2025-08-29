import pkg from "mongoose";
const { Schema, model, models } = pkg;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = models.Contact || model("Contact", contactSchema);

export default Contact;
