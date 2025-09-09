<template>
  <div>
    <v-toolbar density="comfortable" color="transparent" class="mt-3" flat>
      <div class="ml-2">
        <h2 class="mb-1">Communications</h2>
        <p class="text-medium-emphasis">
          Send newsletters and announcements to alumni
        </p>
      </div>
      <v-spacer />
      <v-btn
        color="primary"
        variant="elevated"
        elevation="0"
        prepend-icon="mdi-plus"
        class="BtnRadius app-bar-avatar text-capitalize"
      >
        Create Communication
      </v-btn>
    </v-toolbar>
    <v-card class="pa-6 rounded-xl mt-6">
      <!-- Header -->
      <div class="d-flex justify-space-between align-center mb-4">
        <h3>Communication History</h3>
        <div class="d-flex gap-3">
          <v-select
            v-model="selectedType"
            :items="types"
            variant="outlined"
            density="compact"
            hide-details
            style="max-width: 150px"
          ></v-select>
          <v-select
            v-model="selectedStatus"
            :items="statuses"
            variant="outlined"
            density="compact"
            hide-details
            style="max-width: 150px"
          ></v-select>
        </div>
      </div>

      <v-divider horizontal />

      <!-- Communication List -->
      <v-card
        v-for="(item, i) in communications"
        :key="i"
        class="pa-4 mb-4 d-flex align-center justify-space-between"
        elevation="0"
        rounded="lg"
      >
        <!-- Left side -->
        <div class="d-flex align-center">
          <v-icon color="grey" size="23">mdi-email-outline</v-icon>
          <div class="ml-4">
            <div class="d-flex align-center flex-wrap mb-1">
              <span class="font-weight-medium text-body-1">{{
                item.title
              }}</span>
              <v-chip
                v-for="(tag, t) in item.tags"
                :key="t"
                size="x-small"
                class="ml-2"
                :color="tag.color"
                variant="tonal"
              >
                {{ tag.label }}
              </v-chip>
            </div>
            <div class="text-caption text-medium-emphasis">
              Recipients: {{ item.recipients }} • Sent: {{ item.date }}
            </div>
          </div>
        </div>

        <!-- Right side -->
        <div class="d-flex align-center">
          <div class="text-caption text-medium-emphasis mr-8">
            Open Rate: {{ item.openRate || "-" }} <br />
            Click Rate: {{ item.clickRate || "-" }}
          </div>
          <div class="d-flex gap-3">
            <v-icon size="small" color="grey" class="cursor-pointer"
              >mdi-eye</v-icon
            >
            <v-icon size="small" color="grey" class="cursor-pointer"
              >mdi-pencil</v-icon
            >
            <v-icon size="small" class="cursor-pointer" color="red"
              >mdi-delete</v-icon
            >
          </div>
        </div>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "CommunicationHistory",
  data() {
    return {
      selectedType: "All Types",
      selectedStatus: "All Status",
      types: ["All Types", "Newsletter", "Event", "Announcement"],
      statuses: ["All Status", "Sent", "Draft"],
      communications: [
        {
          title: "Monthly Alumni Newsletter - February 2025",
          recipients: 2847,
          date: "2025-01-15",
          openRate: "73%",
          clickRate: "12%",
          tags: [
            { label: "newsletter", color: "blue-lighten-3" },
            { label: "sent", color: "green-lighten-3" },
          ],
        },
        {
          title: "Tech Meetup Invitation",
          recipients: 456,
          date: "2025-01-12",
          openRate: "81%",
          clickRate: "25%",
          tags: [
            { label: "event", color: "purple-lighten-3" },
            { label: "sent", color: "green-lighten-3" },
          ],
        },
        {
          title: "Career Opportunities in Healthcare",
          recipients: 234,
          date: "2025-01-10",
          openRate: null,
          clickRate: null,
          tags: [
            { label: "announcement", color: "green-lighten-3" },
            { label: "draft", color: "yellow-lighten-3" },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.gap-3 {
  gap: 12px;
}
</style>
