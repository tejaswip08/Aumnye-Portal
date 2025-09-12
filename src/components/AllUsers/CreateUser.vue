<template>
  <div>
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-dialog persistent width="700" :model-value="CreateUserDialog">
      <v-card class="CardBorderRadius app-font-style">
        <v-toolbar color="white">
          <span class="font-weight-one font-size-two ml-4"
            >Add Administrator</span
          >
          <v-spacer />
          <v-icon size="small" class="mr-4" @click="createUserDialogEmit"
            >mdi-close</v-icon
          >
        </v-toolbar>
        <v-divider />
        <div style="overflow-y: auto">
          <!-- <div
            class="pa-0 mx-auto"
            @click="uploadProfilePicMethod()"
            style="cursor: pointer; width: fit-content"
            v-if="selectedImageBlob == ''"
          >
            <v-img
              class="mx-auto mt-5 mb-2"
              :width="70"
              src="@/assets/profile-icon2.png"
            />
            <div
              class="font-size-three text-center font-weight-two"
              style="position: relative; bottom: 10px"
            >
              Click here to select profile image
            </div>
            <v-file-input
              v-show="false"
              v-model="profilePicFile"
              ref="profilePic"
              @change="imageSelectedMethod()"
            ></v-file-input>
          </div>
          <div v-if="selectedImageBlob !== ''">
            <v-img
              :src="selectedImageBlob"
              class="mx-auto mt-5 mb-2"
              :width="100"
            />
            <div class="d-flex justify-center">
              <v-btn
                size="small"
                variant="tonal"
                rounded
                color="red"
                @click="(selectedImageBlob = ''), (profilePicFile = {})"
              >
                Delete
                <span style="display: inline-flex; width: 16px; height: 16px">
                  <TrashIcon class="text-red" />
                </span>
              </v-btn>
            </div> 
          </div> -->
          <v-form ref="alumniForm" class="custom-form">
            <v-container>
              <v-row>
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"> Name* </label>
                    <v-text-field
                      v-model="alumni.UserName"
                      :rules="[(v) => !!v || 'Required']"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                    />
                  </div>
                </v-col> -->
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Email</label>
                    <v-text-field
                      v-model="alumni.email"
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
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Country Code</label
                    >
                    <v-autocomplete
                      v-model="alumni.countryCode"
                      :items="countryCodeList"
                      item-title="dial_code"
                      item-value="dial_code"
                      variant="outlined"
                      density="compact"
                      hide-details
                    >
                    </v-autocomplete>
                  </div>
                </v-col> -->
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Phone</label>
                    <v-text-field
                      v-model="alumni.phone"
                      type="tel"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Country</label>
                    <v-text-field
                      v-model="alumni.country"
                      type="tel"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col> -->
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Role</label>
                    <v-select
                      v-model="alumni.adminRole"
                      :items="adminRoleItems"
                      multiple
                      variant="outlined"
                      density="compact"
                      hide-details
                      rounded="lg"
                      required
                      color="primary"
                    >
                      <template v-slot:selection="{ item, index }">
                        <span
                          v-if="index === 0 && alumni.adminRole.length > 1"
                          class="grey--text text-caption"
                        >
                          (+{{ alumni.adminRole.length - 1 }} others)
                        </span>
                      </template>
                    </v-select>
                  </div>
                </v-col>
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Alumnye Type</label
                    >
                    <v-select
                      v-model="alumni.alumniType"
                      :items="adminRoleItems"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                      
                    />
                  </div>
                </v-col> -->
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Graduation Year</label
                    >
                    <v-select
                      v-model="alumni.graduationYear"
                      :items="years"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                      
                    />
                  </div>
                </v-col> -->
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Course</label>
                    <v-select
                      v-model="alumni.course"
                      :items="departments"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                                         />
                  </div>
                </v-col> -->
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Company</label>
                    <v-text-field
                      v-model="alumni.company"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col> -->
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Year of Joining</label
                    >
                    <v-text-field
                      v-model="alumni.yearOfJoining"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Year of Leaving</label
                    >
                    <v-text-field
                      v-model="alumni.yearOfLeaving"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Designation</label
                    >
                    <v-text-field
                      v-model="alumni.designation"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col> -->
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Course</label>
                    <v-text-field
                      v-model="alumni.course"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col> -->
                <!-- <v-col cols="12" md="6">
                <div class="field-wrapper">
                  <label class="field-label font-size-three">Role</label>
                  <v-select
                    v-model="alumni.role"
                    :items="adminRoleItems"
                    variant="outlined"
                    density="compact"
                    hide-details
                    required
                    
                  />
                </div>
              </v-col> -->
                <!-- <v-col cols="12">
                <div class="field-wrapper">
                  <label class="field-label font-size-three"
                    >LinkedIn Profile (Optional)</label
                  >
                  <v-text-field
                    v-model="alumni.linkedin"
                    variant="outlined"
                    density="compact"
                    placeholder="https://linkedin.com/in/username"
                    hide-details
                  />
                </div>
              </v-col> -->
              </v-row>
            </v-container>
          </v-form>
        </div>
        <!-- <v-divider class="mx-2 mt-2" /> -->
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
            @click="createUserDialogEmit"
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
            @click="addAlumnyeUserMethod()"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { TrashIcon } from "@heroicons/vue/24/solid";
