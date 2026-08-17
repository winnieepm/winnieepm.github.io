my personal site. i built it brick by brick. this is the branch where i make changes. special thanks to @jeremyboggs for helping walk through my muddy code, and to @walshbr for insisting on the virtues of blog writing. ——winnieepm

## How It's Made
Built on [11ty](https://www.11ty.dev) and hosted by [GitHub Pages](https://docs.github.com/en/pages), free of charge. The website is deployed from `main` branch using Github Actions in `.github/workflows` and further instructions in `package.json` and `.nojekyll`. 


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
Clone your own version of this repo if you want to make your own version. Using a CLI, navigate to the project root directory. Run `npm start` to locally deploy the site in your computer browser; this is a custom build prompt replacing the more verbose stantard one, `npx @11ty/eleventy --serve --watch`.