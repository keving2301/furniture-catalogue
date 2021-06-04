<template>
    <v-container>
      <v-card :color="color" outlined>
        <v-card-title>
          <v-icon color="white" large left>{{ icon }}</v-icon>
          <span class="white--text">{{ data }}</span>
        </v-card-title>
        <v-card-subtitle class="white--text">
          {{ title }}
        </v-card-subtitle>
      </v-card>
    </v-container>
</template>

<script>
export default {
    props: {
        title: String,
        color: String,
        data: Number,
        icon: String
    }
}
</script>
