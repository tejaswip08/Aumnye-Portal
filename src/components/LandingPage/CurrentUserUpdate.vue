<template>
  <div>
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-dialog persistent width="700" :model-value="UpdateCurrentUserDialog">
      <v-card class="CardBorderRadius app-font-style">
        <v-toolbar color="white">
          <span class="font-weight-one font-size-two ml-4">Update Profile</span>
          <v-spacer />
          <v-icon size="small" class="mr-4" @click="InviteMemberDialogEmit"
            >mdi-close</v-icon
          >
        </v-toolbar>
        <v-divider />
        <div style="overflow-y: auto">
          <v-form ref="alumniForm" class="custom-form">
            <v-container>
              <!-- <div class="text-center">
                <v-avatar size="70">
                  <v-img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  />
                </v-avatar>
              </div> -->

              <div align="center">
                <div
                  v-if="!img && img === null"
                  align="center"
                  style="position: relative; display: inline-block"
                >
                  <v-icon size="150" color="blue"> mdi-account-circle </v-icon>
                  <v-btn
                    fab
                    style="position: absolute; right: 10px; top: 10px"
                    size="x-small"
                    color="green"
                    icon
                    depressed
                    @click="triggerFileInput"
                  >
                    <v-icon size="x-small">mdi-pencil</v-icon>
                  </v-btn>
                  <input
                    type="file"
                    accept="image/*"
                    id="CategoryImg"
                    hidden
                    ref="fileInput"
                    @change="onChange"
                  />
                </div>

                <div
                  v-else
                  align="center"
                  style="position: relative; height: 100%"
                >
                  <v-avatar size="150" rounded="25" style="position: relative">
                    <v-img :src="img" style="position: relative" />
                  </v-avatar>
                  <v-btn
                    fab
                    style="position: absolute"
                    top
                    size="x-small"
                    color="green"
                    icon
                    class="mt-1 mx-n6"
                    depressed
                    @click="triggerFileInput"
                  >
                    <v-icon size="x-small">mdi-pencil</v-icon>
                  </v-btn>
                  <input
                    type="file"
                    accept="image/*"
                    id="CategoryImg"
                    hidden
                    ref="fileInput"
                    @change="onChange"
                  />
                </div>
              </div>

              <v-row class="mt-4">
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
                      v-model="getCurrentInfoObj.user_email_id"
                      type="email"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                    />
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three"
                      >Country Code</label
                    >
                    <v-autocomplete
                      v-model="getCurrentInfoObj.user_country_code"
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
                          :title="${item.raw.name} (${item.raw.dial_code})"
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
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">Country</label>
                    <v-select
                      v-model="memberCountry"
                      :items="countries"
                      item-title="name"
                      item-value="isoCode"
                      return-object
                      variant="outlined"
                      density="compact"
                      hide-details
                      placeholder="Select country"
                    />
                  </div>
                </v-col>

                <!-- State -->
                <v-col cols="12" md="6">
                  <div class="field-wrapper">
                    <label class="field-label font-size-three">State</label>
                    <v-select
                      v-model="memberState"
                      :items="states"
                      item-title="name"
                      item-value="isoCode"
                      return-object
                      :disabled="!memberCountry"
                      variant="outlined"
                      density="compact"
                      hide-details
                      placeholder="Select state"
                    />
                  </div>
                </v-col>
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
                    <label class="field-label font-size-three">Course</label>
                    <v-select
                      v-model="memberCourse"
                      :items="memberCourseItems"
                      variant="outlined"
                      density="compact"
                      hide-details
                      required
                    />
                  </div>
                </v-col>
                <v-col
                  v-if="
                    getCurrentInfoObj &&
                    getCurrentInfoObj.alumnnye_details &&
                    getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'CORPORATE'
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
                    getCurrentInfoObj &&
                    getCurrentInfoObj.alumnnye_details &&
                    getCurrentInfoObj.alumnnye_details.alumnye_type ==
                      'CORPORATE'
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
                      :items="departmentOptions"
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
                      :items="hostelOptions"
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
                      :items="Year_Of_Joining"
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
                  getCurrentInfoObj &&
                  getCurrentInfoObj.alumnnye_details &&
                  getCurrentInfoObj.alumnnye_details.alumnye_type == 'CORPORATE'
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
            @click="InviteMemberDialogEmit"
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
            @click="inviteMemberMethod()"
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
import ContryCodes from "@/JSON/CountryDialCode.json";
import { Country, State } from "country-state-city";
import { CommonUploadFile } from "@/mixins/Extras/UploadImageUrl.js";
import { updateCurrentUsers } from "@/mixins/UpdateCurrentUser.js";

