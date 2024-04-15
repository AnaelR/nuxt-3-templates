<template>
  <main class="Home">
    <div class="Home-side">
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
    </div>

    <NuxtPage class="Home-page" />
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
  flex-flow: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  z-index: 0;

}

.Home-side {
  max-width: 300px;

  padding: 2rem 3rem;

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
      color: #798E7B;
    }

    &.router-link-active {
      font-weight: bold;
      color: #798E7B;

    }
  }
}

.Home-page {
  width: 100%;
}
</style>
