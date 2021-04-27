import {DoubleSide, Group, Mesh, MeshBasicMaterial} from "three";
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";

const loader = new SVGLoader();

/**
 * Also makes the SVG transparent
 * @param pathToSvg The path to SVG file
 */
export default async (pathToSvg: string): Promise<Group> => {
    const group = new Group();

    const svg = await loader.loadAsync(`${process.env.BASE_URL}3dsvgs/${pathToSvg}`);
    const paths = svg.paths;

    paths.forEach(p => {
        const material = new MeshBasicMaterial({
            color: p.color,
            side: DoubleSide,
            depthWrite: false,
            transparent: true,
            opacity: 0,
        });

        p.subPaths.forEach(value => {
            const geometry = SVGLoader.pointsToStroke(value.getPoints(), p.userData!.style);
            if (geometry) {
                const mesh = new Mesh(geometry, material);
                group.add(mesh);
            }
        })
    });

    return group;
};