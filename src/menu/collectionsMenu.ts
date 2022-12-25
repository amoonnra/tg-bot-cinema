import { Menu } from "@grammyjs/menu";

export const collectionsMenu = new Menu("collections-menu")
  .text("Тут будут collections", (ctx) => ctx.reply("Powered by grammY"))
  .back("Назад");