import TTimeSeries from '@/types/TTimeSeries'
import { computed, Ref } from 'vue'

export default function useCloudChartData(timeseries: Ref<TTimeSeries[]>) {
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
    const weekday = ['Nedela', 'Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota']
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
   * It takes the cloud area fraction from the timeseries and returns it as an array
   * @returns An array of cloud area fractions.
   */
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
        dataGrouping: {
          enabled: false,
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
