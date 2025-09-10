<template>
  <div>
    <!-- <CreateUserDialog
      :CreateUserDialog="CreateUserDialog"
      @clicked="createUserDialogEmit"
    /> -->
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="4">
          <v-card class="card-property card-property-hover pa-5" elevation="0">
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
                  <v-icon size="30" color="#9333ea">mdi-message-outline</v-icon>
                </div>
                <div class="mt-3">
                  <span class="font-size-four">
                    <span class="font-weight-one"> Members: </span>
                    <span class="grey-font font-weight-two"> 20 </span>
                  </span>
                </div>
                <!-- <div>
                  <span class="font-size-three">
                    <span class="font-weight-one"> Active Members: </span>
                    <span class="grey-font font-weight-two"> 3</span>
                  </span>
                </div>
                <div>
                  <span class="font-size-three">
                    <span class="font-weight-one"> Inactive Members: </span>
                    <span class="grey-font font-weight-two"> 6</span>
                  </span>
                </div> -->
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card class="card-property card-property-hover pa-5" elevation="0">
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
                  <v-icon size="30" color="#0e9a6e">mdi-calendar</v-icon>
                </div>
                <div class="mt-3">
                  <span class="font-size-four">
                    <span class="font-weight-one"> Events: </span>
                    <span class="grey-font font-weight-two"> 0 </span>
                  </span>
                </div>
                <!-- <div>
                  <span class="font-size-three">
                    <span class="font-weight-one"> Active Events: </span>
                    <span class="grey-font font-weight-two"> 0</span>
                  </span>
                </div>
                <div>
                  <span class="font-size-three">
                    <span class="font-weight-one"> Inactive Events: </span>
                    <span class="grey-font font-weight-two"> 0</span>
                  </span>
                </div> -->
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4">
          <v-card class="card-property card-property-hover pa-5" elevation="0">
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
                  <v-icon size="30" color="#2563eb"
                    >mdi-account-multiple-outline</v-icon
                  >
                </div>

                <div class="mt-3">
                  <span class="font-size-four">
                    <span class="font-weight-one"> Announcements: </span>
                    <span class="grey-font font-weight-two"> 5 </span>
                  </span>
                </div>
                <!-- <div>
                  <span class="font-size-three">
                    <span class="font-weight-one"> Active Users: </span>
                    <span class="grey-font font-weight-two"> 2</span>
                  </span>
                </div>
                <div>
                  <span class="font-size-three">
                    <span class="font-weight-one"> Inactive Users: </span>
                    <span class="grey-font font-weight-two"> 3</span>
                  </span>
                </div> -->
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-card class="card-property mt-5 pa-5" elevation="0">
        <div class="fontsize17px font-weight-one">Quick Actions</div>

        <v-row class="mt-3">
          <v-col
            cols="12"
            lg="4"
            v-for="(cardData, index) in QuickActions"
            :key="index"
          >
            <v-card
              class="card-property pa-5 card-property-hover"
              :color="cardData.color"
              elevation="0"
              @click="routeCardMethod(cardData.text)"
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
      </v-card> -->
      <v-row class="mt-5">
        <!-- Alumni Growth Card -->
        <v-col cols="12" md="6">
          <v-card class="pa-4 card-property" height="480px" elevation="0">
            <div class="d-flex justify-space-between align-center mb-4">
              <h3>Alumni Growth</h3>
              <v-select
                v-model="selectedRange"
                :items="ranges"
                variant="outlined"
                density="compact"
                hide-details
                color="primary"
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

        <v-col cols="12" md="6" class="app-font-style">
          <v-card class="pa-4 card-property" elevation="0">
            <!-- Header -->
            <div class="d-flex justify-space-between align-center mb-6">
              <h3 class="font-weight-bold text-h5 d-flex align-center">
                🎉 Upcoming Events
              </h3>
              <v-btn
                variant="tonal"
                size="small"
                color="primary"
                class="text-capitalize font-weight-medium"
              >
                View All
                <v-icon size="18" class="ml-1">mdi-arrow-right</v-icon>
              </v-btn>
            </div>

            <!-- Event Cards -->
            <v-card
              v-for="(event, i) in events"
              :key="i"
              class="pa-4 mb-4 d-flex justify-space-between align-center card-property"
              elevation="0"
              variant="outlined"
            >
              <!-- Left Info -->
              <div>
                <div class="font-weight-bold text-body-1 mb-3 text-dark">
                  {{ event.name }}
                </div>

                <!-- Date -->
                <div class="mb-2">
                  <v-chip
                    size="small"
                    color="indigo"
                    text-color="white"
                    variant="flat"
                    class="font-weight-medium"
                  >
                    <v-icon size="16" class="mr-1">mdi-calendar</v-icon>
                    {{ event.date }}
                  </v-chip>
                </div>

                <!-- Location -->
                <div class="d-flex align-center mb-2 text-grey-darken-2">
                  <v-icon size="18" color="green" class="mr-2"
                    >mdi-map-marker</v-icon
                  >
                  {{ event.location }}
                </div>

                <!-- Registered -->
                <div class="d-flex align-center text-grey-darken-2">
                  <v-icon size="18" color="deep-orange" class="mr-2"
                    >mdi-account-group</v-icon
                  >
                  {{ event.registered }} registered
                </div>
              </div>

              <!-- Status -->
              <v-chip
                :color="event.statusColor"
                class="text-capitalize font-weight-medium px-4 py-2"
                variant="elevated"
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
import VueApexCharts from "vue3-apexcharts";
export default {
  components: { apexchart: VueApexCharts },
  data: () => ({
    CreateUserDialog: false,
    QuickActions: [
      {
        text: "Onboard User",
        subtext: "Register new user",
        icon: "mdi-plus",
        color: "#2563eb",
      },
      {
        text: "Invite Member",
        subtext: "Export alumni data",
        icon: "mdi-file",
        color: "#9333ea",
      },
      {
        text: "Events",
        subtext: "Plan, create, and communicate events",
        icon: "mdi-email-outline",
        color: "#059669",
      },

      // {
      //   text: "Create Event",
      //   subtext: "Schedule new event",
      //   icon: "mdi-calendar-outline",
      //   color: "#ea580c",
      // },
    ],
    // QuickActions: [
    //   {
    //     text: "Add Alumni",
    //     subtext: "Register new alumni member",
    //     icon: "mdi-plus",
    //     color: "#2563eb",
    //   },
    //   {
    //     text: "Send Newsletter",
    //     subtext: "Create and send communication",
    //     icon: "mdi-email-outline",
    //     color: "#059669",
    //   },
    //   {
    //     text: "Generate Report",
    //     subtext: "Export alumni data",
    //     icon: "mdi-file",
    //     color: "#9333ea",
    //   },
    //   {
    //     text: "Create Event",
    //     subtext: "Schedule new event",
    //     icon: "mdi-calendar-outline",
    //     color: "#ea580c",
    //   },
    // ],

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

  mounted() {
    console.log(
      "GET_CURRENT_TEJJJ",
      this.$store.getters.get_currentuser_details.alumnnye_details
        .active_users_count
    );
  },

  methods: {
    routeCardMethod(navigateTo) {
      const obj = {
        value: true,
      };
      const stringifiedObj = JSON.stringify(obj);
      sessionStorage.setItem("OPEN_CREATE_DIALOG", stringifiedObj);
      if (navigateTo == "Onboard User") {
        this.$router.push("/all-users");
      } else if (navigateTo == "Invite Member") {
        this.$router.push("/all-members");
      }
    },
    createUserDialogEmit() {
      this.CreateUserDialog = false;
    },
  },
};
</script>
