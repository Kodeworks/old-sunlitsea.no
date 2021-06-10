import { MathUtils, Object3D, Mesh, RGB_S3TC_DXT1_Format, } from "three";

// Something strange with this library, but this works and is how it's supposed to be used according to the documentation.
// @ts-ignore
import anime from 'animejs/lib/anime.es.js';
const _ = require('lodash');

import svgToGroup from "./svgToGroup";
import loadModels from "./loader";
import extractMaterials from "./extractMaterials";
import setup from "./setup";
import setupLights from "./lights";

const lerp = MathUtils.lerp;

// Use async so we can use await in the function body.
export default async (containerSelector: string) => {
    const [scene, camera, renderer] = setup();

    const [topGLTF, solarPanelGLTF, bottomGLTF] = await loadModels('Top.glb', 'SolarPanel.glb', 'Bottom.glb');
    const [neighbourGLTF] = await loadModels('PanelWithHinges.glb'); // the one sliding in (and opacity-ing :cat2:)
    const [cableGLTF] = await loadModels('Cable.glb');
    const [fillerGLTF] = await loadModels('Filler.glb');
    // replace the above with CompletePanel.glb

    // Rotate to point towards us with corner
    [topGLTF, solarPanelGLTF, bottomGLTF].forEach(GLTF => GLTF.scene.rotation.y = Math.PI / 2);

    const completeMainPanel = [solarPanelGLTF, topGLTF, bottomGLTF].map(e => e.scene);

    setupLights(scene);

    /**
     * Text labels
     */

    const topLabel = await svgToGroup("top.svg");
    const middleLabel = await svgToGroup("middle.svg");
    const bottomLabel = await svgToGroup("bottom.svg");
    const hingeLabel = await svgToGroup("top.svg");
    const cableLabel = await svgToGroup("middle.svg");
    const fillerLabel = await svgToGroup("bottom.svg");

    topLabel.scale.y *= -1;
    topLabel.scale.multiplyScalar(0.01);
    topLabel.position.y += 1.05;

    middleLabel.scale.y *= -1;
    middleLabel.scale.multiplyScalar(0.01);
    middleLabel.position.y += 1.05;

    bottomLabel.scale.y *= -1;
    bottomLabel.scale.multiplyScalar(0.01);
    bottomLabel.position.y += 1.05;

    hingeLabel.scale.y *= -1;
    hingeLabel.scale.multiplyScalar(0.01);
    hingeLabel.position.y += 1.05;
    
    cableLabel.scale.y *= -1;
    cableLabel.scale.multiplyScalar(0.01);
    cableLabel.position.y += 1.05;
    
    fillerLabel.scale.y *= -1;
    fillerLabel.scale.multiplyScalar(0.01);
    fillerLabel.position.y += 1.05;


    const topObj = new Object3D();
    const middleObj = new Object3D();
    const bottomObj = new Object3D();
    const neighbourObj = new Object3D();
    const cableObj = new Object3D();
    const fillerObj = new Object3D();

    topLabel.position.x += 0.25;
    topLabel.position.z -= 0.25;
    topLabel.rotateY(Math.PI / 4);

    middleLabel.position.x -= 1.2;
    middleLabel.position.z += 2.3;
    middleLabel.position.y -= 0.32;
    middleLabel.rotateY(Math.PI / 4);

    bottomLabel.position.x += 1.00;
    bottomLabel.position.z -= 0.20;
    bottomLabel.position.y -= 0.70;
    bottomLabel.rotateY(Math.PI / 4);

    hingeLabel.rotateY(Math.PI / 2);
    cableLabel.rotateY(Math.PI / 2);
    fillerLabel.rotateY(Math.PI / 2);



    topObj.add(topLabel, solarPanelGLTF.scene);
    middleObj.add(middleLabel, topGLTF.scene);
    bottomObj.add(bottomLabel, bottomGLTF.scene);    

    topObj.rotateY(-Math.PI / 4);
    middleObj.rotateY(-Math.PI / 4);
    bottomObj.rotateY(-Math.PI / 4);

    neighbourObj.position.x = 10;
    neighbourObj.rotation.y = -Math.PI * 0.5; // Edge with notch pointing at camera

    neighbourObj.add(hingeLabel, neighbourGLTF.scene);

    cableObj.add(cableLabel, cableGLTF.scene);
    cableObj.rotateY(-Math.PI / 2);
    cableObj.position.x -= 0.01;

    const cableMaterials = new Set();
    cableGLTF.scene.traverse((child) => {
        if (child instanceof Mesh) {
            cableMaterials.add(child.material);
            child.material.transparent = true;
            child.material.opacity = 0;
        }
    });


    fillerObj.add(fillerGLTF.scene);
    fillerObj.rotateY(-Math.PI / 2);

    const fillerMaterials = new Set();
    fillerGLTF.scene.traverse((child) => {
        if (child instanceof Mesh) {
            fillerMaterials.add(child.material);
            child.material.transparent = true;
            child.material.opacity = 0;
        }
    });

    const secondFillerObj = fillerObj.clone();
    secondFillerObj.add(fillerLabel);
    secondFillerObj.position.x += 2.05;
    /**
     * ADD EM ALL TO THE SCENE
     */

    scene.add(topObj);
    scene.add(middleObj);
    scene.add(bottomObj);

    scene.add(neighbourObj);
    scene.add(cableObj);
    scene.add(fillerObj);
    scene.add(secondFillerObj);

    /**
     * Event handlers
     */

    const labelMaterials = extractMaterials(topLabel, middleLabel, bottomLabel);
    const secondLabelMaterials = extractMaterials(hingeLabel, cableLabel, fillerLabel);

    const parentContainer: HTMLElement = document.querySelector(containerSelector)! as HTMLElement;

    let scrollPercentage = 0;

    const onScroll = () => { 
        const rect = parentContainer.getBoundingClientRect();
        const inView = rect.top <= 0  && rect.bottom >= 0;

        if (!inView) {
            return;
        }

        const percent = -rect.top / rect.height;
        scrollPercentage = percent;
    };

    document.addEventListener("scroll", _.debounce(onScroll, 10), { passive: false });

    /**
     * TIMELINE
     * From anime.js
     */
    const TIMELINE_DURATION = 9000;

    // Set up timeline
    const tl = anime.timeline({
        easing: 'easeInOutSine',
        duration: TIMELINE_DURATION,
        autoplay: false
    });

    // Spin the main panel
    tl.add({
        targets: completeMainPanel.map(e => e.rotation),
        y: -Math.PI * 0.25,
        duration: 1000,
    })

    // Lift top panel
    tl.add({
        targets: topObj.position,
        y: 0.25,
        duration: 1000,
    }, 500);

    // Lower bottom panel
    tl.add({
        targets: bottomObj.position,
        y: -0.25,
        duration: 1000,
    }, 500);

    // Move camera out
    tl.add({
        targets: camera.position,
        x: 0,
        y: 1.5,
        z: 6,
        duration: 1000,
        update: () => camera.updateProjectionMatrix()
    }, 500);

    // Fade in labels for top/mid/bot
    tl.add({
        targets: labelMaterials,
        opacity: 1,
        duration: 500,
    }, '-=500')

    // Fade out labels for top/mid/bot
    tl.add({
        targets: labelMaterials,
        opacity: 0,
        duration: 250,
    });

    // Move top panel down again
    tl.add({
        targets: topObj.position,
        y: 0,
        duration: 250,
    }, '-=250');

    // Move bottom panel up again
    tl.add({
        targets: bottomObj.position,
        y: 0,
        duration: 250,
    }, '-=250');

    // Move camera position for cables and tethering
    tl.add({
        targets: camera.position,
        y: 1,
        x: 0,
        z: 4,
        duration: 400,
        update: () => camera.updateProjectionMatrix()
    }, '-=250');    

    // // TODO: Fade in label about power

    // Slide the camera to the connectors
    tl.add({
        targets: camera.position,
        x: 1.04,
        duration: 500,
    }, '-=0');

    // Slide in the other panel
    tl.add({
        targets: neighbourObj.position,
        x: 2.06,
        z: 0,
        y: 0,
        duration: 1000,
        easing: 'easeInOutExpo'
    }, '-=750');

    // TODO Find a better way to select material
    // Fade in cable 
    tl.add({
        targets: cableMaterials.values().next().value,
        opacity: 1,
        duration: 1000,        
    }, '-=0');

    // Fade in filler
    tl.add({
        targets: fillerMaterials.values().next().value,
        opacity: 1,
        duration: 1000,
    }, '-=0');


    // Fade in second labels
    tl.add({
        targets: secondLabelMaterials,
        opacity: 1,
        duration: 500,
    }, '-=0');

    //Fade out second labels
    tl.add({
        targets: secondLabelMaterials,
        opacity: 0,
        duration: 250,
    }, '+=250');
   

    // // Slide it back out
    // tl.add({
    //     targets: neighbourObj.position,
    //     x: 10,
    //     z: -10,
    //     duration: 1000,
    //     easing: 'easeInOutExpo'
    // });

    // // Ad-hoc solution to tilt the camera upwards without getting in a quarrel with Señor Euler
    // camera.position.set(2.5, 1.5, 2.5);
    // camera.lookAt(0, 0, 0);

    // // Move the camera up and out
    // tl.add({
    //     targets: camera.position,
    //     x: 2.5,
    //     y: 1.5,
    //     z: 2.5,
    //     duration: 500,
    //     update: () => camera.updateProjectionMatrix()
    // });

    // // Pan camera to origo
    // tl.add({
    //     targets: camera.rotation,
    //     x: camera.rotation.x,
    //     y: camera.rotation.y,
    //     z: camera.rotation.z,
    //     duration: 500,
    //     update: () => camera.updateProjectionMatrix()
    // }, '-=500');

    /**
     * PERFORM THE RENDERING
     */
    
    let animationPercentage = 0;


    const render = () => {
        requestAnimationFrame(render);

        // spotlight.position.set(
        //     camera.position.x + 5,
        //     camera.position.y + 5,
        //     camera.position.z + 5,
        // );

        animationPercentage = lerp(animationPercentage, scrollPercentage, 0.1); // Smooth out the mapping from scrolling
        tl.seek(animationPercentage * TIMELINE_DURATION);

        renderer.render(scene, camera);
    }

    render();
}
