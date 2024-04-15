<template>
  <div class="Page">
    <canvas
      ref="canvas"
      class="Page-canvas"
    />
    <article>
      <h1>Envmap</h1>
      <nuxt-link to="/">
        Go to home
      </nuxt-link>
    </article>
  </div>
</template>

<script setup>
import { RESOURCES_TYPES } from '../../src/runtime/utils/types'
import { AgXToneMapping } from 'three'

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

  corgi.camera.position.set(0, 0, 5)
  corgi.addOrbitControls()

  corgi.renderer.toneMapping = AgXToneMapping

  resources.add(
    [
      useResource('envmap', '/envmap.exr', RESOURCES_TYPES.EXR),
    ]
  )

  resources.get('envmap').then((resource) => {
    corgi.addEnvmap(resource.asset)
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

.MouseHelper {
  position: absolute;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;

  gap: 10px;
  padding: 20px 30px 30px 30px;

  background-color: #3b3b3b;


  font-size: 16px;
  color: white;

  top: 0;
  left: 0;

  z-index: 1;
}
</style>
