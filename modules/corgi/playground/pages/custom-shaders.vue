<template>
  <div class="Page">
    <canvas
      ref="canvas"
      class="Home-canvas"
    />
    <article>
      <h1>Shaders</h1>
      <nuxt-link to="/">
        Go to home
      </nuxt-link>
    </article>
  </div>
</template>

<script setup>
import { RESOURCES_TYPES } from '../../src/runtime/utils/types'
import { AgXToneMapping, Color, DoubleSide, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry } from 'three'
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
.Page {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;

  box-sizing: border-box;

  padding-top: 2rem;

  z-index: 0;
}

.Page article {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  gap: 10px;

  z-index: 1;
}

.Home-canvas {
  position: absolute;
  width: 100% !important;
  height: 100% !important;

  top: 0;
  left: 0;

  z-index: 0;
}
</style>
