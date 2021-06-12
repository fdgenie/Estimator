<template>
  <q-item v-close-popup @click="$emit('click', $event)" :clickable="true">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section no-wrap>
      <q-item-label>{{ label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "CompactListItem",
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ""
    }
  }
};
</script>
