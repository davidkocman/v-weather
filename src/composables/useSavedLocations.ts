import { ref } from 'vue'

interface ILocation {
  lat: string
  lng: string
  title: string
}

const hasSavedLocations = ref<boolean>(false)

export default function useSavedLocations() {
  function saveLocation(coordinates: string[], activeLocation: string): void {
    let newLocation = ref<ILocation>({
      lat: coordinates[0],
      lng: coordinates[1],
      title: activeLocation,
    })
    let storageValue = []

    if (localStorage.getItem('savedLocations')) {
      storageValue = JSON.parse(
        localStorage.getItem('savedLocations') as string
      )
      if (
        storageValue.some((e: ILocation) => e.title === newLocation.value.title)
      ) {
        return
      }
      if (storageValue.length > 2) {
        storageValue.pop()
        storageValue.unshift(newLocation.value)
        localStorage.setItem('savedLocations', JSON.stringify(storageValue))
        return
      }
      storageValue.unshift(newLocation.value)
      localStorage.setItem('savedLocations', JSON.stringify(storageValue))
      return
    }
    storageValue.push(newLocation.value)
    localStorage.setItem('savedLocations', JSON.stringify(storageValue))
    hasSavedLocations.value = true
  }

  return {
    saveLocation,
    hasSavedLocations,
  }
}
