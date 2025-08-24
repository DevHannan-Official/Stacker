import { Schema, model, models } from "mongoose";

const membershipSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["member", "admin", "owner"],
      default: "member",
      index: true,
    },
    lastSeenAt: Date,
  },
  { timestamps: true, versionKey: false }
);

membershipSchema.index({ orgId: 1, userId: 1 }, { unique: true });

const Membership = models.Membership || model("Membership", membershipSchema);
export default Membership;
