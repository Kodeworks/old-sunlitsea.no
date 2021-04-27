<template>
  <section>
    <h2>Our team</h2>
    <div>
      <TeamMember v-bind:key="person.email" v-for="person in people" :name="person.name" :role="person.role"
                  :description="person.description" :email="person.email"
                  :image-path="person.imagePath"/>
    </div>
  </section>
</template>

<script>
import TeamMember from "@/components/TeamMember";

export default {
  name: "Team",
  components: {TeamMember},
  data() {
    return {
      people: [
        {
          name: "Per Lindberg",
          role: "CEO",
          email: "per@sunlitsea.no",
          imagePath: require("@/assets/images/IMG_1045.jpeg"),
          description: "Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar."
        },
        {
          name: "Per Lindberg",
          role: "CEO",
          email: "per2@sunlitsea.no",
          imagePath: require("@/assets/images/IMG_1045.jpeg"),
          description: "Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar."
        },
        {
          name: "Per Lindberg",
          role: "CEO",
          email: "per3@sunlitsea.no",
          imagePath: require("@/assets/images/IMG_1045.jpeg"),
          description: "Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar."
        },
        {
          name: "Per Lindberg",
          role: "CEO",
          email: "per4@sunlitsea.no",
          imagePath: require("@/assets/images/IMG_1045.jpeg"),
          description: "Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar."
        },
        {
          name: "Per Lindberg",
          role: "CEO",
          email: "per5@sunlitsea.no",
          imagePath: require("@/assets/images/IMG_1045.jpeg"),
          description: "Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar."
        },
        {
          name: "Per Lindberg",
          role: "CEO",
          email: "per6@sunlitsea.no",
          imagePath: require("@/assets/images/IMG_1045.jpeg"),
          description: "Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar."
        },
      ]
    };
  }
}
</script>

<style scoped lang="scss">
section {
  @apply px-8 py-12 md:h-screen lg:px-24 lg:pt-0 flex flex-col h-screen;

  h2 {
    @apply text-4xl font-heading md:text-5xl;
  }

  & > div {
    @apply flex my-auto h-1/2 overflow-x-auto;
  }
}
</style>