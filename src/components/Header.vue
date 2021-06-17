<template>
  <header>
    <video autoplay muted loop poster="../assets/images/jumbotronBackgroundVideoPoster_smaller.png">
      <source src="../assets/images/jumbotronBackgroundvideo-smaller.mp4" type="video/mp4">
    </video>

    <div>
      <img src="../assets/logo.svg" alt="Sunlit Sea logo"/>
    </div>

    <div>
      <p>
        Sunlit Sea is a technology provider to the floating solar industry.
      </p>
      <ArrowDown />
    </div>
  </header>
</template>

<script>
import ArrowDown from "@/components/ArrowDown";
export default {
  name: 'Header',
  components: {ArrowDown},
}
</script>

<style scoped lang="scss">
@keyframes upndown {
  from {
    margin-bottom: 0;
  }

  to {
    margin-bottom: -20px;
  }
}

header {
  @apply flex flex-col h-screen p-16 text-white;

  // "Background" video
  video {
    @apply absolute top-0 left-0 w-screen h-screen object-cover;

    z-index: -1;
    filter: brightness(0.5);
  }

  /* Logo container*/
  div:first-of-type {
    @apply flex items-center h-8;

    img {
      @apply h-5;
    }
  }

  /* Text container */
  div:last-child {
    @apply mt-auto flex;

    p {
      @apply max-w-screen-lg text-4xl font-heading w-2/5 mb-12;
      line-height: 1.3em;
    }

    // Arrow down
    svg {
      @apply ml-auto self-end;

      animation-name: upndown;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
      animation-direction: alternate;

      height: 2.4rem;
    }
  }
}
</style>
