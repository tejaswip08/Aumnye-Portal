<template>
  <div class="auth-page">
    <Snackbar :SnackBarComponent="SnackBarComponent" />

    <v-container class="login-container" fluid>
      <v-row class="full-height d-flex align-center justify-center" no-gutters>
        <v-col cols="12" md="8" lg="7">
          <v-card flat class="d-flex overflow-hidde" rounded="xl">
            <v-row>
              <!-- Branding Side -->
              <v-col
                v-if="$vuetify.display.mdAndUp"
                cols="6"
                class="branding d-flex flex-column align-center justify-center"
              >
                <transition name="fade-up" appear>
                  <div class="text-center">
                    <v-avatar size="110" class="mb-4 glass-avatar">
                      <v-icon size="80" color="#fff">mdi-school</v-icon>
                    </v-avatar>
                    <h2 class="branding-title">Connect. Engage. Thrive.</h2>
                    <p class="branding-subtitle">Your alumni network awaits.</p>
                  </div>
                </transition>
              </v-col>

              <!-- Form Side -->
              <v-col
                :cols="$vuetify.display.mdAndUp ? 6 : 12"
                class="form-section d-flex flex-column align-center justify-center pa-8"
              >
                <v-window v-model="step" class="w-100">
                  <v-window-item :value="1">
                    <transition name="fade-scale" mode="out-in">
                      <v-card flat class="glass-card pa-6">
                        <div class="text-center mb-6">
                          <v-icon size="45" color="primary">mdi-school</v-icon>
                          <h2 class="mt-2">Alumnye</h2>
                          <p class="text-grey-darken-1">Welcome Back</p>
                        </div>

                        <v-form
                          ref="LoginForm"
                          @submit.prevent="validateSignIn"
                        >
                          <v-text-field
                            color="primary"
                            v-model="form.email"
                            label="Email Address *"
                            type="email"
                            variant="outlined"
                            class="styled-input"
                            density="comfortable"
                            required
                            :rules="[
                              (v) => !!v || '',
                              (v) =>
                                /.+@.+\..+/.test(v) || 'Email must be valid',
                            ]"
                          />

                          <div class="mt-4" v-if="showOTP">
                            <div class="mb-2">Enter OTP *</div>
                            <v-otp-input
                              class="otp-field styled-input"
                              v-model="form.password"
                              variant="outlined"
                              density="comfortable"
                              required
                              :rules="[(v) => !!v || '']"
                            />
                          </div>

                          <v-btn
                            type="submit"
                            size="large"
                            block
                            class="my-4 gradient-btn"
                            :loading="loginLoader"
                          >
                            Login
                          </v-btn>

                          <p class="text-center">
                            Don't have an account?
                            <a href="#" @click="signUpClick" class="link"
                              >Sign Up</a
                            >
                          </p>
                        </v-form>
                      </v-card>
                    </transition>
                  </v-window-item>

                  <!-- Sign Up -->
                  <v-window-item :value="2">
                    <transition name="fade-scale" mode="out-in">
                      <v-card flat class="glass-card pa-6">
                        <div class="text-center mb-6">
                          <v-icon size="45" color="primary">mdi-school</v-icon>
                          <h2 class="mt-2">Alumnye</h2>
                        </div>

                        <v-form
                          ref="SignUpForm"
                          @submit.prevent="validateSignUp"
                        >
                          <v-text-field
                            color="primary"
                            v-model="SignUP.AlumniName"
                            label="Alumni Name *"
                            variant="outlined"
                            class="styled-input"
                            density="compact"
                            :rules="[(v) => !!v || '']"
                          />

                          <v-select
                            color="primary"
                            v-model="SignUP.AlumniType"
                            label="Alumni Type *"
                            :items="Alumni_Type"
                            variant="outlined"
                            class="styled-input"
                            density="compact"
                            :rules="[(v) => !!v || '']"
                          />

                          <!-- <v-select
                            color="primary"
                            density="compact"
                            variant="outlined"
                            class="styled-input"
                            v-model="SignUP.AlumniSize"
                            label="Alumni Size *"
                            :items="AlumniSizeArray"
                          /> -->

                          <v-autocomplete
                            color="primary"
                            density="compact"
                            variant="outlined"
                            class="styled-input"
                            v-model="SignUP.StartYear"
                            label="Start Year *"
                            :items="Alumni_StartYear"
                          />

                          <v-text-field
                            color="primary"
                            v-model="SignUP.Email"
                            label="Email Address *"
                            type="email"
                            variant="outlined"
                            class="styled-input"
                            density="compact"
                            :rules="[
                              (v) => !!v || '',
                              (v) =>
                                /.+@.+\..+/.test(v) || 'Email must be valid',
                            ]"
                          />

                          <v-btn
                            type="submit"
                            size="large"
                            block
                            class="my-4 gradient-btn"
                            :loading="SignUpLoading"
                          >
                            Sign Up
                          </v-btn>

                          <p class="text-center">
                            Already have an account?
                            <a href="#" @click="step = 1" class="link">Login</a>
                          </p>
                        </v-form>
                      </v-card>
                    </transition>
                  </v-window-item>
                </v-window>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Snackbar from "@/components/Extras/SnackBar.vue";
