import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase';
import router from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import {firestorePlugin} from 'vuefire';

Vue.config.productionTip = false;

Vue.use(firestorePlugin);

let app;

firebase.auth().onAuthStateChanged(user => {
    store.dispatch('auth/fetchUser', user).then();
    if (!app) {
        new Vue({
            store,
            router,
            vuetify,
            render: h => h(App)
        }).$mount('#app');
    }
});
