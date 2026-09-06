a personal website. 

## How It's Made
Built on [11ty](https://www.11ty.dev) and hosted by [GitHub Pages](https://docs.github.com/en/pages). The website is deployed from `main` branch using GitHub Actions in `.github/workflows`. Further dev instructions in `package.json` and `.nojekyll`. 


## Repository Map 
📁 .githib/workflows <br>
📁 _includes/<br>
  |-- 📁 layouts/<br>
  |-- 📁 partials/<br>
📁 assets/ <br>
  |--📁 images/ <br>
📁 collections/ <br>
  |--📁 blogs/ <br>
  |--📁 projects/ <br>
📁 css/<br>


## Using this Site
Clone this repo to make your own version of this site. To build and deploy it locally, open a CLI, and run `npm start`. This custom build prompt replaces the more verbose default option `npx @11ty/eleventy --serve --watch`.
