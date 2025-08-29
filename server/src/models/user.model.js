import pkg from "mongoose";
const { Schema, model, models } = pkg;
import bcrypt from "bcryptjs";

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
    isOAuth: {
      name: {
        type: String,
        default: null,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
    bio: String,
    displayName: { type: String, required: true, trim: true },
    avatar: { url: String, publicId: String, oAuthAvatar: String },
    password: { type: String, default: null },
    lastSeenAt: { type: Date, default: Date.now() },
    verified: { type: Boolean, default: false },
    blocked: { type: Boolean, default: false },
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

userSchema.pre("save", async function (next) {
  // Only hash the password if it's new or has been modified
  if (this.password && this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = models.User || model("User", userSchema);
export default User;
