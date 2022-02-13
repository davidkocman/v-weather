export default interface TWeatherData {
  type: string
  geometry: {
    type: string
    coordinates: number[]
  }
  properties: {
    meta: {
      updated_at: string
      units: {
        air_pressure_at_sea_level: string
        air_temperature: string
        air_temperature_max: string
        air_temperature_min: string
        cloud_area_fraction: string
        cloud_area_fraction_high: string
        cloud_area_fraction_low: string
        cloud_area_fraction_medium: string
        dew_point_temperature: string
        fog_area_fraction: string
        precipitation_amount: string
        relative_humidity: string
        ultraviolet_index_clear_sky: string
        wind_from_direction: string
        wind_speed: string
      }
    }
    timeseries: [
      {
        time: string
        data: {
          instant: {
            details: {
              air_pressure_at_sea_level: number
              air_temperature: number
              cloud_area_fraction: number
              cloud_area_fraction_high: number
              cloud_area_fraction_low: number
              cloud_area_fraction_medium: number
              dew_point_temperature: number
              fog_area_fraction: number
              relative_humidity: number
              ultraviolet_index_clear_sky: number
              wind_from_direction: number
              wind_speed: number
            }
          }
          next_12_hours: {
            summary: {
              symbol_code: string
            }
          }
          next_1_hours: {
            summary: {
              symbol_code: string
            }
            details: {
              precipitation_amount: number
            }
          }
          next_6_hours: {
            summary: {
              symbol_code: string
            }
            details: {
              air_temperature_max: number
              air_temperature_min: number
              precipitation_amount: number
            }
          }
        }
      }
    ]
  }
}
