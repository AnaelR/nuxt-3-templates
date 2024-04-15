<template>
  <div class="Page">
    <canvas
      ref="canvas"
      class="Page-canvas"
    />
    <article>
      <h1>Texture</h1>
      <nuxt-link to="/">
        Go to home
      </nuxt-link>
    </article>
  </div>
</template>

<script setup>
import { RESOURCES_TYPES } from '../../src/runtime/utils/types'
import { AgXToneMapping, DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three'

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
      useResource('envmap', '/envmap.exr', RESOURCES_TYPES.EXR),
      useResource('akaru', '/akaru-texture.png', RESOURCES_TYPES.IMAGE),
    ]
  )

  resources.get(['envmap', 'akaru']).then((resources) => {
    const [envmapResource, resource] = resources

    corgi.addEnvmap(envmapResource.asset)

    const geometry = new PlaneGeometry(10, 10)
    const material = new MeshStandardMaterial({
      map: resource.asset,
      side: DoubleSide,
    })
    const plane = new Mesh(geometry, material)
    corgi.scene.add(plane)
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

.Page-canvas {
  position: absolute;
  width: 100% !important;
  height: 100% !important;

  top: 0;
  left: 0;

  z-index: 0;
}
</style>
