import Vue from 'vue';
import Vuex from 'vuex';
import db from '@/fb.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gear: [],
  },
  mutations: {
    // quick property updater
    // payload: { prop: <propname>, value: <value> }
    updateProp(state, payload) {
      state[payload.prop] = payload.value;
    },
  },
  actions: {
    async asyncGetGear({ commit }) {
      // get collection from firestore
      db.collection('gear').get().then((querySnapshot) => {
          const gear = [];
          querySnapshot.forEach((doc) => {
            // create gear objects and push to array
            let item = doc.data();
            item.id = doc.id;
            gear.push(item);
          });
          // store gear to state
          commit('updateProp', {
            prop: 'gear',
            value: gear,
          });
        })
        .catch((error) => {
          console.log('Error getting gear: ', error);
        });

    },
  },
  modules: {},
});
