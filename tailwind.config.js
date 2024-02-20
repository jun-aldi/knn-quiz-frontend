/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        fontFamily: {
            poppins: 'Poppins, sans-serif',
        },
        extend: {
            colors: {
                danger: 'hsla(347, 100%, 50%, 1)',
                primary: 'hsl(51, 82%, 54%)',
                secondary: '#F6F6FD',
                grey: '#ABB3C4',
                dark: '#121F3E',
                page: '#F8F8FA',
                success: '#2ED16C',
                brightYellow: 'hsl(51, 82%, 54%)',
                darkYellow: 'hsl(59, 90%, 54%)',
                veryLightGrey: '	hsl(0, 0%, 94%)',
                LightGrey: '		hsl(0, 0%, 87%)',
                LightGreen: '			hsl(142, 70%, 49%)',
            },

        },
    },
    plugins: [],
}