import TTimeSeries from '@/types/TTimeSeries'
import { computed, Ref } from 'vue'

export default function useTempChartData(timeseries: Ref<TTimeSeries[]>) {

  /**
   * It takes the time property of each item in the timeseries array and returns an array of hours
   * @returns An array of hours from the timeseries data.
   */
  function getHours() {
    const categories: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      categories.push(new Date(item.time).getHours())
    })

    return categories
  }

  /**
   * It takes the timeseries array and returns an array of categories
   * @returns Array of strings
   */
  function getCategories() {
    const weekday = [
      'Nedela',
      'Pondelok',
      'Utorok',
      'Streda',
      'Štvrtok',
      'Piatok',
      'Sobota',
    ]
    const categories: string[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      categories.push(
        weekday[new Date(item.time).getDay()] +
        '<br>' +
        new Date(item.time).getDate() +
        '.' +
        (new Date(item.time).getMonth() + 1) +
        '.'
      )
    })

    return categories
  }

  /**
   * It takes two numbers as arguments, and returns a number
   * @param {number} hR - Relative humidity in %
   * @param {number} T - Temperature in degrees Celsius
   * @returns The steam pressure in Pascal
   */
  function steamPressure(hR: number, T: number): number {
    return Math.round((hR / 100) * 6.105 * Math.exp((12.27 * T) / (237.7 + T)))
  }

  /**
   * It takes the air temperature and relative humidity from the API and calculates the minimum feel
   * temperature for the next 6 hours
   * @returns An array of numbers
   */
  function getMinFeelTemp(): number[] {
    const minFeelTemp: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.data.next_6_hours) {
        const minFTemp: number =
          item.data.next_6_hours.details.air_temperature_min +
          0.32 *
          steamPressure(
            item.data.instant.details.relative_humidity,
            item.data.next_6_hours.details.air_temperature_min
          ) -
          0.7 * item.data.instant.details.wind_speed -
          4
        minFeelTemp.push(Math.round(minFTemp))
      } else {
        const minFTemp: number =
          item.data.instant.details.air_temperature +
          0.32 *
          steamPressure(
            item.data.instant.details.relative_humidity,
            item.data.instant.details.air_temperature
          ) -
          0.7 * item.data.instant.details.wind_speed -
          4
        minFeelTemp.push(Math.round(minFTemp))
      }
    })

    return minFeelTemp
  }

  function getMaxFeelTemp(): number[] {
    const maxFeelTemp: number[] = []

    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.data.next_6_hours) {
        const maxFTemp: number =
          item.data.next_6_hours.details.air_temperature_max +
          0.32 *
          steamPressure(
            item.data.instant.details.relative_humidity,
            item.data.next_6_hours.details.air_temperature_max
          ) -
          0.7 * item.data.instant.details.wind_speed -
          4
        maxFeelTemp.push(Math.round(maxFTemp))
      } else {
        const maxFTemp: number =
          item.data.instant.details.air_temperature +
          0.32 *
          steamPressure(
            item.data.instant.details.relative_humidity,
            item.data.instant.details.air_temperature
          ) -
          0.7 * item.data.instant.details.wind_speed -
          4
        maxFeelTemp.push(Math.round(maxFTemp))
      }
    })

    return maxFeelTemp
  }

  /**
   * It loops through the timeseries array and pushes the minimum temperature for each hour into a new
   * array
   * @returns An array of numbers
   */
  function getMinTemp(): number[] {
    const minTemp: number[] = []

    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.data.next_6_hours) {
        minTemp.push(item.data.next_6_hours.details.air_temperature_min)
      } else {
        minTemp.push(item.data.instant.details.air_temperature)
      }
    })

    return minTemp
  }

  function getMaxTemp(): number[] {
    const maxTemp: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.data.next_6_hours) {
        maxTemp.push(item.data.next_6_hours.details.air_temperature_max)
      } else {
        maxTemp.push(item.data.instant.details.air_temperature)
      }
    })

    return maxTemp
  }

  const chartOptions = computed(() => ({
    chart: {
      backgroundColor: '',
      style: {
        fontFamily: 'Roboto',
      },
    },
    boost: {
      useGPUTranslations: true,
    },
    title: {
      text: 'Predpoveď teplôt',
      style: {
        color: '#FFFFFF',
      },
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      useHTML: true,
      headerFormat: '<span style="font-size: 10px">{point.key}:00</span><br/>',
    },
    legend: {
      itemStyle: {
        color: '#FFFFFF',
        fontWeight: 'bold',
      },
      itemHoverStyle: {
        color: 'grey',
      },
    },
    xAxis: [
      {
        categories: getHours(),
        type: 'category',
        gridLineColor: '#85858578',
        labels: {
          style: {
            color: '#FFFFFF',
          },
        },
      },
      {
        categories: getCategories(),
        type: 'category',
        tickInterval: 4,
        gridLineWidth: 1,
        gridLineColor: '#85858578',
        lineWidth: 0,
        linkedTo: 0,
        margin: 0,
        labels: {
          align: 'left',
          style: {
            color: '#FFFFFF',
          },
        },
      },
    ],
    yAxis: {
      gridLineDashStyle: 'dash',
      gridLineColor: '#858585',
      plotLines: [
        {
          color: '#0b7fab',
          dashStyle: 'solid',
          width: 1,
          value: 0,
          zIndex: 2,
        },
      ],
      title: {
        text: '(°C)',
        style: {
          color: '#FFFFFF',
        },
      },
      labels: {
        style: {
          color: '#FFFFFF',
        },
      },
    },
    series: [
      {
        name: 'Maximálna teplota',
        data: getMaxTemp(),
        type: 'column',
        marker: {
          enabled: false,
        },
        tooltip: {
          valueSuffix: '°C',
        },
        dataGrouping: {
          enabled: false,
        },
        color: '#ec644b',
      },
      {
        name: 'Maximálna pocitová teplota',
        data: getMaxFeelTemp(),
        type: 'spline',
        zIndex: '5',
        marker: {
          enabled: false,
        },
        dataGrouping: {
          enabled: false,
        },
        tooltip: {
          valueSuffix: '°C',
        },
        color: '#ec644b',
      },
      {
        name: 'Minimálna teplota',
        data: getMinTemp(),
        type: 'column',
        marker: {
          enabled: false,
        },
        dataGrouping: {
          enabled: false,
        },
        tooltip: {
          valueSuffix: '°C',
        },
        color: '#1e8bc3',
      },
      {
        name: 'Minimálna pocitová teplota',
        data: getMinFeelTemp(),
        type: 'spline',
        zIndex: '5',
        marker: {
          enabled: false,
        },
        dataGrouping: {
          enabled: false,
        },
        tooltip: {
          valueSuffix: '°C',
        },
        color: '#1e8bc3',
      },
    ],
    credits: {
      enabled: false,
    },
  }))

  return { chartOptions }
}
