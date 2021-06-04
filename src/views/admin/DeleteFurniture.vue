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
          <v-dialog v-model="newItemDialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="mb-2" color="primary" dark>New Item</v-btn>
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
                      <v-text-field v-model="furniture.color" label="Color"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="furniture.category" label="Category"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="furniture.material" label="Material"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="furniture.manufacture" label="Manufacture"></v-text-field>
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
                <v-card-title class="d-inline-flex mb-0 pb-0">Are you sure you want to delete {{fname}} from catalog?</v-card-title>
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
      <template v-slot:item.actions>
        <v-icon class="mr-2" small @click="editItem">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="watcher">Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {db} from '/src/firebase'
import store from '/src/store/index'
export default {
  name: "delete-furniture",
  data() {
    return {
      newItemDialog: false,
      dialogDelete: false,
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
      ],
      furnitures: [],
      furniture: {
        sku: "",
        name: "",
        price: "",
        manufacture: "",
        color: "",
        category: "",
        material: "",
      },
      editedItem: {
        name: '',
        price: 0,
        color: '',
        category: '',
        material: '',
        manufacture: '',
      },
      defaultItem: {
        name: '',
        price: 0,
        color: '',
        category: '',
        material: '',
        manufacture: '',
      },

      invalid: false,
      errorMsg: false,
      manufactures: ['RIO', 'Johnson & Johnson', 'Pfizer'],
      categories: ['Living Room', 'Dining Room', 'Beds & Bedrooms', 'Accessories'],
      colors: ['White', 'Black', 'Blue', 'Green', 'Yellow', 'Gray', 'Brown', 'Cream', 'Charcoal', 'Red'],
      materials: ['Fabric', 'Microfiber', 'Leather', 'Velvet', 'Linen'],

    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    fname(){
      return store.state.auth.user.data.name
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
    this.watcher()
  },
  methods: {
    //Generates Random SKU
    skuGenerator() {
      this.furniture.sku = Math.ceil(Math.random() * 1000000).toString();
    },
    // Creates New Furniture with an auto generated furniture SKU
    save() {
      this.skuGenerator();
      try {
        db.collection("furniture").doc(this.furniture.sku).set(this.furniture);
        console.log("Furniture successfully created with SKU: ", this.furniture.sku);
        this.watcher()
        this.close()
      } catch (error) {
        console.error("Error adding furniture: ", error);
      }
    },
    // Update User Information
    updateFurniture() {
      try {
        let docRef = this.furniture.sku.toString();
        console.log(docRef);

        db.collection("furniture").doc(docRef).update(this.furniture);
        console.log("Furniture successfully updated!");
      } catch (error) {
        console.error("Error updating furniture: ", error);
      }
    }
    ,
    clear() {
      this.furniture.sku = '';
      this.furniture.name = '';
      this.furniture.price = '';
      this.furniture.color = '';
      this.furniture.category = '';
      this.furniture.material = '';
      this.furniture.manufacture = '';

    },
    // Fetch Data and updates application with realtime data from firebase
    watcher() {
      this.furnitures = [];
      db.collection("furniture").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {

          const data = {
            'sku': doc.id,
            'name': doc.data().name,
            'price': doc.data().price,
            'color': doc.data().color,
            'category': doc.data().category,
            'material': doc.data().material,
            'manufacture': doc.data().manufacture,
          }

          this.furnitures.push(data);
        });
      });
    },
    editItem(sku) {
      this.newItemDialog = true
      db.collection("furniture").doc(sku).update(this.furniture)
          .then(() => {
            this.watcher();

            console.log("Document successfully updated!");
          })
          .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            this.errorMsg = true;
          });
    },

    deleteItem(furniture) {
      console.log(this.furniture)
      console.log(furniture)
      console.log(this.furnitures.indexOf(furniture))

      this.editedIndex = this.furnitures.indexOf(furniture)
      this.furniture = Object.assign({}, furniture)
      console.log(this.furniture.sku)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      console.log(this.furniture.sku)
      db.collection("furniture").doc(this.furnitures.sku).delete().then(() => {
        this.watcher();
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
      this.closeDelete()
    },

    close() {
      this.newItemDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // save () {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.furnitures[this.editedIndex], this.editedItem)
    //   } else {
    //     this.furnitures.push(this.editedItem)
    //   }
    //   this.close()
    // }
  }
}
</script>

<style scoped>

</style>
