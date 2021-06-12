<template>
  <EstimatorDialog :value="open" :height="id ? 220 : 450" :width="400">
    <template v-slot:header> {{ id ? "Update" : "Create" }} Shipment </template>

    <div class="q-gutter-md">
      <q-input
        v-if="!id"
        ref="customerRef"
        outlined
        v-model="customer"
        label="Customer"
        :rules="[requiredRule]"
        hide-bottom-space
      />
      <q-select
        v-if="!id"
        ref="vesselRef"
        outlined
        :options="vesselOptions"
        v-model="vessel"
        label="Vessel"
        :rules="[requiredRule]"
        hide-bottom-space
      />

      <q-input
        ref="shipmentEtaRef"
        outlined
        label="Shipment Eta"
        v-model="shipmentEta"
        :rules="[requiredRule, dateRule]"
        hide-bottom-space
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="shipmentEta" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="secondary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <template v-slot:footer>
      <q-btn flat label="Cancel" @click="close" />
      <q-btn
        flat
        color="secondary"
        :label="id ? 'Edit' : 'Create'"
        @click="submit"
      />
    </template>
  </EstimatorDialog>
</template>

<script>
import EstimatorDialog from "components/EstimatorDialog.vue";
import { requiredRule, dateRule } from "@/commons/Rules.js";

export default {
  name: "ShipmentDialog",
  components: {
    EstimatorDialog
  },
  data() {
    return {
      open: false,
      vesselOptions: [
        `CMA-CGM-CONCORDE`,
        `CMA-CGM-JEAN-MERMOZ`,
        `COSCO-SHIPPING-GALAXY`,
        `COSCO-SHIPPING-GEMINI`,
        `EVER-GENIUS`,
        `EVER-GENTLE`,
        `HMM-COPENHAGEN`,
        `HMM-DUBLIN`,
        `MARSEILLE-MAERSK`,
        `MONACO-MAERSK`,
        `OOCL-GERMANY`,
        `OOCL-INDONESIA`
      ],
      customer: "",
      vessel: "",
      shipmentEta: "",
      id: ""
    };
  },
  watch: {
    open(open) {
      if (!open) {
        // cleanup
        this.customer = "";
        this.vessel = "";
        this.shipmentEta = "";
        this.id = "";
      }
    }
  },
  methods: {
    requiredRule,
    dateRule,
    show(shipment) {
      this.open = true;
      if (shipment) {
        this.id = shipment.id;
        this.customer = shipment.customer;
        this.vessel = shipment.vessel;
        this.shipmentEta = shipment["shipment-eta"];
      }
    },
    close() {
      this.open = false;
    },
    submit() {
      //Validation
      const isCustomerValid = this.id
        ? true
        : this.$refs.customerRef.validate();
      const isVesselValid = this.id ? true : this.$refs.vesselRef.validate();
      const isShipmentEtaValid = this.$refs.shipmentEtaRef.validate();

      if (!isCustomerValid || !isVesselValid || !isShipmentEtaValid) {
        return;
      }

      //Dispatch action(create or update)
      const action = this.id
        ? "dispatchUpdateShipment"
        : "dispatchCreateShipment";

      this.$store
        .dispatch(`shipment/${action}`, {
          id: this.id,
          customer: this.customer,
          vessel: this.vessel,
          shipmentEta: this.shipmentEta
        })
        .then(() => {
          this.close();
        });
    }
  }
};
</script>
