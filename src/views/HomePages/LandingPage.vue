<template>
  <v-app>
    <SwitchAlumniDialog
      :SwitchAlumniDialog="SwitchAlumniDialog"
      @clicked="confirmSwitch"
    />
    <UpdateCurrentUserDialog
      :UpdateCurrentUserDialog="UpdateCurrentUserDialog"
      @clicked="InviteMemberDialogEmit"
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

      <div class="mr-5 text-start">
        <div class="font-size-two font-weight-one">
          {{ $store.getters.get_currentuser_details.alumnye_name }}
          <!-- <span>
            <v-switch
              elevation="0"
              size="small"
              @click.stop="listalumnesMethod()"
            >
            </v-switch>
          </span> -->
        </div>
        <div class="font-size-three grey-font">
          {{ $store.getters.get_currentuser_details.user_type }}
        </div>
      </div>

      <!-- <v-avatar
        size="50"
        @click="SwitchDrawer = true"
        class="mr-4 app-bar-avatar CursorPointer"
      >
        <span
          v-if="$store.getters.get_currentuser_details.user_email_id"
          class="text-white"
          size="small"
          >{{
            $store.getters.get_currentuser_details.user_name.slice(0, 2)
          }}</span
        >
      </v-avatar> -->
      <v-menu
        v-model="menu"
        transition="slide-x-transition"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            size="50"
            class="mr-4 app-bar-avatar CursorPointer"
          >
            <span
              v-if="$store.getters.get_currentuser_details.user_name"
              class="text-white"
              size="small"
              >{{
                $store.getters.get_currentuser_details.user_name.slice(0, 2)
              }}</span
            >
          </v-avatar>
        </template>

        <v-card class="card-property pa-3" elevation="1" :width="300">
          <v-card-actions class="mt-n2">
            <v-spacer />
            <v-icon @click="menu = false">mdi-close</v-icon>
          </v-card-actions>
          <div class="p-4 flex flex-col items-center text-center">
            <v-avatar size="70">
              <v-img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              />
            </v-avatar>
            <h3 class="text-lg font-semibold mt-2">
              {{ $store.getters.get_currentuser_details.user_name }}
            </h3>
            <p class="text-sm text-gray-600 mt-1">
              {{ $store.getters.get_currentuser_details.user_email_id }}
            </p>
          </div>
          <v-btn
            class="app-bar-avatar mt-4 text-white"
            block
            @click.stop="updateProfileDialog"
            ><v-icon class="mr-2">mdi-pencil</v-icon>Update Profile</v-btn
          >

          <v-expansion-panels
            class="mt-4 rounded-lg elevation-1"
            variant="accordion"
          >
            <v-expansion-panel>
              <v-expansion-panel-title class="font-weight-medium">
                <v-icon class="mr-2 text-primary">mdi-school</v-icon>
                Switch Alumni
              </v-expansion-panel-title>

              <!-- Content -->
              <v-expansion-panel-text class="pt-2">
                <v-list density="compact">
                  <v-list-item
                    v-for="(alumni, index) in alumniList"
                    :key="index"
                    class="rounded-lg mb-2 CursorPointer hover-list-item"
                    :ripple="false"
                  >
                    <!-- Avatar -->
                    <template v-slot:prepend>
                      <v-avatar
                        size="36"
                        class="mr-3 text-white font-weight-bold app-bar-avatar"
                      >
                        {{ alumni.alumnye_name.slice(0, 2).toUpperCase() }}
                      </v-avatar>
                    </template>

                    <!-- Alumni Info -->
                    <v-list-item-title class="font-weight-medium">
                      {{ alumni.alumnye_name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-chip size="x-small" color="blue" variant="outlined">
                        {{ alumni.alumnye_type }}
                      </v-chip>
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-menu>
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
          {{ $store.getters.get_currentuser_details.user_name }}
        </h3>
        <p class="text-sm text-gray-600 mt-2">
          {{ $store.getters.get_currentuser_details.user_email_id }}
        </p>
        <v-chip color="primary" size="small" class="mt-2">
          {{ $store.getters.get_currentuser_details.alumnye_type }}
        </v-chip>
      </div>

      <v-divider class="my-2" />

      <div class="px-4 py-3 text-sm">
        <p class="mt-2">
          <strong>Phone:</strong>
          {{ $store.getters.get_currentuser_details.user_phone_number }}
        </p>

        <p class="mt-2">
          <strong>User:</strong>
          {{ $store.getters.get_currentuser_details.user_type }}
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
import SwitchAlumniDialog from "@/components/LandingPage/SwitchAlumniDialog.vue";
import UpdateCurrentUserDialog from "@/components/LandingPage/CurrentUserUpdate.vue";
export default {
  components: {
    SwitchAlumniDialog,
    UpdateCurrentUserDialog,
  },
  mixins: [getCurrentUserDetailsfile],
  data: () => ({
    drawer: true,
    menu: false,
    drawerWidth: false,
    SwitchDrawer: false,
    SwitchAlumniDialog: false,
    UpdateCurrentUserDialog: false,
    menuItems: [],
    SearchAlumni: "",

    SwitchAlumni: [{}],
    currentUser: {},
    alumniList: [
      { alumnye_name: "Mobil80", alumnye_type: "Corporate" },
      { alumnye_name: "EduLink", alumnye_type: "Educational" },
      { alumnye_name: "TechPioneers", alumnye_type: "Startup" },
    ],
  }),

  async mounted() {
    this.menuItems = Routers;
    await this.getCurrentUserDetailsMethod();
  },
  methods: {
    listalumnesMethod() {
      this.SwitchAlumniDialog = true;
    },
    confirmSwitch() {
      this.SwitchAlumniDialog = false;
    },
    updateProfileDialog() {
      this.menu = false;
      this.UpdateCurrentUserDialog = true;
    },
    InviteMemberDialogEmit() {
      this.UpdateCurrentUserDialog = false;
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
.hover-list-item {
  transition: background-color 0.2s;
}
.hover-list-item:hover {
  background-color: #f5f7fa;
}
</style>
