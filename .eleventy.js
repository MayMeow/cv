module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ assets: "assets" });
    eleventyConfig.addPassthroughCopy({ "src/sw.js": "sw.js" });
    eleventyConfig.addPassthroughCopy("src/manifest.webmanifest");
    eleventyConfig.addWatchTarget("./src/**/*.{njk,md,json,webmanifest,js}");
    eleventyConfig.addWatchTarget("./src/sw.js");

    return {
        dir: {
        input: "src",
        includes: "_includes",
        layouts: "_includes/layouts",
        data: "_data",
        output: "_site"
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};
