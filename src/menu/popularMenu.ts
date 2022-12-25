import { Menu } from "@grammyjs/menu";

export const popularMenu = new Menu("popular-menu")
  .text("Тут будут populars", (ctx) => ctx.reply("Powered by grammY"))
  .back("Назад");