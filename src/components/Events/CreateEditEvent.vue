<template>
  <div class="flex justify-center items-center" align="center">
    <v-card
      class="CardBorderRadius app-font-style elevation-6"
      max-width="900"
      style="
        backdrop-filter: blur(12px);
        background: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
      "
    >
      <!-- Toolbar -->
      <v-toolbar
        class="text-white px-4"
        :style="toolbarStyle"
        density="comfortable"
      >
        <span class="font-weight-bold text-lg">🎉 Create Event</span>
        <v-spacer />
        <v-btn
          size="small"
          variant="text"
          class="text-white text-capitalize"
          @click="createEventEmit"
        >
          Cancel
        </v-btn>
      </v-toolbar>

      <v-divider />

      <div style="overflow-y: auto; max-height: 75vh">
        <v-form ref="eventForm" class="px-6 py-2">
          <!-- Banner -->
          <v-col cols="12" align="center">
            <v-card
              class="rounded-xl text-center gradient-card d-flex flex-column justify-center items-center"
              elevation="3"
              width="60%"
              style="overflow: hidden"
              @click="$refs.bannerInput.click()"
            >
              <v-img
                v-if="bannerPreview"
                :src="bannerPreview"
                aspect-ratio="16/9"
                class="rounded-lg shadow-md"
              >
                <template v-slot:placeholder>
                  <v-row class="ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="white" />
                  </v-row>
                </template>
              </v-img>

              <div
                v-else
                class="d-flex flex-column align-center justify-center text-grey py-6"
              >
                <v-icon size="80" color="white">mdi-panorama</v-icon>
              </div>

              <input
                ref="bannerInput"
                type="file"
                accept="image/*"
                class="d-none"
                @change="onBannerSelected"
              />
            </v-card>
          </v-col>

          <!-- Event Info -->

          <v-row class="mt-2">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="event.title"
                label="Event Title*"
                :rules="[(v) => !!v || 'Required']"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-format-title"
                color="deep-purple-accent-3"
                required
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="event.type"
                :items="[
                  'Seminar',
                  'Workshop',
                  'Reunion',
                  'Webinar',
                  'Fundraiser',
                ]"
                label="Event Type*"
                variant="outlined"
                density="comfortable"
                prepend-inner-icon="mdi-tag-multiple"
                color="deep-purple-accent-3"
                required
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="event.description"
                label="Description"
                variant="outlined"
                rows="2"
                auto-grow
                prepend-inner-icon="mdi-text"
                color="deep-purple-accent-3"
              />
            </v-col>
          </v-row>

          <!-- Dates -->
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="event.startDate"
                label="Start Date & Time*"
                type="datetime-local"
                prepend-inner-icon="mdi-calendar-start"
                variant="outlined"
                density="comfortable"
                color="deep-purple-accent-3"
                required
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="event.endDate"
                label="End Date & Time"
                type="datetime-local"
                prepend-inner-icon="mdi-calendar-end"
                variant="outlined"
                density="comfortable"
                color="deep-purple-accent-3"
              />
            </v-col>
          </v-row>

          <!-- Mode -->

          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="event.mode"
                :items="['Physical', 'Virtual', 'Hybrid']"
                label="Event Mode*"
                prepend-inner-icon="mdi-earth"
                variant="outlined"
                density="comfortable"
                color="deep-purple-accent-3"
                required
              />
            </v-col>
          </v-row>

          <!-- Venue + Map -->
          <v-row v-if="event.mode === 'Physical' || event.mode === 'Hybrid'">
            <v-col cols="12">
              <v-text-field
                v-model="event.venue"
                label="Venue"
                prepend-inner-icon="mdi-map-marker"
                variant="outlined"
                density="comfortable"
                color="deep-purple-accent-3"
              />
              <div
                class="mt-3 rounded-lg overflow-hidden"
                style="height: 250px; border: 2px solid #eee"
              >
                <GMapMap
                  :center="mapCenter"
                  :zoom="14"
                  map-type-id="roadmap"
                  style="width: 100%; height: 100%"
                  @click="onMapClick"
                >
                  <GMapMarker :position="mapCenter" />
                </GMapMap>
              </div>
            </v-col>
          </v-row>

          <!-- Link -->
          <v-row v-if="event.mode === 'Virtual' || event.mode === 'Hybrid'">
            <v-col cols="12">
              <v-text-field
                v-model="event.link"
                label="Meeting Link"
                prepend-inner-icon="mdi-video"
                variant="outlined"
                density="comfortable"
                color="deep-purple-accent-3"
              />
            </v-col>
          </v-row>
        </v-form>
      </div>

      <!-- Footer -->
      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn
          variant="outlined"
          color="red-darken-2"
          class="text-capitalize px-5"
          @click="createEventEmit"
        >
          Cancel
        </v-btn>
        <v-btn
          variant="elevated"
          class="text-white text-capitalize px-5"
          :loading="btnLoader"
          :style="buttonGradient"
          @click="saveEvent"
        >
          Save Event
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: { CreateEventDialog: Boolean },
  data() {
    return {
      btnLoader: false,
      bannerPreview: null,
      event: {
        title: "",
        type: "",
        description: "",
        startDate: "",
        endDate: "",
        mode: "",
        venue: "",
        link: "",
        banner: null,
      },
      mapCenter: { lat: 12.9716, lng: 77.5946 },
    };
  },
  computed: {
    toolbarStyle() {
      return {
        background: "linear-gradient(90deg, #4a6ee0, #9b59b6)",
      };
    },
    buttonGradient() {
      return {
        background: "linear-gradient(90deg, #6a11cb, #2575fc)",
      };
    },
  },
  methods: {
    createEventEmit() {
      this.$emit("clicked");
    },
    saveEvent() {
      this.btnLoader = true;
      setTimeout(() => {
        console.log("Event data:", this.event);
        this.btnLoader = false;
        this.createEventEmit();
      }, 1000);
    },
    onBannerSelected(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          this.bannerPreview = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    onMapClick(event) {
      this.mapCenter = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
    },
  },
};
</script>

<style scoped>
.gradient-card {
  background: linear-gradient(135deg, #4a6ee0, #9b59b6);
}
</style>
