import pkg from "mongoose";
const { Schema, model, models } = pkg;

const invitationSchema = new Schema(
  {
    email: { type: String, required: true },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Invitation = models.Invitation || model("Invitation", invitationSchema);

export default Invitation;
