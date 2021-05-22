import { firestore } from 'firebase';

const collName = 'Bedroom Sets';

const bedroomSets = {
    namespaced: true,
    state: {
        bedroomSets: [],
    },
    getters: {
        getBedroomSets: (state) => {
            return state.bedroomSets;
        }
    },
    mutations: {
        SET_BEDROOM_SETS(state, bedroomSets) {
            state.bedroomSets = bedroomSets;
        },
        ADD_BEDROOM_SETS(state, bedroomSet) {
            state.bedroomSets.push(bedroomSet);
        },
        UPDATE_BEDROOM_SETS(state, payload) {
            Object.assign(state.bedroomSets[payload.index], payload.bedroomSets);
        },
        REMOVE_BEDROOM_SETS(state, bedroomSet) {
            const index = state.bedroomSets.indexOf(bedroomSet);
            state.bedroomSets.splice(index, 1);
        }
    },
    actions: {
        async addBedroomSets({commit}, bedroomSet) {
            const docRef = await firestore().collection(collName).add(bedroomSet);
            bedroomSet.id = docRef.id;
            commit('ADD_BEDROOM_SETS', bedroomSet);
        },
        async loadBedroomSets({commit}) {
            const querySnapshot = await firestore().collection(collName).get();
            let bedroomSet;
            let bedroomSets = querySnapshot.docs.map(function (doc) {
                bedroomSet = doc.data();
                bedroomSet.id = doc.id;
                return bedroomSet;
            });
            commit('SET_BEDROOM_SETS', bedroomSets);
        },
        async updateBedroomSets({commit}, payload) {
            await firestore().collection(collName).doc(payload.bedroomSets.id).set(payload.bedroomSets);
            commit('UPDATE_BEDROOM_SETS', payload);
        },
        async removeBedroomSets({commit}, bedroomSet) {
            await firestore().collection(collName).doc(bedroomSet.id).delete();
            commit('REMOVE_BEDROOM_SETS', bedroomSet);
        }
    }
}

export default bedroomSets;
