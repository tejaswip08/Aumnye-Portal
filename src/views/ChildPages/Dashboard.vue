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
    </v-container>
  </div>
</template>

<script>
import CreateUserDialog from "@/components/Users/CreateUser.vue";
export default {
  components: { CreateUserDialog },
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
  }),
  methods: {
    createUserDialogEmit() {
      this.CreateUserDialog = false;
    },
  },
};
</script>
