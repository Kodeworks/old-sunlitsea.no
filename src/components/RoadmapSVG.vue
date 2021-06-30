<template>
  <div id="imageContainer">
    <picture>
      <source
        srcset="../assets/roadmap_image_larger.png"
        media="(min-width: 1000px)"
      />
      <img
        id="roadmapImage"
        class="roadmapItem"
        src="../assets/roadmap_image_mobile.png"
      />
    </picture>
    <picture>
      <source
        srcset="../assets/roadmap_line_larger.png"
        media="(min-width: 1000px)"
      />
      <img
        id="roadmapLine"
        class="roadmapItem"
        src="../assets/roadmap_line_mobile.png"
      />
    </picture>
    <svg id="clip">
      <clipPath id="clipPath">
        <rect
          id="clipRect"
          width="650"
          height="400"
          style="fill:rgb(255,255,255);stroke-width:3;stroke:rgb(0,0,0)"
        />
      </clipPath>
    </svg>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import { MathUtils } from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import _ from 'lodash';

const lerp = MathUtils.lerp;

export default {
  name: 'RoadmapSVG',
  mounted() {
    function findImageWidth() {
      const image = document.getElementById('roadmapImage');
      return image.getBoundingClientRect().width;
    }

    function calculateScrollPercentage() {
      const imageWidth = findImageWidth();
      const ww = window.innerWidth;

      return imageWidth - ww;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.roadmapItem', {
      x: () => -calculateScrollPercentage(), // Edit this to decide how far it will scroll before going vertically again
      ease: 'easeInOutSine',
      scrollTrigger: {
        trigger: '#roadmapSection',
        start: 'top top',
        end: '+5000',
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: ({ progress }) => animateYellowLine(progress),
      },
    });

    const TIMELINE_DURATION = 1000;

    function animateYellowLine(progress) {
      scrollProgress = progress;
    }

    const tl = anime.timeline({
      easing: 'easeOutSine',
      duration: TIMELINE_DURATION,
      autoplay: false,
    });

    document.getElementById('roadmapImage').onload = () => {
      tl.add({
        targets: '#clipRect',
        width: () => findImageWidth(),
        duration: 1000,
      });
    };

    let scrollProgress = 0;
    let animationPercentage = 0;

    const render = _.debounce(function() {
      requestAnimationFrame(render);

      animationPercentage = lerp(animationPercentage, scrollProgress, 0.1);
      tl.seek(animationPercentage * TIMELINE_DURATION);
    }, 10);

    render();

    function updateYellowLineTarget() {}

    window.addEventListener('resize', calculateScrollPercentage);
    window.addEventListener('resize', updateYellowLineTarget);
  },
};
</script>

<style scoped lang="scss">
#imageContainer {
  height: 100%;
  width: 9999px;
  position: relative;
}

#roadmapImage {
  position: absolute;
  height: 100%;
}

#roadmapLine {
  position: absolute;
  height: 100%;
  clip-path: url(#clipPath);
}

#clip {
  position: absolute;
  height: 100%;
}

#clipRect {
  position: absolute;
  height: 100%;
}

#clipPath {
  position: absolute;
  height: 100%;
  width: 100%;
}

#titleText {
  @media only screen and (max-width: 800px) {
    transform: scale(0.4);
  }
}
</style>
