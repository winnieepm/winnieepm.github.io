// eleventy.config.js
export default async function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_src/css");
  eleventyConfig.addPassthroughCopy("_src/assets");

  // Watch for changes in external asset folders to trigger a rebuild
  eleventyConfig.addWatchTarget("_src/css/");

  return {
    dir: {
      input: "_src",    // Source files directory
      output: "_site" // Production-ready build directory
    }
  };
};
