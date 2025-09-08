<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!$vuetify.display.mobile"
      :location="$vuetify.display.mobile ? 'bottom' : 'left'"
      :width="drawerWidth ? 80 : 250"
      app
    >
      <div class="d-flex align-center mt-2">
        <div class="d-flex align-center ml-4" v-if="!drawerWidth">
          <div>
            <v-btn class="app-bar-avatar" density="default">
              <v-icon size="25" color="white">mdi-school</v-icon>
            </v-btn>
          </div>
          <div class="fontsize15px font-weight-one ml-3">Alumnye</div>
        </div>
        <div class="ml-1" :class="drawerWidth ? 'ml-3' : 'ml-6'">
          <v-btn flat icon @click.stop="drawerWidth = !drawerWidth">
            <v-icon size="30">
              {{ drawerWidth ? "mdi-chevron-right" : "mdi-chevron-left" }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <v-divider class="mt-2" />

      <v-list>
        <v-list-item
          v-for="(menuItem, index) in menuItems"
          :key="index"
          density="compact"
          rounded="lg"
          class="ml-3 mr-3 mt-2 mb-2"
          :class="menuItem.menuName === $route.name ? 'menu-btn' : 'grey-font'"
          @click="$router.push(menuItem.menuPath)"
        >
          <v-list-item-title class="pa-2">
            <div class="d-flex align-center">
              <div
                class="mr-2"
                :class="drawerWidth ? 'custom-menu-icon' : undefined"
              >
                <v-icon size="small">{{ menuItem.menuIcon }}</v-icon>
              </div>
              <div
                class="font-size-two font-weight-two"
                :class="drawerWidth ? 'disable-menu-name' : undefined"
              >
                {{ menuItem.menuName }}
              </div>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            class="BtnHover"
            color="black"
            @click.stop="$router.push('/')"
          >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app color="white" elevation="1">
      <v-spacer></v-spacer>
      <v-text-field
        v-model="text"
        label="Search Alumni, events.."
        variant="solo"
        rounded="lg"
        bg-color="#f3f4f6"
        density="compact"
        hide-details
        style="max-width: 250px"
        class="mr-4 font-size-three custom-label"
        prepend-inner-icon="mdi-magnify"
        flat
      />
      <div class="mr-5 text-end">
        <div class="font-size-two font-weight-one">Admin User</div>
        <div class="font-size-three grey-font">tejaswi@mobil80.com</div>
      </div>
      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ props }">
          <v-avatar size="50" v-bind="props" class="mr-4 app-bar-avatar">
            <v-icon color="white" size="small">mdi-account</v-icon>
          </v-avatar>
        </template>
        <v-card colo="white" width="300">
          <div class="mt-2 text-center font-size-two font-weight-one">
            Tejaswi@mobil80.com
          </div>
          <v-btn
            variant="tonal"
            color="red"
            class="ma-2"
            @click.stop="$router.push('/')"
            >Logout</v-btn
          >
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="SwitchDrawer"
      :permanent="$vuetify.display.mobile"
      :location="$vuetify.display.mobile ? 'bottom' : 'right'"
      :width="drawerWidth ? 80 : 250"
      app
    >
    </v-navigation-drawer>
    <v-main>
      <div class="content-div pa-4">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Routers from "@/JSON/Routers.json";
import { getCurrentUserDetailsfile } from "@/Mixins/Extras/GetCurrentUser.js";
export default {
  mixins: [getCurrentUserDetailsfile],
  data: () => ({
    drawer: true,
    drawerWidth: false,
    SwitchDrawer: false,
    menuItems: [],

    SwitchAlumni: [{}],
  }),

  mounted() {
    this.menuItems = Routers;
    this.getCurrentUserDetailsMethod();
  },
};
</script>

<style scoped>
/* Default menu item (inactive) */
.grey-font {
  color: #4a4a4a !important; /* grey text */
  font-weight: 500;
}

/* Active menu item */
.menu-btn {
  background-color: #f0f6ff !important; /* light blue background */
  color: #1976d2 !important; /* blue text/icon */
  border-radius: 8px !important;
  position: relative;
  font-weight: 600;
}

/* Blue left border effect */
.menu-btn::before {
  content: "";
  position: absolute;
  left: 0;
  top: 1px; /* aligns with rounded corners */
  bottom: 1px;
  width: 4px;
  background-color: #1976d2; /* blue accent */
  border-radius: 4px;
}

/* Ensure icon also turns blue when active */
.menu-btn .v-icon {
  color: #1976d2 !important;
}

/* On hover for inactive items */
.v-list-item:hover:not(.menu-btn) {
  background-color: rgba(0, 0, 0, 0.04) !important;
  border-radius: 8px;
}
.BtnHover:hover {
  background-color: rgba(221, 15, 15, 0.89) !important;
  border-radius: 8px;
}
</style>
