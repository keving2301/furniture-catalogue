<template>
  <v-main>
    <v-item-group class="d-flex justify-center my-7" style="background-color: #e5e4e4; border-radius: 10px">
      <v-item class="py-3" style="font-weight: 500">
        <h5>Add New Furniture</h5>
      </v-item>
    </v-item-group>
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
      <v-btn
          :disabled="invalid"
          class="mr-4"
          type="submit"
      >
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </v-main>
</template>

<script>
import {db} from '/src/firebase'

export default {
  name: "add-furniture",
  data() {
    return {
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
      }
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
      }}
    ,
      clear()
      {
        this.name = '';
        this.price = '';
        this.email = '';
      }
    }

  }
</script>

<style>

</style>
