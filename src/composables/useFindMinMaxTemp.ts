import { Ref, computed } from 'vue'
import TTimeSeries from '@/types/TTimeSeries'

/**
 * It takes an array of time series data as an argument and returns the minimum and maximum temperature
 * of the day
 * @param timeseries - Ref<TTimeSeries[]>
 * @returns An object with two computed properties.
 */
export default function useFindMinMaxTemp(timeseries: Ref<TTimeSeries[]>) {
  /* Getting the current date in ISO format and splitting it at the 'T' character. */
  const dateIsoString: string = new Date(new Date()).toISOString().split('T')[0]

  /* A computed property that returns the minimum temperature of the day. */
  const minTemp = computed(() => {
    const todaySeries: TTimeSeries[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.time.includes(dateIsoString)) {
        todaySeries.push(item)
      }
    })
    return todaySeries.reduce(
      (min, p: TTimeSeries) =>
        p.data.instant.details.air_temperature < min ? p.data.instant.details.air_temperature : min,
      todaySeries[0].data.instant.details.air_temperature
    )
  })

  /* A computed property that returns the maximum temperature of the day. */
  const maxTemp = computed(() => {
    const todaySeries: TTimeSeries[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.time.includes(dateIsoString)) {
        todaySeries.push(item)
      }
    })
    return todaySeries.reduce(
      (max, p) => (p.data.instant.details.air_temperature > max ? p.data.instant.details.air_temperature : max),
      todaySeries[0].data.instant.details.air_temperature
    )
  })

  return {
    minTemp,
    maxTemp,
  }
}
