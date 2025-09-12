<template>
  <div>
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-dialog persistent :width="500" :model-value="ApproveRejectMemberDialog">
      <v-card class="CardBorderRadius app-font-style">
        <v-toolbar color="white">
          <span class="font-weight-one font-size-two ml-4">
            {{ StoreObj.action == "APPROVE" ? "Approve" : "Reject" }}
            Member</span
          >
          <v-spacer />
          <v-icon
            size="small"
            class="mr-4"
            @click="approveRejectMemberDialogEmit"
            >mdi-close</v-icon
          >
        </v-toolbar>
        <v-divider />
        <v-card-text>
          <div class="font-size-three">
            Do you want to
            {{ StoreObj.action == "APPROVE" ? "approve" : "reject" }}
            <span class="font-weight-one"> {{ StoreObj.user_name }} </span>?
          </div>
          <div class="mt-2">
            <v-text-field
              v-model="comment"
              class="custom-label"
              density="compact"
              variant="outlined"
              color="primary"
              rounded="lg"
              label="Comment"
            ></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            size="small"
            variant="tonal"
            :color="StoreObj.action == 'APPROVE' ? 'green' : 'red'"
            class="text-capitalize"
            rounded
            :loading="btnLoader"
            @click="approveRejectMemberMethod()"
          >
            {{ StoreObj.action == "APPROVE" ? "Approve" : "Reject" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Snackbar from "@/components/Extras/SnackBar.vue";

import { approveRejectMemberApi } from "@/mixins/Approvals/ApproveRejectMember.js";

export default {
  mixins: [approveRejectMemberApi],
  props: {
    ApproveRejectMemberDialog: Boolean,
    StoreObj: Object,
  },
  components: {
    Snackbar,
  },
  data: () => ({
    btnLoader: false,
    comment: "",
    SnackBarComponent: {},
  }),

  methods: {
    async approveRejectMemberMethod() {
      const inputParams = {
        updater_user_id: this.$store.getters.get_currentuser_details.user_id,
        alumnye_id: this.$store.getters.get_currentuser_details.alumnye_id,
        member_id: this.StoreObj.user_id,
        approval_action: this.StoreObj.action,
        comments: this.comment,
      };
      const response = await this.approveRejectMemberApiMethod(inputParams);
      if (response.status == "Success") {
        this.SnackBarComponent = {
          snackbarVmodel: true,
          snackbarColor: "green",
          snackbarMessage: response.status_message,
        };
        this.approveRejectMemberDialogEmit(2);
      }
    },
    approveRejectMemberDialogEmit(Toggle) {
      this.$emit("clicked", Toggle);
    },
  },
};
</script>

<style scoped>
.field-wrapper {
  display: flex;
  flex-direction: column;
}
.field-label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 1px;
  color: rgb(68, 67, 67);
}
</style>
