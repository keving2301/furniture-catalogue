<template>
  <v-main>
    <div style="width: 85rem" class= "container" >
      <v-carousel hide-delimiter-background cycle :show-arrows="false" >
        <v-carousel-item
            v-for="(slide,i) in slides"
            :key="i"
            :src="slide.src"
        ></v-carousel-item>
      </v-carousel>
    </div>
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
