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
    mutations: {},
    actions: {}
}

export default furniture;
