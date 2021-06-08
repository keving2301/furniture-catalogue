
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
                imageURL: payload.imageURL
            }
            //Store info in firebase
            commit('createFurniture', furniture);
        },


    }
}

export default furniture;
