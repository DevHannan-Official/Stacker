import { Schema, model, models } from "mongoose";

const attachmentSchema = new Schema(
  {
    assetId: { type: Schema.Types.ObjectId, ref: "FileAsset", required: true },
    kind: { type: String, enum: ["image", "video", "file"], required: true },
    name: { type: String, required: true },
    size: { type: Number, required: true },
    mime: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const messageSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
      index: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: { type: String, default: "" },
    attachments: [attachmentSchema],
    parentMessageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      index: true,
    },
    editedAt: Date,
    deletedAt: Date,
  },
  { timestamps: true, versionKey: false }
);

messageSchema.index({ channelId: 1, createdAt: -1 });
messageSchema.index({ orgId: 1, content: "text" }); // text search within org

const Message = models.Message || model("Message", messageSchema);
export default Message;
