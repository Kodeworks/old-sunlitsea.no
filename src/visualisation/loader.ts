import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

const loader: GLTFLoader = (() => {
    return new GLTFLoader();
})();

/**
 * Load the 3D models from .glb files.
 * @returns [Bottom, SolarPanel, Top]
 */
export default async (...modelPaths: Array<string>): Promise<Array<GLTF>> => {
    const GLTFs = await Promise.all(modelPaths.map(s => loader.loadAsync(`${process.env.BASE_URL}models/${s}`))); // can't use function reference due to JS quirks

    GLTFs.forEach(gltf => {
        gltf.scene.traverse(object => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;

                // @ts-ignore
                if (object.material.map) object.material.map.anisotropy = 16;
            }
        })
    })

    return GLTFs;
};