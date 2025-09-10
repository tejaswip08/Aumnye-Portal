<template>
  <v-container class="pa-6" fluid>
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

        <!-- Show only related masters -->
        <v-expand-transition>
          <div v-if="alumniType === 'University'" class="mt-4">
            <v-card class="pa-4" outlined>
              <h3 class="text-subtitle-1 font-weight-bold mb-3">
                University Masters
              </h3>

              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        v-model="newCourse"
                        label="Course"
                        variant="outlined"
                        density="compact"
                      />
                    </v-col>
                    <v-col cols="4" class="d-flex align-center mt-n6">
                      <v-btn
                        color="primary"
                        class="text-white"
                        @click="addCourse"
                      >
                        Add
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-col cols="10">
                    <v-data-table
                      v-if="form.courseMaster.length"
                      :headers="[
                        { title: 'Course', value: 'name' },
                        { title: 'Action', value: 'action' },
                      ]"
                      :items="form.courseMaster"
                      class="mb-6"
                      density="compact"
                      hide-default-footer
                    >
                      <template v-slot:[`item.action`]="{ index }">
                        <v-btn
                          icon="mdi-delete"
                          size="small"
                          color="red"
                          variant="text"
                          @click="deleteCourse(index)"
                        />
                      </template> </v-data-table
                  ></v-col>
                </v-col>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        v-model="newDepartment"
                        label="Department"
                        variant="outlined"
                        density="compact"
                      />
                    </v-col>
                    <v-col cols="4" class="d-flex align-center mt-n6">
                      <v-btn
                        color="primary"
                        class="text-white"
                        @click="addDepartment"
                      >
                        Add
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-col cols="10">
                    <v-data-table
                      v-if="form.departmentMaster.length"
                      :headers="[
                        { title: 'Department', value: 'name' },
                        { title: 'Action', value: 'action' },
                      ]"
                      :items="form.departmentMaster"
                      class="mb-6"
                      density="compact"
                      hide-default-footer
                    >
                      <template v-slot:[`item.action`]="{ index }">
                        <v-btn
                          icon="mdi-delete"
                          size="small"
                          color="red"
                          variant="text"
                          @click="deleteDepartment(index)"
                        />
                      </template>
                    </v-data-table>
                  </v-col>
                </v-col>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        v-model="newHostel"
                        label="Hostel"
                        variant="outlined"
                        density="compact"
                      />
                    </v-col>
                    <v-col cols="4" class="d-flex align-center mt-n6">
                      <v-btn
                        color="primary"
                        class="text-white"
                        @click="addHostel"
                      >
                        Add
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-col cols="10">
                    <v-data-table
                      v-if="form.hostelMaster.length"
                      :headers="[
                        { title: 'Hostel', value: 'name' },
                        { title: 'Action', value: 'action' },
                      ]"
                      :items="form.hostelMaster"
                      density="compact"
                      hide-default-footer
                    >
                      <template v-slot:[`item.action`]="{ index }">
                        <v-btn
                          icon="mdi-delete"
                          size="small"
                          color="red"
                          variant="text"
                          @click="deleteHostel(index)"
                        />
                      </template>
                    </v-data-table>
                  </v-col>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-expand-transition>

        <!-- School -->
        <v-expand-transition>
          <div v-if="alumniType === 'School'" class="mt-4">
            <v-alert type="info" border="start" variant="tonal" color="blue">
              School Alumni have no additional masters to configure.
            </v-alert>
          </div>
        </v-expand-transition>

        <!-- Corporate -->
        <v-expand-transition>
          <div v-if="alumniType === 'Corporate'" class="mt-4">
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
      return this.$store.getters.get_currentuser_details.alumnye_type;
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
