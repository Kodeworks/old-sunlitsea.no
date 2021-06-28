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
## Editing of Roadmap SVG

There's a template for roadmap svg ion src/assets

1. Follow the general procedure for editing an SVG, but additionally:
	- Ungroup everything, if not already ungrouped
	- To ease working with the svg, we want to merge as many curves as possible:	 
		- Title text should be alone
		- Title year should be alone
		- Roadmap line should be alone
		- Merge all other years together
		- Merge all white text together
2. Export the svg to a new file in the project
3. Remove everything outside \<svg>
	- Most likely the two first lines
4. Change the attributes inside the \<svg> to the ones in the template
5. Go to the bootom and add the \<mask> that you find in the bottom of the template
	- The mask is used to draw the yellow line
6. Make sure that ids and class names looks correct compared with the template
	- Everything but "title text" and "title year" should have class "roadmapItem"
7. Change the new SVG element with the one in RoadmapSVG.vue