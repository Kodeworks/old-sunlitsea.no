<template>
  <section id="roadmapSection">
    <RoadmapSVG />
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
    // @apply h-screen overflow-x-scroll py-72 pl-48 lg:pl-96 bg-black;

    height: 100vh;
    padding-top: 18rem;
    padding-bottom: 18rem;
    background-color: black;

    @media only screen and (max-height: 1000px) {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }

    @media only screen and (max-height: 800px) {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  }

  #roadmapSection {
    overflow-x: hidden;
  }

</style>