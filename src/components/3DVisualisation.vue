<template>
  <section id="container">
    <div id="three" class="sticky"></div>
    <Loader id="loader" />
  </section>
</template>

<script>
import script from '@/visualisation/script.ts';
import Loader from './Loader.vue';

export default {
  components: { Loader },
  name: '3DVisualisation',
  mounted() {
    script('#container');

    window.addEventListener('scroll', controlLoaderOpacity);

    window.addEventListener('load', () => {
      document.getElementById('loader').style.display = 'none';
      window.removeEventListener('scroll', controlLoaderOpacity);
    });
  },
};

const controlLoaderOpacity = () => {
  const loader = document.getElementById('loader');
  const rect = document.getElementById('container').getBoundingClientRect();

  if (
    rect.top < window.innerHeight / 2 &&
    rect.bottom > window.innerHeight / 2
  ) {
    const value = ((window.innerHeight / 2 - rect.top) / rect.height - 0.5) * 2;
    const alpha = 1 - Math.pow(value, 6);

    loader.style.opacity = alpha;
  } else {
    loader.style.opacity = 0;
  }
};
</script>

<style scoped lang="scss">
section {
  @apply z-10;
  height: 500vh;
  div {
    @apply sticky top-0 z-0 h-screen;
  }
}

#loader {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  opacity: 0;
}
</style>
