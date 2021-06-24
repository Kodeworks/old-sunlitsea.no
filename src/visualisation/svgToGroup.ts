import {DoubleSide, Group, Mesh, MeshBasicMaterial, ShapeGeometry} from "three";
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

        const shapes = SVGLoader.createShapes(p);

        for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new ShapeGeometry(shape);
            const mesh = new Mesh(geometry, material);
            group.add(mesh);
        }
    });
    return group;
};