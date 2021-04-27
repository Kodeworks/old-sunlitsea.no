import { Color, HemisphereLight, Scene, SpotLight } from "three";

export default function (scene: Scene): [HemisphereLight, SpotLight] {
    const hemisphereLight = new HemisphereLight(0xffeeb1, 0x080820, 4);
    scene.add(hemisphereLight);

    const spotlight = new SpotLight(0xffa95c, 4);
    spotlight.position.set(-25, 25, 25);
    spotlight.castShadow = true;
    spotlight.shadow.bias = -0.0001;
    spotlight.shadow.mapSize.width = 1024*4;
    spotlight.shadow.mapSize.height = 1024*4;
    scene.add(spotlight);

    scene.background = new Color(0xdddddd);

    return [hemisphereLight, spotlight];
}