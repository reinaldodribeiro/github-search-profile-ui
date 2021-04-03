<template>
  <v-container>
    <v-app-bar app class="elevation-0" height="90" color="#f7f8fc">
      <div class="logo-center">
        <a href="/">
          <img
            src="../assets/icon_github.png"
            alt="Logotipo Github"
            width="50px"
            height="50px"
          />
          <p style="margin-left: 15px">GitHub Search <br />Profiles ®</p>
        </a>
      </div>
    </v-app-bar>
    <v-row class="flex-center">
      <v-card class="card" outlined elevation="15">
        <v-row justify="center">
          <v-col :cols="12">
            <v-card-title style="justify-content: center" class="title">
              <img src="../assets/logo_write.png" width="100" />
            </v-card-title>
          </v-col>
        </v-row>
        <router-view></router-view>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import Vue from "vue";

export default Vue.extend({
  name: "layout-auth",
});
</script>

<style lang="scss">
.card {
  align-self: center;
  top: 20%;
  justify-content: center;
  max-width: 420px;
  background-color: black;
  flex: 1;
}
form fieldset {
  border: thin solid rgba(0, 0, 0, 0.12) !important;
}
.title {
  border-radius: 6px 6px 0 0;
  border-color: #24292e;
  background-color: white;
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
.logo-center {
  margin: 1% auto 0;
  justify-content: center;
  display: flex;

  a {
    display: flex;
    text-decoration: none;

    p {
      font-weight: bold;
      color: #a4a6b3;
    }
  }
}
</style>
