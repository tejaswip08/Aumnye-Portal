<template>
  <div>
    <v-dialog :model-value="confirmSwitchDialog" max-width="400" persistent>
      <v-card class="rounded-xl pa-4">
        <transition name="fade-scale" mode="out-in">
          <!-- Step 1: Confirm Switch -->
          <div
            v-if="!isSwitching && !switchSuccess"
            key="confirm"
            class="text-center"
          >
            <v-avatar rounded size="40" class="mb-3 app-bar-avatar">
              <v-icon
                rounder
                size="35"
                class="text-white"
                icon="mdi-swap-horizontal"
              />
            </v-avatar>
            <v-card-title class="text-h6 text-center">
              Switch Alumni
            </v-card-title>
            <v-card-text class="text-center">
              Are you sure you want to switch to
              <strong>{{ StoreObj?.alumnye_name }}</strong
              >?
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                width="60"
                height="40"
                variant="elevated"
                color="#f3f4f6"
                size="large"
                elevation="0"
                class="font-size-three BtnBorderRadius text-capitalize text-#6a717e card-property"
                dark
                @click="confirmSwitchEmit()"
              >
                No
              </v-btn>
              <v-btn
                width="60"
                height="40"
                variant="elevated"
                size="large"
                elevation="0"
                class="font-size-three BtnBorderRadius app-bar-avatar text-capitalize text-white card-property"
                dark
                :loading="btnLoader"
                @click="switchAlumni()"
              >
                Yes
              </v-btn>
            </v-card-actions>
          </div>

          <!-- Step 2: Loading Animation -->
          <div v-else-if="isSwitching" key="loading" class="text-center py-6">
            <v-progress-circular
              indeterminate
              color="primary"
              size="60"
              class="mb-4"
            />
            <div class="text-subtitle-1 text-grey-darken-1">
              Switching Alumni
            </div>
          </div>

          <!-- Step 3: Success -->
          <div v-else-if="switchSuccess" key="success" class="text-center py-6">
            <v-icon size="60" color="green" class="mb-3"
              >mdi-check-circle</v-icon
            >
            <div class="text-subtitle-1 font-weight-bold text-green">
              Switched Successfully!
            </div>
          </div>
        </transition>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { SwitchAlumnye } from "@/graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
export default {
  props: {
    confirmSwitchDialog: Boolean,
    StoreObj: Object,
  },
  data() {
    return {
      btnLoader: false,
      isSwitching: false,
      switchSuccess: false,
    };
  },
  methods: {
    async switchAlumni() {
      try {
        this.btnLoader = true;
        let inputParams = {
          current_alumnye_user_id:
            this.$store.getters.get_currentuser_details.user_id,
          current_alumnye_id:
            this.$store.getters.get_currentuser_details.alumnye_id,
          new_alumnye_user_id: this.StoreObj.user_id,
          new_alumnye_id: this.StoreObj.alumnye_id,
        };
        const result = await client.graphql({
          query: SwitchAlumnye,
          variables: {
            input: inputParams,
          },
        });
        const response = JSON.parse(result.data.SwitchAlumnye);
        if (response.status == "Success") {
          this.confirmSwitch();
        }
        this.btnLoader = false;
      } catch (error) {
        this.btnLoader = false;
        console.log("error", error);
      }
    },
    confirmSwitchEmit(Toggle) {
      this.$emit("clicked", Toggle);
    },
    async confirmSwitch() {
      this.isSwitching = true;
      setTimeout(() => {
        this.isSwitching = false;
        this.switchSuccess = true;
        setTimeout(() => {
          this.confirmSwitchEmit(2);
          this.switchSuccess = false;
        }, 1200);
      }, 2000);
    },
  },
};
</script>

<style scoped>
/* Smooth fade + scale animation */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
