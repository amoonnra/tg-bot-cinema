import { Menu } from "@grammyjs/menu";
import { MyContext } from "types";

export const menuAbout = new Menu<MyContext>("about-menu")
  .text("Тут about", (ctx) => ctx.reply("Powered by grammY"))
  .back("Назад");