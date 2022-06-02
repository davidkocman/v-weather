import TWeatherData from '@/types/TWeatherData'
import MWeatherData from '@/model/MWeatherData'
import TModel from '@/types/TModel'
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import cities from '@/assets/cities/sk.json'

/**
 * It takes an input value, and returns a list of options that match the input value
 * @returns The return statement is returning an object with the following properties:
 * options: The options variable is a ref that is initialized with the cities array.
 * model: The model variable is a ref that is initialized with null.
 * filterFn: The filterFn function takes an input value, and returns a list of options that match the
 * input value.
 * getWeatherData: The getWeatherData function
 */
export default function useWeatherData() {
  const $q = useQuasar()
  const options = ref(cities)
  const weatherData = ref<TWeatherData>(MWeatherData.create())
  const model = ref<TModel>()

  /**
   * It takes an input value, and returns a list of options that match the input value
   * @param {string} inputValue - The current value of the input field.
   * @param {Function} doneFn - A function that takes a callback function as a parameter. The callback
   * function should be called with the filtered options.
   * @param {Function} abortFn - Function
   * @returns the value of the cities array that have a label that matches the inputValue.
   */
  function filterFn(inputValue: string, doneFn: Function, abortFn: Function): void {
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

  /**
   * It fetches the weather data from the met.no API and stores it in the weatherData variable
   * @param {TModel} val - TModel - this is the type of the parameter that is passed to the function.
   */
  async function getWeatherData(val: TModel) {
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
