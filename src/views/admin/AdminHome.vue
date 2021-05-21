<template>
  <v-app>
    <v-navigation-drawer
        v-model="drawer" app clipped>
      <v-list>
        <v-list-item @click="goto(homePath.path)">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

<!--        Catalog Section-->
        <v-list-group prepend-icon="mdi-view-grid-outline" >
          <template v-slot:activator>
            <v-list-item-title>Catalog</v-list-item-title>
          </template>
          <v-list-item-group class="ml-7">
            <v-list-item v-for="(catalog, index) in catalogs" :key="index" link>
              <v-icon class="mr-5">{{catalog.icon}}</v-icon>
              <v-list-item-title v-text="catalog.title"></v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>

<!--        Tools Section-->
        <v-list-group prepend-icon="mdi-briefcase-edit" >
          <template v-slot:activator>
            <v-list-item-title>Tools</v-list-item-title>
          </template>
          <v-list-item-group class="ml-7">
            <v-list-item v-for="(tool, index) in tools" :key="index" link>
              <v-icon class="mr-5">{{tool.icon}}</v-icon>
              <v-list-item-title v-text="tool.title"></v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>

<!--        Non-Dropdown Menus-->
        <v-list-item-group color="primary">
          <v-list-item v-for="(menu, index) in menus" :key="index" @click="goto(menu.path)">
            <v-icon>{{ menu.icon }}</v-icon>
            <v-list-item-title class="normal-font ml-8">{{ menu.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer/>
      <v-btn icon text @click="dark = !dark">
        <v-icon>{{ dark ? 'mdi-brightness-4' : 'mdi-brightness-6' }}</v-icon>
      </v-btn>
      <v-btn icon text @click="logOut()">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <div class="flex text-center">
        <span class="lead text--secondary text-center">Software & Design ❤️
          <a class="text-decoration-none" href="https://ahm3tcelik.github.io" target="_blank">Ahmet ÇELİK</a>
        </span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase';
import {mapActions} from 'vuex';

export default {
  data: () => ({
    dark: false,
    path: '/admin',
    drawer: null,
    homePath: {
      path: ''
    },
    menus: [
      {path: '/sounds', title: 'My Account', icon: 'mdi-account'},
      {path: '/sounds', title: 'Support', icon: 'mdi-face-agent'}
    ],
    catalogs: [
      {path: '/bedroomSets', title: 'Beds & Bedrooms', icon: 'mdi-bed'},
      {path: '/bedroomSets', title: 'Living Rooms', icon: 'mdi-sofa'},
      {path: '/bedroomSets', title: 'Dining Rooms', icon: 'mdi-table-picnic'},
      {path: '/bedroomSets', title: 'Accessories', icon: 'mdi-image-frame'}
    ],
    tools: [
      {path: '/bedroomSets', title: 'Add Furniture', icon: 'mdi-plus-circle'},
      {path: '/bedroomSets', title: 'Delete Furniture', icon: 'mdi-pencil-outline'},
      {path: '/bedroomSets', title: 'Edit Furniture', icon: 'mdi-delete-forever'}
    ]
  }),
  created() {
    this.dark = this.$vuetify.theme.dark
    this.loadSounds;
    this.loadBedroomSets;
  },
  computed: {
    ...mapActions({
      loadSounds: 'sounds/loadSounds',
      loadBedroomSets: 'bedroomSets/loadBedroomSets',
    }),
  },
  methods: {
    logOut() {
      firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({path: '/'});
          });
    },
    goto(newPath) {
      this.$router.push({path: this.path + newPath}).catch(() => {
      });
    }
  },
  watch: {
    dark: function () {
      this.$vuetify.theme.dark = this.dark;
    }
  }
}
</script>

