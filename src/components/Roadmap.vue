<template>
  <section>
    <RoadmapSVG/>
  </section>
</template>

<script>
import RoadmapSVG from "@/components/RoadmapSVG";
export default {
  name: "Roadmap",
  components: {RoadmapSVG}
}
</script>

<style scoped lang="scss">
  section {
    @apply h-screen overflow-x-scroll p-40 bg-black;

    img {
      @apply h-full max-w-none;
    }
  }
</style>