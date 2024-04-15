<template>
  <main class="Home">
    <h1>CorGI 🐶</h1>
    <ul>
      <li>
        <nuxt-link to="/envmap">
          Envmap
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/models">
          GLTF models
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/texture">
          Texture
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/shaders">
          Shaders
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/custom-shaders">
          Custom shaders
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script setup>

// Lifecycle
onMounted(() => {
})

</script>

<style scoped>
.Home {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;

  box-sizing: border-box;

  padding-top: 2rem;

  z-index: 0;

  ul {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: flex-start;

    margin-top: 50px;
    gap: 30px;

    width: 200px;

    font-size: 18px;
    text-align: left;
  }

  a {
    height: 20px;
    text-decoration: none;

    &:hover {
      color: violet;
    }
  }
}
</style>
