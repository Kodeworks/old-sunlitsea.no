<template>
  <section id="container">
    <div id="three" class="sticky"></div>
  </section>
</template>

<script>
import script from "@/visualisation/script.ts";

export default {
  name: "3DVisualisation",
  mounted() {
    script("#container");
  }
}

</script>

<style scoped lang="scss">
section {
  @apply z-10;
  height: 300vh;
  div {
    @apply sticky top-0 z-0 h-screen;
  }
}
</style>