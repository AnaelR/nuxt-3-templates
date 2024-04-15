<template>
  <div class="Page">
    <canvas
      ref="canvas"
      class="Page-canvas"
    />
  </div>
</template>

<script setup>
import { RESOURCES_TYPES } from '../../src/runtime/utils/types'
import { AgXToneMapping, Color, DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { gsap } from 'gsap'
// Did not find a better way to import in vanilla
import { CustomShaderMaterial } from 'three-custom-shader-material/dist/vanilla-a1542be4.cjs.prod'

// Data
const canvas = ref()

/**
 * @type {import('../../src/runtime/composables/corgi').UseCorgi}
 */
let corgi = null
const resources = useResources()


// Lifecycle
onMounted(() => {

  corgi = useCorgi(canvas.value)

  corgi.camera.position.set(0, 0, 10)
  corgi.addOrbitControls()

  corgi.renderer.toneMapping = AgXToneMapping

  resources.add(
    [
      useResource('custom-fragment', import('@/assets/custom-fragment.glsl'), RESOURCES_TYPES.GLSL),
      useResource('custom-vertex', import('@/assets/custom-vertex.glsl'), RESOURCES_TYPES.GLSL),
    ]
  )

  resources.get(['custom-fragment', 'custom-vertex']).then((resources) => {
    const [fragmentShader, vertexShader] = resources
    const geometry = new PlaneGeometry(10, 10)
    const material = new CustomShaderMaterial({
      baseMaterial: new MeshBasicMaterial({
        color: new Color("green"),
      }),
      uniforms: {
        uTime: { value: 0 }
      },
      fragmentShader: fragmentShader.asset,
      vertexShader: vertexShader.asset,
      side: DoubleSide,
    })

    const plane = new Mesh(geometry, material)
    corgi.scene.add(plane)

    gsap.ticker.add((deltaTime) => {
      material.uniforms.uTime.value += deltaTime * 0.001
    })
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
