import { Menu } from "@grammyjs/menu";

export const aboutMenu = new Menu("about-menu")
  .text("Тут about", (ctx) => ctx.reply("Powered by grammY"))
  .back("Назад");