import firebase from "firebase/app";

const auth = {
    namespaced: true,
    state: {
        user: {
            loggedIn: false,
            data: null,
            id: null
        },
        error: null
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        error: (state) => {
            return state.error;
        }
    },
    mutations: {
        SET_LOGGED_IN(state, payload) {
            state.user.loggedIn = payload;
        },
        SET_USER(state, payload) {
            state.user.data = payload;
        },
        SET_ERROR(state, payload) {
            state.error = payload;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        },

    },
    actions: {
        fetchUser({commit}, user) {
            commit('SET_LOGGED_IN', user !== null);
            if (user) {
                commit('SET_USER', user);
            } else {
                commit('SET_USER', null);
            }
        },
        signUserUp({commit}, payload) {
            commit('CLEAR_ERROR');

            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
                user => {
                    const newUser = {
                        id: user.uid
                    }
                    commit('SET_USER', newUser)
                }
            ).catch(
                error => {
                    commit('SET_ERROR', error.message)
                }
            )

        },
        clearError({commit}) {
            commit('CLEAR_ERROR');
        }
    }
}

export default auth;
