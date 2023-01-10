import { Menu } from "@grammyjs/menu";
import { MyContext } from "types";
import { navToMenuSection } from "./utils";

export const menuUnknownRequest = new Menu<MyContext>('unknownRequest').text('Главное меню', (ctx) =>
	navToMenuSection(ctx, 'home')
)