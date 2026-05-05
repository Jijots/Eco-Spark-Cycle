import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    blue:       '#2541b2', // primary actions, hero cards
                    'blue-dark':'#1a2e8a', // hover state
                    gold:       '#f4b000', // Coinbase gold — rewards-status only
                    'gold-bg':  '#fef9e7', // gold surface wash
                    green:      '#00c896', // eco positive states (Coinbase semantic-up inspired)
                    'green-bg': '#e6faf5', // green surface wash
                    canvas:     '#d4eef6', // light cyan page background
                    surface:    '#ffffff', // card surface
                },
            },
            borderRadius: {
                card: '14px', // Airbnb ~14px card radius
            },
            boxShadow: {
                card:  '0 0 6px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)',
                float: '0px 8px 24px rgba(0,0,0,0.5)',
                nav:   '0 -1px 0 rgba(0,0,0,0.06), 0 -4px 16px rgba(0,0,0,0.08)',
            },
        },
    },

    plugins: [forms],
};
