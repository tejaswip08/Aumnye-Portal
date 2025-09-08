<template>
  <div>
    <Snackbar :SnackBarComponent="SnackBarComponent" />

    <v-card :height="CardHeight" tile class="elevation-0">
      <!-- <v-toolbar density="compact"
        ><v-toolbar-title>Profile</v-toolbar-title></v-toolbar
      > -->
      <v-row class="mt-2">
        <v-col cols="12" md="4" sm="12" xs="12" class="mt-16">
          <v-card class="mx-12 elevation-1">
            <v-row class="mt-2">
              <v-col cols="12" md="12" align="center">
                <div>
                  <v-img
                    v-if="img && img != null"
                    max-height="200px"
                    :lazy-src="img"
                    :src="img"
                    rounded
                  />
                  <v-icon v-else size="150" color="blue"
                    >mdi-account-circle</v-icon
                  >
                </div>
                <div class="mt-4 font-weight-bold">
                  <span
                    ><v-icon color="grey" class="mr-2" size="small"
                      >mdi-account</v-icon
                    ></span
                  >{{ CurrentUser.User_Name }}
                </div>
                <div class="mt-3 text-grey">
                  <span
                    ><v-icon color="grey" class="mr-2" size="small"
                      >mdi-at</v-icon
                    ></span
                  >{{ CurrentUser.User_Email_Id }}
                </div>
                <div class="mt-1 mt-2 text-grey">
                  {{ CurrentUser.Licensed_State }}
                </div>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn
                color="#3c2371"
                flat
                size="small"
                class="borderRadius20px ma-6 text-capitalize"
                @click="triggerFileInput"
                >Upload Photo</v-btn
              >
              <input
                type="file"
                accept="image/*"
                id="CategoryImg"
                hidden
                ref="fileInput"
                @change="onChange"
              />
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12" xs="12" class="mt-16">
          <v-card density="compact">
            <v-row>
              <v-col cols="12" md="12" xs="12" sm="12">
                <v-card
                  tile
                  class="elevation-0"
                  color="#f0f5f8"
                  density="compact"
                  height="60px"
                >
                  <v-row class="text-left">
                    <v-col cols="12" md="5" xs="12" sm="12" class="text-left">
                      <div class="ma-2 ml-12 mt-6 text-grey font-weight-bold">
                        Name
                      </div>
                    </v-col>
                    <v-col cols="12" md="1" xs="12" sm="12">
                      <div class="ma-2 mt-6 font-weight-bold">:</div>
                    </v-col>
                    <v-col cols="12" md="6" xs="12" sm="12" class="text-left">
                      <v-text-field
                        variant="flat"
                        density="compact"
                        bg-color="#f0f5f8"
                        class="mt-2 custom-text-field"
                        :rules="[(v) => !!v || 'required']"
                        v-model="CurrentUser.User_Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  tile
                  class="elevation-0"
                  color="white"
                  density="compact"
                  height="60px"
                >
                  <v-row justify="center">
                    <v-col cols="12" md="5" xs="12" sm="12" class="text-left">
                      <div class="mt-6 ml-12 text-grey font-weight-bold">
                        Email
                      </div>
                    </v-col>
                    <v-col cols="12" md="1" xs="12" sm="12">
                      <div class="mt-6 ma-2 font-weight-bold">:</div>
                    </v-col>
                    <v-col cols="12" md="6" xs="12" sm="12" class="text-left">
                      <v-text-field
                        variant="flat"
                        density="compact"
                        bg-color="white"
                        readonly
                        class="mt-2 elevation-0 maxWidthVariant230 custom-text-field"
                        v-model="CurrentUser.User_Email_Id"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  tile
                  class="elevation-0"
                  color="#f0f5f8"
                  density="compact"
                  height="60px"
                >
                  <v-row justify="center">
                    <v-col cols="12" md="5" xs="12" sm="12" class="text-left">
                      <div class="ma-2 ml-12 mt-6 text-grey font-weight-bold">
                        Role
                      </div>
                    </v-col>
                    <v-col cols="12" md="1" xs="12" sm="12">
                      <div class="ma-2 mt-6 font-weight-bold">:</div>
                    </v-col>
                    <v-col cols="12" md="6" xs="12" sm="12" class="text-left">
                      <v-text-field
                        variant="flat"
                        readonly
                        density="compact"
                        bg-color="#f0f5f8"
                        class="mt-2 custom-text-field"
                        v-model="CurrentUser.User_Type"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card
                  tile
                  class="elevation-0"
                  color="white"
                  density="compact"
                  height="60px"
                >
                  <v-row>
                    <v-col cols="12" md="5" xs="12" sm="12" class="text-left">
                      <div class="text-grey ml-12 mt-4 font-weight-bold">
                        Contact
                      </div>
                    </v-col>
                    <v-col cols="12" md="1" xs="12" sm="12">
                      <div class="ma-2 mt-6 font-weight-bold">:</div>
                    </v-col>
                    <v-col cols="12" md="6" xs="12" sm="12" class="text-left">
                      <v-text-field
                        variant="flat"
                        density="compact"
                        bg-color="white"
                        class="mt-2 custom-text-field"
                        v-model="CurrentUser.User_Contact_Number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <!-- <v-card
                  tile
                  class="elevation-0"
                  color="#f0f5f8"
                  density="compact"
                  height="60px"
                >
                  <v-row justify="center">
                    <v-col cols="12" md="5" xs="12" sm="12" class="text-left">
                      <div class="ma-2 ml-12 mt-6 text-grey font-weight-bold">
                        License Expiry Date
                      </div>
                    </v-col>
                    <v-col cols="12" md="1" xs="12" sm="12">
                      <div class="ma-2 mt-6 font-weight-bold">:</div>
                    </v-col>
                    <v-col cols="12" md="6" xs="12" sm="12">
                      <v-text-field
                        variant="flat"
                        density="compact"
                        bg-color="#f0f5f8"
                        class="mt-2 custom-text-field"
                        @click="datePickerDialog = true"
                        v-model="CurrentUser.License_Expiry_Date"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card> -->
                <v-dialog v-model="datePickerDialog" persistent width="320px">
                  <v-card>
                    <v-date-picker
                      v-model="selectedDate"
                      @update:model-value="updateDate"
                      header=""
                      :min="maxDate"
                      color="primary"
                      scrollable
                    ></v-date-picker>

                    <v-card-actions>
                      <v-btn text @click="datePickerDialog = false"
                        >Cancel</v-btn
                      >
                      <v-btn text @click="confirmDate">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- <v-card
                  tile
                  class="elevation-0"
                  color="white"
                  density="compact"
                  height="60px"
                >
                  <v-row justify="center">
                    <v-col cols="12" md="5" xs="12" sm="12" class="text-left">
                      <div class="ma-2 mt-6 ml-12 text-grey font-weight-bold">
                        License State
                      </div>
                    </v-col>
                    <v-col cols="12" md="1" xs="12" sm="12">
                      <div class="ma-2 mt-6 font-weight-bold">:</div>
                    </v-col>
                    <v-col cols="12" md="6" xs="12" sm="12">
                      <v-autocomplete
                        variant="flat"
                        density="compact"
                        bg-color="white"
                        class="mt-2 custom-text-field"
                        :items="USAStates"
                        item-title="name"
                        item-value="name"
                        v-model="CurrentUser.Licensed_State"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-card> -->
                <!-- <v-card
                  tile
                  class="elevation-0"
                  color="#f0f5f8"
                  density="compact"
                  height="60px"
                >
                  <v-row justify="center">
                    <v-col cols="12" md="5" xs="12" sm="12" class="text-left">
                      <div class="ma-2 mt-6 ml-12 text-grey font-weight-bold">
                        Certified Board
                      </div>
                    </v-col>
                    <v-col cols="12" md="1" xs="12" sm="12">
                      <div class="ma-2 mt-6 font-weight-bold">:</div>
                    </v-col>
                    <v-col cols="12" md="6" xs="12" sm="12">
                      <v-text-field
                        variant="flat"
                        density="compact"
                        bg-color="#f0f5f8"
                        class="mt-2 custom-text-field"
                        v-model="CurrentUser.Certified_Board"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card> -->
              </v-col>
            </v-row>

            <v-row justify="center" class="mt-12 mb-2">
              <v-btn
                size="small"
                color="#3c2371"
                class="borderRadius20px ma-3"
                :loading="AdminButtonLoader"
                @click.stop="EditPortalUserMethod()"
                >Save</v-btn
              >
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- <v-row class="mr-16" justify="left">
      <v-col cols="12" md="5" xs="12" sm="12">
        <v-card
          color="#f0f7ff"
          class="rounded-xl pa-4 text-center"
          width="1000px"
        >
          <v-row class="mt-2">
            <v-col cols="12" md="12" align="center">
              <v-card
                height="150px"
                width="200px"
                color="#e5e5e5"
                flat
                v-if="!img && img === null"
                class="ImageRadius"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="CategoryImg"
                  hidden
                  @change="onChange"
                />
                <label for="CategoryImg">
                  <v-container fluid fill-height height="100%">
                    <v-layout align-center justify-center>
                      <div align="center" class="ml-10">Upload Image</div>
                    </v-layout>
                  </v-container>
                </label>
              </v-card>
              <v-card
                height="200px"
                width="300px"
                color="#e5e5e5"
                flat
                class="mt-8"
                v-else
              >
                <v-img max-height="200px" :src="img" />

                <v-btn
                  position="absolute"
                  size="x-small"
                  color="red"
                  dark
                  class="mt-n2 ml-12"
                  depressed
                  icon
                  @click="removeImage"
                >
                  <v-icon small>mdi-close</v-icon>
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
    
        </v-card>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>
