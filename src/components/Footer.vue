<template>
  <footer>
    <div>
      <img src="@/assets/logo.svg" alt="Logo"/>
    </div>

    <div>
      <p>Established in 2019</p>
      <a href="https://sunlitsea.no/">sunlitsea.no</a>
    </div>

    <div>
      <address>
        <div>
          <a href="mailto:per@sunlitsea.no">per@sunlitsea.no</a>
          <br/>
          <a href="tel:+4797079523">+47 970 79 523</a>
        </div>
        <div>
          <a href="mailto:eirik@sunlitsea.no">eirik@sunlitsea.no</a>
          <br/>
          <a href="tel:+4741670269">+4741670269</a>
        </div>
      </address>
    </div>

    <div>
      <span>Fjordgata 30<br/>7010 Trondheim<br/>Norway</span>
    </div>

    <div>&copy; SunlitSea AS 2021</div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped lang="scss">
footer {
  @apply grid grid-cols-1 gap-4 p-8 text-white bg-black md:grid-cols-2 lg:grid-cols-4 sm:p-16 lg:px-24;

  div:nth-child(1) {
    img {
      @apply w-56 align-middle;
    }
  }

  a {
    @apply not-italic no-underline;
  }

  div:last-child {
    @apply lg:col-start-2;
  }

  address {
    div:first-child {
      @apply mb-2;
    }
  }
}
</style>