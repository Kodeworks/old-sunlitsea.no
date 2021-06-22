<template>
  <article>
    <div id="container">
      <div id="imageContainer">
        <img :src="imagePath" :alt="'Portrait of ' + name" />
      </div>

      <div id="nameRole">
        <span>{{ name }}</span>
        <small>{{ role }}</small>
        <a :href="'mailto:' + email">{{ email }}</a>
      </div>
    </div>

    <div>
      <p id="description">{{ description }}</p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'TeamMember',
  // NB: image-path is converted to imagePath to make it a valid JS variable
  props: ['name', 'role', 'email', 'image-path', 'description'],
};
</script>

<style scoped lang="scss">
article {
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 2rem;
  flex-basis: 25%;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#container {
  display: flex;
  flex-grow: 0;
}

#imageContainer {
  flex: 1 1 auto;
  height: 18rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#nameRole {
  span {
    font-weight: 400;
    display: block;
  }

  small,
  a {
    --tw-text-opactiy: 1;
    color: rgba(75, 85, 99, var(--tw-text-opactiy));
    display: block;
  }
}

#description {
  display: block;
  white-space: normal;
  flex-grow: 0;
}
</style>
