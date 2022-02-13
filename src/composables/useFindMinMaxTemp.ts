import { Ref, computed } from 'vue'
import TTimeSeries from '@/types/TTimeSeries'

export default function useFindMinMaxTemp(timeseries: Ref<TTimeSeries[]>) {
  const dateIsoString: string = new Date(new Date()).toISOString().split('T')[0]

  const minTemp = computed(() => {
    const todaySeries: TTimeSeries[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.time.includes(dateIsoString)) {
        todaySeries.push(item)
      }
    })
    return todaySeries.reduce(
      (min, p: TTimeSeries) =>
        p.data.instant.details.air_temperature < min
          ? p.data.instant.details.air_temperature
          : min,
      todaySeries[0].data.instant.details.air_temperature
    )
  })

  const maxTemp = computed(() => {
    const todaySeries: TTimeSeries[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.time.includes(dateIsoString)) {
        todaySeries.push(item)
      }
    })
    return todaySeries.reduce(
      (max, p) =>
        p.data.instant.details.air_temperature > max
          ? p.data.instant.details.air_temperature
          : max,
      todaySeries[0].data.instant.details.air_temperature
    )
  })

  return {
    minTemp,
    maxTemp,
  }
}
