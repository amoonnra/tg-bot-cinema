import { CommandContext, Context } from "grammy";

export const handleStart = (ctx: CommandContext<Context>) => ctx.reply("Welcome! Up and running.")