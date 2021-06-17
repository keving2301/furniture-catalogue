import Vue from 'vue';
import App from './App.vue';
import firebase from 'firebase/app';
import 'firebase/auth'
import router from './router';
import store from './store/index';
import vuetify from './plugins/vuetify';
import ErrorAlert from "@/components/ErrorAlert";

Vue.config.productionTip = false;
Vue.component('app-alert', ErrorAlert)
let app;

const firebaseConfig = {
    apiKey: "AIzaSyBQ0pfKZAgX4jwTXfmh-7bBVWrc5OYAPTA",
    authDomain: "furniture-catalogue-01.firebaseapp.com",
    databaseURL: "https://furniture-catalogue-01-default-rtdb.firebaseio.com",
    projectId: "furniture-catalogue-01",
    storageBucket: "furniture-catalogue-01.appspot.com",
    messagingSenderId: "545417372174",
    appId: "1:545417372174:web:75602c93fb8577a76b925f",
    measurementId: "G-P3G897RXHT"
};

firebase.initializeApp(firebaseConfig);

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
