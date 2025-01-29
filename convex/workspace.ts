import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateWorkSpace = mutation({
    args:{
        messages: v.array(
          v.object({
            role: v.string(), // "user" or "system"
            content: v.string(),
          })
        ),
        user: v.id("users")
    },
    handler:async(ctx,args)=>{
        const workspaceId = await ctx.db.insert('workspace',{
            messages:args.messages,
            user:args.user
        })
        return workspaceId
    }
})