<template>
  <section>
    <h2>Our team</h2>
    <div v-bind:key="person.email" v-for="person in people">
      <p>{{ person.name }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Team",
  data() {
    return {
      people: [
        {
          name: "Per Lindberg",
          role: "CEO",
          email: "per@sunlitsea.no",
          imagePath: "",
          description: "Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar."
        }
      ]
    };
  }
}
</script>

<style scoped>

</style>