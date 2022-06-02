import TTimeSeries from './TTimeSeries'
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
    timeseries: TTimeSeries[]
  }
}
