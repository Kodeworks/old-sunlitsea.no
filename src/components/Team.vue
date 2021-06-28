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
          imagePath: require('@/assets/images/cv_per.jpg'),
          description:
            'Per is CEO and one of two founders of Sunlit Sea. From more than 10 years of experience from the whole value chain of solar electricity, Per has acquired both in depth knowledge and holistic perspective in the solar field.',
        },
        {
          name: 'Eirik Larsen',
          role: 'Tech lead IT',
          email: 'eirik@sunlitsea.no',
          imagePath: require('@/assets/images/cv_eirik.jpg'),
          description:
            'Eirik is leading the IT software and hardware development projects in Sunlit Sea, and has co-founded Sunlit Sea together with Per. He has 16 years of experience as a programmer, and is also the CEO of Kodeworks.',
        },
        {
          name: 'Bjørn Riise',
          role: 'Tech lead hydrodynamics',
          email: 'bjorn@sunlitsea.no',
          imagePath: require('@/assets/images/cv_bjorn.jpg'),
          description:
            'Bjørn is a hydrodynamics expert with more than 12 years of experience from DNV. He runs research and sertification efforts in Sunlit Sea.',
        }
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

    // Add copies at start and end of list, for smooth transitions
    const lastSlide = teamMembers[teamMembers.length - 1].outerHTML;
    const firstSlide = teamMembers[0].outerHTML;
    teamMemberContainer.insertAdjacentHTML('afterbegin', lastSlide);
    teamMemberContainer.insertAdjacentHTML('beforeend', firstSlide);
    teamMembers = document.querySelectorAll('.teamMember');

    // scroll to the first element (it would otherwise start at the copy added in front)
    const teamMemberWidth = teamMembers[0].getBoundingClientRect().width;
    const margin = window
      .getComputedStyle(teamMembers[0], null)
      .getPropertyValue('margin-right');
    const parsedMargin = parseInt(margin, 10);
    teamMemberContainer.scroll({ left: teamMemberWidth + parsedMargin }); // 32 is 2rem padding

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

    const onResize = () => {
      const rect = teamMembers[index].getBoundingClientRect();
      const containerRect = teamMemberContainer.getBoundingClientRect();

      const difference = containerRect.left - rect.left;
      const targetScroll = teamMemberContainer.scrollLeft - difference;
      teamMemberContainer.scroll({ left: targetScroll });
    };

    leftButton.addEventListener('click', leftButtonClick);
    rightButton.addEventListener('click', rightButtonClick);
    window.addEventListener('resize', onResize);
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
  -webkit-tap-highlight-color: transparent;
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
