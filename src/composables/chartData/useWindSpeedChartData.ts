import TTimeSeries from '@/types/TTimeSeries'
import { computed, Ref } from 'vue'

export default function useWindSpeedChartData(timeseries: Ref<TTimeSeries[]>) {
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

  function getWindSpeed(): number[] {
    const windSpeed: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      windSpeed.push(item.data.instant.details.wind_speed)
    })
    return windSpeed
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
      text: 'Rýchlosť vetra',
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
        margin: 1,
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
      title: {
        text: '(m/s)',
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
        name: 'Rýchlosť vetra',
        data: getWindSpeed(),
        type: 'spline',
        marker: {
          enabled: false,
        },
        tooltip: {
          valueSuffix: ' m/s',
        },
        zones: [
          {
            value: 1.5,
            color: '#81cfe0',
          },
          {
            value: 5.4,
            color: '#19b5fe',
          },
          {
            value: 13.8,
            color: '#2574a9',
          },
          {
            value: 24.4,
            color: '#1e517b',
          },
          {
            color: '#013243',
          },
        ],
        color: '#006992',
      },
    ],
    credits: {
      enabled: false,
    },
  }))

  return { chartOptions }
}
