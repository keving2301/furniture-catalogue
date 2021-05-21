import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import sounds from './modules/sounds';
import bedroomSets from "./modules/bedroomSets";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    bedroomSets,
    sounds
  }
})
