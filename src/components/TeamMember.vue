<template>
  <article>
    <div>
      <div>
        <img :src="imagePath" :alt="'Portrait of ' + name"/>
      </div>

      <div>
        <span>{{ name }}</span>
        <small>{{ role }}</small>
        <a :href="'mailto:' + email">{{ email }}</a>
      </div>
    </div>

    <div>
      <p>{{ description }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: "TeamMember",
  // NB: image-path is converted to imagePath to make it a valid JS variable
  props: ['name', 'role', 'email', 'image-path', 'description']
}
</script>

<style scoped lang="scss">
article {
  @apply my-auto flex flex-col flex-shrink-0 flex-grow-0 mr-8;
  flex-basis: 25%;

  // Image + Name/role
  div:first-child {
    @apply flex flex-grow-0;

    // Image container
    div:first-child {
      @apply flex-auto h-72 pr-4 pb-4;

      img {
        @apply object-cover h-full w-full;

        // Only supported in Chrome as of now, but adding for those who use that.
        aspect-ratio: 1/1;
      }
    }

    // Name/role
    div:nth-child(2) {
      span {
        @apply font-normal;
      }

      small, a {
        @apply text-gray-600;
      }

      span, small, a {
        @apply block;
      }
    }

    // Paragraph
    div:nth-child(3) {
    }
  }

  p {
    @apply block flex-grow-0;
  }
}
</style>