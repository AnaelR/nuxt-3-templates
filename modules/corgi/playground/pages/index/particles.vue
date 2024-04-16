<template>
  <div class="Page">
    <canvas
      ref="canvas"
      class="Page-canvas"
    />
  </div>
</template>

<script setup>
import { AdditiveBlending, AgXToneMapping, BufferGeometry, Color, Points, ShaderMaterial } from 'three';
import { RESOURCES_TYPES } from '../../../src/runtime/utils/types';
import { getPositionFromMesh } from '../../../src/runtime/utils/gltf';

// Data
const canvas = ref()
const resources = useResources()

/**
 * @type {import('../../src/runtime/composables/corgi').UseCorgi}
 */
let corgi = null

// Lifecycle
onMounted(() => {

  corgi = useCorgi(canvas.value)

  corgi.camera.position.set(0, 0, 3)
  corgi.addOrbitControls()

  corgi.renderer.toneMapping = AgXToneMapping

  const particles = {
    maxCount: 0,
    points: null,
    material: null,
  }

  resources.add([
    useResource('fragment', import('@/assets/points.frag'), RESOURCES_TYPES.GLSL),
    useResource('vertex', import('@/assets/points.vert'), RESOURCES_TYPES.GLSL),
    useResource('model', 'suzanne.glb', RESOURCES_TYPES.GLTF),
  ])

  resources.getAll().then(resources => {
    const [fragmentResource, vertexResource, modelResource] = resources

    const suzanne = modelResource.asset.scene.getObjectByName("Suzanne")

    const position = getPositionFromMesh(suzanne)

    const baseGeometry = {}
    baseGeometry.instance = new BufferGeometry()
    baseGeometry.instance.setAttribute('position', position)
    baseGeometry.instance.setIndex(null)
    baseGeometry.count = baseGeometry.instance.attributes.position.count


    particles.material = new ShaderMaterial(
      {
        fragmentShader: fragmentResource.asset,
        vertexShader: vertexResource.asset,
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
        uniforms: {
          uSize: { value: 20 },
          uColor: { value: new Color("#798E7B") }
        }
      }
    )

    particles.points = new Points(baseGeometry.instance, particles.material)
    corgi.scene.add(particles.points)
  })



})

onUnmounted(() => {
  corgi?.unmount()
})

</script>

<style scoped>
.Page-canvas {
  position: absolute;
  width: 100% !important;
  height: 100% !important;

  top: 0;
  left: 0;

  z-index: 0;
}
</style>
