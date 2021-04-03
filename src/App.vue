<template>
  <v-app id="dashboard">
    <div v-if="isLogged && !load" id="isAutenticate">
      <div>
        <Header />
        <side-bar />
        <v-main>
          <router-view></router-view>
        </v-main>
      </div>
    </div>

    <div v-else-if="!load && !isLogged">
      <div>
        <LayoutAuth />
      </div>
    </div>

    <SnackBar />
    <div v-if="isLoading || load">
      <Loading />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "./components/Header.vue";
import SideBar from "./components/SideBar.vue";
import Loading from "./components/Loading.vue";
import LayoutAuth from "./components/LayoutAuth.vue";
import SnackBar from "./components/SnackBar.vue";

export default Vue.extend({
  name: "App",

  components: {
    Header,
    SideBar,
    Loading,
    LayoutAuth,
    SnackBar,
  },
  data: () => ({
    load: true,
  }),
  computed: {
    isLogged(): boolean {
      return this.$store.getters["auth/isLogged"];
    },
    isLoading(): boolean {
      return this.$store.getters["auth/isLoading"];
    },
  },
  mounted() {
    this.$store.dispatch("auth/isLogged");
    setTimeout(() => {
      this.load = false;
    }, 500);
  },
});
</script>

<style lang="scss"></style>
