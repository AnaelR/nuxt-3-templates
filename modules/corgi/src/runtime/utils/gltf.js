
import { Float32BufferAttribute } from 'three';

/**
 *
 * @param {import('three').Mesh} mesh
 * @returns {import('three').Float32BufferAttribute}
 */
export const getPositionFromMesh = (mesh) => {
  const position = mesh.geometry.attributes.position

  let maxCount = position.count

  const originalArray = position.array
  const newArray = new Float32Array(maxCount * 3)

  for (let i = 0; i < maxCount; i++) {
    const i3 = i * 3

    if (i3 < originalArray.length) {
      newArray[i3 + 0] = originalArray[i3 + 0]
      newArray[i3 + 1] = originalArray[i3 + 1]
      newArray[i3 + 2] = originalArray[i3 + 2]
    } else {
      newArray[i3 + 0] = 0
      newArray[i3 + 1] = 0
      newArray[i3 + 2] = 0
    }
  }

  return new Float32BufferAttribute(newArray, 3)
}
