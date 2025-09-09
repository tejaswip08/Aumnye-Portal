<template>
  <div>
    <v-dialog
      persistent
      max-width="600"
      :model-value="SwitchAlumniDialog"
      opacity="0.9"
    >
      <v-card class="rounded-xl">
        <v-toolbar density="comfortable" color="white">
          <h3 class="font-weight-bold ml-4">Switch Alumni</h3>
          <v-spacer />
          <v-btn rounded class="mr-4" icon @click="confirmSwitch()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-divider horizontal />

        <div v-if="!alumniList.length" align="center" class="my-4">
          <v-progress-circular indeterminate color="primary" size="50" />
        </div>

        <!-- Alumni List -->
        <v-list v-if="alumniList && alumniList.length" class="pa-3">
          <v-list-item
            v-for="(alumni, index) in alumniList"
            :key="alumni.alumnye_id"
            class="py-3 px-2 rounded-lg mb-2"
            variant="outlined"
          >
            <!-- Left Avatar -->
            <template v-slot:prepend>
              <v-avatar size="40" class="mr-3 text-white app-bar-avatar">
                {{ alumni.alumnye_name.slice(0, 2) }}
              </v-avatar>
            </template>

            <!-- Alumni Info -->
            <v-list-item-title class="font-weight-medium">
              {{ alumni.alumnye_name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-chip size="small" color="green" class="mr-3" variant="tonal"
                ><span class="green">{{ alumni.alumnye_type }}</span>
              </v-chip>
            </v-list-item-subtitle>

            <!-- Alumni ID + Switch Button -->
            <template v-slot:append>
              <div class="d-flex align-center">
                <v-btn
                  class="app-bar-avatar text-capitalize text-white"
                  size="small"
                  variant="elevated"
                  @click="confirmSwitch()"
                >
                  <v-icon class="mr-1">mdi-swap-horizontal</v-icon>Switch
                </v-btn>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getAllMyAlumnyes } from "@/Mixins/Extras/SwitchAlumni.js";

export default {
  props: {
    SwitchAlumniDialog: Boolean,
  },
  mixins: [getAllMyAlumnyes],
  watch: {
    async SwitchAlumniDialog(val) {
      if (val == true) {
        this.alumniList = await this.getAllMyAlumnyesDetailsMethod();
      }
    },
  },
  data() {
    return {
      alumniList: [],
    };
  },
  methods: {
    confirmSwitch() {
      this.$emit("clicked");
    },
  },
};
</script>
