import TTimeSeries from '@/types/TTimeSeries'
import { computed, Ref } from 'vue'

export default function useTempChartData(timeseries: Ref<TTimeSeries[]>) {
  function getHours() {
    const categories: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      categories.push(new Date(item.time).getHours())
    })

    return categories
  }

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

  function steamPressure(hR: number, T: number): number {
    return (hR / 100) * 6.105 * Math.exp((12.27 * T) / (237.7 + T))
  }

  function getMinFeelTemp(): number[] {
    const minFeelTemp: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.data.next_6_hours) {
        minFeelTemp.push(
          Math.round(
            item.data.next_6_hours.details.air_temperature_min +
              0.33 *
                steamPressure(
                  item.data.instant.details.relative_humidity,
                  item.data.next_6_hours.details.air_temperature_min
                ) -
              0.7 * item.data.instant.details.wind_speed -
              4
          )
        )
        return minFeelTemp
      }
      minFeelTemp.push(
        Math.round(
          item.data.instant.details.air_temperature +
            0.33 *
              steamPressure(
                item.data.instant.details.relative_humidity,
                item.data.instant.details.air_temperature
              ) -
            0.7 * item.data.instant.details.wind_speed -
            4
        )
      )
    })
    return minFeelTemp
  }

  function getMaxFeelTemp(): number[] {
    const maxFeelTemp: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.data.next_6_hours) {
        maxFeelTemp.push(
          Math.round(
            item.data.next_6_hours.details.air_temperature_max +
              0.33 *
                steamPressure(
                  item.data.instant.details.relative_humidity,
                  item.data.next_6_hours.details.air_temperature_max
                ) -
              0.7 * item.data.instant.details.wind_speed -
              4
          )
        )
        return maxFeelTemp
      }
      maxFeelTemp.push(
        Math.round(
          item.data.instant.details.air_temperature +
            0.33 *
              steamPressure(
                item.data.instant.details.relative_humidity,
                item.data.instant.details.air_temperature
              ) -
            0.7 * item.data.instant.details.wind_speed -
            4
        )
      )
    })
    return maxFeelTemp
  }

  function getMinTemp(): number[] {
    const minTemp: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.data.next_6_hours) {
        minTemp.push(item.data.next_6_hours.details.air_temperature_min)
        return minTemp
      }
      minTemp.push(item.data.instant.details.air_temperature)
    })
    return minTemp
  }

  function getMaxTemp(): number[] {
    const maxTemp: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      if (item.data.next_6_hours) {
        maxTemp.push(item.data.next_6_hours.details.air_temperature_max)
        return maxTemp
      }
      maxTemp.push(item.data.instant.details.air_temperature)
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
