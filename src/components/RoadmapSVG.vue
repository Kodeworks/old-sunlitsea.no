<template>
  <div id="imageContainer">
    <img
      class="roadmapItem"
      id="roadmapImage"
      src="../assets/roadmap_image_larger.png"
      alt="Roadmap Image"
    />
    <img
      class="roadmapItem"
      id="roadmapLine"
      src="../assets/roadmap_line_larger.png"
      alt="Roadmap Line"
    />
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
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      var mySVG = document.getElementById('roadmapImage');
      mySVG.setAttribute('viewBox', '0 0 2850 346');
    }

    function findImageWidth() {
      const image = document.getElementById('roadmapImage');
      console.log(image.getBoundingClientRect().width);
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
      easing: function() {
        return function(t) {
          return Math.pow(t, 1.01);
        };
      },
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

    function updateYellowLineTarget() {
      
    }

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
  // white-space: nowrap;
  // clip-path: url(#clipPath);
}

#roadmapLine {
  position: absolute;
  height: 100%;
  // white-space: nowrap;
  clip-path: url(#clipPath);
}

#clip {
  position: absolute;
  height: 100%;
  // width: 900px;
}

#clipRect {
  position: absolute;
  height: 100%;
  // width: 100%;
}

#clipPath {
  position: absolute;
  height: 100%;
  width: 100%;
}

// .roadmapItem {
//   @media only screen and (max-width: 800px) {
//     transform: translateX(-400px);
//   }
// }

#titleText {
  @media only screen and (max-width: 800px) {
    transform: scale(0.4);
  }
}
</style>
