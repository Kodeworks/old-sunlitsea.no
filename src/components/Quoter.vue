<template>
  <section>
    <h2>Get a quote for your floating solar installation</h2>
    <a href="https://quote.sunlitsea.no">
      If you are curious to find out if our floating solar installations can be of value
      to you: check out the beta version of our Smart Quoter!
      <ArrowLeft />
    </a>
      <img
        src="../assets/images/quoter.jpg"
        alt="A deployed floating solar installation."
      />
  </section>
</template>

<script>
import ArrowLeft from '@/components/ArrowLeft';

export default {
  name: 'Quoter',
  components: { ArrowLeft },
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-bottom: 4rem;
  padding-top: 4rem;
  padding-left: 2rem;
  padding-right: 2rem;
  @apply lg:pl-32 lg:pr-32;

  h2 {
    @apply text-4xl lg:text-7xl text-left lg:w-7/12;
    align-self: end;
    color: #000;
  }

  a {
    @apply block text-lg lg:text-2xl;
    @apply lg:w-1/2 text-left pt-4 pl-16;
    @apply pb-6;
    align-self: start;
    svg {
      @apply ml-2 h-4 inline-block align-baseline;
    }
  }

  img {
    @apply lg:w-8/12 self-center;
  }

}

</style>
