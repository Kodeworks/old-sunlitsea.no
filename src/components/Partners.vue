<template>
  <section>
    <h2>Partners</h2>
    <div v-for="img in images" v-bind:key="img.src">
      <img :src="img.src" :alt="img.alt">
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
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
section {
  img {
    @apply h-4;
  }
}
</style>