<template>
  <v-app>
    <SwitchAlumniDialog
      :SwitchAlumniDialog="SwitchAlumniDialog"
      @click="confirmSwitch"
    />
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
          <v-card class="elevation-0">
            <div
              class="font-size-two font-weight-one text-center text-BlueColorVariant1"
            >
              <v-icon class="mr-2">mdi-school</v-icon
              >{{ $store.getters.get_currentuser_details.alumnye_name }}
            </div>
            <v-btn
              block
              class="BtnHover mt-2"
              color="black"
              height="30"
              @click.stop="$router.push('/')"
            >
              Logout
            </v-btn>
          </v-card>
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar app color="white" elevation="1">
      <div class="fontsize20px font-weight-one ml-5">{{ $route.name }}</div>
      <v-spacer />
      <div class="mr-5 text-end">
        <div class="font-size-two font-weight-one">Admin User</div>
        <div class="font-size-three grey-font">
          {{ $store.getters.get_user_email }}
        </div>
      </div>
      <v-avatar
        size="50"
        @click="SwitchDrawer = true"
        class="mr-4 app-bar-avatar CursorPointer"
      >
        <v-icon color="white" size="small">mdi-account</v-icon>
      </v-avatar>
    </v-app-bar>
    <v-navigation-drawer
      v-if="SwitchDrawer"
      v-model="SwitchDrawer"
      :permanent="$vuetify.display.mobile"
      :location="$vuetify.display.mobile ? 'bottom' : 'right'"
      :width="drawerWidth ? 80 : 250"
      app
    >
      <v-icon @click.stop="SwitchDrawer = !SwitchDrawer"
        >mdi-chevron-double-right</v-icon
      >
      <div class="p-4 flex flex-col items-center text-center">
        <v-avatar size="70">
          <v-img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          />
        </v-avatar>
        <h3 class="text-lg font-semibold mt-2">
          {{ getCurrentUserDetailsObject.user_name }}
        </h3>
        <p class="text-sm text-gray-600 mt-2">
          {{ getCurrentUserDetailsObject.user_email_id }}
        </p>
        <v-chip color="primary" size="small" class="mt-2">
          {{ getCurrentUserDetailsObject.alumnye_type }}
        </v-chip>
      </div>

      <v-divider class="my-2"></v-divider>

      <!-- Details Section -->
      <div class="px-4 py-3 text-sm">
        <!-- <p class="mt-2">
          <strong>Alumni:</strong>
          {{ getCurrentUserDetailsObject.alumnye_name }}
        </p> -->
        <p class="mt-2">
          <strong>Phone:</strong>
          {{ getCurrentUserDetailsObject.user_phone_number }}
        </p>
        <!-- <p class="mt-2">
          <strong>Status:</strong>
          <v-chip
            :color="
              getCurrentUserDetailsObject.user_status === 'Active'
                ? 'green'
                : 'red'
            "
            size="x-small"
            class="ml-2"
          >
            {{ getCurrentUserDetailsObject.user_status }}
          </v-chip>
        </p> -->
        <p class="mt-2">
          <strong>User:</strong> {{ getCurrentUserDetailsObject.user_type }}
        </p>
      </div>
      <template v-slot:append>
        <div class="pa-3">
          <v-btn
            block
            rounded="xl"
            elevation="4"
            class="text-white backdrop-blur-md app-bar-avatar"
            style="
              background: rgba(255, 255, 255, 0.6);
              border: 1px solid rgba(255, 255, 255, 0.3);
            "
            prepend-icon="mdi-swap-horizontal"
            @click.stop="listalumnesMethod()"
          >
            Switch Alumni
          </v-btn>
        </div>
      </template>
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
import { getAllMyAlumnyes } from "@/Mixins/Extras/SwitchAlumni.js";
import SwitchAlumniDialog from "@/components/LandingPage/SwitchAlumniDialog.vue";
export default {
  components: {
    SwitchAlumniDialog,
  },
  mixins: [getCurrentUserDetailsfile, getAllMyAlumnyes],
  data: () => ({
    drawer: true,
    drawerWidth: false,
    SwitchDrawer: false,
    SwitchAlumniDialog: false,
    menuItems: [],
    SearchAlumni: "",

    SwitchAlumni: [{}],
    currentUser: {},
  }),

  async mounted() {
    this.menuItems = Routers;
    await this.getCurrentUserDetailsMethod();
  },
  methods: {
    listalumnesMethod() {
      this.SwitchAlumniDialog = true;
      // this.getAllMyAlumnyesDetailsMethod();
    },
    confirmSwitch() {
      this.SwitchAlumniDialog = false;
    },
  },
};
</script>

<style scoped>
/* Default menu item (inactive) */
.grey-font {
  color: #4a4a4a !important;
  font-weight: 500;
}

/* Active menu item */
.menu-btn {
  background-color: #f0f6ff !important;
  color: #1976d2 !important;
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
  background: linear-gradient(135deg, #4285f4, #6a1b9a) !important;
  border-radius: 8px;
}
</style>
