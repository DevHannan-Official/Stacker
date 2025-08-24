import { Schema, model, models } from "mongoose";

const reactionSchema = new Schema(
  {
    messageId: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    emoji: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

reactionSchema.index({ messageId: 1, userId: 1, emoji: 1 }, { unique: true });

const MessageReaction =
  models.MessageReaction || model("MessageReaction", reactionSchema);
export default MessageReaction;
