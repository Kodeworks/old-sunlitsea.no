<template>
  <section>
    <h2>Our Partners</h2>
    <div>
      <img v-for="img in images" v-bind:key="img.src" :src="img.src" :alt="img.alt">
    </div>
  </section>
</template>

<script>
export default {
  name: "Partners",
  data() {
    return {
      images: [
        {
          src: require("@/assets/partners/forskningsradet.svg"),
          alt: "Forskningsrådet"
        },
        {
          src: require("@/assets/partners/ife.png"),
          alt: "IFE"
        },
        {
          src: require("@/assets/partners/oslomet.png"),
          alt: "Oslo Met"
        },
        {
          src: require("@/assets/partners/stadtTowingTank.png"),
          alt: "Stadt Towing Tank"
        },
        {
          src: require("@/assets/partners/accura.png"),
          alt: "Accura"
        },
        {
          src: require("@/assets/partners/asherGroup.png"),
          alt: "Asher Group"
        },
        {
          src: require("@/assets/partners/ceiia.png"),
          alt: "Ceiia"
        },
        {
          src: require("@/assets/partners/innovationNorway.png"),
          alt: "Innovation Norway"
        },
        {
          src: require("@/assets/partners/kodeworks.png"),
          alt: "Kodeworks"
        },
        {
          src: require("@/assets/partners/multiconsult.png"),
          alt: "Multiconsult"
        },
        {
          src: require("@/assets/partners/uio.png"),
          alt: "UiO"
        },
        {
          src: require("@/assets/partners/solstrom.jpg"),
          alt: "Solstrom"
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
section {
  @apply px-8 py-12 lg:px-24 mb-32;

  h2 {
    @apply font-heading text-5xl mb-12 text-center;
  }

  div {
    @apply flex justify-around flex-wrap px-32;

    img {
      @apply h-10 my-6 mx-2;
    }
  }
}
</style>