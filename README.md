# sunlit-sea

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deployment

dist needs to be removed from .gitignore

`npm run build`
`git subtree push --prefix dist origin gh-pages`

This will push the dist folder to the gh-pages branch, which is deployed by github pages.

<br></br>
# Editing SVG

The text in SVG's are converted to curves, hence are not considered text anymore. There is no way to convert back to text, so a new text has to be made in an vector graphic program. 

The following example is from Affinity Designer. The process should be the same in other programs, but some terminology might be different.

<br></br>
## General editing of SVG

1. Open the SVG
2. Write the new text
	- The Everett should be available if it is installed on your computer
3. Select the text and go "Layer"->"Convert To Curves"
	- Alternatively mark everything with "CTRL + A" and then convert
4. Export the new SVG

To include an SVG in code, open the SVG in your text editor and copy the content into your HTML.

<br></br>
## SVG in 3DVisualization
Including an SVG is handled by svgToGroup.ts, which converts an svg file to a group, hvich then can be used in the 3js application.

<br></br>
## Editing of Roadmap Image

There's a template for the different roadmap svg's in src/assets, one for desktop and one for mobile.


1. Open the template in a vector graphics program. 
2. Make the wanted changes
3. Save the new version as the new template (SVG)
4. Export the image as png, double the amount of pixels to avoid blurriness
	- You will need png for: 
		- roadmap image, without line, for desktop
		- roadmap image, without line, for mobile
		- roadmap line for desktop
		- roadmap line for mobile
5. Repeat for the mobile version of the image




Note: It's probably best to convert text to curves and merge similar parts together. Merging will give everything the same material, so merge accordingly.This makes it easier to deactivate layers you don't want to export. 






