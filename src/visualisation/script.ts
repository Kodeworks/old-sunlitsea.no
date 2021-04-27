import { MathUtils, Object3D, } from "three";

// Something strange with this library, but this works and is how it's supposed to be used according to the documentation.
// @ts-ignore
import anime from 'animejs/lib/anime.es.js'

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
    // replace the above with CompletePanel.glb

    // Rotate to point towards us with corner
    [topGLTF, solarPanelGLTF, bottomGLTF].forEach(GLTF => GLTF.scene.rotation.y = Math.PI / 2);

    const panelScenes = [solarPanelGLTF, topGLTF, bottomGLTF].map(e => e.scene);

    const [, spotlight] = setupLights(scene);

    /**
     * Text labels
     */

    const topLabel = await svgToGroup("top.svg");
    const middleLabel = await svgToGroup("middle.svg");
    const bottomLabel = await svgToGroup("bottom.svg");

    topLabel.scale.y *= -1;
    topLabel.scale.multiplyScalar(0.01);
    topLabel.position.y += 1.05;

    middleLabel.scale.y *= -1;
    middleLabel.scale.multiplyScalar(0.01);
    middleLabel.position.y += 1.05;

    bottomLabel.scale.y *= -1;
    bottomLabel.scale.multiplyScalar(0.01);
    bottomLabel.position.y += 1.05;

    const topObj = new Object3D();
    const middleObj = new Object3D();
    const bottomObj = new Object3D();
    const neighbourObj = new Object3D();

    // obj3d.add(group);
    //
    // scene.add(obj3d);

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

    topObj.add(topLabel, solarPanelGLTF.scene);

    middleObj.add(middleLabel, topGLTF.scene);

    bottomObj.add(bottomLabel, bottomGLTF.scene);

    neighbourObj.position.x = 10;
    neighbourObj.position.z = -10;
    neighbourObj.rotation.y = -Math.PI * 0.25; // Edge with notch pointing at camera

    neighbourObj.add(neighbourGLTF.scene);

    /**
     * Camera settings
     */

// The X axis is red. The Y axis is green. The Z axis is blue

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.minDistance = 2;
    // controls.maxDistance = 100;


    /**
     * ADD EM ALL TO THE SCENE
     */

    scene.add(topObj);
    scene.add(middleObj);
    scene.add(bottomObj);

    scene.add(neighbourObj);

    /**
     * Event handlers
     */

    const labelMaterials = extractMaterials(topLabel, middleLabel, bottomLabel);

    /**
     * SCROLL HANDLER
     */

    const _event = {
        y: 0,
        deltaY: 0
    };

    let percentage = 0;

    const parentContainer: HTMLElement = document.querySelector(containerSelector)! as HTMLElement;

    const maxHeight = parentContainer.clientHeight * 0.45;

    const onWheel = (e: WheelEvent) => {
        // Firefox doesn't want to play nice with the other kids, so they use a special DOM_DELTA_LINE instead of the standard DOM_DELTA_PIXEL.
        // Multiply by 16 to assume a line is 16 pixels high. Technically not correct, but suffices.
        if (e.deltaMode === e.DOM_DELTA_LINE) {
            _event.deltaY = (e.deltaY * 16) * -1;
        } else if (e.deltaMode === e.DOM_DELTA_PIXEL) {
            _event.deltaY = e.deltaY * -1;
        }
        _event.deltaY *= 0.5; // WOAH! Slow down cowboy

        scroll();
    }

    const scroll = () => {
        // Limit scroll top
        if ((_event.y + _event.deltaY) > 0) {
            _event.y = 0;
            // Limit scroll bottom
        } else if ((-(_event.y + _event.deltaY)) >= maxHeight) {
            _event.y = -maxHeight;
        } else {
            _event.y += _event.deltaY;
        }
    };

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
        const t = e.targetTouches[0];
        touchStartY = t.pageY;
    }

    const onTouchMove = (e: TouchEvent) => {
        const t = e.targetTouches[0];
        _event.deltaY = (t.pageY - touchStartY) * 5;
        touchStartY = t.pageY;
        scroll();
    }

    parentContainer.addEventListener("wheel", onWheel, { passive: false });
    parentContainer.addEventListener("touchstart", onTouchStart, { passive: false });
    parentContainer.addEventListener("touchmove", onTouchMove, { passive: false });

    /**
     * TIMELINE
     * From anime.js
     */
    const TIMELINE_DURATION = 6000;

    // Set up timeline
    const tl = anime.timeline({
        easing: 'easeInOutSine',
        duration: TIMELINE_DURATION,
        autoplay: false
    });

    // Spin the main panel
    tl.add({
        targets: panelScenes.map(e => e.rotation),
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
        x: 4,
        y: 2,
        z: 4,
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
        y: 0.15,
        x: 1.75,
        z: 1.75,
        duration: 400,
        update: () => camera.updateProjectionMatrix()
    }, '-=250');

    // Ad-hoc solution to tilt the camera upwards without getting in a quarrel with Señor Euler
    const camClone = camera.clone();
    camClone.position.set(2, 0.15, 2);
    camClone.lookAt(0, 0, 0);

    // Tilt the camera upwards
    tl.add({
        targets: camera.rotation,
        y: camClone.rotation.y,
        x: camClone.rotation.x,
        z: camClone.rotation.z,
        duration: 250,
        update: () => camera.updateProjectionMatrix()
    }, '-=250');

    // TODO: Fade in label about power

    // Slide the camera to the connectors
    tl.add({
        targets: camera.position,
        x: 3.00,
        z: 1.60,
        duration: 500,
    }, '-=0');

    // Slide in the other panel
    tl.add({
        targets: neighbourObj.position,
        x: 1.4,
        z: -1.4,
        y: 0,
        duration: 1000,
        easing: 'easeInOutExpo'
    }, '-=750');

    // Slide it back out
    tl.add({
        targets: neighbourObj.position,
        x: 10,
        z: -10,
        duration: 1000,
        easing: 'easeInOutExpo'
    });

    // Ad-hoc solution to tilt the camera upwards without getting in a quarrel with Señor Euler
    camClone.position.set(2.5, 1.5, 2.5);
    camClone.lookAt(0, 0, 0);

    // Move the camera up and out
    tl.add({
        targets: camera.position,
        x: 2.5,
        y: 1.5,
        z: 2.5,
        duration: 500,
        update: () => camera.updateProjectionMatrix()
    });

    // Pan camera to origo
    tl.add({
        targets: camera.rotation,
        x: camClone.rotation.x,
        y: camClone.rotation.y,
        z: camClone.rotation.z,
        duration: 500,
        update: () => camera.updateProjectionMatrix()
    }, '-=500');

    /**
     * PERFORM THE RENDERING
     */
    const render = () => {
        requestAnimationFrame(render);

        spotlight.position.set(
            camera.position.x + 5,
            camera.position.y + 5,
            camera.position.z + 5,
        );

        percentage = lerp(percentage, -_event.y, 0.20);
        tl.seek(percentage * (TIMELINE_DURATION / maxHeight));

        renderer.render(scene, camera);
    }

    render();
}
