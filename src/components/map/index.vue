<script setup>
</script>
<template>
  <div id="cesiumContainer"></div>
</template>
<script>
import { useStore } from 'vuex'
import * as Cesium from 'cesium'
// import * as widgets from 'cesium/Widgets/widgets.css'
import { onMounted, computed} from 'vue'


export default {
  setup() {
    const store = useStore()
    let viewer = undefined
    onMounted(() => {
      viewer = new Cesium.Viewer('cesiumContainer'),
      socket = store.socket.ws
    })
    return { viewer }
  }
}
</script>

<style></style>
