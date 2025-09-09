<template>
  <div>
    <CreateUserDialog
      :CreateUserDialog="CreateUserDialog"
      @clicked="createUserDialogEmit"
    />
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          v-for="(cardData, index) in cardDatas"
          :key="index"
        >
          <v-card class="card-property pa-5" elevation="1">
            <div class="d-flex">
              <div>
                <div
                  style="
                    width: fit-content;
                    background-color: #eff6ff;
                    border-radius: 5px;
                  "
                  class="pa-2"
                >
                  <v-icon size="30" :color="cardData.iconColor">{{
                    cardData.icon
                  }}</v-icon>
                </div>
                <div class="mt-5 font-weight-bold">
                  {{ cardData.count }}
                </div>
                <div class="mt-1">
                  {{ cardData.text }}
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-card class="mt-5 pa-5">
        <div class="fontsize17px font-weight-one">Quick Actions</div>

        <v-row class="mt-3">
          <v-col
            cols="12"
            lg="3"
            v-for="(cardData, index) in QuickActions"
            :key="index"
          >
            <v-card
              class="card-property pa-5 elevation-0"
              :color="cardData.color"
              elevation="0"
            >
              <div class="text-center">
                <v-icon size="30" color="white">{{ cardData.icon }}</v-icon>

                <div class="mt-1">
                  {{ cardData.text }}
                </div>
                <div class="fontsize10px">{{ cardData.subtext }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <v-row class="mt-5">
        <!-- Alumni Growth Card -->
        <v-col cols="12" md="6">
          <v-card class="pa-4 rounded-xl" height="480px" elevation="1">
            <div class="d-flex justify-space-between align-center mb-4">
              <h3>Alumni Growth</h3>
              <v-select
                v-model="selectedRange"
                :items="ranges"
                variant="outlined"
                density="compact"
                hide-details
                style="max-width: 150px"
              />
            </div>
            <apexchart
              type="bar"
              height="250"
              :options="chartOptions"
              :series="series"
            />
            <div class="text-center mt-4">
              <h2 class="font-weight-bold">+647</h2>
              <p class="text-success">New alumni this year</p>
            </div>
          </v-card>
        </v-col>

        <!-- Upcoming Events Card -->
        <v-col cols="12" md="6">
          <v-card class="pa-4 rounded-xl" elevation="1">
            <div class="d-flex justify-space-between align-center mb-4">
              <h3>Upcoming Events</h3>
              <a href="#" class="text-primary text-body-2">View All</a>
            </div>

            <v-card
              v-for="(event, i) in events"
              :key="i"
              class="pa-3 mb-3 d-flex justify-space-between align-center"
              variant="outlined"
              rounded="lg"
            >
              <div>
                <div class="font-weight-medium text-body-1 mb-1">
                  {{ event.name }}
                </div>
                <div class="text-caption d-flex align-center mb-1">
                  <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
                  {{ event.date }}
                </div>
                <div class="text-caption d-flex align-center mb-1">
                  <v-icon size="small" class="mr-1">mdi-map-marker</v-icon>
                  {{ event.location }}
                </div>
                <div class="text-caption d-flex align-center">
                  <v-icon size="small" class="mr-1">mdi-account-group</v-icon>
                  {{ event.registered }} registered
                </div>
              </div>
              <v-chip
                :color="event.statusColor"
                class="text-capitalize"
                variant="tonal"
                size="small"
              >
                {{ event.status }}
              </v-chip>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CreateUserDialog from "@/components/Users/CreateUser.vue";
import VueApexCharts from "vue3-apexcharts";
export default {
  components: { CreateUserDialog, apexchart: VueApexCharts },
  data: () => ({
    CreateUserDialog: false,
    cardDatas: [
      {
        count: "47",
        text: "Total Users",
        icon: "mdi-account-multiple-outline",
        iconColor: "#2563eb",
        chipContent: "+12%",
      },
      {
        count: "12",
        text: "Active Events",
        icon: "mdi-calendar",
        iconColor: "#0e9a6e",
        chipContent: "+12%",
      },
      {
        count: "104",
        text: "Total Members",
        icon: "mdi-message-outline",
        iconColor: "#9333ea",
        chipContent: "+12%",
      },
      {
        count: "2847",
        text: "Total Alumni",
        icon: "mdi-plus",
        iconColor: "#2563eb",
        chipContent: "+12%",
      },
    ],
    QuickActions: [
      {
        text: "Add Alumni",
        subtext: "Register new alumni member",
        icon: "mdi-plus",
        color: "#2563eb",
      },
      {
        text: "Send Newsletter",
        subtext: "Create and send communication",
        icon: "mdi-email-outline",
        color: "#059669",
      },
      {
        text: "Generate Report",
        subtext: "Export alumni data",
        icon: "mdi-file",
        color: "#9333ea",
      },
      {
        text: "Create Event",
        subtext: "Schedule new event",
        icon: "mdi-calendar-outline",
        color: "#ea580c",
      },
    ],

    selectedRange: "Last 6 months",
    ranges: ["Last 6 months", "Last 12 months", "Year to Date"],
    series: [
      {
        name: "New Alumni",
        data: [50, 120, 180, 90, 130, 77],
      },
    ],
    chartOptions: {
      chart: {
        toolbar: { show: false },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      },
      colors: ["#3f51b5"],
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
        },
      },
      dataLabels: { enabled: false },
      grid: { strokeDashArray: 4 },
    },
    events: [
      {
        name: "Annual Alumni Gala",
        date: "2025-03-15 at 7:00 PM",
        location: "Grand Ballroom, City Hotel",
        registered: 156,
        status: "confirmed",
        statusColor: "green-lighten-4",
      },
      {
        name: "Tech Meetup",
        date: "2025-02-28 at 6:30 PM",
        location: "Innovation Center",
        registered: 45,
        status: "planning",
        statusColor: "yellow-lighten-4",
      },
      {
        name: "Career Fair",
        date: "2025-04-10 at 10:00 AM",
        location: "Campus Auditorium",
        registered: 89,
        status: "confirmed",
        statusColor: "green-lighten-4",
      },
    ],
  }),
  methods: {
    createUserDialogEmit() {
      this.CreateUserDialog = false;
    },
  },
};
</script>
