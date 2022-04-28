import { ref, reactive, toRefs } from 'vue'

/* Defining the shape of the object ILocation. */
interface ILocation {
  lat: string
  lng: string
  title: string
}

/* Defining the shape of the object State. */
interface State {
  hasSavedLocations: boolean
  savedLocations: ILocation[]
}

/* Creating a reactive object that is of type State. */
const state = reactive<State>({
  hasSavedLocations: false,
  savedLocations: [],
})

/**
 * It saves the location to localStorage and updates the state
 * @returns An object with the saveLocation function and the state object.
 */
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
        state.savedLocations = storageValue
        return
      }
      storageValue.unshift(newLocation.value)
      localStorage.setItem('savedLocations', JSON.stringify(storageValue))
      state.savedLocations = storageValue
      return
    }

    storageValue.push(newLocation.value)
    localStorage.setItem('savedLocations', JSON.stringify(storageValue))
    state.savedLocations = storageValue
    state.hasSavedLocations = true
  }

  return {
    saveLocation,
    ...toRefs(state),
  }
}
