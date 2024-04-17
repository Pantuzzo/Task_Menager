<script setup lang="ts">
import { ref } from 'vue'
import type { Task, NewItem } from '@/services/tasks/payloads'
import AddTaskDialog from './AddTaskDialog.vue' // Adjust the import path as necessary
import UpdateTaskDialog from './UpdateTaskDialog.vue' // Adjust the import path as necessary
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  items: {
    type: Array<Task>,
    required: true
  }
})

// My local props
const localItems = ref(props.items)

// ref from dialog
const showDialogCreate = ref(false)

const showDialogEdit = ref(false)

// Define the events that this component can emit
const emit = defineEmits(['editItem'])

// Variable to hold the item being edited
const editingItem = ref<Task | null>(null)

// Modify the editItem function to emit an event with the item
const editItem = (item: Task) => {
  editingItem.value = item
  showDialogEdit.value = true
}

const handleUpdateItem = (updatedItem: Task) => {
  const index = localItems.value.findIndex((item) => item.id === updatedItem.id)
  if (index !== -1) {
    localItems.value[index] = updatedItem
  }
  showDialogEdit.value = false
}

// delete method
const deleteItem = (id: number) => {
  localItems.value = localItems.value.filter((item) => item.id !== id)
}

// add items
const addItem = (item: NewItem) => {
  const nextId =
    localItems.value.length > 0 ? Math.max(...localItems.value.map((item) => item.id)) + 1 : 1

  // Build a new Item
  const newTask = {
    id: nextId,
    title: item.title,
    description: item.description,
    checked: false
  }

  // Insert this item in list
  localItems.value.push(newTask)

  // Reset the form
  item.value = { title: '', description: '' }

  // Close the dialog
  showDialogCreate.value = false
}
</script>

<template>
  <div class="main">
    <div class="maneger_container">
      <div class="maneger_title">
        <h1>TASK MANEGER</h1>
        <q-btn icon="add" @click="showDialogCreate = true" />
      </div>
      <div class="maneger__content">
        <ul>
          <li v-for="item in localItems" :key="item.id">
            <q-list
              bordered
              class="flat rounded-borders set_task"
              :class="{ didTask: item.checked }"
            >
              <q-checkbox dark v-model="item.checked" color="green" />
              <q-expansion-item
                class="title"
                :label="item.title"
                :class="{ didTask: item.checked }"
              >
                <q-card>
                  <q-card-section class="desc">
                    <div v-html="item.description" />
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
            <div style="display: flex">
              <q-btn icon="edit" @click="editItem(item)" style="margin-right: 8px" />
              <q-btn icon="delete" @click="deleteItem(item.id)" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <q-dialog v-model="showDialogCreate">
    <AddTaskDialog @addItem="addItem" />
  </q-dialog>
  <q-dialog v-model="showDialogEdit">
    <UpdateTaskDialog :item="editingItem" @updateItem="handleUpdateItem" />
  </q-dialog>
</template>

<style scoped>
.maneger_title {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

h1 {
  text-decoration: underline;
  color: #e4f7ff;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
  margin: 0 50px;
}

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  padding: 50px;
}

.maneger_container {
  background-color: #00b4ff;
  width: 900px;
  height: 400px;
  border-radius: 15px;
  height: auto;
  padding: 40px;
}

ul {
  list-style-type: none;
}

li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.title {
  font-size: 22px;
  font-weight: 400;
  margin: unset;
  position: relative;
}

.title::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.desc {
  margin-left: 42px;
}

.didTask::after {
  opacity: 1;
}

.showDesc {
  border: transparent;
  background-color: #080e1a;
  color: white;
  border-radius: 15px;
  cursor: pointer;
}

.set_task {
  display: flex;
  border: transparent;
}
</style>
