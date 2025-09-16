<template>
  <div>
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-dialog persistent width="700" :model-value="InviteMemberDialog">
      <v-card class="CardBorderRadius app-font-style">
        <v-toolbar color="white">
          <span class="font-weight-one font-size-two ml-4"
            >{{
              StoreObj.action == "EDIT"
                ? "Update"
                : getCurrentInfoObj.user_type == "Member"
                ? "Invite"
                : "Add"
            }}
            Member</span
          >
          <v-spacer />
          <v-icon size="small" class="mr-4" @click="InviteMemberDialogEmit(1)"
            >mdi-close</v-icon
          >
        </v-toolbar>
        <v-divider />
        <div style="overflow-y: auto">
          <!-- <div v-show="false">
            <div
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
            </div>
          </div> -->
          <v-form ref="alumniForm" class="custom-form">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"> Name* </label>
                    <v-text-field
                      v-model="memberName"
                      :rules="[(v) => !!v || 'Required']"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Email</label>
                    <v-text-field
                      v-model="memberEmail"
                      type="email"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                      :rules="[
                        (v) => !!v || '',
                        (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
                      ]"
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Country Code</label
                    >
                    <v-autocomplete
                      v-model="memberCountryCode"
                      :items="countryCodeList"
                      item-title="dial_code"
                      item-value="dial_code"
                      variant="outlined"
                      density="compact"
                      hide-details
                    >
                    </v-autocomplete>
                    <!-- <v-select
                      v-model="alumni.countryCode"
                      :items="countryCodeList"
                      item-value="dial_code"
                      variant="outlined"
                      density="compact"
                      hide-details
                      
                      virtual-scroll
                    >
                      <template v-slot:item="{ props, item }">
                        <v-list-item
                          v-bind="props"
                          :title="`${item.raw.name} (${item.raw.dial_code})`"
                        />
                      </template>

                      <template v-slot:selection="{ item }">
                        {{ item.raw.dial_code }}
                      </template>
                    </v-select> -->
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Phone</label>
                    <v-text-field
                      v-model="memberPhone"
                      type="tel"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col>
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Country</label>
                    <v-text-field
                      v-model="memberCountry"
                      type="tel"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col> -->
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">User Type</label>
                    <v-select
                      v-model="memberUserType"
                      :items="memberUserTypeItems"
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
                      >Alumnye Type</label
                    >
                    <v-select
                      v-model="memberAlumniType"
                      :items="memberAlumnyeTypeItems"
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
                      v-model="memberGraduationYear"
                      :items="years"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                    />
                  </div>
                </v-col> -->
                <v-col
                  v-if="
                    getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'UNIVERSITY' ||
                    getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'University'
                  "
                  cols="12"
                  md="6"
                >
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Course</label>
                    <v-select
                      v-model="memberCourse"
                      :items="courseMaster"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                    />
                  </div>
                </v-col>
                <v-col
                  v-if="
                    getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'CORPORATE' ||
                    getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'Corporate'
                  "
                  cols="12"
                  md="6"
                >
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Company</label>
                    <v-text-field
                      v-model="memberCompany"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col>
                <v-col
                  v-if="
                    getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'CORPORATE' ||
                    getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'Corporate'
                  "
                  cols="12"
                  md="6"
                >
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Designation</label
                    >
                    <v-text-field
                      v-model="memberDesignation"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col>
                <v-col
                  v-if="
                    getCurrentInfoObj &&
                    getCurrentInfoObj.alumnnye_details &&
                    (getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'UNIVERSITY' ||
                      getCurrentInfoObj.alumnnye_details.alumnye_type ==
                        'University')
                  "
                  cols="12"
                  md="6"
                >
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Department</label
                    >
                    <v-select
                      v-model="Department"
                      :items="departmentMaster"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col>

                <v-col
                  v-if="
                    getCurrentInfoObj &&
                    getCurrentInfoObj.alumnnye_details &&
                    (getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'UNIVERSITY' ||
                      getCurrentInfoObj.alumnnye_details.alumnye_type ==
                        'University')
                  "
                  cols="12"
                  md="6"
                >
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Hostel</label>
                    <v-select
                      v-model="Hostel"
                      :items="hostelMaster"
                      variant="outlined"
                      density="compact"
                      hide-details
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Year of Joining</label
                    >
                    <v-autocomplete
                      v-model="memberYearOfJoining"
                      variant="outlined"
                      density="compact"
                      hide-details
                      :items="Alumni_StartYear"
                    />
                  </div>
                </v-col>
                <!-- <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Year of Leaving</label
                    >
                    <v-text-field
                      v-model="memberYearOfLeaving"
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
                      v-model="memberRole"
                      :items="memberRoles"
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
              <div
                v-if="
                  getCurrentInfoObj.alumnnye_details.alumnye_type ==
                    'CORPORATE' ||
                  getCurrentInfoObj.alumnnye_details.alumnye_type == 'Corporate'
                "
                class="field-wrapper mt-5"
              >
                <label class="field-label font-size-three">Work Profile</label>

                <v-textarea
                  v-model="memberWorkProfile"
                  variant="outlined"
                  density="compact"
                  :counter="5000"
                  maxlength="5000"
                >
                </v-textarea>
              </div>
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
            @click="InviteMemberDialogEmit(1)"
          >
            Cancel
          </v-btn>

          <v-btn
            v-if="StoreObj.action != 'EDIT'"
            :loading="btnLoader"
            width="120"
            height="40"
            variant="elevated"
            elevation="0"
            size="large"
            color="primary"
            class="font-size-three BtnBorderRadius mr-3 text-capitalize text-black"
            dark
            @click="inviteMemberMethod()"
          >
            {{ getCurrentInfoObj.user_type == "Member" ? "Invite" : "Add" }}
          </v-btn>
          <v-btn
            v-if="StoreObj.action == 'EDIT'"
            :loading="btnLoader"
            width="120"
            height="40"
            variant="elevated"
            elevation="0"
            size="large"
            color="primary"
            class="font-size-three BtnBorderRadius mr-3 text-capitalize text-black"
            dark
            @click.stop="updateMemberMethod()"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { TrashIcon } from "@heroicons/vue/24/solid";
