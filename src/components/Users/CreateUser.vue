<template>
  <div>
    <v-dialog persistent width="700" :model-value="CreateUserDialog">
      <v-card class="CardBorderRadius">
        <v-toolbar color="white">
          <span class="font-weight-bold ml-4">Add Alumni</span>
          <v-spacer />
          <v-icon size="small" class="mr-4" @click="createUserDialogEmit"
            >mdi-close</v-icon
          >
        </v-toolbar>
        <v-divider />

        <v-form ref="alumniForm" class="custom-form">
          <v-container>
            <v-row>
              <!-- First Name -->
              <v-col cols="12" md="6">
                <div class="field-wrapper">
                  <label class="field-label font-size-three"> Name </label>
                  <v-text-field
                    v-model="alumni.UserName"
                    variant="outlined"
                    density="compact"
                    hide-details
                    required
                  />
                </div>
              </v-col>

              <!-- Email -->
              <v-col cols="12" md="6">
                <div class="field-wrapper">
                  <label class="field-label font-size-three">Email</label>
                  <v-text-field
                    v-model="alumni.email"
                    type="email"
                    variant="outlined"
                    density="compact"
                    hide-details
                    required
                  />
                </div>
              </v-col>

              <!-- Phone -->
              <v-col cols="12" md="6">
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
              </v-col>

              <!-- Graduation Year -->
              <v-col cols="12" md="6">
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
                    bg-color="#e9e9ed"
                  />
                </div>
              </v-col>

              <!-- Department -->
              <v-col cols="12" md="6">
                <div class="field-wrapper">
                  <label class="field-label font-size-three">Department</label>
                  <v-select
                    v-model="alumni.department"
                    :items="departments"
                    variant="outlined"
                    density="compact"
                    hide-details
                    required
                    bg-color="#e9e9ed"
                  />
                </div>
              </v-col>

              <!-- Company -->
              <v-col cols="12" md="6">
                <div class="field-wrapper">
                  <label class="field-label font-size-three">Company</label>
                  <v-text-field
                    v-model="alumni.company"
                    variant="outlined"
                    density="compact"
                    hide-details
                  />
                </div>
              </v-col>

              <v-col cols="12" md="6">
                <div class="field-wrapper">
                  <label class="field-label font-size-three">Role</label>
                  <v-select
                    v-model="alumni.role"
                    :items="AdminRoles"
                    variant="outlined"
                    density="compact"
                    hide-details
                    required
                    bg-color="#e9e9ed"
                  />
                </div>
              </v-col>

              <!-- LinkedIn -->
              <v-col cols="12">
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
              </v-col>
            </v-row>
          </v-container>
        </v-form>

        <v-divider class="mx-2 mt-2" />

        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            width="60"
            height="40"
            variant="elevated"
            color="#f3f4f6"
            size="large"
            elevation="0"
            class="font-size-three BtnBorderRadius text-capitalize text-#6a717e"
            dark
            @click="createUserDialogEmit"
          >
            Cancel
          </v-btn>

          <v-btn
            width="120"
            height="40"
            variant="elevated"
            elevation="0"
            size="large"
            color="primary"
            class="font-size-three BtnBorderRadius mr-3 text-capitalize text-black"
            dark
          >
            Add Admin
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    CreateUserDialog: Boolean,
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
    },
    years: Array.from({ length: 30 }, (_, i) => 2025 - i),
    departments: [
      "Computer Science",
      "Electrical",
      "Mechanical",
      "Civil",
      "Business",
      "Arts",
    ],
    AdminRoles: ["Admin", "Alumni Coordinator", "Event Manager"],
  }),
  methods: {
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
