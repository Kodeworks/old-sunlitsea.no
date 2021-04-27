<template>
  <section>
    <h2>Floating Solar Solutions</h2>
    <p>Our goal is to achieve the lowest cost for floating solar electricity which is achieved by combining
      prefabrication and a very clever design</p>
    <div>
      <div>
        <img src="../assets/images/previewImage1.png" alt="A folded stack of floaters on the water."/>
      </div>
      <div>
        <img src="../assets/images/previewImage2.png" alt="A grid of floaters on the water."/>
        <a href="https://iiot.kodeworks.no">Preview a virtual installation
          <ArrowLeft/>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import ArrowLeft from "@/components/ArrowLeft";

export default {
  name: "PreviewInstallation",
  components: {ArrowLeft}
}
</script>

<style scoped lang="scss">
section {
  @apply px-8 py-12 space-y-8 md:h-screen lg:px-24 lg:pt-0 lg:pb-0 lg:grid-cols-2 lg:space-y-0 flex flex-col justify-center;

  h2 {
    @apply text-5xl text-center;
    color: #4B5494;
  }

  h2, p {
    @apply w-2/3 mx-auto text-center pt-4;
  }

  p {
    @apply pb-32 lg:max-w-2xl;
  }

  & > div {
    @apply flex mt-auto mx-auto;

    & div:first-child {
      @apply pr-6 pb-24;
    }

    & div:last-child {
      @apply self-end pl-6;

      a {
        @apply block mt-2;

        svg {
          @apply ml-2 h-3 inline-block align-baseline;
        }
      }
    }
  }
}
</style>