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
          <v-card class="card-property pa-5" elevation="0">
            <div class="d-flex">
              <div>
                <div
                  style="
                    width: fit-content;
                    background-color: #eff6ff;
                    border-radius: 5px;
                  "
                  class="pa-4"
                >
                  <v-icon size="25" :color="cardData.iconColor">{{
                    cardData.icon
                  }}</v-icon>
                </div>
                <div class="mt-5">
                  {{ cardData.count }}
                </div>
                <div>
                  {{ cardData.text }}
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-col cols="3" v-for="(cardData, index) in cardDatas">
          <v-card>
            <div class="d-flex">
              <div>
                {{ cardData.text }}
              </div>
            </div>
          </v-card>
        </v-col> -->
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
        count: "2847",
        text: "Total Alumni",
        icon: "mdi-human-male-male",
        iconColor: "#2563eb",
        chipContent: "+12%",
      },
      {
        count: "2847",
        text: "Total Alumni",
        icon: "mdi-plus",
        iconColor: "#2563eb",
        chipContent: "+12%",
      },
      {
        count: "2847",
        text: "Total Alumni",
        icon: "mdi-plus",
        iconColor: "#2563eb",
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
  }),
  methods: {
    createUserDialogEmit() {
      this.CreateUserDialog = false;
    },
  },
};
</script>
