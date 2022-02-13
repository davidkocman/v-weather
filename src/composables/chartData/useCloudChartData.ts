import TTimeSeries from '@/types/TTimeSeries'
import { computed, Ref } from 'vue'

export default function useCloudChartData(timeseries: Ref<TTimeSeries[]>) {
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

  function getCloudAreaFraction(): number[] {
    const cloudAreaFraction: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      cloudAreaFraction.push(item.data.instant.details.cloud_area_fraction)
    })
    return cloudAreaFraction
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
      text: 'Oblačnosť',
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
      ceiling: 100,
      title: {
        text: '(%)',
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
        name: 'Oblačnosť',
        data: getCloudAreaFraction(),
        type: 'column',
        marker: {
          enabled: false,
        },
        tooltip: {
          valueSuffix: '%',
        },
        maxPointWidth: 10,
        color: '#fad859',
      },
    ],
    credits: {
      enabled: false,
    },
  }))

  return { chartOptions }
}