import ContryCodes from "@/JSON/CountryDialCode.json";

import Snackbar from "@/components/Extras/SnackBar.vue";

import { createAlumnyeUser } from "@/mixins/Users/CreateAlumnyeUser.js";
export default {
  mixins: [createAlumnyeUser],
  props: {
    CreateUserDialog: Boolean,
  },
  components: {
    TrashIcon,
    Snackbar,
  },
  data: () => ({
    alumni: {
      UserName: "",
      email: "",
      phone: "",
      country: "",
      graduationYear: "",
      department: "",
      company: "",
      linkedin: "",
      adminRole: "",
      alumniType: "",
      countryCode: "",
      yearOfJoining: "",
      yearOfLeaving: "",
      designation: "",
      course: "",
    },
    selectedImageBlob: "",
    profilePicFile: {},
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    departments: [
      "Computer Science",
      "Electrical",
      "Mechanical",
      "Civil",
      "Business",
      "Arts",
    ],
    adminRoleItems: [
      "Member Management",
      "Event Management",
      "Broadcast Management",
    ],
    countryCodeList: [],
    btnLoader: false,
    SnackBarComponent: {},
  }),
  watch: {
    CreateUserDialog(val) {
      if (val) {
        this.countryCodeList = ContryCodes;
      }
    },
  },
  methods: {
    triggerPfpFileInputMethod() {
      this.$refs.profilePic.$el.querySelector('input[type="file"]').click();
    },

    uploadProfilePicMethod() {
      this.triggerPfpFileInputMethod();
    },

    imageSelectedMethod() {
      this.selectedImageBlob = URL.createObjectURL(this.profilePicFile);
      console.log("BLOB_IMAGE", this.selectedImageBlob);
    },

    async addAlumnyeUserMethod() {
      const isValid = await this.$refs.alumniForm.validate();
      if (isValid.valid) {
        console.log("VALIDATED");
        this.btnLoader = true;
        const inputParams = {
          alumnye_id: this.$store.getters.get_currentuser_details.alumnye_id,
          creator_user_id: this.$store.getters.get_currentuser_details.user_id,
          user_email_id: this.alumni.email || undefined,
          phone_number:
            `${this.alumni.countryCode}${this.alumni.phone}` || undefined,
          user_type: this.alumni.adminRole || undefined,
          profile_picture: undefined,
          current_country: undefined,
          user_country_code: this.alumni.countryCode || undefined,
        };
        const response = await this.createAlumnyeUserMethod(inputParams);
        if (response.status == "Success") {
          this.SnackBarComponent = {
            snackbarVmodel: true,
            snackbarColor: "green",
            snackbarMessage: response.status_message,
          };
          this.createUserDialogEmit(2);
          this.btnLoader = false;
        }
      } else {
        console.log("NOT_VALIDATED");
        this.SnackBarComponent = {
          snackbarVmodel: true,
          snackbarColor: "red",
          snackbarMessage: "Kindly fill the required details..!",
        };
      }
    },

    createUserDialogEmit(Toggle) {
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
