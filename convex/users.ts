import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string(), // Googleの `sub` を使うとより安全
    },
    handler: async (ctx, args) => {
        console.log("受け取ったデータ:", args); 
    
        const user = await ctx.db.query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        console.log("取得したユーザー:", user);

        // ユーザーがまだ存在しない場合のみ追加
        if (!user) {
            try {
                const result = await ctx.db.insert("users", {
                    name: args.name,
                    picture: args.picture,
                    email: args.email,
                    uid: args.uid, 
                });
                console.log("新しいユーザーをDBに保存:", result);
            } catch (error) {
                console.error("ユーザーの保存に失敗:", error);
            }
        } else {
            console.log("既に登録済みのユーザー:", user);
        }
    },
});

export const GetUser = query({
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        // `.first()` を使って1件だけ取得する
        const user = await ctx.db.query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        console.log("取得したユーザー情報:", user);

        return user;
    },
});
