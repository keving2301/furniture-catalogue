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
export default {
  data() {
    return {
      slides: [
        {
          src: require('/src/assets/Slides/slide1.png')
        },
        {
          src: require('/src/assets/Slides/slide2.png')
        },
        {
          src: require('/src/assets/Slides/slide3.png')
        }
      ]
    }
  },
}
</script>

<style scoped>

.carousel {
  max-width: 70rem;
}
</style>
