module.exports = {
  tags: ["blogs"],
  eleventyComputed: {
    permalink: data => `/blogs/${data.page.fileSlug}/`
  }
};