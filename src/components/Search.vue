<script setup lang="ts">
import { watch } from 'vue'
import useWeatherData from '@/composables/useWeatherData'

const emit = defineEmits(['weatherData', 'activeLocation', 'activeRegion', 'coordinates'])
const { options, model, filterFn, getWeatherData, weatherData } = useWeatherData()

watch(model, (value): void => {
  if (value) {
    emit('activeLocation', value.label)
    emit('activeRegion', value.admin_name)
    emit('coordinates', [value.lat, value.lng])
    getWeatherData(value)
  }
})
watch(weatherData, (value): void => {
  emit('weatherData', value)
})
</script>

<template>
  <div class="row q-px-md fixed-top search-location">
    <div class="col">
      <q-select
        v-model="model"
        borderless
        clearable
        dark
        hide-dropdown-icon
        input-debounce="300"
        label="Lokalita"
        label-color="white"
        :options="options"
        option-value="value"
        transition-show="fade"
        transition-hide="fade"
        use-input
        @filter="filterFn"
        @focus="model: string = ''"
        @keyup.enter="($event.target as HTMLElement).blur()"
      >
        <template #no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
        <template #before>
          <q-icon color="green-7" name="place"></q-icon>
        </template>
      </q-select>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-location {
  background-color: #1c2d43;
  z-index: 1;
}
</style>
