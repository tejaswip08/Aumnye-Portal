<template>
  <div>
    <CreateEventDialog
      v-if="CurrentView == 'CREATE_EVENT'"
      @clicked="createEventEmit"
    />
    <div v-if="CurrentView == 'EVENTS_LIST'">
      <v-card class="pa-3 card-property">
        <!-- <v-toolbar color="transparent">
          <v-spacer /> -->
        <!-- <div>
            <v-text-field
              v-model="search"
              color="primary"
              label="Search Event"
              variant="outlined"
              rounded="lg"
              density="compact"
              hide-details
              style="width: 250px"
              class="mr-4 custom-label"
              prepend-inner-icon="mdi-magnify"
            />
          </div> -->
        <!-- <v-btn
            color="primary"
            variant="tonal"
            class="mt-n3 mr-3"
            @click="CurrentView = 'CREATE_EVENT'"
            ><v-icon size="small" class="mr-1">mdi-calendar</v-icon>Create
            Event</v-btn
          > -->
        <!-- </v-toolbar> -->
        <v-row>
          <v-col
            v-for="(event, index) in events"
            :key="index"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="rounded-xl elevation-3 hover:shadow-lg transition-all duration-300"
            >
              <v-img
                :src="event.image"
                height="180"
                class="rounded-t-xl"
                cover
              ></v-img>

              <v-card-title class="text-h6 font-weight-bold">
                {{ event.title }}
              </v-card-title>

              <v-card-subtitle class="text-grey">
                {{ event.date }}
              </v-card-subtitle>

              <v-card-text>
                {{ event.description }}
              </v-card-text>

              <v-card-actions class="ml-2">
                <v-btn color="primary" variant="tonal" size="small">
                  View Details
                </v-btn>
                <v-btn color="secondary" variant="outlined" size="small">
                  Register
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import CreateEventDialog from "@/components/Events/CreateEditEvent.vue";
export default {
  components: {
    CreateEventDialog,
  },
  data: () => ({
    CurrentView: "EVENTS_LIST",
    events: [
      {
        title: "Tech Conference 2025",
        date: "Oct 12, 2025",
        description:
          "Join industry leaders to discuss the future of AI, Cloud, and Web3.",
        image: "https://picsum.photos/500/300?random=1",
      },
      {
        title: "Startup Pitch Day",
        date: "Nov 3, 2025",
        description:
          "Pitch your startup idea to investors, mentors and experts.",
        image: "https://picsum.photos/500/300?random=2",
      },
      {
        title: "Design Hackathon",
        date: "Dec 8, 2025",
        description: "48 hours of creativity to solve real-world UX problems.",
        image: "https://picsum.photos/500/300?random=3",
      },
      {
        title: "Alumni Meetup",
        date: "Jan 15, 2026",
        description:
          "Reconnect with alumni, expand your network, and share experiences.",
        image: "https://picsum.photos/500/300?random=4",
      },
    ],
  }),
  methods: {
    createEventEmit() {
      this.CurrentView = "EVENTS_LIST";
    },
  },
};
</script>
