import WeatherData from '@/types/TWeatherData'

const create = (): WeatherData => {
  return {
    type: '',
    geometry: {
      type: '',
      coordinates: [],
    },
    properties: {
      meta: {
        updated_at: '',
        units: {
          air_pressure_at_sea_level: '',
          air_temperature: '',
          air_temperature_max: '',
          air_temperature_min: '',
          cloud_area_fraction: '',
          cloud_area_fraction_high: '',
          cloud_area_fraction_low: '',
          cloud_area_fraction_medium: '',
          dew_point_temperature: '',
          fog_area_fraction: '',
          precipitation_amount: '',
          relative_humidity: '',
          ultraviolet_index_clear_sky: '',
          wind_from_direction: '',
          wind_speed: '',
        },
      },
      timeseries: [
        {
          time: '',
          data: {
            instant: {
              details: {
                air_pressure_at_sea_level: 0,
                air_temperature: 0,
                cloud_area_fraction: 0,
                cloud_area_fraction_high: 0,
                cloud_area_fraction_low: 0,
                cloud_area_fraction_medium: 0,
                dew_point_temperature: 0,
                fog_area_fraction: 0,
                relative_humidity: 0,
                ultraviolet_index_clear_sky: 0,
                wind_from_direction: 0,
                wind_speed: 0,
              },
            },
            next_12_hours: {
              summary: {
                symbol_code: '',
              },
            },
            next_1_hours: {
              summary: {
                symbol_code: '',
              },
              details: {
                precipitation_amount: 0,
              },
            },
            next_6_hours: {
              summary: {
                symbol_code: '',
              },
              details: {
                air_temperature_max: 0,
                air_temperature_min: 0,
                precipitation_amount: 0,
              },
            },
          },
        },
      ],
    },
  }
}

export default {
  create,
}
