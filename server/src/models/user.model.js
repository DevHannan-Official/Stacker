import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    displayName: { type: String, required: true, trim: true },
    avatar: { url: String, publicId: String },
    password: { type: String, required: true },
    lastSeenAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
  }
);

userSchema.index({ displayName: "text", email: "text" });

const User = models.User || model("User", userSchema);
export default User;
