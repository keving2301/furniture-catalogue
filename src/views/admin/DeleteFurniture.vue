<template>
  <v-container>
    <v-item-group class="d-flex justify-center my-7" style="background-color: #e5e4e4; border-radius: 10px">
      <v-item class="py-3" style="font-weight: 500">
        <h5>Delete Furniture</h5>
      </v-item>
    </v-item-group>
    <v-data-table :headers="headers" :items="furnitures" class="elevation-1" sort-by="calories">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn class="mb-2" color="primary" dark @click="goToAddFurniture">New Item</v-btn>

          <!--          New Furniture Modal-->
          <v-dialog v-model="newItemDialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-show="false" v-bind="attrs" v-on="on" class="mb-2" color="primary" dark>New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="furniture.name" label="Furniture name"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="furniture.sku" label="SKU"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="furniture.price" label="Price"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-select
                          v-model="furniture.color" :items="colors" data-vv-name="select" label="Color" required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-select
                          v-model="furniture.category" :items="categories" data-vv-name="select" label="Category"
                          required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-select
                          v-model="furniture.material" :items="materials" data-vv-name="select" label="Material"
                          required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-select
                          v-model="furniture.manufacture" :items="manufactures" data-vv-name="select"
                          label="Manufacture" required
                      ></v-select>
                    </v-col>
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
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{item}">
        <v-icon class="mr-2" small @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <!--        <v-btn color="primary" @click="watcher">Reset</v-btn>-->
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/firestore'

export default {
  name: "delete-furniture",
  data() {
    return {
      editedIndex: 1,
      newItemDialog: false,
      dialogDelete: false,
      invalid: false,
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
      },
      headers: [
        {
          text: 'Furniture Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'SKU', value: 'sku'},
        {text: 'Price', value: 'price'},
        {text: 'Color', value: 'color'},
        {text: 'Category', value: 'category'},
        {text: 'Material', value: 'material'},
        {text: 'Manufacture', value: 'manufacture'},
        {text: 'Actions', value: 'actions', sortable: false},
      ]
    }
  },
  computed: {

    formTitle() {
      return this.editedIndex === -1 ? 'Edit Furniture' : 'Edit Furniture'
    },

    furnitures() {
      return this.$store.getters.loadedAllFurniture
    }
  },

  watch: {

    dialog(val) {
      val || this.close()
    },

    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    //Resets Store Values
    this.$store.dispatch('resetState');

    firebase.firestore().collection("furniture").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = {
          'sku': doc.id,
          'name': doc.data().name,
          'price': doc.data().price,
          'color': doc.data().color,
          'category': doc.data().category,
          'material': doc.data().material,
          'manufacture': doc.data().manufacture,
          'imageURL': doc.data().imageURL,
        }
        this.$store.dispatch('storeAllFurniture', data);
      });
    });
  },

  methods: {
    // Creates New Furniture with an auto generated furniture SKU
    save() {
      firebase.firestore().collection("furniture").doc(this.furniture.sku).update(this.furniture)
          .then(() => {
            console.log("Document successfully updated!");
            this.updateAllFurnitureData();
            this.newItemDialog = false
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
    },

    updateAllFurnitureData() {
      //Resets Store Values
      this.$store.dispatch('resetState');

      firebase.firestore().collection("furniture").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            'sku': doc.id,
            'name': doc.data().name,
            'price': doc.data().price,
            'color': doc.data().color,
            'category': doc.data().category,
            'material': doc.data().material,
            'manufacture': doc.data().manufacture,
            'imageURL': doc.data().imageURL,
          }
          this.$store.dispatch('storeAllFurniture', data);
        });
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
        this.updateAllFurnitureData();
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
      this.closeDelete()
    },

    close() {
      this.newItemDialog = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedIndex = -1
      })
    }
  }
}
</script>

<style scoped>

</style>
