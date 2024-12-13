
import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

const config: Config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            // Set font family
            fontFamily: {
                sans: [...defaultTheme.fontFamily.sans],
            },
            // Set theme colors (Required config!)
            colors: {
                primary: colors.blue,
                secondary: colors.slate,
            },
        },
    },
    // Add plugins
    plugins: [
        typography, 
        forms,
        plugin(({ addBase }) => {
            addBase({
                
            });
        }),
    ],
};

export default config;