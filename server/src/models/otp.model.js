import pkg from "mongoose";
const { Schema, model, models } = pkg;

const otpSchema = new Schema(
  {
    code: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    expiredAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 60 * 60 * 1000),
    },
  },
  { timestamps: true }
);

const OTP = models.OTP || model("OTP", otpSchema);
export default OTP;
