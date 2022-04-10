<script setup>
import * as Cesium from 'cesium'
// import * as widgets from 'cesium/Widgets/widgets.css'
import {onMounted} from 'vue'
onMounted(()=>{
    const viewer = new Cesium.Viewer('cesiumContainer')
})
</script>
<template>
  <div id="cesiumContainer"></div>
</template>
<script>
export default {}
</script>

<style>
</style>