<template>
  <v-app>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12"
               md="8"
               sm="12"
        >
          <v-card class="mx-auto rounded-sm pa-10" elevation="5" height="37rem" max-width="34rem">

            <!--            <v-toolbar color="primary" dark flat>-->
            <!--              <v-toolbar-title class="headline">Admin Panel</v-toolbar-title>-->
            <!--            </v-toolbar>-->
            <v-form class="mb-8">
              <v-icon v-if="!formIsValid" color=grey class="mb-10" size="2.5rem">mdi-atlassian</v-icon>
              <v-icon v-if="formIsValid" color=blue class="mb-10" size="2.5rem">mdi-atlassian</v-icon>
              <h3>Sign Up</h3>
              <h5>Already a user? <a class="ma-2 text-decoration-none" href="/login">Login
                <v-icon class="ml-1" color="primary" small>mdi-key</v-icon>
              </a></h5>
            </v-form>

            <v-card-text>
              <v-form lazy-validation @submit.prevent="validate">
                <v-text-field v-model="email" :rules="emailRules" label="E-Mail" outlined prepend-icon="mdi-email"
                              type="text"/>
                <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                              :rules="passwordRules"
                              :type="showPassword ? 'text' : 'password'" label="Password"
                              outlined
                              prepend-icon="mdi-lock"
                              @click:append="showPassword = !showPassword"/>
                <v-text-field v-model="comparePassword" :append-icon="showComparePassword ? 'mdi-eye-off' : 'mdi-eye'"
                              :rules="[passwordsMatch]"
                              :type="showComparePassword ? 'text' : 'password'" label="Password"
                              outlined
                              prepend-icon="mdi-lock"
                              @click:append="showComparePassword = !showComparePassword"/>
                  <p class="red--text">{{ error }} </p>

                  <v-btn :disabled="!formIsValid" block color="primary" height="40" type="submit">
                    <span>Sign Up</span>
                  </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      showPassword: false,
      showComparePassword: false,
      password: '',
      comparePassword: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      error: ''
    }
  },
  computed: {
    formIsValid() {
      return this.email !== '' && this.password !== '' && this.comparePassword !== '';
    },
    passwordsMatch() {
      return this.password !== this.comparePassword ? 'Passwords do not match' : ''
    },
    user () {
      return this.$store.getters["auth/user"]
    }
  },

  methods: {

    validate() {
      console.log(this.email + "   " + this.password)
      this.$store.dispatch('auth/signUserUp', {email: this.email, password: this.password})
      this.$router.push('/admin')
    }
  }
}
</script>
