import TWeatherData from '@/types/TWeatherData'
import MWeatherData from '@/model/MWeatherData'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import cities from '@/assets/cities/sk.json'

export default function useWeatherData() {
  const $q = useQuasar()
  const options = ref(cities)
  const weatherData = ref<TWeatherData>(MWeatherData.create())
  const model = ref<any>(null)

  function filterFn(inputValue: string, doneFn: Function, abortFn: Function) {
    if (inputValue.length < 1) {
      abortFn()
      return
    }
    setTimeout(() => {
      doneFn(() => {
        const needle = inputValue.toLowerCase()
        options.value = cities.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    }, 300)
  }
  async function getWeatherData(val: any) {
    $q.loading.show()
    try {
      const response = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${val.lat}&lon=${val.lng}`
      )
      weatherData.value = await response.json()
      $q.loading.hide()
    } catch (e) {
      console.log(e)
    }
  }

  return {
    options,
    model,
    filterFn,
    getWeatherData,
    weatherData,
  }
}
