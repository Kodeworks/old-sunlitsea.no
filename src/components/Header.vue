<template>
  <header>
    <div>
      <img src="../assets/logo.svg" alt="Sunlit Sea logo">
    </div>

    <div>
      <h1>
        Floating <span>Solar</span> Solutions
      </h1>

      <p>
        Sunlit Sea is a technology provider to the floating solar industry.
        Our goal is to achieve the lowest cost for floating solar electricity
        which is achieved by combining prefabrication and a very clever design
      </p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped lang="scss">
header {
  @apply flex flex-col h-full p-10 text-white;

  /* Logo container*/
  div:first-child {
    @apply flex items-center h-8;

    img {
      @apply h-5;
    }
  }

  /* Text container */
  div:last-child {
    @apply mt-auto mb-8 space-y-4 md:space-y-8 md:px-20 md:mb-44;

    h1 {
      @apply text-6xl font-semibold font-heading;

      span {
        @apply text-sls-yellow;
      }
    }

    p {
      @apply max-w-screen-lg text-xl;
    }
  }
}
</style>
