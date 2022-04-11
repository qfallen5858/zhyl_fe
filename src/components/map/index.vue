<script setup>
import { useStore } from 'vuex'
import * as Cesium from 'cesium'
// import * as widgets from 'cesium/Widgets/widgets.css'
import { onMounted } from 'vue'
const store = useStore()
let viewer = undefined
let socket = store.state.socket.ws
onMounted(() => {
  viewer = new Cesium.Viewer('cesiumContainer')
  if(socket == undefined){
    store.dispatch('socket/socketInit')
  }
})
</script>
<template>
  <div id="cesiumContainer"></div>
</template>
<script>
// export default {}
</script>
<style></style>
