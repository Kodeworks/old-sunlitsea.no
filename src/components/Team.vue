<template>
  <section>
    <h2>Our team</h2>
    <div id="carouselContainer">
      <div id="teamMemberContainer">
        <TeamMember
          v-bind:key="person.email"
          v-for="person in people"
          :name="person.name"
          :role="person.role"
          :description="person.description"
          :email="person.email"
          :image-path="person.imagePath"
          class="teamMember"
        />
      </div>
      <button id="leftButton" class="scrollButton">
        <i class="arrow left"></i>
      </button>
      <button id="rightButton" class="scrollButton">
        <i class="arrow right"></i>
      </button>
    </div>
  </section>
</template>

<script>
import TeamMember from '@/components/TeamMember';

export default {
  name: 'Team',
  components: { TeamMember },
  data() {
    return {
      people: [
        {
          name: 'Per Lindberg',
          role: 'CEO',
          email: 'per@sunlitsea.no',
          imagePath: require('@/assets/images/person.png'),
          description:
            'Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar.',
        },
        {
          name: 'Per Lindberg',
          role: 'CEO',
          email: 'per2@sunlitsea.no',
          imagePath: require('@/assets/images/person.png'),
          description:
            'Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar.',
        },
        {
          name: 'Per Lindberg',
          role: 'CEO',
          email: 'per3@sunlitsea.no',
          imagePath: require('@/assets/images/person.png'),
          description:
            'Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar.',
        },
        {
          name: 'Per Lindberg',
          role: 'CEO',
          email: 'per4@sunlitsea.no',
          imagePath: require('@/assets/images/person.png'),
          description:
            'Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar.',
        },
        {
          name: 'Per Lindberg',
          role: 'CEO',
          email: 'per5@sunlitsea.no',
          imagePath: require('@/assets/images/person.png'),
          description:
            'Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar.',
        },
        {
          name: 'Per Lindberg',
          role: 'CEO',
          email: 'per6@sunlitsea.no',
          imagePath: require('@/assets/images/person.png'),
          description:
            'Per lorem ipsum dolor sit amet consectur adsciptig et. With an exceptional great team and support from our partners we are fit for this job and ready to revolutionize ocean based floating solar.',
        },
      ],
    };
  },
  mounted() {
    let teamMembers = document.querySelectorAll('.teamMember');
    const numberOfMembers = teamMembers.length;
    let index = 1;

    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    const teamMemberContainer = document.getElementById('teamMemberContainer');

    const lastSlide = teamMembers[teamMembers.length - 1].outerHTML;
    const firstSlide = teamMembers[0].outerHTML;
    teamMemberContainer.insertAdjacentHTML('afterbegin', lastSlide);
    teamMemberContainer.insertAdjacentHTML('beforeend', firstSlide);
    teamMembers = document.querySelectorAll('.teamMember');
    teamMembers[1].scrollIntoView({ block: 'nearest' });

    const leftButtonClick = () => {
      temporarilyDisableButtons();

      index -= 1;
      if (index <= 0) {
        teamMembers[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
          teamMembers[numberOfMembers].scrollIntoView({ block: 'nearest' });
        }, 500);
        index = numberOfMembers;
      } else {
        teamMembers[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    };

    const rightButtonClick = () => {
      temporarilyDisableButtons();

      index += 1;
      if (index > numberOfMembers) {
        teamMembers[numberOfMembers + 1].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
        setTimeout(() => {
          teamMembers[1].scrollIntoView({ block: 'nearest' });
        }, 500);
        index = 1;
      } else {
        teamMembers[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    };

    const temporarilyDisableButtons = () => {
      leftButton.disabled = true;
      rightButton.disabled = true;
      setTimeout(() => {
        leftButton.disabled = false;
        rightButton.disabled = false;
      }, 500);
    };

    leftButton.addEventListener('click', leftButtonClick);
    rightButton.addEventListener('click', rightButtonClick);
  },
};
</script>

<style scoped lang="scss">
section {
  @apply px-8 py-12 lg:px-24 lg:pt-0 flex flex-col lg:h-auto;
  h2 {
    @apply text-4xl font-heading md:text-5xl;
  }
}

#teamMemberContainer {
  overflow-x: auto;
  display: flex;
  width: 30rem;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;

  @media only screen and (max-width: 800px) {
    width: 70%;
  }
}

.teamMember {
  min-width: 100%;
}

.scrollButton {
  position: absolute;
  height: 50%;
  top: 0;
  bottom: 0;
  width: 3em;
  transform: translateY(45%);
  touch-action: manipulation;
  outline: none;
}

#carouselContainer {
  position: relative;
  justify-content: center;
  display: flex;
  height: 30rem;
}

#leftButton {
  left: 0;
}

#rightButton {
  right: 0;
}

.arrow {
  display: inline-block;
  border-right: 3px solid rgba(150, 150, 150, 0.5);
  border-bottom: 3px solid rgba(150, 150, 150, 0.5);
  width: 50px;
  height: 50px;
}

.arrow:hover {
  border-right: 3px solid rgba(150, 150, 150, 0.8);
  border-bottom: 3px solid rgba(150, 150, 150, 0.8);
}

.arrow.left {
  transform: rotate(-225deg);
}

.arrow.right {
  transform: rotate(-45deg);
}
</style>
