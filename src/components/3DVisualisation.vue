<template>
  <section id="container">
    <div id="three" class="sticky"></div>
  </section>
</template>

<script>
export default {
  name: "3DVisualisation"
}
</script>

<style scoped lang="scss">
section {
  @apply z-10 h-3d-vis;

  div {
    @apply sticky top-0 z-0 h-screen;
  }
}
</style>