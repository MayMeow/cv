module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ assets: "assets" });
    eleventyConfig.addWatchTarget("./src/**/*.{njk,md,json}");

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
