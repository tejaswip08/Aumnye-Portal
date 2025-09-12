<template>
  <div>
    <CreateEventDialog
      v-if="CurrentView == 'CREATE_EVENT'"
      @clicked="createEventEmit"
    />
    <div v-if="CurrentView == 'EVENTS_LIST'">
      <v-toolbar color="transparent">
        <v-spacer />
        <v-btn color="primary" @click="CurrentView = 'CREATE_EVENT'"
          >Create Event</v-btn
        >
      </v-toolbar>
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
  }),
  methods: {
    createEventEmit() {
      this.CurrentView = "EVENTS_LIST";
    },
  },
};
</script>
