module.exports = {
  tags: ["projects"],
  eleventyComputed: {
    permalink: data => `/projects/${data.page.fileSlug}/`
  }
};