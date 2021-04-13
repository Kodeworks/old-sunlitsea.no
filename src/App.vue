<template>
  <Header/>
  <PreviewInstallation/>
  <Visualisation/>
  <ManufacturingVideo/>
  <PrototypeVideo/>
  <Roadmap/>
  <About/>
  <Team/>
  <Partners/>
  <Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import PreviewInstallation from "@/components/PreviewInstallation";
import Visualisation from '@/components/3DVisualisation'
import ManufacturingVideo from "@/components/ManufacturingVideo";
import PrototypeVideo from "@/components/PrototypeVideo";
import Roadmap from "@/components/Roadmap";
import About from "@/components/About";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer,
    Partners,
    Team,
    About,
    Roadmap,
    Header,
    PreviewInstallation,
    Visualisation,
    ManufacturingVideo,
    PrototypeVideo
  }
}
</script>
