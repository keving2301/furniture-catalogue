<template>
  <v-main>
    <v-container>
      <v-flex xs12 class="d-flex justify-center">
        <v-carousel class="carousel" hide-delimiter-background cycle :show-arrows="false">
          <v-carousel-item
              v-for="(slide,i) in slides"
              :key="i"
              :src="slide.src"
          ></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-container>
  </v-main>
</template>

<script>
import {storage} from '/src/firebase'

export default {
  data() {
    return {
      slides: []
    }
  },
  mounted() {
    for (let i = 1; i <= 3; i++) {
      storage.ref().child('Slides/' + "slide" + i + ".png").getDownloadURL().then(url => {
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
