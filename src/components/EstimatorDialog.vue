<template>
  <q-dialog
    no-backdrop-dismiss
    :maximized="$q.platform.is.mobile"
    :value="value"
  >
    <q-layout
      view="Lhh lpR fff"
      container
      class="bg-white"
      :style="{ height: _height, 'min-width': _width, width: _width }"
    >
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            <slot name="header"></slot>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <q-page padding>
          <slot></slot>
        </q-page>
      </q-page-container>
      <q-footer class="bg-white text-black">
        <q-toolbar class="flex justify-end">
          <slot name="footer"></slot>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </q-dialog>
</template>

<script>
export default {
  name: "EstimatorDialog",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    height: {
      type: [Number, Boolean],
      default: false
    },
    width: {
      type: [Number, Boolean],
      default: false
    }
  },
  computed: {
    _height() {
      if (this.$q.platform.is.mobile || !this.height) {
        return false;
      }
      return this.height + "px";
    },
    _width() {
      if (this.$q.platform.is.mobile || !this.width) {
        return false;
      }
      return this.width + "px";
    }
  }
};
</script>
