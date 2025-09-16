<template>
  <div>
    <Overlay :Overlay="enableOverlay" />
    <ApproveRejectMember
      :ApproveRejectMemberDialog="approveRejectMemberDialog"
      :StoreObj="storeObj"
      @clicked="approveRejectMemberDialogEmit"
    />
    <v-card elevation="0" class="card-property">
      <v-card-text>
        <!-- <div class="d-flex justify-end mb-6">
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
        </div> -->
        <v-data-table
          fixed-header
          density="compact"
          :headers="
            CurrentUserDeatils.alumnnye_details &&
            (CurrentUserDeatils.alumnnye_details.alumnye_type == 'UNIVERSITY' ||
              CurrentUserDeatils.alumnnye_details.alumnye_type ==
                'University' ||
              CurrentUserDeatils.alumnnye_details.alumnye_type == 'SCHOOL')
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
                item.user_name.slice(0, 2).toUpperCase()
              }}</v-avatar>
            </div>
          </template>
          <template v-slot:[`item.sl_no`]="{ item, index }">
            {{ index + 1 }}
          </template>
          <template v-slot:[`item.user_created_on`]="{ item }">
            {{ new Date(item.user_created_on).toLocaleDateString("en-GB") }}
          </template>
          <!-- <template v-slot:[`item.user_status`]="{ item }">
            <div>
              <v-chip
                variant="tonal"
                :color="item.user_status == 'Active' ? 'green' : 'red'"
                size="small"
              >
                {{ item.user_status }}
              </v-chip>
            </div>
          </template> -->
          <template v-slot:[`item.actions`]="{ item }">
            <div class="d-flex align-center">
              <div class="mr-2">
                <v-btn
                  variant="tonal"
                  color="green"
                  size="small"
                  rounded
                  class="text-capitalize"
                  @click="approveRejectMemberMethod(item, 'APPROVE')"
                  >Approve</v-btn
                >
              </div>
              <div class="grey-font">/</div>

              <div class="ml-2">
                <v-btn
                  variant="tonal"
                  color="red"
                  size="small"
                  rounded
                  class="text-capitalize"
                  @click="approveRejectMemberMethod(item, 'REJECT')"
                  >Reject</v-btn
                >
              </div>
              <!-- <v-btn icon flat size="small">
                <span style="display: inline-flex; width: 16px; height: 16px">
                  <PencilSquareIcon class="text-green" />
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
  </div>
</template>

<script>
import Overlay from "@/components/Extras/Overlay.vue";
import ApproveRejectMember from "@/components/Approvals/Dialogs/ApproveReject.vue";

import { listPendingMembersData } from "@/mixins/Approvals/GetPendingMembers.js";

export default {
  mixins: [listPendingMembersData],
  components: {
    Overlay,
    ApproveRejectMember,
  },
  data: () => ({
    CurrentUserDeatils: {},
    page: 1,
    pageCount: 1,
    search: "",
    tableHeight: 0,
    tableLoading: false,
    InviteMemberDialog: false,
    enableOverlay: false,
    approveRejectMemberDialog: false,
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
        title: "Invited On",
        value: "user_created_on",
      },
      {
        title: "Invited By",
        value: "onboarded_by_name",
      },
      {
        title: "Action",
        value: "actions",
      },
    ],
    membersItems: [],
    storeObj: {},
  }),

  async mounted() {
    this.tableHeight = window.innerHeight - 260;
    this.CurrentUserDeatils = {
      ...this.$store.getters.get_currentuser_details,
    };
    this.membersItems = await this.listPendingMembersDataMethod();
  },

  methods: {
    approveRejectMemberMethod(rowData, action) {
      this.storeObj = rowData;
      this.storeObj.action = action;
      this.approveRejectMemberDialog = true;
    },

    async approveRejectMemberDialogEmit(Toggle) {
      this.approveRejectMemberDialog = false;
      if (Toggle == 2) {
        this.membersItems = [];
        this.membersItems = await this.listPendingMembersDataMethod();
      }
    },
  },
};
</script>
