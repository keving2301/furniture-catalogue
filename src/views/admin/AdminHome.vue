<template>
  <v-app style="background-color: #FAFAFA; color: rgba(0, 0, 0, 0.87)">
    <v-overlay :value="drawer" opacity="0" z-index="4">
    </v-overlay>

    <v-navigation-drawer
        v-model="drawer" :style="{ top: $vuetify.application.top + 'px', zIndex: 4 }" app clipped hide-overlay
        temporary>
      <v-list>
        <v-list-item @click="goto(homePath.path)">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <!--        Catalog Section-->
        <v-list-group prepend-icon="mdi-view-grid-outline">
          <template v-slot:activator>
            <v-list-item-title>Catalog</v-list-item-title>
          </template>
          <v-list-item-group class="ml-14">
            <v-list-item v-for="(catalog, index) in catalogs" :key="index" link>
              <!--              <v-icon class="mr-5">{{ catalog.icon }}</v-icon>-->
              <v-list-item-title v-text="catalog.title"></v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list-group>

        <!--        Tools Section-->
        <v-list-group prepend-icon="mdi-briefcase-edit">
          <template v-slot:activator>
            <v-list-item-title>Tools</v-list-item-title>
          </template>
          <v-list-item-group class="ml-14">
            <v-list-item v-for="(tool, index) in tools" :key="index" link @click="goto(tool.path)">
              <!--              <v-icon class="mr-5">{{ tool.icon }}</v-icon>-->
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

    <v-app-bar app clipped-left color="white" light>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="color:grey; font-weight: 500; letter-spacing: .009375em; cursor: pointer"
                       @click="goto(homePath.path)">
        Furniture Catalog
      </v-toolbar-title>
      <v-spacer/>
      <v-btn icon text @click="dark = !dark">
        <v-icon>{{ dark ? 'mdi-brightness-4' : 'mdi-brightness-6' }}</v-icon>
      </v-btn>
      <v-btn icon text @click="logOut()">
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <router-view class="pt-0 mt-0"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer :style="{ bottom: $vuetify.application.bottom + 'px', zIndex: 4 }" app
              elevation="7"
              style="background-color: white; height: 4rem">
      <div class="flex text-center">
        <span class="lead text--secondary text-center">© 2021 All Rights Reserved. Design by
          <a class="text-decoration-none" href="https://kevingarcia.dev" target="_blank">Kevin Garcia</a>
        </span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth'

export default {
  data: () => ({
    dark: false,
    path: '/admin',
    drawer: null,
    homePath: {
      path: ''
    },
    menus: [
      {path: '/account', title: 'My Account', icon: 'mdi-account'},
      {path: '/support', title: 'Support', icon: 'mdi-face-agent'}
    ],
    catalogs: [
      {path: '/bedroom', title: 'Beds & Bedrooms', icon: 'mdi-bed'},
      {path: '/livingroom', title: 'Living Rooms', icon: 'mdi-sofa'},
      {path: '/dining', title: 'Dining Rooms', icon: 'mdi-table-picnic'},
      {path: '/accessories', title: 'Accessories', icon: 'mdi-image-frame'}
    ],
    tools: [
      {path: '/management', title: 'Management', icon: 'mdi-pencil-outline'},
    ]
  }),
  created() {
    this.dark = this.$vuetify.theme.dark
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
    },
    drawer: function () {

    }
  }
}
</script>

