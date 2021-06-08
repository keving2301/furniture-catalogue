import firebase from "firebase";

const auth = {
    namespaced: true,
    state: {
        user: {
            loggedIn: false,
            data: null,
            id: null
        }
    },
    getters: {
        user: (state) => {
            return state.user;
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        }
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
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
                user => {
                    const newUser = {
                        id: user.uid
                    }
                    commit('SET_USER', newUser)
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
        }
    }
}

export default auth;
