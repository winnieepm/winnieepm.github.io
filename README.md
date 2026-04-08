my personal site. i built it brick by brick. this is the branch where i make changes. 

## How It Works
I use [11ty](https://www.11ty.dev) to develop it and [GitHub Pages](https://docs.github.com/en/pages) to host it free of charge. The repo has two main active branches `main` and `deploy`. In the first, I work on making changes and local testing while the `deploy` branch simply hosts a copy of the `_site/` generated in final production.

## Repository Map 
📁 assets/ <br>
  |--📁 images/ <br>
📁 collections/ <br>
  |--📁 blogs/ <br>
  |--📁 projects/ <br>
📁 css/<br>
📁 layouts/<br>
📁 _includes/<br>
  |-- 📁 layouts/<br>
  |-- 📁 partials/<br>

## Using this Site
Clone your own version of this repo if you want to make your own version. Using a CLI, navigate to the project root directory and run `npm start` to locally deploy the site in your computer browser. This is a custom build script I added to replace the more verbose  `npx @11ty/eleventy --serve --watch`.
