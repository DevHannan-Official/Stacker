import { Schema, model, models } from "mongoose";

const notificationSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["message", "mention", "invite", "system"],
      required: true,
    },
    message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification =
  models.Notification || model("Notification", notificationSchema);

export default Notification;
