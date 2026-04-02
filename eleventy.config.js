module.exports = async function(eleventyConfig) {
    const { EleventyRenderPlugin } = await import("@11ty/eleventy");
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    
    eleventyConfig.setTemplateFormats(["njk", "md", "html"]);
    eleventyConfig.addPassthroughCopy("css/styles.css");
    eleventyConfig.addFilter("limit", (array, n) => (Array.isArray(array) ? array : []).slice(0, n));

    return {
    dir: {
      input: ".", // root directory is input    
      includes: "_includes", // _includes contains layouts + partials
      layouts: "_includes/layouts",
      output: "_site",
    },
  };
};