const Image = require("@11ty/eleventy-img");


module.exports = async function(eleventyConfig) {
    const { EleventyRenderPlugin } = await import("@11ty/eleventy");
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    
    eleventyConfig.setTemplateFormats(["njk", "md", "html"]);
    eleventyConfig.addPassthroughCopy("css/styles.css");
    eleventyConfig.addPassthroughCopy("assets/*.pdf");
    eleventyConfig.addPassthroughCopy("assets/images/");

    eleventyConfig.addFilter("limit", (array, n) => (Array.isArray(array) ? array : []).slice(0, n));
    eleventyConfig.addFilter("postDate", (dateObj) => {
      return dateObj.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    });

    eleventyConfig.addShortcode("image", async (src, alt, caption, className) => {
      const metadata = await Image(src, {
      widths: [400, 800, 1200],
      formats: ["webp", "jpeg", "png"],
      outputDir: "./_site/assets/images/",
      urlPath: "/assets/images/",
    });

    const pictureTag = Image.generateHTML(metadata, {
      alt,
      loading: "lazy",
      decoding: "async",
      sizes: "(max-width: 800px) 100vw, 800px",
    });

    return `<figure class="regular-img ${className || ""}">
      ${pictureTag}
      ${caption ? `<figcaption>${caption}</figcaption>` : ""}
    </figure>`;
  });


    return {
    pathPrefix: "/winnieepm.github.io/",
    dir: {
      input: ".", // root directory is input    
      includes: "_includes", // _includes contains layouts + partials
      layouts: "_includes/layouts",
      output: "_site",
    },
  };
};