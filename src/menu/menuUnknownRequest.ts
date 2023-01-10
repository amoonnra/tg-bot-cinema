import { Menu } from "@grammyjs/menu";
import { MyContext } from "bot";
import { navToMenuSection } from "./utils";

export const menuUnknownRequest = new Menu<MyContext>('unknownRequest').text('Главное меню', (ctx) =>
	navToMenuSection(ctx, 'home')
)