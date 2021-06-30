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
      padding-top: 10rem;
      padding-bottom: 10rem;
    }

    @media only screen and (max-height: 800px) {
      padding-top: 8rem;
      padding-bottom: 8rem;
    }

     @media only screen and (max-height: 1000px) and (orientation: landscape) {
          padding-top: 0;
          padding-bottom: 0;
    }    
  }

  #roadmapSection {
    overflow-x: hidden;
  }

</style>