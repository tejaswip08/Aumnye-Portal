<template>
  <div>
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-dialog persistent width="700" :model-value="UpdateAlumniDialog">
      <v-card class="CardBorderRadius app-font-style">
        <v-toolbar color="white">
          <span class="font-weight-one font-size-two ml-4">Update Alumni</span>
          <v-spacer />
          <v-icon size="small" class="mr-4" @click="updateAlumniDialogEmit(1)"
            >mdi-close</v-icon
          >
        </v-toolbar>
        <v-divider />
        <div style="overflow-y: auto">
          <v-form ref="alumniForm" class="custom-form">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Name</label>
                    <v-text-field
                      v-model="CurrentUserObject.alumnye_name"
                      color="primary"
                      type="email"
                      variant="outlined"
                      rounded="lg"
                      density="compact"
                      hide-details
                      required
                      class="custom-input"
                    />
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Type</label>
                    <v-select
                      v-model="CurrentUserObject.alumnye_type"
                      :items="AlumniTypeItems"
                      variant="outlined"
                      density="compact"
                      hide-details
                      rounded="lg"
                      :disabled="CurrentUserObject.active_members_count <= 0"
                      required
                      color="primary"
                    >
                    </v-select>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </div>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            width="60"
            height="40"
            variant="elevated"
            color="#f3f4f6"
            size="large"
            elevation="0"
            class="font-size-three BtnBorderRadius text-capitalize text-#6a717e card-property"
            dark
            @click="updateAlumniDialogEmit(1)"
          >
            Cancel
          </v-btn>
          <v-btn
            :loading="btnLoader"
            width="120"
            height="40"
            variant="elevated"
            elevation="0"
            size="large"
            color="primary"
            class="font-size-three BtnBorderRadius mr-3 text-capitalize text-black"
            dark
            @click="validateMethod()"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Snackbar from "@/components/Extras/SnackBar.vue";

import { UpdateAlumne } from "@/graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
export default {
  props: {
    UpdateAlumniDialog: Boolean,
  },
  components: { Snackbar },
  data: () => ({
    btnLoader: false,
    AlumniTypeItems: ["SCHOOL", "UNIVERSITY", "CORPORATE"],
    CurrentUserObject: {},
    SnackBarComponent: {},
  }),
  watch: {
    UpdateAlumniDialog(val) {
      if (val == true) {
        this.CurrentUserObject = {
          ...this.$store.getters.get_currentuser_details.alumnnye_details,
        };
      }
    },
  },
  methods: {
    async validateMethod() {
      const isValid = await this.$refs.alumniForm.validate();
      if (isValid.valid) {
        this.updateAlumniDetailsMethod();
      } else {
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          SnackbarText: "Please enter valid details",
        };
      }
    },
    async updateAlumniDetailsMethod() {
      try {
        this.btnLoader = true;
        let inputparams = {
          updater_user_id: this.$store.getters.get_currentuser_details.user_id,
          alumnye_id: this.$store.getters.get_currentuser_details.alumnye_id,
          alumnye_name: this.CurrentUserObject.alumnye_name,
          alumnye_type: this.CurrentUserObject.alumnye_type,
          alumnye_start_year: this.CurrentUserObject.alumnye_start_year,
        };
        let result = await client.graphql({
          query: UpdateAlumne,
          variables: {
            input: inputparams,
          },
        });
        let ResultObj = JSON.parse(result.data.UpdateAlumne);
        if (ResultObj.status == "Success") {
          this.SnackBarComponent = {
            SnackbarVmodel: true,
            SnackbarColor: "green",
            SnackbarText: ResultObj.Status_Message,
          };
        }
        this.updateAlumniDialogEmit(2);
        this.btnLoader = false;
      } catch (error) {
        this.btnLoader = false;
        console.log(error);
      }
    },
    updateAlumniDialogEmit(Toggle) {
      this.$emit("clicked", Toggle);
    },
  },
};
</script>

<style></style>
