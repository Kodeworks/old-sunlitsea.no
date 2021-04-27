import { Group, Material, Mesh } from "three";

/**
 * Get materials from group(s). Useful when working with e.g. opacities.
 * @param groups The groups from which to extract materials.
 */
export default (...groups: Array<Group>): Array<Material> =>
    groups
        .map(label => label.children.filter(child => child instanceof Mesh))
        .reduce((prev, curr) => [...prev, ...curr], [])
        .map(e => (e as Mesh).material as Material)

