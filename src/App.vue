<script setup lang="ts">
import { ref, watch } from 'vue'
import TWeatherData from '@/types/TWeatherData'
import TTimeSeries from '@/types/TTimeSeries'
import useGetTimeSeries from '@/composables/useGetTimeSeries'
import useSavedLocations from '@/composables/useSavedLocations'
import Search from '@/components/Search.vue'
import Now from '@/components/Now.vue'
import TemperatureChart from '@/components/charts/TemperatureChart.vue'
import PrecipitationChart from '@/components/charts/PrecipitationChart.vue'
import CloudAreaFractionChart from '@/components/charts/CloudAreaFractionChart.vue'
import WindSpeedChart from '@/components/charts/WindSpeedChart.vue'
import HumidityChart from '@/components/charts/HumidityChart.vue'
import AirPresureChart from '@/components/charts/AirPresureChart.vue'
import SavedLocations from './components/SavedLocations.vue'

const weatherData = ref<TWeatherData | null>(null)
const activeLocation = ref<string>('')
const activeRegion = ref<string>('')
const coordinates = ref<string[]>([])
const theme = ref<string>('')
const timeseries = ref<TTimeSeries[]>([])

const { hasSavedLocations } = useSavedLocations()

function onWeatherData(data: TWeatherData) {
  weatherData.value = data
  const { series } = useGetTimeSeries(data)
  timeseries.value = series.value
}
function onActiveLocation(val: string) {
  activeLocation.value = val
}
function onActiveRegion(val: string) {
  activeRegion.value = val
}
function onCoordinates(val: string[]) {
  coordinates.value = val
}

watch(activeRegion, (value: string) => {
  switch (value) {
    case 'Bratislavský':
      theme.value = 'bratislavsky'
      break
    case 'Trnavský':
      theme.value = 'trnavsky'
      break
    case 'Trenčiansky':
      theme.value = 'trenciansky'
      break
    case 'Nitriansky':
      theme.value = 'nitriansky'
      break
    case 'Žilinský':
      theme.value = 'zilinsky'
      break
    case 'Banskobystrický':
      theme.value = 'banskobystricky'
      break
    case 'Prešovský':
      theme.value = 'presovsky'
      break
    case 'Košický':
      theme.value = 'kosicky'
      break
    default:
      theme.value = ''
  }
})
</script>

<template>
  <q-layout view="lHh Lpr lFf" :class="theme">
    <q-page-container>
      <q-page class="column">
        <Search
          @weatherData="onWeatherData"
          @activeLocation="onActiveLocation"
          @activeRegion="onActiveRegion"
          @coordinates="onCoordinates"
        />
        <SavedLocations v-if="hasSavedLocations" />
        <template v-if="weatherData">
          <Now
            :timeSeries="weatherData.properties.timeseries"
            :activeLocation="activeLocation"
            :activeRegion="activeRegion"
            :units="weatherData.properties.meta.units"
            :coordinates="coordinates"
          />
          <div class="row justify-center q-mb-lg">
            <TemperatureChart :timeseries="timeseries" />
            <PrecipitationChart :timeseries="timeseries" />
          </div>
          <div class="row justify-center q-mb-lg">
            <CloudAreaFractionChart :timeseries="timeseries" />
            <WindSpeedChart :timeseries="timeseries" />
          </div>
          <div class="row justify-center q-mb-lg">
            <HumidityChart :timeseries="timeseries" />
            <AirPresureChart :timeseries="timeseries" />
          </div>
        </template>
        <template v-else>
          <div class="column text-center text-white">
            <div class="col">
              <div class="text-h2 text-weight-thin">Počasie</div>
              <div class="text-caption text-weight-thin">
                zdroj dát: Meteorologisk Institutt (met.no)
              </div>
            </div>
          </div>
        </template>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.q-page {
  background: #141e30; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to top,
    #141e30,
    #243b55
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #141e30,
    #243b55
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  justify-content: center;
  .fav-loc {
    position: fixed;
    right: 10px;
    top: 70px;
  }
}
</style>
