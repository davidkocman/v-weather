<script setup lang="ts">
import { ref } from 'vue'
import useSavedLocations from '@/composables/useSavedLocations'
type positionType = 'top' | 'right' | 'standard' | 'bottom' | 'left' | undefined
const { hasSavedLocations } = useSavedLocations()

const dialog = ref<boolean>(false)
const position = ref<positionType>('top')

function open(pos: positionType) {
  position.value = pos
  dialog.value = true
}
</script>
<template>
  <q-btn
    v-if="hasSavedLocations"
    icon="place"
    color="primary"
    @click="open('right')"
    class="fav-loc"
  />
  <q-dialog v-model="dialog" :position="position">
    <q-card style="width: 350px">
      <q-card-section class="row items-center no-wrap"> </q-card-section>
    </q-card>
  </q-dialog>
</template>
