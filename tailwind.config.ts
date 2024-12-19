/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}"
    ],
    theme: {
        container: {
            center: true,
            width: {
                DEFAULT: "1720px"
            }
        },
        extend: {
            colors: {
                "soft-gray": "var(--soft-gray)",
                "dark-gray": "var(--dark-gray)",
                "white-gray": "var(--white-gray)",
                "dark": "var(--dark)",
                "red": "var(--red)",
                "light-periwinkle": "var(--light-periwinkle)",
                "slate-gray": "var(--slate-gray)",
                "cool-gray": "var(--cool-gray)",
                "pastel-blue": "var(--pastel-blue)"
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            animation: {
                "accordion-down":
                    "accordion-down 0.2s ease-out",
                "accordion-up":
                    "accordion-up 0.2s ease-out",
                "collapsible-down":
                    "collapsible-down 0.2s ease-in-out",
                "collapsible-up":
                    "collapsible-up 0.2s ease-in-out"
            }
        }
    },
    plugins: [],
    fontFamily: {
        "inter": ["Inter", "sans-serif"]
    }
};

