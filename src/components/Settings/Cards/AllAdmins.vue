<template>
  <div>
    <v-card elevation="0" class="card-property">
      <v-toolbar color="white">
        <v-text-field
          v-model="search"
          color="primary"
          label="Search Administrators"
          variant="outlined"
          rounded="lg"
          density="compact"
          hide-details
          style="max-width: 350px"
          class="ml-4 custom-label"
          prepend-inner-icon="mdi-magnify"
        />
        <v-spacer />

        <v-btn
          variant="tonal"
          color="primary"
          class="text-capitalize font-size-three mr-4"
          @click="onboardUserMethod({}, 'CREATE')"
          >Add Administrators
          <v-icon size="17">mdi-plus</v-icon>
          <!-- 
        <span style="display: inline-flex; width: 16px; height: 16px">
          <PlusIcon class="text-white" />
        </span> -->
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-data-table
          density="compact"
          :headers="usersHeader"
          :items="usersList"
          :loading="tableLoading"
          :height="tableHeight"
          :items-per-page="50"
          :page="page"
          :page-count="pageCount"
          @update:page="page = $event"
          hide-default-footer
          class="TableValFontsize"
        >
          <template v-slot:[`item.user_email_id`]="{ item }">
            <div
              v-if="item.user_email_id"
              class="ma-2"
              style="position: relative; right: 15px"
            >
              <v-avatar size="40" class="app-bar-avatar text-white">{{
                item.user_email_id.slice(0, 2).toUpperCase()
              }}</v-avatar>
              <span class="ml-2">{{ item.user_email_id }}</span>
            </div>
            <div v-else>-</div>
          </template>
          <template v-slot:[`item.user_phone_number`]="{ item }">
            <div>
              {{ item.user_phone_number || "-" }}
            </div>
          </template>
          <template v-slot:[`item.user_status`]="{ item }">
            <div>
              <v-chip
                variant="tonal"
                :color="item.user_status == 'Active' ? 'green' : 'blue'"
                size="small"
              >
                {{ item.user_status }}
              </v-chip>
            </div>
          </template>
          <template v-slot:[`item.user_created_on`]="{ item }">
            <div>
              {{ new Date(item.user_created_on).toLocaleDateString("en-GB") }}
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <v-btn
                icon
                flat
                size="small"
                @click.stop="onboardUserMethod(item, 'EDIT')"
              >
                <span style="display: inline-flex; width: 16px; height: 16px">
                  <PencilSquareIcon class="text-green" />
                </span>
              </v-btn>
              <!-- <v-btn
                icon
                flat
                size="small"
                style="display: relative; right: 8px"
              >
                <span style="display: inline-flex; width: 16px; height: 16px">
                  <TrashIcon class="text-red" />
                </span>
              </v-btn> -->
            </div>
          </template>
          <template v-slot:bottom="{ pageCount }">
            <div class="d-flex justify-end">
              <div>
                <v-pagination
                  color="primary"
                  v-model="page"
                  :length="pageCount"
                  total-visible="4"
                  prev-icon="mdi-menu-left"
                  next-icon="mdi-menu-right"
                  size="small"
                ></v-pagination>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <Overlay :Overlay="enableOverlay" />
    <CreateUser
      :CreateUserDialog="CreateUserDialog"
      :StoreObj="StoreObj"
      @clicked="createUserDialogEmit"
    />
  </div>
</template>

<script>
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";

import CreateUser from "@/components/AllUsers/CreateUser.vue";
import Overlay from "@/components/Extras/Overlay.vue";

import { listAlumnyeUsers } from "@/mixins/Users/GetAlumnyeUsers.js";
export default {
  mixins: [listAlumnyeUsers],
  props: ["route_from"],
  components: {
    PencilSquareIcon,
    TrashIcon,
    CreateUser,
    Overlay,
  },
  data: () => ({
    page: 1,
    pageCount: 1,
    search: "",
    tableHeight: 0,
    tableLoading: false,
    CreateUserDialog: false,
    enableOverlay: false,
    usersHeader: [
      // {
      //   title: "Name",
      //   value: "user_name",
      // },
      // {
      //   title: "Phone Number",
      //   value: "user_phone_number",
      // },
      {
        title: "Email ID",
        value: "user_email_id",
      },
      // {
      //   title: "Created On",
      //   value: "user_created_on",
      // },
      {
        title: "Type",
        value: "user_type",
      },
      {
        title: "Status",
        value: "user_status",
      },
      {
        title: "Actions",
        value: "actions",
      },
    ],
    StoreObj: {},
    usersList: [],
  }),

  async mounted() {
    this.tableHeight = window.innerHeight - 300;
    if (this.$store.getters.get_currentuser_details.user_type == "Admin") {
      console.log("UNDER_ADMIN");
      this.usersHeader.pop();
    }
    console.log("ALUMYE_USER", this.$store.getters.get_currentuser_details);
    this.usersList = await this.ListAlumnyeUsers();
    const sessionStData = sessionStorage.getItem("OPEN_CREATE_DIALOG");
    const parsedSessionStData = sessionStData
      ? JSON.parse(sessionStData)
      : undefined;
    if (parsedSessionStData?.value) {
      this.CreateUserDialog = true;
      sessionStorage.removeItem("OPEN_CREATE_DIALOG");
    }
  },

  methods: {
    onboardUserMethod(item, action) {
      this.StoreObj = item;
      this.StoreObj.action = action;
      this.CreateUserDialog = true;
    },

    createUserDialogEmit(Toggle) {
      this.CreateUserDialog = false;
      if (Toggle == 2) {
        this.usersList = this.ListAlumnyeUsers();
      }
    },
  },
};
</script>
