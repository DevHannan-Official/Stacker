import pkg from "mongoose";
const { Schema, model, models } = pkg;

const orgSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    logoUrl: {
      url: String,
      publicId: String,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orgSchema.index({ name: "text", slug: "text" });

const Organization = models.Organization || model("Organization", orgSchema);
export default Organization;
