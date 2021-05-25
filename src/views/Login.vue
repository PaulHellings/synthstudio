<template>
  <v-container>
    <v-row class="mt-8">
      <v-col md="6" offset-md="3">
        <v-card color="grey" class="lighten-3">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field ref="txtEmail"
                            type="email"
                            name="email"
                            prepend-icon="mdi-mail"
                            v-model="email"></v-text-field>
              <v-text-field :type="showPass ? 'text' : 'password'"
                            name="password"
                            prepend-icon="mdi-lock"
                            append-icon="mdi-eye"
                            required
                            v-model="password"
                            @click:append="showPass = !showPass"></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login" color="grey" class="darken-2" dark>Login</v-btn>
            <v-btn @click="resetLogin" text>Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Login',

  data() {
    return {
      showPass: false,
      email: '',
      password: '',
    };
  },

  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
                this.$router.go({ path: this.$router.path });
              },
              err => {
                console.log(err);
              },
          )
      ;
    },
    resetLogin() {
      this.email = '';
      this.password = '';
      this.$refs.txtEmail.$refs.input.focus();
    },
  },
};
</script>

<style scoped>

</style>