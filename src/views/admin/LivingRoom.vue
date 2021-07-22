<template>
  <v-container>
    <v-item-group class="d-flex justify-center my-7" style="background-color: #e5e4e4; border-radius: 10px">
      <v-item class="py-3" style="font-weight: 500">
        <h5> Living Room</h5>
      </v-item>
    </v-item-group>
    <v-flex>
      <v-layout>
        <v-row>
          <v-col v-for="furniture in furnitures" :key="furniture.sku">
            <v-card class="mx-auto" max-width="250">
              <v-img class="white--text align-end" height="200px"
                     src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                <!-- <v-img class="white&#45;&#45;text align-end" height="200px" :src="furniture.imageURL">-->
                <v-card-title>{{ furniture.name }}</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0">SKU: {{ furniture.sku }}</v-card-subtitle>
              <v-divider class="mx-2 mt-1"></v-divider>
              <v-card-text class="text--primary">
                <div><span class="text--disabled">Manufacture:</span> {{ furniture.manufacture }}</div>
                <div><span class="text--disabled">Category:</span> {{ furniture.category }}</div>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn plain rounded icon class="ml-1 mr-0 p-0">
                  <v-icon class="mr-2" @click="editItem(furniture)">mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn plain rounded icon class="ml-0 p-0">
                <v-icon @click="deleteItem(furniture)">mdi-delete-outline</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="orange" text>${{ furniture.price }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Edit Furniture Modal-->
        <v-dialog v-model="newItemDialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-show="false" v-bind="attrs" v-on="on" class="mb-2" color="primary" dark>New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Edit Furniture</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field disabled v-model="furniture.sku" label="SKU"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field v-model="furniture.name" label="Furniture name"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-text-field v-model="furniture.price" label="Price"></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-select
                        v-model="furniture.color" :items="colors" data-vv-name="select" label="Color" required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-select
                        v-model="furniture.category" :items="categories" data-vv-name="select" label="Category"
                        required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-select
                        v-model="furniture.material" :items="materials" data-vv-name="select" label="Material"
                        required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="12" sm="12">
                    <v-select
                        v-model="furniture.manufacture" :items="manufactures" data-vv-name="select"
                        label="Manufacture" required
                    ></v-select>
                  </v-col>
                  <!-- <v-col cols="12" md="12" sm="12">
                          <v-img contain :src="furniture.imageURL" height="530" width="480" label="Manufacture"></v-img>
                  </v-col>-->
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete Furniture Dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card class="text-center">
            <v-card-title class="d-inline-flex mb-0 pb-0">Are you sure you want to delete this?</v-card-title>
            <h5 style="font-size: 13px!important;">This action can't be undo</h5>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/firestore'

export default {
  name: "catalog",
  data() {
    return {
      furnitures: [],
      newItemDialog: false,
      dialogDelete: false,
      errorMsg: false,
      manufactures: ['RIO', 'Johnson & Johnson', 'Pfizer'],
      categories: ['Living Room', 'Dining Room', 'Beds & Bedrooms', 'Accessories'],
      colors: ['White', 'Black', 'Blue', 'Green', 'Yellow', 'Gray', 'Brown', 'Cream', 'Charcoal', 'Red'],
      materials: ['Fabric', 'Microfiber', 'Leather', 'Velvet', 'Linen'],
      furniture: {
        sku: "",
        name: "",
        price: "",
        manufacture: "",
        color: "",
        category: "",
        material: "",
        imageURL: "",
      }
    }
  },
  computed: {},

  watch: {},

  created() {

    //Resets Store Values
    this.$store.dispatch('resetState');
    this.$store.dispatch('storeLivingRoomFurniture')
    this.furnitures = this.$store.getters.loadedAllFurniture
  },

  methods: {
    resetValues() {
      //Resets Store Values
      this.$store.dispatch('resetState');
      this.$store.dispatch('storeLivingRoomFurniture')
      this.furnitures = this.$store.getters.loadedAllFurniture
    },

    save() {
      firebase.firestore().collection("furniture").doc(this.furniture.sku).update(this.furniture)
          .then(() => {
            console.log("Document successfully updated!");
            this.resetValues();
            this.newItemDialog = false
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
    },

    clear() {
      this.furnitures.sku = '';
      this.furnitures.name = '';
      this.furnitures.price = '';
      this.furnitures.color = '';
      this.furnitures.category = '';
      this.furnitures.material = '';
      this.furnitures.manufacture = '';
      this.furnitures.imageURL = ''
    },

    editItem(furniture) {
      this.furniture.sku = furniture.sku
      this.furniture.name = furniture.name
      this.furniture.price = furniture.price
      this.furniture.color = furniture.color
      this.furniture.category = furniture.category
      this.furniture.material = furniture.material
      this.furniture.manufacture = furniture.manufacture

      this.newItemDialog = true
    },

    goToAddFurniture() {
      //Resets Store Values
      this.$store.dispatch('resetState');

      this.$router.push('/admin/add-furniture')

    },

    deleteItem(furniture) {
      this.furniture = furniture
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      firebase.firestore().collection("furniture").doc(this.furniture.sku).delete().then(() => {
        this.$store.dispatch('resetState');
        this.$store.dispatch('storeLivingRoomFurniture');
        this.furnitures = this.$store.getters.loadedAllFurniture
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
      this.closeDelete()
    },

    close() {
      this.newItemDialog = false
    },

    closeDelete() {
      this.dialogDelete = false
    }
  }
}
</script>

<style scoped>

v-col {
  background-color: cadetblue;
}

</style>
