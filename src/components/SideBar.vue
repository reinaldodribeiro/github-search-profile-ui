<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet color="primary" class="custom-class">
      <v-responsive
        min-height="128"
        v-ripple="{ center: true }"
        class="align-center"
      >
        <a href="/" class="top-sidebar align-center">
          <img
            src="../assets/icon_github.png"
            alt="Logotipo da GitHub"
            width="50px"
            height="50px"
          />
          <p style="margin-left: 15px">Github Search <br />Profile ®</p>
        </a>
      </v-responsive>
    </v-sheet>

    <v-list class="custom-class">
      <v-list-item-group v-model="item" color="secundary">
        <div v-for="(item, index) in dashboardItems" :key="index">
          <v-list-item
            :id="`vlist-${index}`"
            @click="setPath(item.link, item.target)"
            active-class="v-list-item--active"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list-item-group>
    </v-list>
    <v-divider color="#DFE0EB" class="mt-16 mb-5 custom-hr"></v-divider>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { NavItem } from "../models";
import router from "../router";

export default Vue.extend({
  name: "side-bar",

  computed: {
    drawer: {
      get(): boolean {
        return this.$store.getters["app/getSidebarStatus"];
      },
      set(status: boolean): void {
        this.$store.commit("app/toggleSideBarStatus", status);
      },
    },
    dashboardItems(): NavItem[] {
      return [
        {
          text: "Inicio",
          icon: "mdi-home",
          link: "/home",
          current: this.$route.path === "/home",
          target: false,
        },
        {
          text: "Favoritos",
          icon: "mdi-star",
          link: "/favorites",
          current: this.$route.path === "/favorites",
          target: false,
        },
      ];
    },
  },
  data: () => ({
    item: 0,
  }),
  watch: {
    $route: "currentRoute",
  },
  methods: {
    setPath(link, newWindow) {
      if (!newWindow) {
        router.push(link);
      }
    },
    currentRoute() {
      this.dashboardItems.some((item, index) => {
        if (this.$route.path === item.link) {
          this.item = index;
          return true;
        }
        return false;
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.top-sidebar {
  color: #a4a6b3;
  text-decoration: none;
  display: flex;
  margin-left: 2rem;
}

.top-sidebar p {
  font-family: "Mulish";
  font-weight: 700;
  line-height: 20px;
  opacity: 0.7;
  letter-spacing: 0.4px;
  margin-left: 2px;
  margin-bottom: 0;
}

.theme--light {
  &.v-navigation-drawer {
    background-color: #24292e !important;
    color: #dde2ff !important;
  }
  .v-list .v-list-item--active .v-icon {
    color: #dde2ff !important;
  }
  .v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: #a4a6b3 !important;
  }
  .v-icon:not(.v-list-item--active) {
    color: #a4a6b3 !important;
  }
}
.custom-class {
  background-color: #24292e !important;
  color: #dde2ff !important;
  font-family: "Mulish";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;
}

.v-list-item--active {
  border-left: 3px solid #dde2ff;
  color: #dde2ff !important;
}
.v-list-item--focus {
  border-left: 3px solid #dde2ff;
  color: #dde2ff !important;
}
.custom-hr {
  opacity: 0.1;
}

nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}
</style>
