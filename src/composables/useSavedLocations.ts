import { ref, reactive, toRefs } from 'vue'

/* Defining the shape of the object Location. */
interface Location {
  lat: string
  lng: string
  title: string
}

/* Defining the shape of the object State. */
interface State {
  hasSavedLocations: boolean
  savedLocations: Location[]
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
    const newLocation = ref<Location>({
      lat: coordinates[0],
      lng: coordinates[1],
      title: activeLocation,
    })
    let storageValue = []

    if (localStorage.getItem('savedLocations')) {

      /* Parsing the string that is stored in localStorage to an array of objects. */
      storageValue = JSON.parse(
        localStorage.getItem('savedLocations') as string
      )

      /* Checking if the location is already saved. */
      if (
        storageValue.some((e: Location) => e.title === newLocation.value.title)
      ) {
        return
      }

      /* Checking if the storageValue array has more than 2 items. If it does, it removes the last item
      and adds the newLocation to the beginning of the array. */
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
    /* A function that is provided by Vue. It is used to convert a reactive object into a plain object
    with reactive properties. */
    ...toRefs(state),
  }
}
