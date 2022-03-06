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
      gridLineDashStyle: 'none',
      gridLineColor: '#858585',
      gridLineWidth: 0,
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
      plotBands: [
        {
          from: 0,
          to: 0.2,
          color: 'rgba(0, 0, 0, 0)',
          label: {
            text: '',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 0.3,
          to: 1.5,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
            x: 20,
            text: 'Vánok',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 1.6,
          to: 3.3,
          color: 'rgba(0, 0, 0, 0)',
          label: {
            x: 20,
            text: 'Slabý vietor',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 3.4,
          to: 5.4,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
            x: 20,
            text: 'Mierny vietor',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 5.5,
          to: 7.9,
          color: 'rgba(0, 0, 0, 0)',
          label: {
            x: 20,
            text: 'Dosť čerstvý vietor',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 8,
          to: 10.7,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
            x: 20,
            text: 'Čerstvý vietor',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 10.8,
          to: 13.8,
          color: 'rgba(0, 0, 0, 0)',
          label: {
            x: 20,
            text: 'Silný vietor',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 13.9,
          to: 17.1,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
            x: 20,
            text: 'Prudký vietor',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 17.2,
          to: 20.7,
          color: 'rgba(0, 0, 0, 0)',
          label: {
            x: 20,
            text: 'Búrlivý vietor',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 20.8,
          to: 24.4,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
            x: 20,
            text: 'Víchrica',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 24.5,
          to: 28.4,
          color: 'rgba(0, 0, 0, 0)',
          label: {
            x: 20,
            text: 'Silná víchrica',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 28.5,
          to: 32.6,
          color: 'rgba(68, 170, 213, 0.1)',
          label: {
            x: 20,
            text: 'Mohutná víchrica',
            style: {
              color: '#C0C0C0',
            },
          },
        },
        {
          from: 32.7,
          color: 'rgba(0, 0, 0, 0)',
          label: {
            x: 20,
            text: 'Orkán',
            style: {
              color: '#C0C0C0',
            },
          },
        },
      ],
    },
    series: [
      {
        name: 'Rýchlosť vetra',
        data: getWindSpeed(),
        type: 'spline',
        marker: {
          enabled: false,
        },
        dataGrouping: {
          enabled: false,
        },
        tooltip: {
          valueSuffix: ' m/s',
        },
        color: '#006992',
      },
    ],
    credits: {
      enabled: false,
    },
  }))

  return { chartOptions }
}
