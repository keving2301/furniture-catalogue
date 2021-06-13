import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const furniture = {
    state: {
        furniture: []
    },
    getters: {
        loadedAllFurniture(state) {
            return state.furniture;
        },
        loadedFurniture(state) {
            return (furnitureID) => {
                return state.furniture.find((furniture) => {
                    return furniture.sku === furnitureID;
                })
            }
        }
    },
    mutations: {
        createFurniture(state, payload) {
            state.furniture.push(payload)
        },
        storeAllFurniture(state, payload) {
            state.furniture.push(payload)
        },
        deleteFurniture(state, payload){
            try{
                let i;
                for(i = 0; i<state.furniture.length; i++){
                    if(state.furniture[i].sku === payload.sku){
                        state.furniture[i].remove()
                    }
                }
            }catch(error){
                console.log(error)
            }
        }
    },
    actions: {
        createFurniture({commit}, payload) {
            const furniture = {
                id: payload.sku,
                name: payload.name,
                price: payload.price,
                manufacture: payload.manufacture,
                color: payload.color,
                category: payload.category,
                material: payload.material,
            }
            //Store info in firebase
            let imageURL
            let id = payload.sku

            firebase.firestore.collection('furniture').doc(furniture.id).set(furniture)
                .then(() => {
                    return furniture.id
                }).then(id => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('Furniture/' + id + ext).put(payload.image)
            }).then(fileData => {

                imageURL = fileData.ref.getDownloadURL()

                return firebase.database().ref('furniture').child(id).update({imageURL: imageURL})
            }).then(() => {
                commit('createFurniture', {
                    ...furniture,
                    imageURL: imageURL,
                    id: id
                })
                console.log("Furniture successfully added!");
            }).catch((error) => {
                console.log(error)
            })
        },
        storeAllFurniture({commit}, payload) {

            commit('storeAllFurniture', payload)
        },
        deleteFurniture({commit}, payload) {
            commit('deleteFurniture', payload)
        }
    }
}

export default furniture;
