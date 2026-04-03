module.exports = async function(eleventyConfig) {
    const { EleventyRenderPlugin } = await import("@11ty/eleventy");
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    
    eleventyConfig.setTemplateFormats(["njk", "md", "html"]);
    eleventyConfig.addPassthroughCopy("css/styles.css");
    eleventyConfig.addPassthroughCopy("assets/*.pdf");
    eleventyConfig.addFilter("limit", (array, n) => (Array.isArray(array) ? array : []).slice(0, n));
    eleventyConfig.addFilter("postDate", (dateObj) => {
      return dateObj.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    });


    return {
    dir: {
      input: ".", // root directory is input    
      includes: "_includes", // _includes contains layouts + partials
      layouts: "_includes/layouts",
      output: "_site",
    },
  };
};