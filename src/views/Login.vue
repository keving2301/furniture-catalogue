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
              <v-icon class="mb-10" color="grey" size="2.5rem">mdi-atlassian</v-icon>
              <h3>Admin Portal</h3>
              <h5>Don't have an account? <a class="ma-2">Request Access
                <v-icon class="ml-1" color="primary" small>mdi-key</v-icon>
              </a></h5>
            </v-form>

            <v-card-text>
              <v-form ref="form" lazy-validation v-bind:disabled="disabled">
                <v-text-field v-model="email" :rules="emailRules" label="E-Mail" outlined prepend-icon="mdi-email"
                              type="text"/>
                <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                              :rules="passwordRules"
                              :type="showPassword ? 'text' : 'password'" label="Password"
                              outlined
                              prepend-icon="mdi-lock"
                              @click:append="showPassword = !showPassword"/>
              </v-form>

              <p class="red--text">{{ error }} </p>
              <a class="reset-password">Forgot password?</a>

            </v-card-text>

            <v-card-actions>
              <v-btn block color="primary" height="40" v-bind:disabled="disabled" @click="validate">
                <span v-show="!disabled">Login</span>
                <span v-show="disabled">
                  <v-progress-circular color="primary" indeterminate></v-progress-circular>
                </span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      disabled: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      showPassword: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      error: ''
    }
  },
  methods: {

    validate() {
      if (this.$refs.form.validate()) {
        this.disabled = true;

        firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
              this.disabled = false;
              this.$router.replace({path: "/admin"});
            })
            .catch(err => {
              this.disabled = false;
              this.error = err.message;
            });
      }
    }
  }
}
</script>
