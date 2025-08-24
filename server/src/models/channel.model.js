import pkg from "mongoose";
const { Schema, model, models } = pkg;

const channelSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["public", "private", "dm"],
      required: true,
      index: true,
    },
    name: { type: String, trim: true },
    topic: String,
    createdById: { type: Schema.Types.ObjectId, ref: "User", required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: "User", index: true }],
    archivedAt: Date,
  },
  { timestamps: true, versionKey: false }
);

channelSchema.index({ orgId: 1, type: 1, name: 1 }, { unique: false });
channelSchema.index({ memberIds: 1 }); // fast DM/channel membership queries

const Channel = models.Channel || model("Channel", channelSchema);
export default Channel;
