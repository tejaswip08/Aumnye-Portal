<template>
  <div>
    <Overlay :Overlay="enableOverlay" />
    <!-- <v-toolbar color="transparent">
      <div>
        <div class="font-size-one font-weight-one">All Members</div>
      </div>
      <v-spacer />
      <v-text-field
        v-model="search"
        color="primary"
        label="Search Members"
        variant="outlined"
        rounded="lg"
        density="compact"
        hide-details
        style="max-width: 250px"
        class="mr-4 custom-label"
        prepend-inner-icon="mdi-magnify"
      />
      <v-btn
        variant="tonal"
        color="primary"
        class="text-capitalize font-size-three"
        @click="inviteMemberMethod()"
        >Invite Member
        <span
          style="display: inline-flex; width: 16px; height: 16px"
          class="ml-1"
        >
          <UserPlusIcon class="text-primary" /> </span
      ></v-btn>
    </v-toolbar> -->
    <v-card elevation="0" class="card-property">
      <v-card-text>
        <div class="d-flex justify-end mb-6">
          <div>
            <v-text-field
              v-model="search"
              color="primary"
              label="Search Members"
              variant="outlined"
              rounded="lg"
              density="compact"
              hide-details
              style="width: 250px"
              class="mr-4 custom-label"
              prepend-inner-icon="mdi-magnify"
            />
          </div>
          <div>
            <v-btn
              variant="tonal"
              color="primary"
              class="text-capitalize font-size-three"
              @click="inviteMemberMethod()"
              >Invite Member
              <span
                style="display: inline-flex; width: 16px; height: 16px"
                class="ml-1"
              >
                <UserPlusIcon class="text-primary" /> </span
            ></v-btn>
          </div>
        </div>
        <v-data-table
          fixed-header
          density="compact"
          :headers="
            CurrentUserDeatils.alumnnye_details &&
            CurrentUserDeatils.alumnnye_details.alumnye_type == 'UNIVERSITY'
              ? membersHeader.filter(
                  (item) =>
                    item.value != 'company' && item.value != 'designation'
                )
              : membersHeader
          "
          :items="membersItems"
          :loading="tableLoading"
          :height="tableHeight"
          :items-per-page="50"
          :page="page"
          :page-count="pageCount"
          @update:page="page = $event"
          hide-default-footer
          class="TableValFontsize mt-2"
        >
          <template v-slot:[`item.avatar`]="{ item }">
            <div class="mt-1 mb-1" sty>
              <v-avatar size="40" class="app-bar-avatar text-white">{{
                item.user_email_id.slice(0, 2).toUpperCase()
              }}</v-avatar>
            </div>
          </template>
          <!-- ṭest -->
          <template v-slot:[`item.sl_no`]="{ item, index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.user_created_on`]="{ item }">
            {{ new Date(item.user_created_on).toLocaleDateString("en-GB") }}
          </template>
          <template v-slot:[`item.user_status`]="{ item }">
            <div>
              <v-chip
                variant="tonal"
                :color="
                  item.user_status == 'Active'
                    ? 'green'
                    : item.user_status == 'Pending'
                    ? 'orange'
                    : 'primary'
                "
                size="small"
              >
                {{ item.user_status }}
              </v-chip>
            </div>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div>
              <v-btn icon flat size="small">
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
    <InviteMember
      :InviteMemberDialog="InviteMemberDialog"
      @clicked="InviteMemberDialogEmit"
    />
  </div>
</template>

<script>
import InviteMember from "@/components/AllMembers/InviteMembers.vue";
import Overlay from "@/components/Extras/Overlay.vue";
import { PencilSquareIcon, UserPlusIcon } from "@heroicons/vue/24/solid";

import { ListMembersData } from "@/mixins/Members/GetMembers.js";

export default {
  mixins: [ListMembersData],
  components: {
    Overlay,
    InviteMember,
    PencilSquareIcon,
    UserPlusIcon,
  },
  data: () => ({
    page: 1,
    pageCount: 1,
    search: "",
    tableHeight: 0,
    tableLoading: false,
    InviteMemberDialog: false,
    enableOverlay: false,
    membersHeader: [
      {
        title: "Sl No",
        value: "sl_no",
      },
      {
        title: "",
        value: "avatar",
      },
      {
        title: "Name",
        value: "user_name",
      },
      {
        title: "Phone Number",
        value: "user_phone_number",
      },
      {
        title: "Email ID",
        value: "user_email_id",
      },

      {
        title: "Company",
        value: "company",
      },
      {
        title: "Designation",
        value: "designation",
      },
      {
        title: "Year of Joining",
        value: "year_of_joining",
      },
      {
        title: "Status",
        value: "user_status",
      },
      {
        title: "Created On",
        value: "user_created_on",
      },
      {
        title: "Invited By",
        value: "onboarded_by_name",
      },
      {
        title: "Actions",
        value: "actions",
      },
    ],
    membersItems: [],
    CurrentUserDeatils: {},
  }),

  async mounted() {
    this.tableHeight = window.innerHeight - 260;
    this.membersItems = await this.ListMembersMethod();
    this.CurrentUserDeatils = {
      ...this.$store.getters.get_currentuser_details,
    };
    const sessionStData = sessionStorage.getItem("OPEN_CREATE_DIALOG");
    const parsedSessionStData = sessionStData
      ? JSON.parse(sessionStData)
      : undefined;
    if (parsedSessionStData?.value) {
      this.InviteMemberDialog = true;
      sessionStorage.removeItem("OPEN_CREATE_DIALOG");
    }
  },

  methods: {
    async inviteMemberMethod() {
      this.InviteMemberDialog = true;
    },

    async InviteMemberDialogEmit(Toggle) {
      this.InviteMemberDialog = false;
      if (Toggle == 2) {
        this.membersItems = await this.ListMembersMethod();
      }
    },
  },
};
</script>
