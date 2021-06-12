<template>
  <q-table
    :data="data"
    :columns="columns"
    :filter="filter"
    :pagination="pagination"
    :rows-per-page-options="[5, 10, 20, 50]"
    :loading="loading"
    row-key="id"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search..."
        outlined
      >
        <template v-slot:append>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td class="text-right">
        <q-btn flat round dense icon="mdi-dots-vertical">
          <slot name="actions" :row="props.row" />
        </q-btn>
      </q-td>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

<script>
export default {
  name: "EstimatorTable",
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      filter: ""
    };
  }
};
</script>
