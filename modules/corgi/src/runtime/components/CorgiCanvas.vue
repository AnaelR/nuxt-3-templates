<template>
  <canvas
    ref="el"
    class="CorgiCanvas"
  />
</template>

<script setup>
import { RESOURCES_TYPES } from '../utils/types';

// Props
const props = defineProps({
  model: String,
  envmap: String,
  haveOrbitControls: Boolean
})

// Data
const el = ref()
const resourcesName = ref([])

const resources = useResources()

let corgi = null

// Lifecycle
onMounted(() => {
  corgi = useCorgi(el.value)

  if (props.model) {
    addModel(props.model)
  }

  if (props.envmap) {
    addEnvmap(props.envmap)
  }


  manageResources()
})

onUnmounted(() => {
  corgi?.unmount()
})

const manageResources = () => {
  resources.get(resourcesName).then((loadedResources) => {
  })
}

const addModel = (modelPath) => {
  console.log('model', modelPath);
  resources.add(useResource('model', modelPath, RESOURCES_TYPES.GLTF))
  resourcesName.push('model')
}

const addEnvmap = (envmapPath) => {

}

</script>

<style scoped>
.CorgiCanvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
