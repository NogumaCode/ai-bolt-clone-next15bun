import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  }),
  workspace: defineTable({
    messages: v.array(
      v.object({
        role: v.string(), // 例: "user", "system"
        content: v.string(), // メッセージの内容
      })
    ), // 🔥 配列に変更
    filedata: v.optional(
      v.object({
        url: v.string(),
        name: v.string(),
        size: v.number(),
        type: v.string(),
      })
    ), // 🔥 `optional()` に修正
    user: v.id("users"),
  }),
});
