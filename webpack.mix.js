const mix = require("laravel-mix");

mix.js("resources/js/app.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [])
    .sass("resources/sass/app.scss", "'public/css");

chainWebpack: (config) => {
    config.module
        .rule("vue")
        .use("vue-loader")
        .loader("vue-loader")
        .tap((options) => {
            options.compilerOptions.preserveWhitespace = true;
            return options;
        });
};
