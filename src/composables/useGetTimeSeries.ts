import { ref } from 'vue'
import TWeatherData from '@/types/TWeatherData'
import TTimeSeries from '@/types/TTimeSeries'

// Gets timeseries for next 7 days for specific time
export default function useGetTimeSeries(data: TWeatherData) {
  const timeMarks: Date[] = [
    new Date(new Date().setHours(1, 0, 0)),
    new Date(new Date().setHours(7, 0, 0)),
    new Date(new Date().setHours(13, 0, 0)),
    new Date(new Date().setHours(19, 0, 0)),
  ]

  let day: Date | string = ''
  let result: TTimeSeries
  const series = ref<TTimeSeries[]>([])

  // loop to get next 7 days
  for (let i: number = 1; i <= 7; i++) {
    timeMarks.forEach((mark: Date) => {
      day =
        new Date(mark.setUTCDate(mark.getDate() + i))
          .toISOString()
          .split('.')[0] + 'Z' // strip miliseconds
      result = data.properties.timeseries.find(
        ({ time }: { time: string }) => time === day
      ) as TTimeSeries // find specific timeseries

      series.value.push(result)
      day = new Date(mark.setUTCDate(mark.getDate() - i))
    })
  }

  return { series }
}
