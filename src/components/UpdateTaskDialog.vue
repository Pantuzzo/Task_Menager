<script setup lang="ts">
import { defineProps, defineEmits, PropType, ref } from 'vue'
import type { ItemSet } from '@/services/tasks/payloads'

// Define the props that this component accepts
const props = defineProps({
  item: {
    type: Object as PropType<ItemSet>,
    required: true
  }
})

// Define the events that this component can emit
const emit = defineEmits(['updateItem'])

const localItem = ref(props.item)

// Function to handle the update
const updateItem = () => {
  emit('updateItem', props.item)
}
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Edit Task</div>
    </q-card-section>

    <q-card-section>
      <q-input v-model="localItem.title" label="Title" />
      <label>Description</label>
      <q-editor
        v-model="localItem.description"
        :definitions="{
          bold: { label: 'Bold', tip: 'My bold tooltip' }
        }"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Update" @click="updateItem" />
    </q-card-actions>
  </q-card>
</template>
