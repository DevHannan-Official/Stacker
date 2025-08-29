import pkg from "mongoose";
const { Schema, model, models } = pkg;

const invitationSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
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

invitationSchema.index({ email: 1, organization: 1 }, { unique: true });

const Invitation = models.Invitation || model("Invitation", invitationSchema);

export default Invitation;
