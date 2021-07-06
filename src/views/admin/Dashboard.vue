<template>
  <v-main>
    <v-container>
      <v-flex xs12 class="d-flex justify-center">
        <v-carousel class="carousel" height="300" hide-delimiter-background cycle :show-arrows="false">
          <v-carousel-item
              v-for="(slide,i) in slides"
              :key="i"
              :src="slide.src"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
      <v-divider class="my-7" style="border-width: 2px 0 0"></v-divider>
      <v-flex xs12 class="d-flex justify-center container--fluid">
        <v-layout row>
          <v-flex class="col-6">
            <v-btn class="d-flex justify-center align-center"
                   :to="{path: '/admin/management'}"
                   style="background-color: #455a64; height: 20rem; width: 100%">
              <v-icon class="mr-3 white--text">mdi-application-cog</v-icon>
              <span style="color: white; font-weight: 600; font-size: 20px">Management</span></v-btn>
          </v-flex>
          <v-flex class="col-6">
            <v-btn class="d-flex justify-center align-center"
                   :to="{path: '/admin/management'}"
                   style="background-color: cadetblue; height: 20rem; width: 100%">
              <v-icon class="mr-3 white--text">mdi-sofa-single-outline</v-icon>
              <span style="color: white; font-weight: 600; font-size: 20px">Catalog</span></v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-container>
  </v-main>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/storage'

export default {
  data() {
    return {
      slides: []
    }
  },
  mounted() {
    for (let i = 1; i <= 3; i++) {

      firebase.storage().ref().child('Slides/' + "slide" + i + ".png").getDownloadURL().then(url => {
        this.slides.push({src: url})
      })

    }
  }
}
</script>

<style scoped>

.carousel {
  max-width: 70rem;
}
</style>
