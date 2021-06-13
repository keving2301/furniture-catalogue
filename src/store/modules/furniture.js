import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const furniture = {
    state: {
        furniture: [
            {
                sku: "1231234",
                name: "Loca",
                price: "",
                manufacture: "",
                color: "",
                category: "",
                material: "",
                imageURL: ""
            },
            {
                sku: "9999999",
                name: "Arata",
                price: "",
                manufacture: "",
                color: "",
                category: "",
                material: "",
                imageURL: ""
            }
        ]


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


    }
}

export default furniture;
