<template>
  <div class="content-card">
    <div style="margin-bottom: 15px">
      <b class="text-h6">Registrar-se</b>

      <v-form
        class="formRegister"
        ref="formRegister"
        v-model="validForm"
        lazy-validation
      >
        <v-text-field
          style="margin-top: 20px"
          v-model="email"
          outlined
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
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

        <v-text-field
          style="height: 60px"
          label="Confirmar senha"
          v-model="passwordConfirmation"
          :error-messages="validPassword"
          v-on:blur="(event) => validConfirmPassword(event.target.value)"
          outlined
          required
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPassword ? 'text' : 'password'"
          @click:append="showConfirmPassword = !showConfirmPassword"
        ></v-text-field>
      </v-form>

      <div class="divider-login">
        <v-divider></v-divider>
      </div>

      <v-btn
        elevation="1"
        color="primary"
        @click="createAccount"
        style="width: 100%"
      >
        Registrar-se
      </v-btn>

      <div class="divider-login">
        <v-divider></v-divider>
      </div>
      <v-btn elevation="1" @click="pushLogin" style="width: 100%">
        Login
      </v-btn>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  name: "create-account",
  data: () => ({
    showPassword: false,
    showConfirmPassword: false,
    validForm: false,
    email: "",
    password: "",
    validPassword: "",
    passwordConfirmation: "",
    loading: false,
    emailRules: [
      (v) => !!v || "O campo E-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "Insira um e-mail válido",
    ],
    passwordRules: [
      (str) => !!str || "O campo senha é obrigatório",
      (str) =>
        str.length >= 7 || "O campo senha deve conter no mínimo 7 caracteres",
    ],
  }),
  methods: {
    async createAccount() {
      if (this.$refs.formRegister.validate()) {
        const data = {
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        };
        this.$store.dispatch("auth/register", data);
      }
    },
    pushLogin() {
      this.$router.push("login");
    },
    validConfirmPassword(value: string) {
      if (value !== this.password) {
        this.validPassword = "As senhas não conferem";
        this.validForm = false;
      } else {
        this.validPassword = "";
      }
    },
  },
});
</script>

<style lang="scss">
form fieldset {
  border: thin solid rgba(0, 0, 0, 0.12) !important;
}
.title {
  border-radius: 6px 6px 0 0;
  border-color: #24292e;
  background-color: white;
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
.flex-center {
  height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
