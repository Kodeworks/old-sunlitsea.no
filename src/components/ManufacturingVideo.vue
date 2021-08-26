<template>
  <section>
    <iframe
        src="https://www.youtube-nocookie.com/embed/Bv4ve25-6_g?modestbranding=1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    />
    <div>
      <h2>
        From manufacturing to deployment
      </h2>
      <p>
        Our quick manufacturing and deployment process is what makes Sunlit Sea stand out.
        By preassembling the floats they can easily be transported and deployed on
        water. This leads to easy logistics and low capital binding.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "ManufacturingVideo"
}
</script>

<style scoped lang="scss">
section {
  @apply px-8 py-12 space-y-8 md:h-screen lg:px-24 lg:pb-0 lg:pt-0 lg:grid lg:grid-cols-2 lg:gap-32 lg:space-y-0;

  div {
    @apply space-y-4 md:space-y-8 lg:self-center;

    h2 {
      @apply text-4xl font-heading md:text-5xl;
    }

    p {
      @apply text-xl;
    }
  }

  iframe {
    @apply self-center w-full h-1/3 md:h-2/3;
  }
}
</style>