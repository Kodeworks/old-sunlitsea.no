import { Color, Scene, PointLight } from "three";

export default function (scene: Scene): [PointLight] {

    const frontMainPointLight = new PointLight(0xfcfce1);
    frontMainPointLight.position.set(-1, 2, 5);
    frontMainPointLight.intensity = 10;
    frontMainPointLight.castShadow = true;
    frontMainPointLight.shadow.bias = -0.001;

    const frontSecondaryPointLight = new PointLight(0xfffead);
    frontSecondaryPointLight.position.set(2, 2, 5);
    frontSecondaryPointLight.intensity= 2;
    frontSecondaryPointLight.castShadow = true;
    frontSecondaryPointLight.shadow.bias = -0.001;

    const backPointLight = new PointLight(0xc4f3ff);
    backPointLight.position.set(-6, 2, -5);
    backPointLight.intensity = 1;
    backPointLight.castShadow = true;
    backPointLight.shadow.bias = -0.001;

    scene.add(frontMainPointLight);
    scene.add(frontSecondaryPointLight);
    scene.add(backPointLight);

    scene.background = new Color(0x222222);

    return [frontMainPointLight];
}