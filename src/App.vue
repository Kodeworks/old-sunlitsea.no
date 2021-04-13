<template>
  <Header/>
  <PreviewInstallation/>
  <Visualisation/>
  <ManufacturingVideo/>
</template>

<script>
import Header from '@/components/Header.vue'
import PreviewInstallation from "@/components/PreviewInstallation";
import Visualisation from '@/components/3DVisualisation'
import ManufacturingVideo from "@/components/ManufacturingVideo";

export default {
  name: 'App',
  components: {
    Header,
    PreviewInstallation,
    Visualisation,
    ManufacturingVideo
  }
}
</script>

<style>

</style>
