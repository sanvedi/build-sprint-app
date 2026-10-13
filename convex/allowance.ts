import type { MutationCtx } from "./_generated/server";
import { ConvexError } from "convex/values";
export async function reserveAllowance(ctx:MutationCtx,token:string){
    const day=new Date().toISOString().slice(0,10);
    const player=await ctx.db.query("playerUsage").withIndex("by_token_day",q=>q.eq("token",token).eq("day",day)).unique();
    const cap=Number(process.env.PROMPT_GAME_DAILY_CALL_LIMIT||"20");
    if(!Number.isInteger(cap)||cap<1||cap>100||player&&player.count>=cap)throw new ConvexError("DAILY_ALLOWANCE_REACHED");
    if(player)await ctx.db.patch(player._id,{count:player.count+1});else await ctx.db.insert("playerUsage",{token:token,day,count:1});
    // Keep the old aggregate as a meter, never as a shared player lockout.
    const usage=await ctx.db.query("practiceUsage").withIndex("by_day",q=>q.eq("day",day)).unique();
    if(usage)await ctx.db.patch(usage._id,{count:usage.count+1});else await ctx.db.insert("practiceUsage",{day,count:1});
}
