import { axiosInstance } from "boot/axios";
import Vue from "vue";

export default {
  namespaced: true,
  state: () => ({
    shipments: [],
    loading: false
  }),
  mutations: {
    addShipment(state, shipment) {
      state.shipments.push(shipment);
    },
    updateShipment(state, shipment) {
      const index = state.shipments.findIndex(s => s.id === shipment.id);
      Vue.set(state.shipments, index, shipment);
    },
    setShipment(state, shipment) {
      state.shipments = shipment;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getShipments(state) {
      return state.shipments;
    }
  },
  actions: {
    //Get all shipements
    dispatchShipment({ commit, getters }) {
      if (getters.loading) {
        return;
      }
      commit("setLoading", true);

      axiosInstance
        .get("/shipment")
        .then(response => {
          if (response.data) {
            commit("setShipment", response.data);
          }
        })
        .catch(err => {
          throw err;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    //Update Shipements
    dispatchUpdateShipment(
      { commit, getters },
      { id, customer, vessel, shipmentEta }
    ) {
      if (getters.loading) {
        return;
      }
      commit("setLoading", true);

      axiosInstance
        .put(`/shipment/${id}`, {
          customer,
          vessel,
          "shipment-eta": shipmentEta
        })
        .then(response => {
          commit("updateShipment", response.data);
        })
        .catch(err => {
          throw err;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    //Get shipment by id
    dispatchGetShipmentById({ commit, getters }, { id }) {
      if (getters.loading) {
        return;
      }
      commit("setLoading", true);

      axiosInstance
        .get(`/shipment/${id}`)
        .then(response => {})
        .catch(err => {
          throw err;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    //Create shipment
    dispatchCreateShipment(
      { commit, getters },
      { customer, vessel, shipmentEta }
    ) {
      if (getters.loading) {
        return;
      }
      commit("setLoading", true);

      axiosInstance
        .post("/shipment", { customer, vessel, "shipment-eta": shipmentEta })
        .then(response => {
          commit("addShipment", response.data);
        })
        .catch(err => {
          throw err;
        })
        .finally(() => {
          commit("setLoading", false);
        });
    }
  }
};
