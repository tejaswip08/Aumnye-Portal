<template>
  <div>
    <v-toolbar color="transparent">
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
        size="small"
        variant="flat"
        color="primary"
        class="text-capitalize font-size-three"
        @click="inviteMemberMethod()"
        >Invite Member <v-icon size="17">mdi-plus</v-icon></v-btn
      >
    </v-toolbar>
    <v-card elevation="0" class="card-property">
      <v-card-text>
        <v-data-table
          density="compact"
          :headers="membersHeader"
          :items="membersItems"
          :loading="tableLoading"
          :height="tableHeight"
          :items-per-page="50"
          :page="page"
          :page-count="pageCount"
          @update:page="page = $event"
          hide-default-footer
        >
          <template v-slot:[`item.user_name`]="{ item }">
            <div class="ma-2">
              <v-avatar size="40" class="app-bar-avatar text-white">{{
                item.user_name.slice(0, 2).toUpperCase()
              }}</v-avatar>
              <span class="ml-2">{{ item.user_name }}</span>
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
import { PencilSquareIcon } from "@heroicons/vue/24/solid";

import { ListMembersData } from "@/mixins/Members/GetMembers.js";

export default {
  mixins: [ListMembersData],
  components: {
    InviteMember,
    PencilSquareIcon,
  },
  data: () => ({
    page: 1,
    pageCount: 1,
    search: "",
    tableHeight: 0,
    tableLoading: false,
    InviteMemberDialog: false,
    membersHeader: [
      {
        title: "Name",
        value: "user_name",
      },
      {
        title: "Phone Number",
        value: "phone_number",
      },
      {
        title: "Email ID",
        value: "email",
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
        title: "Actions",
        value: "actions",
      },
    ],
    membersItems: [
      {
        user_name: "Tejaswi P",
        phone_number: "+91 9876543210",
        email: "tejaswi@example.com",
        country: "India",
        company: "TechCorp",
        designation: "Software Engineer",
        type: "Admin",
        actions: "Edit | Delete",
      },
      {
        user_name: "John Doe",
        phone_number: "+1 555-123-4567",
        email: "john@example.com",
        country: "USA",
        company: "Innovate Inc.",
        designation: "Product Manager",
        type: "Member",
        actions: "Edit | Delete",
      },
      {
        user_name: "Priya Sharma",
        phone_number: "+91 9123456789",
        email: "priya@example.com",
        country: "India",
        company: "WebWorks",
        designation: "Designer",
        type: "Member",
        actions: "Edit | Delete",
      },
      {
        user_name: "Michael Lee",
        phone_number: "+44 7700 900123",
        email: "michael@example.com",
        country: "UK",
        company: "GlobalSoft",
        designation: "Data Analyst",
        type: "Member",
        actions: "Edit | Delete",
      },
      {
        user_name: "Aisha Khan",
        phone_number: "+971 50 1234567",
        email: "aisha@example.com",
        country: "UAE",
        company: "NextGen Solutions",
        designation: "HR Manager",
        type: "Admin",
        actions: "Edit | Delete",
      },
    ],
  }),

  async mounted() {
    this.tableHeight = window.innerHeight - 260;
    await this.ListMembersMethod();
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
        await this.ListMembersMethod();
      }
    },
  },
};
</script>
