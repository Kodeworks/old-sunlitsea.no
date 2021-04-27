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
    @apply h-screen overflow-x-scroll py-72 pl-48 lg:pl-96 bg-black;

    svg {
      @apply max-w-none h-full;
    }
  }
</style>