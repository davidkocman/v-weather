<script setup lang="ts">
import TTimeSeries from '@/types/TTimeSeries'
import TUnits from '@/types/TUnits'
import useFindMinMaxTemp from '@/composables/useFindMinMaxTemp'
import { PropType, toRefs } from 'vue'

const props = defineProps({
  timeSeries: {
    required: true,
    type: Object as PropType<TTimeSeries[]>,
  },
  activeLocation: {
    required: true,
    type: String,
  },
  activeRegion: {
    required: true,
    type: String,
  },
  units: {
    required: true,
    type: Object as PropType<TUnits>,
  },
})
const { timeSeries } = toRefs(props)
const { minTemp, maxTemp } = useFindMinMaxTemp(timeSeries)
</script>
<template>
  <div
    class="column justify-center items-center text-white text-center q-mb-lg q-mt-xl q-pt-xl"
  >
    <div class="row">
      <div class="col-auto">
        <div class="text-h4 text-weight-medium q-mb-l text-spacing-2">
          {{ activeLocation }}
        </div>
        <div class="text-subtitle1 text-weight-regular text-grey-4">
          {{ activeRegion }} kraj
        </div>
      </div>
    </div>
    <div class="row justify-center items-center q-mb-md">
      <q-img
        class="col-auto q-mr-5"
        :src="
          '/images/weathericons/' +
          timeSeries[0].data.next_1_hours.summary.symbol_code +
          '.svg'
        "
        width="160px"
        height="160px"
      />
      <div class="col-auto q-my-lg q-ml-sm relative-position">
        <span class="text-h1 text-weight-bold">{{
          Math.round(timeSeries[0].data.instant.details.air_temperature)
        }}</span>
        <span class="text-h4 relative-position degree text-weight-bold q-ml-xs"
          >&deg;C</span
        >
        <div class="min-max absolute text-subtitle1">
          <div class="max row justify-between items-center">
            <q-icon
              color="orange-7"
              name="north"
              title="Najvyššia teplota"
            ></q-icon>
            <span class="current-temp">{{ Math.round(maxTemp) }}&deg;</span>
          </div>
          <div class="min row justify-between items-center">
            <q-icon
              color="blue-7"
              name="south"
              title="Najnižšia teplota"
            ></q-icon>
            <span>{{ Math.round(minTemp) }}&deg;</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <div class="row items-center q-mr-sm">
        <q-icon
          color="blue-7"
          name="air"
          title="Rýchlosť vetra"
          style="font-size: 1.5em"
        ></q-icon>
        <span class="text-subtitle1 q-mr-xs">{{
          Math.round(timeSeries[0].data.instant.details.wind_speed) +
          units.wind_speed
        }}</span>
        <div class="compass relative-position">
          <span
            class="arrow"
            :style="{
              transform:
                'rotate(' +
                Math.round(
                  timeSeries[0].data.instant.details.wind_from_direction
                ) +
                'deg)',
            }"
          ></span>
        </div>
      </div>
      <div class="row items-center q-mr-sm">
        <q-icon
          color="blue-7"
          name="water_drop"
          title="Relatívna vlhkosť"
          style="font-size: 1.5em"
        ></q-icon>
        <span class="text-subtitle1">{{
          Math.round(timeSeries[0].data.instant.details.relative_humidity) +
          units.relative_humidity
        }}</span>
      </div>
      <div class="row items-center q-mr-sm">
        <span class="text-subtitle1">
          <q-icon
            color="blue-7"
            name="speed"
            title="Tlak vzduchu"
            style="font-size: 1.5em"
          ></q-icon>
          {{
            Math.round(
              timeSeries[0].data.instant.details.air_pressure_at_sea_level
            )
          }}
          {{ units.air_pressure_at_sea_level }}
        </span>
      </div>
      <div class="row items-center q-mr-sm">
        <span class="text-subtitle1"
          >UV:
          {{
            timeSeries[0].data.instant.details.ultraviolet_index_clear_sky
          }}</span
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.degree {
  top: -48px;
}
.compass {
  border-radius: 50%;
  border: 1px solid #9b9b9b;
  height: 26px;
  width: 26px;
  transform: rotate(90deg);
  .arrow {
    background-color: #ffffff;
    display: block;
    height: 1px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    transition: all 0.5s ease;
    &:before {
      border-bottom: 5px solid #ffffff;
      border-right: 5px solid transparent;
      border-left: 5px solid transparent;
      content: '';
      height: 0;
      position: absolute;
      right: -3px;
      top: -2px;
      transform: rotate(90deg);
      width: 0;
    }
  }
}
.min-max {
  bottom: 10px;
  line-height: 22px;
  right: 0;
}
.text-spacing-2 {
  letter-spacing: 2px;
}
</style>
