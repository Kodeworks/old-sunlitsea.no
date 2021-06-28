import { MathUtils, Object3D, Mesh, PlaneGeometry, MeshStandardMaterial, DoubleSide } from "three";

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

    let onMobile;
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (navigator.userAgent.includes("Mac") && "ontouchend" in  document)){
        camera.fov = 110; // Hack
        onMobile = true;
    }

    const [topGLTF, solarPanelGLTF, bottomGLTF] = await loadModels('Top.glb', 'SolarPanel_smaller.glb', 'Bottom.glb');
    const [neighbourGLTF] = await loadModels('PanelWithHinges_smaller.glb'); // the one sliding in (and opacity-ing :cat2:)
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

    let topLabel;
    let middleLabel;
    let bottomLabel;
    let junctionBoxLabel;
    let sealantLabel;
    let coolingLabel;

    if (onMobile) {
        topLabel = await svgToGroup("pil1hvit_mobile.svg");
        middleLabel = await svgToGroup("pil2hvit_mobile.svg");
        bottomLabel = await svgToGroup("pil3hvit_mobile.svg");
        junctionBoxLabel = await svgToGroup("pil4hvit_mobile.svg");
        sealantLabel = await svgToGroup("pil5hvit_mobile.svg");
        coolingLabel = await svgToGroup("pil6hvit_mobile.svg");
    } else {
        topLabel = await svgToGroup("pil1hvit.svg");
        middleLabel = await svgToGroup("pil2hvit.svg");
        bottomLabel = await svgToGroup("pil3hvit.svg");
        junctionBoxLabel = await svgToGroup("pil4hvit.svg");
        sealantLabel = await svgToGroup("pil5hvit.svg");
        coolingLabel = await svgToGroup("pil6hvit.svg");
    }

    // Flipping and scaling labels
    [topLabel, middleLabel, bottomLabel, junctionBoxLabel, sealantLabel, coolingLabel].forEach(x => {
            x.scale.multiplyScalar(0.01);
            x.scale.y *= -1;
        });

    // Place all labels on a decent position
    if (onMobile) {
        topLabel.scale.multiplyScalar(0.8);
        topLabel.position.x -= 1.3;
        topLabel.position.y += 2.9;
        topLabel.position.z += 0;
        topLabel.rotateY(Math.PI / 4);
        topLabel.rotateX(-Math.PI / 15);

        middleLabel.scale.multiplyScalar(0.8);
        middleLabel.position.x -= 1.7;
        middleLabel.position.y += 1.9;
        middleLabel.position.z += 0.8;
        middleLabel.rotateY(Math.PI / 4);
        middleLabel.rotateX(-Math.PI / 15);

        bottomLabel.scale.multiplyScalar(0.6);
        bottomLabel.position.x += 0.2;
        bottomLabel.position.y += 0;
        bottomLabel.position.z += 1.2;
        bottomLabel.rotateY(Math.PI / 4);
        bottomLabel.rotateX(-Math.PI / 15);

        junctionBoxLabel.scale.multiplyScalar(0.75);
        junctionBoxLabel.position.x += 0.90;
        junctionBoxLabel.position.y += 2.05;
        junctionBoxLabel.position.z += 0.55;
        junctionBoxLabel.rotateY(Math.PI / 2);
        junctionBoxLabel.rotateX(-Math.PI / 15);

        sealantLabel.scale.multiplyScalar(0.75);
        sealantLabel.position.y += 3;
        sealantLabel.position.z += 0.4;
        sealantLabel.position.x += 0.9;
        sealantLabel.rotateY(Math.PI / 2);
        sealantLabel.rotateX(-Math.PI / 15);

        coolingLabel.scale.multiplyScalar(0.75);
        coolingLabel.position.y -= 0.0;
        coolingLabel.position.x += 1;
        coolingLabel.position.z += 1.5;
        coolingLabel.rotateY(Math.PI / 2);
        coolingLabel.rotateX(-Math.PI / 15)
    } else {
        topLabel.position.x += 0.85;
        topLabel.position.y += 1.25;
        topLabel.position.z -= 0;
        topLabel.rotateY(Math.PI / 4);
        topLabel.rotateX(-Math.PI / 15);

        middleLabel.position.x -= 2.7;
        middleLabel.position.y += 1.1;
        middleLabel.position.z += 3.8;
        middleLabel.rotateY(Math.PI / 4);
        middleLabel.rotateX(-Math.PI / 15);

        bottomLabel.position.x += 1.20;
        bottomLabel.position.y += 1.20;
        bottomLabel.position.z += 0.30;
        bottomLabel.rotateY(Math.PI / 4);
        bottomLabel.rotateX(-Math.PI / 15);

        junctionBoxLabel.scale.multiplyScalar(0.75);
        junctionBoxLabel.position.x += 0.90;
        junctionBoxLabel.position.y += 0.8;
        junctionBoxLabel.position.z += 2.9;
        junctionBoxLabel.rotateY(Math.PI / 2);
        junctionBoxLabel.rotateX(-Math.PI / 15);

        sealantLabel.scale.multiplyScalar(0.75);
        sealantLabel.position.y += 0.8;
        sealantLabel.position.z -= 2.0;
        sealantLabel.position.x += 0.9;
        sealantLabel.rotateY(Math.PI / 2);
        sealantLabel.rotateX(-Math.PI / 15);


        coolingLabel.scale.multiplyScalar(0.75);
        coolingLabel.position.y -= 0.0;
        coolingLabel.position.x += 1;
        coolingLabel.position.z += 1.5;
        coolingLabel.rotateY(Math.PI / 2);
        coolingLabel.rotateX(-Math.PI / 15);
    }

    // Initalize the objects to be shown, and add the labels to them
    const topObj = new Object3D();
    const middleObj = new Object3D();
    const bottomObj = new Object3D();
    const neighbourObj = new Object3D();
    const cableObj = new Object3D();
    const fillerObj = new Object3D();

    topObj.add(topLabel, solarPanelGLTF.scene);
    middleObj.add(middleLabel, topGLTF.scene);
    bottomObj.add(bottomLabel, bottomGLTF.scene);

    topObj.rotateY(-Math.PI / 4);
    middleObj.rotateY(-Math.PI / 4);
    bottomObj.rotateY(-Math.PI / 4);

    neighbourObj.position.x = 10;
    neighbourObj.rotation.y = -Math.PI * 0.5; // Edge with notch pointing at camera

    neighbourObj.add(junctionBoxLabel, neighbourGLTF.scene);

    cableObj.add(sealantLabel, cableGLTF.scene);
    cableObj.rotateY(-Math.PI / 2);
    cableObj.position.x -= 0.01;

    fillerObj.add(fillerGLTF.scene);
    fillerObj.rotateY(-Math.PI / 2);

    const secondFillerObj = fillerObj.clone();
    secondFillerObj.add(coolingLabel);
    secondFillerObj.position.x += 2.05;

    // Extract materials to be able to manipulate the opacity
    const cableMaterials = new Set();
    cableGLTF.scene.traverse((child) => {
        if (child instanceof Mesh) {
            cableMaterials.add(child.material);
            child.material.transparent = true;
            child.material.opacity = 0;
        }
    });

    const neighbourMaterials = new Set();
    neighbourGLTF.scene.traverse((child) => {
        if (child instanceof Mesh) {
            neighbourMaterials.add(child.material);
            child.material.transparent = true;
            child.material.opacity = 0;
        }
    });

    const fillerMaterials = new Set();
    fillerGLTF.scene.traverse((child) => {
        if (child instanceof Mesh) {
            fillerMaterials.add(child.material);
            child.material.transparent = true;
            child.material.opacity = 0;
        }
    });

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
    const secondLabelMaterials = extractMaterials(junctionBoxLabel, sealantLabel, coolingLabel);

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
    const TIMELINE_DURATION = 11000;

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


    if (onMobile) {
        // Move camera out
        tl.add({
            targets: camera.position,
            x: 0,
            y: 1,
            z: 3,
            duration: 1000,
            update: () => camera.updateProjectionMatrix()
        }, 500);
    } else {
        // Move camera out
        tl.add({
            targets: camera.position,
            x: 0,
            y: 1.5,
            z: 6,
            duration: 1000,
            update: () => camera.updateProjectionMatrix()
        }, 500);
    }

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
    },   '+=250');

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

    // Slide the camera to the connectors
    tl.add({
        targets: camera.position,
        x: 1.04,
        duration: 1000,
        easing: 'easeInOutExpo',
        update: () => camera.updateProjectionMatrix()
    }, '-=0');

    // Slide in the other panel
    tl.add({
        targets: neighbourObj.position,
        x: 0,
        z: 0,
        y: 0,
        duration: 1000,
        easing: 'easeInOutCubic'
    }, '-=1000');

    // Fade in other panel
    tl.add({
        targets: [...neighbourMaterials],
        opacity: 1,
        duration: 250,
    }, "-=1000");

    // Fade in cable
    tl.add({
        targets: [...cableMaterials],
        opacity: 1,
        duration: 1000,
    }, '-=0');

    // Fade in filler
    tl.add({
        targets: [...fillerMaterials],
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
    }, '+=500');

    //Fade out cable
    tl.add({
        targets: [...cableMaterials],
        opacity: 0,
        duration: 250
    }, '-=0');

    //Fade out fillers
    tl.add({
        targets: [...fillerMaterials],
        opacity: 0,
        duration: 250
    }, '-=250');

    // //Slide Neighbour back out
    tl.add({
        targets: neighbourObj.position,
        x: 10,
        duration: 1000,
        easing: 'easeInCubic'
    });

    // Fade in other panel
    tl.add({
        targets: [...neighbourMaterials],
        opacity: 0,
        duration: 250,
    }, "-=250");

    // //Center camera again
    tl.add({
        targets: camera.position,
        y: 1,
        x: 0,
        z: 4,
        duration: 1000,
        easing: 'easeInOutExpo',
        update: () => camera.updateProjectionMatrix()
    }, '-=500');

    /**
     * PERFORM THE RENDERING
     */

    let animationPercentage = 0;


    const render = () => {
        requestAnimationFrame(render);

        animationPercentage = lerp(animationPercentage, scrollPercentage, 0.1); // Smooth out the mapping from scrolling
        tl.seek(animationPercentage * TIMELINE_DURATION);

        renderer.render(scene, camera);
    }

    render();
}