import ContryCodes from "@/JSON/CountryDialCode.json";

import Snackbar from "@/components/Extras/SnackBar.vue";

import { createMember } from "@/mixins/Members/CreateMembers.js";
import { ListMasterSettingsData } from "@/mixins/Settings/MasterSettings.js";
import { UpdateMember } from "@/graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
export default {
  mixins: [createMember, ListMasterSettingsData],
  props: {
    InviteMemberDialog: Boolean,
    StoreObj: Object,
  },
  components: {
    TrashIcon,
    Snackbar,
  },
  data: () => ({
    memberRole: "",
    memberCourse: "",
    memberDesignation: "",
    memberYearOfLeaving: "",
    memberYearOfJoining: "2020",
    Department: "",
    Hostel: "",
    memberCompany: "",
    memberCourse: "",
    memberGraduationYear: "",
    memberAlumniType: "",
    memberUserType: "",
    memberCountry: "",
    memberPhone: "",
    memberCountryCode: "+91",
    memberEmail: "",
    memberName: "",
    memberWorkProfile: "",
    memberUserTypeItems: [],
    memberAlumnyeTypeItems: [],
    memberRoles: [],
    memberUserTypeItems: ["Admin", "Alumni Coordinator", "Event Manager"],
    courseMaster: [],
    departmentMaster: [],
    hostelMaster: [],
    selectedImageBlob: "",
    profilePicFile: {},
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    countryCodeList: [],
    btnLoader: false,
    getCurrentInfoObj: {},
    SnackBarComponent: {},
  }),
  computed: {
    Alumni_StartYear() {
      return Array.from({ length: 2025 - 1900 + 1 }, (_, idx) =>
        String(2025 - idx)
      );
    },
  },
  watch: {
    InviteMemberDialog(val) {
      if (val == true) {
        this.countryCodeList = ContryCodes;
        this.getCurrentInfoObj = this.$store.getters.get_currentuser_details;
        console.log("CREATE_MEMBER_WATCHER", this.getCurrentInfoObj);
        this.listMasterSettingsMethod();

        if (this.StoreObj.action == "EDIT") {
          console.log("STORE_OBJ", this.StoreObj);
          this.memberName = this.StoreObj.user_name;
          this.memberEmail = this.StoreObj.user_email_id;
          this.memberCountryCode = this.StoreObj.user_country_code;
          this.memberPhone = this.StoreObj.user_phone_number;
          this.memberUserType = this.StoreObj.user_type;
          this.memberWorkProfile = this.StoreObj.work_profile;
          this.memberYearOfJoining = this.StoreObj.year_of_joining;
          this.memberYearOfLeaving = this.StoreObj.year_of_leaving;
          this.memberDesignation = this.StoreObj.designation;
          this.memberCompany = this.StoreObj.company;
          this.memberCourse = this.StoreObj.course;
          this.Department = this.StoreObj.department;
          this.Hostel = this.StoreObj.hostel;
        }
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
    async inviteMemberMethod() {
      const isValid = await this.$refs.alumniForm.validate();
      if (isValid.valid) {
        this.btnLoader = true;
        const inputParams = {
          alumnye_id: this.$store.getters.get_currentuser_details.alumnye_id,
          creator_user_id: this.$store.getters.get_currentuser_details.user_id,
          user_email_id: this.memberEmail || undefined,
          phone_number:
            this.memberCountryCode && this.memberPhone
              ? `${this.memberCountryCode}${this.memberPhone}`
              : undefined,
          user_name: this.memberName,
          user_type: this.memberUserType || undefined,
          profile_picture: undefined,
          current_location: undefined,
          permanent_location: undefined,
          current_country: undefined,
          year_of_joining: this.memberYearOfJoining || undefined,
          year_of_leaving: this.memberYearOfLeaving || undefined,
          designation: this.memberDesignation || undefined,
          company: this.memberCompany || undefined,
          course: this.memberCourse || undefined,
          user_country_code:
            this.memberCountryCode && this.memberPhone
              ? this.memberCountryCode
              : undefined,
        };
        const response = await this.createMemberMethod(inputParams);
        if (response.status == "Success") {
          this.SnackBarComponent = {
            SnackbarVmodel: true,
            SnackbarColor: "green",
            SnackbarText: response.status_message,
          };
          this.InviteMemberDialogEmit(2);
          this.btnLoader = false;
        }
      } else {
        this.btnLoader = false;
        console.log("NOT_VALIDATED");
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          SnackbarText: "Kindly fill the required details..!",
        };
      }
    },
    async updateMemberMethod() {
      try {
        this.btnLoader = true;
        let inputparams = {
          alumnye_id: this.$store.getters.get_currentuser_details.alumnye_id,
          updater_user_id: this.$store.getters.get_currentuser_details.user_id,
          user_id: this.StoreObj.user_id,
          user_email_id: this.memberEmail || undefined,
          user_country_code: this.memberCountryCode || undefined,
          phone_number:
            this.memberCountryCode && this.memberPhone
              ? `${this.memberCountryCode}${this.memberPhone}`
              : undefined,
          user_name: this.memberName,
          user_type: this.memberUserType || undefined,
          profile_picture: undefined,
          current_location: undefined,
          permanent_location: undefined,
          current_country: undefined,
          year_of_joining: this.memberYearOfJoining || undefined,
          year_of_leaving: this.memberYearOfLeaving || undefined,
          designation: this.memberDesignation || undefined,
          company: this.memberCompany || undefined,
          course: this.memberCourse || undefined,
          department: this.Department || undefined,
          hostel: this.Hostel || undefined,
        };

        let result = await client.graphql({
          query: UpdateMember,
          variables: {
            input: inputparams,
          },
        });
        console.log("result", result);
        let ResultObj = JSON.parse(result.data.UpdateMember);
        if (ResultObj.status == "Success") {
          this.SnackBarComponent = {
            SnackbarVmodel: true,
            SnackbarColor: "green",
            SnackbarText: ResultObj.status_message,
          };
          this.InviteMemberDialogEmit(2);
        }
        this.btnLoader = false;
      } catch (error) {
        this.btnLoader = false;
        console.log("error", error);
      }
    },
    InviteMemberDialogEmit(Toggle) {
      this.$refs.alumniForm.reset();
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
.custom-form :deep(.v-field--variant-outlined .v-field__outline) {
  color: rgba(0, 0, 0, 0.28); /* outline (border) color */
}

.custom-form :deep(.v-field) {
  --v-field-border-width: 1px; /* thin by default */
  border-radius: 10px; /* rounded corners for all fields */
}

/* ----- hover (optional) ----- */
.custom-form :deep(.v-field:hover .v-field__outline) {
  color: rgba(25, 118, 210, 0.55);
}

/* ----- focused: blue + thicker border ----- */
.custom-form :deep(.v-field.v-field--focused) {
  --v-field-border-width: 2px;
}
.custom-form :deep(.v-field.v-field--focused .v-field__outline) {
  color: #1976d2; /* Vuetify primary blue */
}
</style>
