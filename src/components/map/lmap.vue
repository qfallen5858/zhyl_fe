<template> <div id="myMap2"></div></template>
<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import {
  addPolygon,
  addScatterPoint,
  addScatterPointIcon2,
  newScatterStyle
} from '../../utils/map/layers'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {},
  setup(props, context) {
    console.log(props, context)
    const store = useStore()
    let socket = store.state.socket.ws
    if(socket == undefined) {
      store.dispatch('socket/socketInit')
    }
    store.subscribe((mutation) => {
      console.log(mutation)
      if(mutation.type === 'socket/receive'){
        console.log(mutation.payload)
      }
    })

    let mapMap = null
    let scatterLayerGroup = L.featureGroup()
    onMounted(() => {
      initMap()
      addPolygon([
        [37, -109.05],
        [41, -109.03],
        [41, -102.05],
        [37, -102.04],
        [35, -122.04]
      ]).addTo(mapMap)
    })
    //获取当前可是方位随机点位的经纬度
    const getRandomLatLng = (map) => {
      let bounds = map.getBounds(),
        southWest = bounds.getSouthWest(),
        northEast = bounds.getNorthEast(),
        lngSpan = northEast.lng - southWest.lng,
        latSpan = northEast.lat - southWest.lat

      return L.latLng(
        southWest.lat + latSpan * Math.random(),
        southWest.lng + lngSpan * Math.random()
      )
    }
    const initMap = () => {
      console.log('初始化地图')
      //天地图
      const image = L.tileLayer(
        'http://t{s}.tianditu.gov.cn/img_w/wmts?tk=bb11a33c4377f10603478ed166691455&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
        {
          subdomains: [0, 1, 2, 3, 4, 5, 6, 7]
        }
      )
      //注记
      const cia = L.tileLayer(
        'http://t{s}.tianditu.gov.cn/cia_w/wmts?tk=bb11a33c4377f10603478ed166691455&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}',
        {
          subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
          transparent: true,
          zIndex: 3
        }
      )
      //天地图图组
      const tiandiMap = L.layerGroup([image, cia])

      let myCenter = [31.95723698714103, 104.29901249999988] // 设置地图中心
      mapMap = L.map('myMap2', {
        center: myCenter,
        minZoom: 1,
        layers: [tiandiMap],
        zoom: 3
      })
      let initSiteLatlon = getRandomLatLng(mapMap)
      scatterLayerGroup.addLayer(addScatterPointIcon2(initSiteLatlon))
      scatterLayerGroup.addTo(mapMap)
    }
    const changeStyle = (val, scatterRadius) => {
      let newStyle = newScatterStyle(val.color, scatterRadius.value, false)
      scatterLayerGroup.eachLayer(function (layer) {
        layer.setIcon(newStyle)
      })
    }
    return {
      changeStyle
    }
  }
}
</script>
<style scoped>
#myMap2 {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
