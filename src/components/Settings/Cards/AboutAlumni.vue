<template>
  <v-container class="pa-2" fluid>
    <!-- Header Card -->
    <v-card class="pa-5 mb-6 rounded-xl elevation-0" color="indigo">
      <v-row align="center" no-gutters>
        <v-col cols="auto">
          <v-avatar color="white" size="56">
            <v-icon color="indigo">mdi-school</v-icon>
          </v-avatar>
        </v-col>
        <v-col class="pl-4">
          <div class="text-h6 font-weight-bold text-white">
            {{ alumniName }}
          </div>
          <div class="text-subtitle-2 text-grey-lighten-2">
            {{ alumniType }}
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title height="50">
          <h2 class="fontsize20px font-weight-one text-indigo">Settings</h2>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card class="pa-6 rounded-lg shadow-lg">
            <v-form ref="MasterForm">
              <!-- Year Range -->
              <v-row>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="form.startYear"
                    :items="yearOptions"
                    label="Start Year *"
                    variant="outlined"
                    density="compact"
                    :rules="[(v) => !!v || 'Start year is required']"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="form.endYear"
                    :items="yearOptions"
                    label="End Year (Optional)"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
              </v-row>

              <!-- University Masters -->
              <v-expand-transition>
                <div
                  v-if="
                    $store.getters.get_currentuser_details.alumnnye_details &&
                    ($store.getters.get_currentuser_details.alumnnye_details
                      .alumnye_type == 'UNIVERSITY' ||
                      $store.getters.get_currentuser_details.alumnnye_details
                        .alumnye_type == 'University')
                  "
                  class="mt-4"
                >
                  <h3 class="text-subtitle-1 font-weight-bold mb-3">
                    University Settings
                  </h3>

                  <v-row>
                    <!-- Courses Card -->
                    <v-col cols="12" md="4">
                      <v-card
                        class="pa-4 mb-4 rounded-lg"
                        style="
                          background: linear-gradient(135deg, #fff3e0, #ffffff);
                        "
                      >
                        <h4 class="text-subtitle-2 font-weight-bold mb-2">
                          <v-icon color="orange" class="mr-1"
                            >mdi-book-education</v-icon
                          >
                          Courses
                        </h4>
                        <v-row>
                          <v-col cols="9">
                            <v-text-field
                              v-model="newCourse"
                              label="Add Course"
                              variant="outlined"
                              density="compact"
                              bg-color="white"
                            />
                          </v-col>
                          <v-col cols="2" class="d-flex align-center mt-n6">
                            <v-btn
                              size="small"
                              class="text-white app-bar-avatar"
                              @click="addCourse"
                            >
                              Add
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-chip
                          v-for="(course, index) in form.courseMaster"
                          :key="index"
                          color="deep-purple"
                          class="ma-1"
                          closable
                          @click:close="deleteCourse(index)"
                        >
                          {{ course.name }}
                        </v-chip>
                      </v-card>
                    </v-col>

                    <!-- Departments Card -->
                    <v-col cols="12" md="4">
                      <v-card
                        class="pa-4 mb-4 rounded-lg"
                        style="
                          background: linear-gradient(135deg, #e8f5e9, #ffffff);
                        "
                      >
                        <h4 class="text-subtitle-2 font-weight-bold mb-2">
                          <v-icon color="green" class="mr-1">mdi-domain</v-icon>
                          Departments
                        </h4>
                        <v-row>
                          <v-col cols="9">
                            <v-text-field
                              v-model="newDepartment"
                              label="Add Department"
                              variant="outlined"
                              density="compact"
                              bg-color="white"
                            />
                          </v-col>
                          <v-col cols="2" class="d-flex align-center mt-n6">
                            <v-btn
                              size="small"
                              class="text-white app-bar-avatar"
                              @click="addDepartment"
                            >
                              Add
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-chip
                          v-for="(dept, index) in form.departmentMaster"
                          :key="index"
                          color="green-darken-2"
                          class="ma-1"
                          closable
                          @click:close="deleteDepartment(index)"
                        >
                          {{ dept.name }}
                        </v-chip>
                      </v-card>
                    </v-col>

                    <!-- Hostels Card -->
                    <v-col cols="12" md="4">
                      <v-card
                        class="pa-4 mb-4 rounded-lg"
                        style="
                          background: linear-gradient(135deg, #e0f7fa, #ffffff);
                        "
                      >
                        <h4 class="text-subtitle-2 font-weight-bold mb-2">
                          <v-icon color="teal" class="mr-1"
                            >mdi-home-city</v-icon
                          >
                          Hostels
                        </h4>
                        <v-row>
                          <v-col cols="9">
                            <v-text-field
                              v-model="newHostel"
                              label="Add Hostel"
                              variant="outlined"
                              density="compact"
                              bg-color="white"
                            />
                          </v-col>
                          <v-col cols="2" class="d-flex align-center mt-n6">
                            <v-btn
                              size="small"
                              class="text-white app-bar-avatar"
                              @click="addHostel"
                            >
                              Add
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-chip
                          v-for="(hostel, index) in form.hostelMaster"
                          :key="index"
                          color="teal"
                          class="ma-1"
                          closable
                          @click:close="deleteHostel(index)"
                        >
                          {{ hostel.name }}
                        </v-chip>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </v-expand-transition>

              <!-- School -->
              <v-expand-transition>
                <div
                  v-if="alumniType === 'School' || alumniType === 'SCHOOL'"
                  class="mt-4"
                >
                  <v-alert
                    type="info"
                    border="start"
                    variant="tonal"
                    color="blue"
                  >
                    School Alumni have no additional masters to configure.
                  </v-alert>
                </div>
              </v-expand-transition>

              <v-expand-transition>
                <div
                  v-if="
                    alumniType === 'Corporate' || alumniType === 'CORPORATE'
                  "
                  class="mt-4"
                >
                  <v-alert
                    type="info"
                    border="start"
                    variant="tonal"
                    color="blue"
                  >
                    Corporate Alumni have no additional masters to configure.
                  </v-alert>
                </div>
              </v-expand-transition>

              <!-- Actions -->
              <div class="text-right mt-6">
                <v-btn
                  color="primary"
                  class="text-white font-weight-bold"
                  @click="addMasterSettingsMethod()"
                >
                  <v-icon class="mr-1">mdi-content-save-all</v-icon>
                  Save Settings
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { CreateMasterSetting } from "@/graphql/mutations.js";
import { generateClient } from "aws-amplify/api";
const client = generateClient();
export default {
  data() {
    return {
      form: {
        startYear: null,
        endYear: null,
        courseMaster: [],
        departmentMaster: [],
        hostelMaster: [],
      },
      newCourse: "",
      newDepartment: "",
      newHostel: "",
      yearOptions: this.generateYears(),
    };
  },
  computed: {
    alumniName() {
      return this.$store.getters.get_currentuser_details.alumnnye_details
        .alumnye_name;
    },
    alumniType() {
      return this.$store.getters.get_currentuser_details.alumnnye_details
        .alumnye_type;
    },
  },
  methods: {
    async addMasterSettingsMethod() {
      try {
        let inputparams = {
          creator_user_id: this.$store.getters.get_currentuser_details.user_id,
          alumnye_id: this.$store.getters.get_currentuser_details.alumnye_id,
          alumnye_universal_settings: {
            setting_type: "COURSE",
            setting_list: this.form.courseMaster.map((c) => c.name),
          },
        };

        let result = await client.graphql({
          query: CreateMasterSetting,
          variables: {
            input: inputparams,
          },
        });

        console.log("result", result);
      } catch (error) {
        console.log("error", error);
      }
    },
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let y = currentYear; y >= 1950; y--) {
        years.push(y.toString());
      }
      return years;
    },

    // ✅ Add Course
    addCourse() {
      const value = this.newCourse.trim();
      if (!value) return;

      // Check duplicates (case-insensitive)
      const exists = this.form.courseMaster.some(
        (c) => c.name.toLowerCase() === value.toLowerCase()
      );
      if (exists) {
        alert("Course already exists!");
        return;
      }

      this.form.courseMaster.push({ name: value });
      this.form.courseMaster.sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
      this.newCourse = "";
    },

    deleteCourse(index) {
      this.form.courseMaster.splice(index, 1);
    },

    // ✅ Add Department
    addDepartment() {
      const value = this.newDepartment.trim();
      if (!value) return;

      const exists = this.form.departmentMaster.some(
        (d) => d.name.toLowerCase() === value.toLowerCase()
      );
      if (exists) {
        alert("Department already exists!");
        return;
      }

      this.form.departmentMaster.push({ name: value });
      this.form.departmentMaster.sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
      this.newDepartment = "";
    },

    deleteDepartment(index) {
      this.form.departmentMaster.splice(index, 1);
    },

    // ✅ Add Hostel
    addHostel() {
      const value = this.newHostel.trim();
      if (!value) return;

      const exists = this.form.hostelMaster.some(
        (h) => h.name.toLowerCase() === value.toLowerCase()
      );
      if (exists) {
        alert("Hostel already exists!");
        return;
      }

      this.form.hostelMaster.push({ name: value });
      this.form.hostelMaster.sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
      this.newHostel = "";
    },

    deleteHostel(index) {
      this.form.hostelMaster.splice(index, 1);
    },
  },
};
</script>
