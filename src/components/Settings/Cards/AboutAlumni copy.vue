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

    <v-card class="pa-6 rounded-lg shadow-lg">
      <h2 class="text-h5 font-weight-bold mb-6">Master Settings</h2>

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
          <div class="mt-4">
            <h3 class="text-subtitle-1 font-weight-bold mb-3">
              University Settings
            </h3>

            <!-- Courses Card -->
            <!-- <v-card class="pa-4 mb-4 rounded-lg">
              <h4 class="text-subtitle-2 font-weight-bold mb-2">
                <v-icon color="orange" class="mr-1">mdi-book-education</v-icon>
                Courses
              </h4>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="newCourse"
                    label="Add Course"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="4" class="d-flex align-center mt-n6">
                  <v-btn
                    color="deep-purple"
                    class="text-white"
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

            <v-card
              class="pa-4 mb-4 rounded-lg"
              style="background: linear-gradient(135deg, #e8f5e9, #ffffff)"
            >
              <h4 class="text-subtitle-2 font-weight-bold mb-2">
                <v-icon color="green" class="mr-1">mdi-domain</v-icon>
                Departments
              </h4>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="newDepartment"
                    label="Add Department"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="4" class="d-flex align-center mt-n6">
                  <v-btn
                    color="green-darken-1"
                    class="text-white"
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

            <v-card class="pa-4 mb-4 rounded-lg">
              <h4 class="text-subtitle-2 font-weight-bold mb-2">
                <v-icon color="teal" class="mr-1">mdi-home-city</v-icon>
                Hostels
              </h4>
              <v-row>
                <v-col cols="8">
                  <v-text-field
                    v-model="newHostel"
                    label="Add Hostel"
                    variant="outlined"
                    density="compact"
                  />
                </v-col>
                <v-col cols="4" class="d-flex align-center mt-n6">
                  <v-btn
                    color="teal-darken-2"
                    class="text-white"
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
            </v-card> -->
            <v-row>
              <!-- Courses Card -->
              <v-col cols="12" md="4">
                <v-card
                  class="pa-4 mb-4 rounded-lg"
                  style="background: linear-gradient(135deg, #fff3e0, #ffffff)"
                >
                  <h4 class="text-subtitle-2 font-weight-bold mb-2">
                    <v-icon color="orange" class="mr-1"
                      >mdi-book-education</v-icon
                    >
                    Courses
                  </h4>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        v-model="newCourse"
                        label="Add Course"
                        variant="outlined"
                        density="compact"
                      />
                    </v-col>
                    <v-col cols="4" class="d-flex align-center mt-n6">
                      <v-btn
                        color="primary"
                        size="small"
                        class="text-white"
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
                  style="background: linear-gradient(135deg, #e8f5e9, #ffffff)"
                >
                  <h4 class="text-subtitle-2 font-weight-bold mb-2">
                    <v-icon color="green" class="mr-1">mdi-domain</v-icon>
                    Departments
                  </h4>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        v-model="newDepartment"
                        label="Add Department"
                        variant="outlined"
                        density="compact"
                      />
                    </v-col>
                    <v-col cols="4" class="d-flex align-center mt-n6">
                      <v-btn
                        color="primary"
                        size="small"
                        class="text-white"
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
                  style="background: linear-gradient(135deg, #e0f7fa, #ffffff)"
                >
                  <h4 class="text-subtitle-2 font-weight-bold mb-2">
                    <v-icon color="teal" class="mr-1">mdi-home-city</v-icon>
                    Hostels
                  </h4>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        v-model="newHostel"
                        label="Add Hostel"
                        variant="outlined"
                        density="compact"
                      />
                    </v-col>
                    <v-col cols="4" class="d-flex align-center mt-n6">
                      <v-btn
                        size="small"
                        color="primary"
                        class="text-white"
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
            <v-alert type="info" border="start" variant="tonal" color="blue">
              School Alumni have no additional masters to configure.
            </v-alert>
          </div>
        </v-expand-transition>

        <v-expand-transition>
          <div
            v-if="alumniType === 'Corporate' || alumniType === 'CORPORATE'"
            class="mt-4"
          >
            <v-alert type="info" border="start" variant="tonal" color="blue">
              Corporate Alumni have no additional masters to configure.
            </v-alert>
          </div>
        </v-expand-transition>

        <!-- Actions -->
        <div class="text-right mt-6">
          <v-btn
            color="primary"
            class="text-white font-weight-bold"
            @click="saveSettings"
          >
            Save Settings
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
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
      return this.$store.getters.get_currentuser_details.alumnye_name;
    },
    alumniType() {
      return this.$store.getters.get_currentuser_details.alumnnye_details
        .alumnye_type;
    },
  },
  methods: {
    generateYears() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let y = currentYear; y >= 1950; y--) {
        years.push(y.toString());
      }
      return years;
    },
    addCourse() {
      if (this.newCourse.trim()) {
        this.form.courseMaster.push({ name: this.newCourse });
        this.newCourse = "";
      }
    },
    deleteCourse(index) {
      this.form.courseMaster.splice(index, 1);
    },
    addDepartment() {
      if (this.newDepartment.trim()) {
        this.form.departmentMaster.push({ name: this.newDepartment });
        this.newDepartment = "";
      }
    },
    deleteDepartment(index) {
      this.form.departmentMaster.splice(index, 1);
    },
    addHostel() {
      if (this.newHostel.trim()) {
        this.form.hostelMaster.push({ name: this.newHostel });
        this.newHostel = "";
      }
    },
    deleteHostel(index) {
      this.form.hostelMaster.splice(index, 1);
    },
    saveSettings() {
      if (this.$refs.MasterForm.validate()) {
        console.log("Saved Master Settings:", this.form);
        alert("Master settings saved successfully!");
      }
    },
  },
};
</script>
