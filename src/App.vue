<script setup lang="ts">
import Tasklist from './components/TaskList.vue'
import mock from './resources/mock'
</script>

<template>
  <div>
    <Tasklist :items="mock" />
  </div>
</template>
