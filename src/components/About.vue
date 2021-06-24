<template>
  <section>
    <h2>About us</h2>
    <p>
      SunlitSea was founded in March 2019 by Per Lindberg and Kodeworks AS as a
      technology provider to the floating solar industry. With a new and rapidly
      growing market, SunlitSea aims to address the potential of optimizing
      cost, longevity, power production, operation and maintenance, degradation,
      safety and decommissioning. With an exceptional great team and support
      from our partners we are fit for this job and ready to revolutionize ocean
      based floating solar.
    </p>
  </section>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 8rem;
  margin-bottom: 8rem;

  p {
    width: 33%;
    @media only screen and (max-width: 1200px) {
      width: 50%;
    }
    @media only screen and (max-width: 600px) {
      width: 90%;
    }
  }

  h2 {
    @apply text-4xl font-heading md:text-5xl mb-4;
  }
}
</style>
