const {DateTime} = require("luxon")

module.exports = {
  layout: "page.njk",
  tags: ["blogs"],
  eleventyComputed: {
    permalink: data => `/blogs/${data.page.fileSlug}/`,
    dateString: ({page}) => DateTime.fromJSDate(page.date, {zone: 'utc'}).toLocaleString(DateTime.Date_Full)
  }
};