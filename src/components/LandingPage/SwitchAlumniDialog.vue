<template>
  <div>
    <v-dialog
      persistent
      max-width="600"
      :model-value="SwitchAlumniDialog"
      overlay-opacity="0.8"
      @update:model-value="$emit('update:SwitchAlumniDialog', $event)"
    >
      <v-card class="pa-4 rounded-xl">
        <!-- Header -->
        <div class="d-flex justify-space-between align-center mb-4">
          <h3 class="font-weight-bold">Switch Alumni</h3>
          <v-btn icon variant="text" @click="confirmSwitch()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <!-- Alumni List -->
        <v-list>
          <v-list-item
            v-for="(alumni, index) in alumniList"
            :key="index"
            class="py-3 px-2 rounded-lg mb-2"
            variant="outlined"
          >
            <!-- Left Avatar -->
            <template v-slot:prepend>
              <v-avatar color="primary" size="40" class="mr-3">
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
                  color="primary"
                  size="small"
                  variant="outlined"
                  @click="confirmSwitch()"
                >
                  <v-icon class="mr-1">mdi-refresh</v-icon>Switch
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
export default {
  props: {
    SwitchAlumniDialog: Boolean,
  },
  data() {
    return {
      alumniList: [
        {
          alumnye_name: "Mobil80",
          alumnye_id: "3f717991e51-9c46-b7530dc",
          alumnye_type: "Corporate",
        },
        {
          alumnye_name: "EduLink",
          alumnye_id: "7a18f992a91-8d12-cc930da",
          alumnye_type: "Educational",
        },
        {
          alumnye_name: "TechPioneers",
          alumnye_id: "ab92f8721b3-5a33-xd720ec",
          alumnye_type: "Startup",
        },
      ],
    };
  },
  methods: {
    confirmSwitch() {
      this.$emit("clicked");
    },
  },
};
</script>
