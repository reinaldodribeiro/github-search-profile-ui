<template>
  <div>
    <v-app-bar v-if="isLogged" app class="elevation-0" color="primary">
      <v-app-bar-nav-icon
        style="color: white"
        class="text--lighten-5 d-sm-flex"
        v-if="!hasOpen"
        @click="toggleSideBar"
      ></v-app-bar-nav-icon>

      <v-toolbar-title v-if="screen >= 480" class="font-github-ui">{{
        $route.name !== "Auth" ? $route.name : ""
      }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <p class="pa-4 mx-2 my-auto font-weight-medium" style="color: white">
        {{ user.email }}
      </p>
      <v-menu min-width="90px" offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn icon x-large v-bind="attrs" v-on="on">
            <v-avatar size="44">
              <v-icon color="white"> mdi-account-circle </v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card elevation="1">
          <v-list>
            <v-list-item link @click="logOut">
              <v-list-item-content>
                <v-list-item-title class="body-1 text-center">
                  Sair
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon style="color: white">
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script lang="ts">
import { User } from "@/models";
import Vue from "vue";

export default Vue.extend({
  name: "Header",

  data: () => ({
    currentLang: "pt",
    languages: ["pt"],
    screen: window.innerWidth,
  }),
  computed: {
    isLogged(): boolean {
      return this.$store.getters["auth/isLogged"];
    },
    hasOpen(): boolean {
      return this.$store.getters["app/getSidebarStatus"];
    },
    user(): User {
      const user = this.$store.getters["auth/getDataUser"];
      return user;
    },
  },

  methods: {
    toggleSideBar(): void {
      this.$store.commit(
        "app/toggleSideBarStatus",
        !this.$store.getters["app/getSidebarStatus"]
      );
    },
    logOut() {
      this.$store.dispatch("auth/logout");
    },
  },
});
</script>

<style lang="scss" scope>
.font-github-ui {
  font-family: $font-github-ui;
  font-size: 24px;
  font-weight: bold;
  color: white;
}
.avatar-style {
  border: 1.5px solid #7b7b85 !important;
  padding: 2px !important;
}
</style>
