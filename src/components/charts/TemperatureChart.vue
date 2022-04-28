<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { Chart } from 'highcharts-vue'
import TTimeSeries from '@/types/TTimeSeries'
import useTempChartData from '@/composables/chartData/useTempChartData'
const props = defineProps({
  timeseries: {
    required: true,
    type: Object as PropType<TTimeSeries[]>,
  },
})

/**
 * 'timeseries' needs to be converted to reactive object, so I can use them inside composable function
 * - props is reactive object
 * - props.timeseries is a literal value (non-reactive)
 * */
const { timeseries } = toRefs(props)

/**
 * composable function
 */
const { chartOptions } = useTempChartData(timeseries)
</script>

<template>
  <div class="col-11 col-md-6">
    <Chart :options="chartOptions" />
  </div>
</template>
