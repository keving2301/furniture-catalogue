<template>
  <v-container>
    <v-item-group class="d-flex justify-center my-7" style="background-color: #e5e4e4; border-radius: 10px">
      <v-item class="py-3" style="font-weight: 500">
        <h5>Add New Furniture</h5>
      </v-item>
    </v-item-group>
    <v-layout class="d-flex justify-center my-7">
      <v-flex xs12 sm7 md6 lg5>
        <form @submit.prevent="submit">
          <v-text-field
              v-model="furniture.name"
              label="Furniture Name"
              required
          ></v-text-field>
          <v-text-field
              v-model="furniture.price"
              label="Price"
              required
          ></v-text-field>
          <v-select
              v-model="furniture.color"
              :items="colors"
              data-vv-name="select"
              label="Color"
              required
          ></v-select>
          <v-select
              v-model="furniture.category"
              :items="categories"
              data-vv-name="select"
              label="Category"
              required
          ></v-select>
          <v-select
              v-model="furniture.material"
              :items="materials"
              data-vv-name="select"
              label="Material"
              required
          ></v-select>
          <v-select
              v-model="furniture.manufacture"
              :items="manufactures"
              data-vv-name="select"
              label="Manufacture"
              required
          ></v-select>
          <v-text-field
              v-model="furniture.imageURL"
              label="Image URL"
              required
          ></v-text-field>
          <v-layout row >
            <v-flex class="mt-3 d-flex justify-center">
              <v-btn
                  :disabled="!formIsValid"
                  class="mr-4 primary--text"
                  type="submit"
              >
                submit
              </v-btn>
              <v-btn @click="clear"
                     class="error--text"
                     :disabled="!formHasInfo">
                clear
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
      <v-flex v-if="!furniture.imageURL" lg5 class="ml-10 pa-0 d-flex justify-center align-center"
              style="background-color: #e5e4e4; border-radius: 10px">
        <h2 style="font-weight: 300; color: lightgrey; position: fixed">Image URL Preview</h2>
      </v-flex>
      <v-flex v-if="furniture.imageURL" lg5 class="ml-lg-10 pa-0 d-flex justify-center align-center">
        <v-img contain v-if="furniture.imageURL"
               :src="furniture.imageURL"
               height="530" width="480">
        </v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {db} from '/src/firebase'

export default {
  name: "add-furniture",
  data() {
    return {
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

  computed: {
    formIsValid () {
      return this.furniture.name !== '' && this.furniture.price !== '' && this.furniture.manufacture !== '' &&
             this.furniture.color !== '' && this.furniture.category !== '' && this.furniture.material !== '' &&
             this.furniture.imageURL !== ''
    },
    formHasInfo () {
      return this.furniture.name !== '' || this.furniture.price !== '' || this.furniture.manufacture !== '' ||
          this.furniture.color !== '' || this.furniture.category !== '' || this.furniture.material !== '' ||
          this.furniture.imageURL !== ''
    }
  },

  methods: {
    //Generates Random SKU
    skuGenerator() {
      this.furniture.sku = Math.ceil(Math.random() * 1000000).toString();
    },
    // Creates New Furniture with an auto generated furniture SKU
    submit() {
      this.skuGenerator();
      try {
        db.collection("furniture").doc(this.furniture.sku).set(this.furniture);
        console.log("Furniture successfully created with SKU: ", this.furniture.sku);
      } catch (error) {
        console.error("Error adding furniture: ", error);
      }

    },
    // Update User Information
    updateFurniture() {
      console.log("document Exists Already");
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
          this.furniture.sku = "",
          this.furniture.name = "",
          this.furniture.price = "",
          this.furniture.manufacture = "",
          this.furniture.color = "",
          this.furniture.category = "",
          this.furniture.material = "",
          this.furniture.imageURL = ""
    }
  }

}
</script>

<style scoped>

</style>
