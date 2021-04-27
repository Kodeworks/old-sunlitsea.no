import {
    // AxesHelper,
    PCFSoftShadowMap,
    PerspectiveCamera,
    ReinhardToneMapping,
    Scene,
    Vector3,
    WebGLRenderer
} from "three";

/**
 * Initial ThreeJS setup
 * - Renderer
 * - Container
 * - Scene & Camera
 */
export default function (): [Scene, PerspectiveCamera, WebGLRenderer] {
    /**
     * SCENE AND CAMERA
     */
    const scene = new Scene();
    const camera = new PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        5000
    );

    // const axesHelper = new AxesHelper(500);
    // scene.add(axesHelper);

    camera.position.set(2.5, 1, 2.5);

    //const cameraTarget = new Vector3(0, 0, 0);
    const cameraTarget = new Vector3(0, 0, 0);

    camera.lookAt(cameraTarget);

    /**
     * CONTAINER AND RENDERER
     */
    const container = document.querySelector("#three")!;

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Shadow setup
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = ReinhardToneMapping;

    container.appendChild(renderer.domElement);

    /**
     * Resize Three JS rendering on window resizing.
     */
    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);

        camera.aspect = container.clientWidth / container.clientHeight;

        camera.updateProjectionMatrix();
    }, { passive: true })

    return [scene, camera, renderer];
}