import { signUp, signIn, confirmSignIn, signOut } from "aws-amplify/auth";

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      step: 1,
      showOTP: false,
      loginLoader: false,
      SignUpLoading: false,
      StopLoading: false,
      SnackBarComponent: {},
      form: {
        email: "",
        password: "",
      },
      SignUP: {
        AlumniName: "",
        AlumniType: "",
        UserName: "",
        Email: "",
        AlumniSize: "1000",
        StartYear: "2000",
        Country_Code: "+91",
        Contact_Number: "",
      },
      Alumni_Type: ["SCHOOL", "UNIVERSITY", "CORPORATE"],

      AlumniSizeArray: ["100", "1000", "10000", "100000"],

      rules: {
        required: (v) => !!v || "",
        email: (v) =>
          /.+@.+\..+/.test(v) || "Please enter a valid email address",
      },
      countryCodes: ["+91", "+1"],
      IsOTPFieldEnabled: false,
    };
  },
  computed: {
    Alumni_StartYear() {
      return Array.from({ length: 2025 - 1900 + 1 }, (_, idx) =>
        String(2025 - idx)
      );
    },
  },

  methods: {
    handleLogin() {
      console.log("Login form submitted:", this.form);
      alert(`Welcome back, ${this.form.email}!`);
    },
    signUpClick() {
      this.step = 2;
    },

    async validateSignIn() {
      const valid = await this.$refs.LoginForm.validate();
      if (valid.valid) {
        console.log("valid");
        this.signInMethod(this.showOTP ? "VERIFY_OTP" : "SEND_OTP");
      } else {
        console.log("invalid");
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          timeout: 2000,
          SnackbarText: "Please enter valid details",
        };
      }
    },

    async validateSignUp() {
      const { valid } = await this.$refs.SignUpForm.validate();
      if (valid) {
        this.signUpMethod();
      } else {
        this.SnackBarComponent = {
          SnackbarVmodel: true,
          SnackbarColor: "red",
          timeout: 2000,
          SnackbarText: `Please fill mandatory fields`,
        };
      }
    },

    async signInMethod(action) {
      switch (action) {
        case "SEND_OTP":
          try {
            if (this.StopLoading == false) {
              this.loginLoader = true;
            }
            this.user = await signIn({
              username: this.form.email.toLowerCase(),
              options: {
                authFlowType: "CUSTOM_WITHOUT_SRP",
              },
            });
            console.log("this.user", this.user);
            if (
              this.user.nextStep.signInStep ==
                "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE" &&
              this.StopLoading == false
            ) {
              this.SnackBarComponent = {
                SnackbarVmodel: true,
                SnackbarColor: "green",
                timeout: 2000,
                SnackbarText: `Verification OTP sent to ${this.form.email.toLocaleLowerCase()}`,
              };

              // this.counter = 60;
              setTimeout(() => {
                this.showOTP = true;
                this.loginLoader = false;
                // this.StopLoading = false;
                // this.startCountdown();
              }, 1000);
              this.$forceUpdate();
            }
          } catch (error) {
            console.log("erro", error);
            if (error.message == "There is already a signed in user.") {
              if (this.StopLoading == false) {
                this.loginLoader = true;
              }
              await signOut({ global: true });
              this.signInMethod("SEND_OTP");
            } else if (
              error.message ==
              "VerifyAuthChallengeResponse failed with error Incorrect OTP!!."
            ) {
              this.showOTP = false;
              this.loginLoader = false;
              this.SnackBarComponent = {
                SnackbarVmodel: true,
                SnackbarColor: "redColorVariant3",
                timeout: 2000,
                SnackbarText: error.message,
              };
            } else {
              console.log("error", error);
              this.loginLoader = false;
              this.SnackBarComponent = {
                SnackbarVmodel: true,
                SnackbarColor: "redColorVariant3",
                timeout: 2000,
                SnackbarText: error.message,
              };
            }
          }
          break;
        case "VERIFY_OTP":
          try {
            this.loginLoader = true;
            console.log("coming In");
            await confirmSignIn({ challengeResponse: this.form.password })
              .then((res) => {
                this.SnackBarComponent = {
                  SnackbarVmodel: true,
                  SnackbarColor: "green",
                  SnackbarText: "Login Successfull",
                };
                console.log("yes", this.form.email);
                this.IsOTPFieldEnabled = false;
                // this.IsSessionLoggedOut = false;
                localStorage.setItem("IsLoggedOut", "false");
                this.$store.commit("SET_USER_MAIL", this.form.email);
                this.loginLoader = false;
                setTimeout(() => {
                  this.ActivateMethod();
                }, 2000);
              })
              .catch((err) => {
                if (err) {
                  // this.counter = 0;
                  this.form.password = "";
                  this.showOTP = false;
                }
                if (
                  err.message ==
                  "VerifyAuthChallengeResponse failed with error Incorrect OTP!!."
                ) {
                  this.SnackBarComponent = {
                    SnackbarVmodel: true,
                    SnackbarColor: "red",
                    SnackbarText: "Incorrect OTP",
                  };
                } else {
                  this.SnackBarComponent.SnackbarVmodel = false;
                  this.SnackBarComponent = {
                    SnackbarVmodel: true,
                    SnackbarColor: "red",
                    SnackbarText: err.message,
                  };
                }
                this.OTPErrorMessage = err.message;
                this.loginLoader = false;
              });
          } catch (error) {
            console.log("err", error);
            if (
              error.message ==
              "VerifyAuthChallengeResponse failed with error Incorrect OTP!!."
            ) {
              this.showOTP = false;
              this.loginLoader = false;
              this.SnackBarComponent = {
                SnackbarVmodel: true,
                SnackbarColor: "redColorVariant3",
                timeout: 2000,
                SnackbarText: "Incorrect OTP",
              };
            }
          }
          break;
        case "RESEND_OTP":
          try {
            this.user = await signIn({
              username: this.Login.email_id.toLocaleLowerCase(),
              options: {
                authFlowType: "CUSTOM_WITHOUT_SRP",
              },
            });
            if (
              this.user.nextStep.signInStep ==
              "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
            ) {
              this.SnackBarComponent = {
                SnackbarVmodel: true,
                SnackbarColor: "green",
                timeout: 2000,
                SnackbarText: `Verification OTP sent to ${this.Login.email_id.toLocaleLowerCase()}`,
              };

              // this.counter = 60;
              setTimeout(() => {
                this.showOTP = true;
                this.loginLoader = false;
              }, 1000);
              // this.startCountdown();

              this.$forceUpdate();
            }
          } catch (error) {
            console.log("erro", error);
            if (error.message == "There is already a signed in user.") {
              this.loginLoader = true;
              await signOut({ global: true });
              this.signInMethod("SEND_OTP");
            } else {
              this.loginLoader = false;
              this.SnackBarComponent = {
                SnackbarVmodel: true,
                SnackbarColor: "redColorVariant3",
                timeout: 2000,
                SnackbarText: error.message,
              };
            }
          }
          break;
      }
    },

    async signUpMethod() {
      try {
        this.SignUpLoading = true;
        var inputparams = {
          alumnye_name: this.SignUP.AlumniName,
          alumnye_type: this.SignUP.AlumniType,
          user_email_id: this.SignUP.Email,
          // alumnye_size: this.SignUP.AlumniSize,
          alumnye_start_year: this.SignUP.StartYear,
        };
        console.log("inputparams", inputparams);

        let response = await signUp({
          username: this.SignUP.Email,
          password: "Alumni@123",
          options: {
            userAttributes: {
              name: this.SignUP.AlumniName,
              gender: this.SignUP.AlumniType,
              // locale: this.SignUP.AlumniSize,
              nickname: this.SignUP.StartYear,
            },
          },
        });

        console.log("response", response);
        if (response.nextStep.signUpStep == "DONE") {
          this.StopLoading = true;
          this.step = 1;
          this.showOTP = true;
          this.form.email = this.SignUP.Email;
          this.SnackBarComponent = {
            snackbarVmodel: true,
            snackbarColor: "green",
            snackbarMessage: "OTP sent to " + this.SignUP.Email,
          };
          await this.signInMethod("SEND_OTP");
        }
        this.SignUpLoading = false;
      } catch (error) {
        console.log("error while Signing Up", error);
        if (error.message == "User already exists") {
          const response = await axios.post(
            "https://v3s5vt5xv3.execute-api.us-east-1.amazonaws.com/Pro/signUp",
            inputparams,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("response", response);
          if (response.data.status == "Success") {
            this.StopLoading = true;
            this.step = 1;
            this.showOTP = true;
            this.form.email = this.SignUP.Email;
            this.SnackBarComponent = {
              snackbarVmodel: true,
              snackbarColor: "green",
              snackbarMessage: "OTP sent to " + this.SignUP.Email,
            };
            await this.signInMethod("SEND_OTP");
          }
          this.SignUpLoading = false;
          // this.StopLoading = true;
          // this.step = 1;
          // this.showOTP = true;
          // this.form.email = this.SignUP.Email;
          // await this.signInMethod("SEND_OTP");
        }
        this.SignUpLoading = false;
        this.SnackBarComponent = {
          snackbarVmodel: true,
          snackbarColor: "red",
          snackbarMessage: error.message,
        };
      }
    },
    ActivateMethod() {
      // this.$store.commit("SET_USER_MAIL", this.SignUP.Email);
      setTimeout(() => {
        this.$router.push("/my-dashboard");
      }, 1000);
    },
  },
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8b3c5, #c381ec);
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-wrapper {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.15);
}
.branding {
  background: linear-gradient(135deg, #4285f4, #6a1b9a);
  color: white;
  position: relative;
}
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(18px);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.glass-avatar {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
}
.styled-input {
  border-radius: 12px;
  /* box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06); */
  transition: all 0.3s ease;
}
.styled-input:deep(.v-field__input) {
  border-radius: 12px !important;
}
.styled-input:deep(.v-field__outline) {
  border-radius: 12px !important;
}
.styled-input:focus-within {
  /* box-shadow: 0 0 8px rgba(37, 99, 235, 0.5); */
  transform: translateY(-2px);
}
.gradient-btn {
  background: linear-gradient(135deg, #4285f4, #6a1b9a);
  color: white !important;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
}
.gradient-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}
.link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
}
.link:hover {
  text-decoration: underline;
}
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.6s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s ease;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
</style>