export default {
  props: {
    UpdateCurrentUserDialog: Boolean,
  },
  components: {
    Snackbar,
  },

  mixins: [CommonUploadFile, updateCurrentUsers],
  data: () => ({
    countries: [],
    states: [],
    img: null,
    is_new_image_selected: false,
    memberRole: "",
    memberCourse: "",
    memberDesignation: "",
    memberYearOfLeaving: "",
    memberYearOfJoining: "",
    memberCompany: "",
    memberCourse: "",
    Department: "",
    Hostel: "",
    memberGraduationYear: "",
    memberAlumniType: "",
    memberUserType: "",
    memberCountry: "",
    memberState: "",
    memberCity: "",
    memberPhone: "",
    memberCountryCode: "+91",
    memberEmail: "",
    memberName: "",
    memberWorkProfile: "",
    memberUserTypeItems: [],
    memberAlumnyeTypeItems: [],
    memberCourseItems: [],
    memberRoles: [],
    memberUserTypeItems: ["Admin", "Alumni Coordinator", "Event Manager"],
    memberCourseItems: [
      "BE",
      "BTech",
      "BSc",
      "BCom",
      "BA",
      "BBA",
      "BCA",
      "LLB",
      "MBBS",
      "BPharm",
    ],
    departmentOptions: [
      "Computer Science",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Civil Engineering",
      "Business Administration",
    ],
    hostelOptions: [
      "Hostel A",
      "Hostel B",
      "Hostel C",
      "Girls Hostel",
      "Boys Hostel",
    ],
    selectedImageBlob: "",
    profilePicFile: {},
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    countryCodeList: [],
    btnLoader: false,
    getCurrentInfoObj: {},
    SnackBarComponent: {},
  }),
  computed: {
    Year_Of_Joining() {
      let years = [];
      for (let i = 2025; i >= 1900; i--) {
        years.push(i);
      }
      return years;
    },
  },
  watch: {
    UpdateCurrentUserDialog(val) {
      if (val == true) {
        this.countryCodeList = ContryCodes;
        this.countries = Country.getAllCountries();
        this.getCurrentInfoObj = {
          ...this.$store.getters.get_currentuser_details,
        };
        this.memberCountryCode = this.getCurrentInfoObj.user_country_code;
        this.memberCountry = Country.getCountryByCode(this.memberCountryCode);
        this.memberEmail = this.getCurrentInfoObj.user_email_id;
        this.memberName = this.getCurrentInfoObj.user_name;
        this.memberPhone = this.getCurrentInfoObj.user_phone_number;
        this.memberCompany =
          this.getCurrentInfoObj &&
          this.getCurrentInfoObj.alumnnye_details &&
          this.getCurrentInfoObj.alumnnye_details.company;
        this.memberDesignation = this.getCurrentInfoObj.department;
        console.log("CREATE_MEMBER_WATCHER", this.getCurrentInfoObj);
      }
    },
    memberCountry(newVal) {
      if (newVal) {
        this.states = State.getStatesOfCountry(newVal.isoCode);
        this.memberState = null;
      } else {
        this.states = [];
      }
    },
  },
  methods: {
    triggerPfpFileInputMethod() {
      this.$refs.profilePic.$el.querySelector('input[type="file"]').click();
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
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
        console.log("VALIDATED");
        let UploadedResult;
        if (this.selectedFile != null) {
          UploadedResult = await this.CommonUploadFileMethod(
            `ProfilePictures/${new Date().getTime()}.${
              this.selectedFile.name.split(".")[
                this.selectedFile.name.split(".").length - 1
              ]
            }`,
            this.selectedFile
          );
        }
        this.btnLoader = true;
        const inputParams = {
          alumnye_id: this.$store.getters.get_currentuser_details.alumnye_id,
          user_id: this.$store.getters.get_currentuser_details.user_id,
          user_email_id: this.memberEmail || undefined,
          phone_number:
            `${this.memberCountryCode}${this.memberPhone}` || undefined,
          user_name: this.memberName || undefined,
          user_type: this.memberUserType || undefined,
          alumni_type:
            this.$store.getters.get_currentuser_details.alumnnye_details
              .alumni_type || undefined,
          profile_picture: UploadedResult ? UploadedResult.key : undefined,
          current_location: undefined,
          permanent_location: undefined,
          current_country: this.memberCountry.name || undefined,
          year_of_joining: this.memberYearOfJoining || undefined,
          year_of_leaving: this.memberYearOfLeaving || undefined,
          designation: this.memberDesignation || undefined,
          company: this.memberCompany || undefined,
          course: this.memberCourse || undefined,
          department: this.Department || undefined,
          hostel: this.Hostel || undefined,
          user_country_code: this.memberCountryCode || undefined,
        };
        const response = await this.updateCurrentUserMethod(inputParams);
        if (response.status == "Success") {
          this.SnackBarComponent = {
            snackbarVmodel: true,
            snackbarColor: "green",
            snackbarMessage: response.status_message,
          };
          this.InviteMemberDialogEmit(2);
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
    onChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.img = URL.createObjectURL(this.selectedFile);
        this.is_new_image_selected = true;
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
