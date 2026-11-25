const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = async function(eleventyConfig) {
    const { default: Image, generateHTML } = await import("@11ty/eleventy-img");
    const { EleventyRenderPlugin } = await import("@11ty/eleventy");
    
    eleventyConfig.setTemplateFormats(["njk", "md", "html"]);
    eleventyConfig.addPassthroughCopy("css/styles.css");
    eleventyConfig.addPassthroughCopy("assets/*.pdf");
    eleventyConfig.addPassthroughCopy("assets/images/");
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(feedPlugin, {
      type: "atom",
      outputPath: "/feed.xml",
      collection: {
        name: "blogs",
        limit: 10,
        sort: "auto",
      },
      metadata: {
        language: "en",
        title: "winnie's blog posts",
        subtitle: "",
        base: "https://winnieepm.github.io/",
        author: {
          name: "winnie e. pérez martínez",
          email: "winniee.pm@gmail.com",
        }
      }
    });

    eleventyConfig.addFilter("limit", (array, n) => (Array.isArray(array) ? array : []).slice(0, n));

    eleventyConfig.addShortcode("image", async (src, alt, caption, className) => {
      const metadata = await Image(src, {
      widths: [400, 800, 1200],
      formats: ["webp", "jpeg", "png"],
      outputDir: "./_site/assets/images/",
      urlPath: "/assets/images/",
    });


    const pictureTag = generateHTML(metadata, {
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
    dir: {
      input: ".", // root directory is input    
      includes: "_includes", // _includes contains layouts + partials
      layouts: "_includes/layouts",
      output: "_site",
    },
  };
};