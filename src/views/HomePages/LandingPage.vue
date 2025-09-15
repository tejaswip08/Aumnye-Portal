<template>
  <v-app>
    <UpdateCurrentUserDialog
      :UpdateCurrentUserDialog="UpdateCurrentUserDialog"
      @clicked="InviteMemberDialogEmit"
    />
    <confirmSwitchDialog
      :confirmSwitchDialog="confirmSwitchDialog"
      :StoreObj="StoreObj"
      @clicked="confirmSwitchEmit"
    />
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
            <v-img src="@/assets/app-icon.png" :width="40" />
            <!-- </v-btn> -->
          </div>
          <div class="fontsize15px font-weight-one ml-3">Alumnye</div>
        </div>
        <div class="ml-1" :class="drawerWidth ? 'ml-3' : 'ml-15'">
          <v-btn flat icon @click.stop="drawerWidth = !drawerWidth">
            <v-icon size="30">
              {{ drawerWidth ? "mdi-chevron-right" : "mdi-chevron-left" }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <v-divider class="mt-2" />
      <v-list>
        <template v-for="(menuItem, index) in menuItems" :key="index">
          <v-list-item
            density="compact"
            rounded="lg"
            class="ml-3 mr-3 mt-2 mb-2"
            :class="
              menuItem.menuName === $route.name ? 'menu-btn' : 'grey-font'
            "
            @click="toggleMenu(menuItem)"
          >
            <v-list-item-title class="pa-2">
              <div class="d-flex align-center justify-space-between w-100">
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
                <v-icon v-if="menuItem.subMenu" size="small">
                  {{
                    openMenus.includes(menuItem.menuName)
                      ? "mdi-chevron-up"
                      : "mdi-chevron-down"
                  }}
                </v-icon>
              </div>
            </v-list-item-title>
          </v-list-item>
          <v-expand-transition>
            <div v-if="openMenus.includes(menuItem.menuName)">
              <v-list-item
                v-for="(subItem, subIndex) in menuItem.subMenu"
                :key="subIndex"
                density="compact"
                rounded="lg"
                class="mr-3 mt-1 mb-1"
                :class="[
                  subItem.menuName === $route.name ? 'menu-btn' : 'grey-font',
                  drawerWidth ? '' : 'ml-8',
                ]"
                @click="$router.push(subItem.menuPath)"
              >
                <v-list-item-title class="pa-2">
                  <div class="d-flex align-center">
                    <v-icon size="small" class="mr-2">{{
                      subItem.menuIcon
                    }}</v-icon>
                    <div class="font-size-three font-weight-two">
                      {{ subItem.menuName }}
                    </div>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </div>
          </v-expand-transition>
        </template>
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
      <div class="fontsize20px font-weight-one ml-8">
        {{ $route.name }}
      </div>
      <v-spacer />
      <div class="mr-5 text-start">
        <!-- <div class="font-size-two font-weight-one text-primary CursorPointer">
          {{ $store.getters.get_currentuser_details.alumnye_name }}
        </div> -->
        <v-menu
          v-model="alumniMenu"
          transition="scale-transition"
          offset-y
          min-width="260"
          location="bottom"
        >
          <!-- Activator -->
          <template v-slot:activator="{ props }">
            <div
              v-bind="props"
              class="font-size-two font-weight-one text-primary CursorPointer d-flex align-center"
              style="padding: 6px 10px; border-radius: 8px; transition: 0.2s"
            >
              <span>{{
                $store.getters.get_currentuser_details.alumnnye_details
                  .alumnye_name
              }}</span>
              <v-icon size="18" class="ml-2">mdi-menu-down</v-icon>
            </div>
          </template>

          <!-- Dropdown Card -->
          <v-card
            class="rounded-xl"
            elevation="8"
            style="min-width: 280px; background-color: #f9fbff"
          >
            <!-- Title -->
            <div
              class="px-4 py-2 text-subtitle-2 font-weight-bold text-grey-darken-2 d-flex align-center"
              style="border-bottom: 1px solid #e6e9f0"
            >
              <v-icon size="18" class="mr-2 text-primary"
                >mdi-swap-horizontal</v-icon
              >
              Switch Alumni
            </div>

            <!-- Alumni List -->
            <div align="center" class="my-4">
              <v-progress-circular
                v-if="AlumniList_Bool"
                indeterminate
                color="primary"
                size="50"
              />
            </div>
            <v-list
              v-if="sortedAlumniList && sortedAlumniList.length"
              density="comfortable"
              class="pa-2"
            >
              <v-list-item
                v-for="(alumni, index) in sortedAlumniList"
                :key="index"
                class="rounded-lg mb-2 CursorPointer hover-list-item"
                :ripple="false"
                @click="switchAlumni(alumni)"
              >
                <!-- Avatar -->
                <template v-slot:prepend>
                  <v-avatar
                    size="36"
                    class="mr-3 text-white font-weight-bold app-bar-avatar"
                    color="primary"
                  >
                    <v-icon size="20" color="white">
                      <template
                        v-if="
                          alumni.alumnye_type === 'Corporate' ||
                          alumni.alumnye_type === 'CORPORATE'
                        "
                      >
                        mdi-office-building
                      </template>
                      <template
                        v-else-if="alumni.alumnye_type === 'University'"
                      >
                        mdi-school
                      </template>
                      <template v-else-if="alumni.alumnye_type === 'School'">
                        mdi-domain
                      </template>
                      <template v-else>mdi-account-group</template>
                    </v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="font-weight-medium">
                  {{ alumni.alumnye_name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip size="small" color="blue" variant="outlined">
                    {{ alumni.alumnye_type }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <div
              v-if="!alumniList.length && !AlumniList_Bool"
              class="text-center my-3"
            >
              No Alumni Found
            </div>
          </v-card>
        </v-menu>

        <div class="font-size-three grey-font ml-3 mt-n1">
          {{ $store.getters.get_currentuser_details.user_type }} -
          {{
            $store.getters.get_currentuser_details.alumnnye_details.alumnye_type
          }}
        </div>
      </div>
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
            @click="updateProfileDialog"
          >
            <span
              v-if="$store.getters.get_currentuser_details.user_email_id"
              class="text-white"
              size="small"
              >{{
                $store.getters.get_currentuser_details.user_email_id
                  .slice(0, 2)
                  .toUpperCase()
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
              <v-expansion-panel-text class="pt-2">
                <v-list density="compact">
                  <v-list-item
                    v-for="(alumni, index) in alumniList"
                    :key="index"
                    class="rounded-lg mb-2 CursorPointer hover-list-item"
                    :ripple="false"
                  >
                    <template v-slot:prepend>
                      <v-avatar
                        size="36"
                        class="mr-3 text-white font-weight-bold app-bar-avatar"
                      >
                        {{ alumni.alumnye_name.slice(0, 2).toUpperCase() }}
                      </v-avatar>
                    </template>
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
    <v-main>
      <div class="content-div pa-4">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Routers from "@/JSON/Routers.json";
import { getCurrentUserDetailsfile } from "@/mixins/GetCurrentUserDetails.js";
import { getAllMyAlumnyes } from "@/mixins/Extras/SwitchAlumni.js";
import UpdateCurrentUserDialog from "@/components/LandingPage/CurrentUserUpdate.vue";
import confirmSwitchDialog from "@/components/LandingPage/SwitchAlumniDialog.vue";
import { SwitchAlumnye } from "@/graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
export default {
  mixins: [getCurrentUserDetailsfile, getAllMyAlumnyes],
  components: { UpdateCurrentUserDialog, confirmSwitchDialog },
  data: () => ({
    drawer: true,
    drawerWidth: false,
    SwitchDrawer: false,
    alumniMenu: false,
    AlumniList_Bool: false,
    confirmSwitchDialog: false,
    StoreObj: {},
    menuItems: [],
    SearchAlumni: "",
    openMenus: [],
    SwitchAlumni: [{}],
    menu: false,
    alumniList: [],
    UpdateCurrentUserDialog: false,
  }),

  computed: {
    sortedAlumniList() {
      return [...this.alumniList].sort((a, b) =>
        a.alumnye_name?.localeCompare(b.alumnye_name)
      );
    },
  },

  watch: {
    async alumniMenu(val) {
      if (val == true) {
        this.alumniList = [];
        this.SwitchDrawer = false;
        this.alumniList = await this.getAllMyAlumnyesDetailsMethod();
      }
    },
  },

  async mounted() {
    this.menuItems = Routers;
    this.menuItems = await this.getCurrentUserDetailsMethod();
    // this.$router.push("/my-dashboard");
  },

  methods: {
    toggleMenu(menuItem) {
      if (menuItem.subMenu) {
        const idx = this.openMenus.indexOf(menuItem.menuName);
        if (idx > -1) {
          this.openMenus.splice(idx, 1); // close
        } else {
          this.openMenus.push(menuItem.menuName); // open
        }
      } else {
        this.$router.push(menuItem.menuPath);
      }
    },
    async switchAlumni(AlumniId) {
      this.StoreObj = AlumniId;
      this.confirmSwitchDialog = true;

      // try {
      //   let inputParams = {
      //     current_alumnye_user_id:
      //       this.$store.getters.get_currentuser_details.user_id,
      //     current_alumnye_id:
      //       this.$store.getters.get_currentuser_details.alumnye_id,
      //     new_alumnye_user_id: AlumniId.user_id,
      //     new_alumnye_id: AlumniId.alumnye_id,
      //   };
      //   const result = await client.graphql({
      //     query: SwitchAlumnye,
      //     variables: {
      //       input: inputParams,
      //     },
      //   });
      //   const response = JSON.parse(result.data.SwitchAlumnye);
      //   this.getCurrentUserDetailsMethod();
      //   this.alumniList = await this.getAllMyAlumnyesDetailsMethod();

      //   return response;
      // } catch (error) {
      //   console.log("error", error);
      // }
    },
    updateProfileDialog() {
      this.menu = false;
      this.UpdateCurrentUserDialog = true;
    },
    async confirmSwitchEmit(Toggle) {
      this.confirmSwitchDialog = false;
      if (Toggle == 2) {
        this.$router.push("/my-dashboard");
        this.menuItems = await this.getCurrentUserDetailsMethod();
        this.alumniList = await this.getAllMyAlumnyesDetailsMethod();
      }
    },

    InviteMemberDialogEmit() {
      this.UpdateCurrentUserDialog = false;
    },
    logoutMethod() {
      $router.push("/");
      this.$store.commit("SET_CURRENT_USER", {});
      this.$store.commit("SET_USER_MAIL", "");
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
