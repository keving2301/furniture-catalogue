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
         <v-layout row>
           <v-flex class="d-flex mt-5 justify-center">
             <input
                 ref="fileInput"
                 @change="onImageUpload"
                 accept="image/png/jpg/jpeg"
                 type="file"
                 style="display: none"
             >
             <v-btn block class="primary" @click="onFilePick">Upload Image</v-btn>
           </v-flex>
         </v-layout>
          <v-layout row>
            <v-flex class="mt-8 d-flex justify-center">
              <v-btn
                  :disabled="!formIsValid"
                  class="mr-4 primary--text"
                  type="submit"
              >
                submit
              </v-btn>
              <v-btn @click="clear"
                     class="mr-4 error--text"
                     :disabled="!formHasInfo">
                clear
              </v-btn>
              <v-btn @click="backToManagment"
                     class="error--text"
              >
                cancel
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
        imageURL: '',
        image: null
      }
    }
  },

  computed: {
    formIsValid() {
      return this.furniture.name !== '' && this.furniture.price !== '' && this.furniture.manufacture !== '' &&
          this.furniture.color !== '' && this.furniture.category !== '' && this.furniture.material !== '' &&
          this.furniture.imageURL !== ''
    },
    formHasInfo() {
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
      if (!this.formIsValid) {
        console.log("Form is not Valid")
        return
      }
      if(!this.furniture.image){
        console.log("Image is not Valid")
        return
      }

      this.skuGenerator()
      const furnitureData = {
        sku: this.furniture.sku,
        name: this.furniture.name,
        price: this.furniture.price,
        manufacture: this.furniture.manufacture,
        color: this.furniture.color,
        category: this.furniture.category,
        material: this.furniture.material,
        image: this.furniture.image,
      }

      this.$store.dispatch('createFurniture', furnitureData);
      this.$router.push('/admin/management');
      // try {
      //   db.collection("furniture").doc(this.furniture.sku).set(this.furniture);
      //   console.log("Furniture successfully created with SKU: ", this.furniture.sku);
      // } catch (error) {
      //   console.error("Error adding furniture: ", error);
      // }

    },

    onFilePick() {
      this.$refs.fileInput.click()
    },

    onImageUpload(event) {
      const files = event.target.files
      let filename = files[0].name

      if(filename.lastIndexOf('.') <= 0) {
        return alert ('Please add a valid image')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.furniture.imageURL = fileReader.result

      })
      fileReader.readAsDataURL(files[0])
      this.furniture.image = files[0]
    },

    backToManagment() {
      this.$router.push('/admin/management')
    },

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
