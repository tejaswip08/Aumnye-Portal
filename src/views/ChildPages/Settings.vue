<template>
  <v-container>
    <v-card class="pa-6" elevation="1" rounded>
      <h2 class="text-h6 font-weight-bold mb-4">Notification Preferences</h2>

      <v-divider class="mb-4" />

      <v-list lines="two" density="comfortable">
        <v-list-item v-for="(item, index) in preferences" :key="index">
          <template #prepend>
            <v-icon class="me-4" color="primary" size="28">
              {{ item.icon }}
            </v-icon>
          </template>

          <v-list-item-title class="text-subtitle-1 font-weight-medium">
            {{ item.title }}
          </v-list-item-title>

          <v-list-item-subtitle class="text-body-2 text-grey-darken-1">
            {{ item.subtitle }}
          </v-list-item-subtitle>

          <template #append>
            <v-switch
              v-model="item.enabled"
              color="primary"
              hide-details
            ></v-switch>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "NotificationPreferences",
  data() {
    return {
      preferences: [
        {
          title: "New Alumni Registration",
          subtitle: "Get notified when new alumni join the network",
          icon: "mdi-account-alert-outline",
          enabled: true,
        },
        {
          title: "Event Registrations",
          subtitle: "Receive alerts for event sign-ups and cancellations",
          icon: "mdi-calendar-check-outline",
          enabled: true,
        },
        {
          title: "Email Campaign Results",
          subtitle: "Get summaries of email campaign performance",
          icon: "mdi-email-outline",
          enabled: false,
        },
        {
          title: "System Updates",
          subtitle: "Important platform updates and maintenance notices",
          icon: "mdi-bell-outline",
          enabled: true,
        },
        {
          title: "Weekly Reports",
          subtitle: "Automated weekly summary of platform activity",
          icon: "mdi-chart-box-outline",
          enabled: true,
        },
        {
          title: "Monthly Analytics",
          subtitle: "Comprehensive monthly analytics and insights",
          icon: "mdi-chart-line",
          enabled: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid #eee;
}
.v-list-item:last-child {
  border-bottom: none;
}
</style>
