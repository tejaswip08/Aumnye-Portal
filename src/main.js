import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import store from "./store";
import { Amplify } from "aws-amplify";

loadFonts();

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_QMvHRoX5W",
      userPoolClientId: "736272ak5fdb472uf8hu47pq8o",
      identityPoolId: "us-east-1:f9fe967a-0bd5-4a03-8d46-05a01a4507d4",
      signUpVerificationMethod: "code",
      loginWith: {
        email: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint:
        "https://5k2smrhpwnfcbjwjzwgmrn4rka.appsync-api.us-east-1.amazonaws.com/graphql",
      region: "us-east-1",
      defaultAuthMode: "apiKey",
      apiKey: "da2-qe5ymkeb3ngonn6ppstpqi4agu",
      logger_level: "DEBUG",
    },
  },
  // Storage: {
  //   S3: {
  //     bucket: "dyrectori-mobile",
  //     region: "ap-south-1",
  //     logger_level: "DEBUG",
  //   },
  // },
});

const app = createApp(App);

app.use(router).use(store).use(vuetify).mount("#app");