import { useDisplay } from "vuetify";
import Snackbar from "@/components/Extras/SnackBar.vue";

export default {
  components: { Snackbar },
  data: () => ({
    selectedFile: null,
    croppedImage: null,
    img: null,
    is_new_image_selected: false,

    CardHeight: 0,

    datePickerDialog: false,
    selectedDate: null,
    displayDate: "",
    maxDate: new Date().toISOString().substr(0, 10),

    AdminButtonLoader: false,
    SnackBarComponent: {},

    CurrentUserDetails: {},

    CurrentUser: {
      User_Email_Id: "",
      User_Name: "",
      User_Country_Code: "+91",
      User_Contact_Number: "",
      License_Expiry_Date: "",
      Licensed_State: "",
      Certified_Board: "",
      User_Type: "",
    },
    USAStates: [],
  }),
  async mounted() {
    const display = useDisplay();
    this.CardHeight = display.height._object.height - 100;

    this.CurrentUserDetails = this.$store.getters.get_currentuser_details;

    this.CurrentUser = {
      User_Name: this.CurrentUserDetails.user_name,
      User_Email_Id: this.CurrentUserDetails.user_email_id,
      User_Country_Code: this.CurrentUserDetails.user_country_code,
      User_Contact_Number: this.CurrentUserDetails.user_phone_number,
      User_Type: this.CurrentUserDetails.user_type,
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async onChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.img = URL.createObjectURL(this.selectedFile);
        this.is_new_image_selected = true;
        this.ImageUploadMethod();
      }
    },
    removeImage() {
      this.selectedFile = null;
      this.croppedImageBase64 = null;
      this.img = null;
      this.is_new_image_selected = false;
    },
    async ImageUploadMethod() {
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
      try {
        let userObj = {
          user_id: this.$store.getters.get_currentuser_details.user_id,
          user_profile_pic_url: UploadedResult ? UploadedResult.key : undefined,
          action: "UPDATE",
        };
        let result = await client.graphql({
          query: editPortalUser,
          variables: { input: userObj },
        });
        var CreateUserResponse = result.data.editPortalUser;
        console.log("this.CreatedUser", CreateUserResponse);

        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "greenColorVariant2",
          SnackbarText: "Image Updated",
        };
        this.GetCurrentUser();
      } catch (error) {
        console.log("error", error);
      }
    },
    async EditPortalUserMethod() {
      // let UploadedResult;
      // if (this.selectedFile != null) {
      //   UploadedResult = await this.CommonUploadFileMethod(
      //     `ProfilePictures/${new Date().getTime()}.${
      //       this.selectedFile.name.split(".")[
      //         this.selectedFile.name.split(".").length - 1
      //       ]
      //     }`,
      //     this.selectedFile
      //   );
      // }
      try {
        this.AdminButtonLoader = true;
        let userObj = {
          user_name:
            this.$store.getters.get_currentuser_details.user_name ===
            this.CurrentUser.User_Name.trim()
              ? undefined
              : this.CurrentUser.User_Name,
          user_country_code:
            this.$store.getters.get_currentuser_details.user_country_code ===
            this.CurrentUser.User_Country_Code.trim()
              ? undefined
              : this.CurrentUser.User_Country_Code,
          user_phone_number:
            this.$store.getters.get_currentuser_details.user_phone_number ===
            this.CurrentUser.User_Contact_Number.trim()
              ? undefined
              : this.CurrentUser.User_Contact_Number.trim(),
          user_id: this.$store.getters.get_currentuser_details.user_id,
          // user_profile_pic_url: UploadedResult ? UploadedResult.key : undefined,
          license_expiry_date:
            this.$store.getters.get_currentuser_details.license_expiry_date ==
            this.convertToEpoch(this.CurrentUser.License_Expiry_Date)
              ? undefined
              : this.convertToEpoch(this.CurrentUser.License_Expiry_Date),
          licensed_state:
            this.$store.getters.get_currentuser_details.licensed_state ===
            this.CurrentUser.Licensed_State.trim()
              ? undefined
              : this.CurrentUser.Licensed_State,
          // // user_status: "ACTIVE",
          action: "UPDATE",
          // user_type: "ADMIN",
          certified_board:
            this.$store.getters.get_currentuser_details.certified_board ===
            this.CurrentUser.Certified_Board.trim()
              ? undefined
              : this.CurrentUser.Certified_Board,
        };
        let result = await client.graphql({
          query: editPortalUser,
          variables: { input: userObj },
        });
        console.log("myra", result);
        var CreateUserResponse = result.data.editPortalUser;
        console.log("this.CreatedUser", CreateUserResponse);

        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "greenColorVariant2",
          SnackbarText: "Profile Edited successfully",
        };
        this.GetCurrentUser();
        this.AdminButtonLoader = false;
      } catch (error) {
        this.AdminButtonLoader = false;
        console.log("Err", error);
        // this.SnackBarComponent = {
        //   SnackbarVmodel: true,
        //   SnackbarColor: "red",
        //   SnackbarText: error.errors[0].message,
        // };
      }
    },
    updateDate(val) {
      this.CurrentUser.License_Expiry_Date = val;
    },
    confirmDate() {
      if (this.selectedDate) {
        this.CurrentUser.License_Expiry_Date = this.formatDate(
          this.selectedDate
        );
        this.datePickerDialog = false;
      }
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    convertToEpoch(date) {
      const targetDate = new Date(date);
      targetDate.setHours(23, 59, 59);
      return Math.floor(targetDate.getTime());
    },

    epochToDate(epochTime) {
      if (epochTime.toString().length === 13) {
        epochTime = Math.floor(epochTime / 1000);
      }

      const date = new Date(epochTime * 1000);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style>
.custom-text-field input {
  color: #555d5d !important;
  font-size: 15px !important;
  font-weight: 500 !important;
}
</style>
