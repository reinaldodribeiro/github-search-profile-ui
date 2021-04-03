<template>
  <div class="content-card">
    <div style="margin-bottom: 15px">
      <b class="text-h6">Bem Vindo</b>
    </div>

    <div>
      <span>Por favor efetue o login para utilizar o sistema.</span>
    </div>

    <v-form class="formLogin" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        style="margin-top: 20px"
        v-model="email"
        outlined
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        style="height: 60px"
        label="Senha"
        outlined
        v-model="password"
        :rules="passwordRules"
        required
        class="radius field-width"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        id="password"
      ></v-text-field>
    </v-form>

    <div class="divider-login">
      <v-divider></v-divider>
    </div>

    <v-btn elevation="1" color="primary" @click="login" style="width: 100%">
      Login
    </v-btn>

    <div class="divider-login">
      <v-divider></v-divider>
    </div>
    <v-row justify="center">
      <span @click="createAccount"
        >Não possui conta ? <a><b>Registrar-se</b></a></span
      >
    </v-row>
  </div>
</template>

<script lang='ts'>
export default {
  mounted() {
    window.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        if (this.$route.name === "Login") {
          this.login();
        }
      }
    });
  },
  data: () => ({
    showPassword: false,
    valid: false,
    email: "",
    password: "",
    loading: false,
    emailRules: [
      (v) => !!v || "O campo E-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "Insira um e-mail válido",
    ],
    passwordRules: [
      (str) => !!str || "O campo senha é obrigatório",
      (str) => str.length >= 7 || "A senha deve conter no mínimo 7 caracteres",
    ],
  }),
  methods: {
    login() {
      if (this.valid) {
        this.loading = true;
        this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });
      }
    },
    createAccount() {
      this.$router.push("create-account");
    },
  },
};
</script>

<style lang="scss">
form fieldset {
  border: thin solid rgba(0, 0, 0, 0.12) !important;
}
.v-label.theme--light {
  color: #4a677a;
}
.text-h6 {
  color: black;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em;
}
.divider-login {
  padding-top: 20px;
  padding-bottom: 20px;
}
.content-card {
  padding: 20px;
}
</style>
