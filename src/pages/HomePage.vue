<template>
  <q-page padding class="row justify-center">
    <div class="col-md-8 col">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="mdi-av-timer" size="sm" />
          ETA
        </q-toolbar-title>
        <q-btn
          icon="mdi-plus"
          color="secondary"
          label="Add Shipment"
          @click="$refs.Shipmentdialog.show()"
        />
      </q-toolbar>
      <div class="q-mt-md">
        <EstimatorTable
          :columns="EtaColumns"
          :data="shipments"
          :pagination="pagination"
          :loading="loading"
        >
          <template v-slot:actions="shipment">
            <CompactListMenu>
              <CompactListItem
                icon="mdi-calendar"
                label="Update Shipment ETA"
                @click="$refs.Shipmentdialog.show(shipment.row)"
              />
              <CompactListItem
                icon="mdi-ferry"
                label="Get vessel ETA"
                @click="compareVesselAndShipmentEta(shipment.row)"
              />
            </CompactListMenu>
          </template>
        </EstimatorTable>
      </div>
    </div>
    <ShipmentDialog ref="Shipmentdialog" />
  </q-page>
</template>

<script>
import CompactListMenu from "components/CompactListMenu.vue";
import CompactListItem from "components/CompactListItem.vue";
import EstimatorTable from "src/components/EstimatorTable.vue";
import ShipmentDialog from "src/components/ShipmentDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  components: {
    CompactListMenu,
    CompactListItem,
    EstimatorTable,
    ShipmentDialog
  },
  computed: {
    ...mapGetters({
      shipments: "shipment/getShipments",
      shipmentLoading: "shipment/getLoading"
    }),
    loading() {
      return this.shipmentLoading || this.vesselLoading;
    }
  },
  data() {
    return {
      filter: "",
      pagination: {
        sortBy: "id",
        descending: false
      },
      EtaColumns: [
        {
          name: "id",
          label: "ID",
          align: "left",
          field: row => row.id,
          sortable: true
        },
        {
          name: "customer",
          label: "Customer",
          align: "left",
          field: row => row.customer,
          sortable: true
        },
        {
          name: "vessel",
          label: "Vessel",
          align: "left",
          field: row => row.vessel,
          sortable: true
        },
        {
          name: "shipment-eta",
          label: "Shipment Eta",
          align: "left",
          field: row => row["shipment-eta"],
          sortable: true
        },
        {
          name: "actions"
        }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("shipment/dispatchShipment");
  },
  methods: {
    //Alert the user if the vessel and shipment ETA are different.
    compareVesselAndShipmentEta(shipment) {
      this.$store
        .dispatch("vessel/dispatchVesselByName", {
          vesselName: shipment.vessel
        })
        .then(response => {
          const dialogBodyMessage = `<ul>
                          <li>Vessel ETA: <b>${response["vessel-eta"]}</b> </li>
                          <li>Shipment ETA: <b>${shipment["shipment-eta"]}</b> </li>
                      </ul><br />`;

          if (response["vessel-eta"] !== shipment["shipment-eta"]) {
            this.$q.dialog({
              title: "ETA Alert",
              message: `${dialogBodyMessage}
                      The vessel <b>${response.name}</b> has been delayed, customer <b>${shipment.customer}</b> must be informed.`,
              color: "secondary",
              html: true
            });
          } else {
            this.$q.dialog({
              title: "ETA Alert",
              message: `${dialogBodyMessage}
                      ETA date of vessel ${response.name} and shipment are same.`,
              html: true
            });
          }
        });
    }
  }
};
</script>
