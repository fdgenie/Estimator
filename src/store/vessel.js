import { axiosInstance } from "boot/axios";

export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  getters: {},
  actions: {
    dispatchVesselByName({}, { vesselName }) {
      return axiosInstance
        .get(`/vessel/${vesselName}`)
        .then(response => {
          return response.data;
        })
        .catch(err => {
          throw err;
        });
    }
  }
};
