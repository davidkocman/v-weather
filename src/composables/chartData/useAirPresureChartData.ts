import TTimeSeries from '@/types/TTimeSeries'
import { computed, Ref } from 'vue'

export default function useAirPresureChartData(timeseries: Ref<TTimeSeries[]>) {
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

  function getAirPresure(): number[] {
    const airPresure: number[] = []
    timeseries.value.forEach((item: TTimeSeries) => {
      airPresure.push(item.data.instant.details.air_pressure_at_sea_level)
    })
    return airPresure
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
      text: 'Tlak vzduchu',
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
      plotLines: [
        {
          color: '#0b7fab',
          dashStyle: 'solid',
          width: 1,
          value: 1013.25,
          zIndex: 4,
          label: {
            text: 'Štandardný tlak 1013.25 hPa',
            style: {
              color: '#FFFFFF',
            },
          },
        },
      ],
      title: {
        text: '(hPa)',
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
        name: 'Tlak vzduchu',
        data: getAirPresure(),
        type: 'spline',
        marker: {
          enabled: false,
        },
        tooltip: {
          valueSuffix: ' hPa',
        },
        zones: [
          {
            value: 1013.25,
            color: '#1e8bc3',
          },
          {
            color: '#f2784b',
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
