<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['addItem'])

const newitem = ref<NewItem>({ title: '', description: '' })
</script>

<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Add New Task</div>
    </q-card-section>

    <q-card-section>
      <q-input v-model="newitem.title" label="Title" placeholder="Insert the title task" />
      <q-label label="Description" />
      <q-editor
        v-model="newitem.description"
        :definitions="{
          bold: { label: 'Bold', tip: 'My bold tooltip' }
        }"
        label="Description"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Add" @click="$emit('addItem', newitem)" />
    </q-card-actions>
  </q-card>
</template>
