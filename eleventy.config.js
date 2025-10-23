module.exports = function(eleventyConfig) {
    markdownTemplateEngine: "njk";
    htmlTemplateEngine: "njk";
    eleventyConfig.addPassthroughCopy("css/styles.css");

};