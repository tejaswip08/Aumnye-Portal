<template>
  <div>
    <Snackbar :SnackBarComponent="SnackBarComponent" />
    <v-container class="login-container" fluid>
      <v-row class="full-height d-flex align-center justify-center" no-gutters>
        <v-col cols="12" md="7" lg="9">
          <v-card flat class="d-flex overflow-hidden login-wrapper">
            <v-row>
              <v-col
                v-if="$vuetify.display.mdAndUp"
                cols="6"
                class="branding d-flex flex-column align-center justify-center"
              >
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <v-avatar size="110" class="mb-4" color="white">
                  <v-icon size="80" color="#425d80">mdi-school</v-icon>
                </v-avatar>
                <h2 class="branding-title">Connect. Engage. Thrive.</h2>
                <p class="branding-subtitle">Your alumni network awaits.</p>
              </v-col>

              <v-col
                :cols="$vuetify.display.mdAndUp ? 6 : 12"
                class="form-section align-center justify-center pa-8"
              >
                <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-card flat>
                      <div class="text-center mb-6">
                        <v-icon size="45" color="#425d80">mdi-school</v-icon>
                        <h2 class="mt-2">Alumnye</h2>

                        <p class="text-grey-darken-1">Welcome Back</p>
                      </div>

                      <v-form ref="LoginForm" @submit.prevent="validateSignIn">
                        <v-text-field
                          v-model="form.email"
                          label="Email Address *"
                          type="email"
                          variant="outlined"
                          color="primary"
                          density="comfortable"
                          required
                          :rules="[
                            (v) => !!v || '',
                            (v) => /.+@.+\..+/.test(v) || 'Email must be Valid',
                            (v) => !!v || '',
                          ]"
                        />

                        <div class="mt-4 pa-0 text-left" v-if="showOTP">
                          <div>Enter OTP *</div>
                          <v-otp-input
                            class="text-left otp-field"
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
                          @click.prevent="validateSignIn"
                        >
                          Login
                        </v-btn>

                        <p class="text-center">
                          Don't have an account?
                          <a href="#" @click="signUpClick">Sign Up</a>
                        </p>
                      </v-form>
                    </v-card>
                  </v-window-item>
                  <v-window-item :value="2">
                    <v-card flat class="pa-2">
                      <div class="text-center mb-6">
                        <v-icon size="45" color="#425d80">mdi-school</v-icon>
                        <h2 class="mt-2">Alumnye</h2>
                      </div>

                      <v-form ref="SignUpForm" @submit.prevent="validateSignUp">
                        <v-text-field
                          v-model="SignUP.AlumniName"
                          label="Alumni Name *"
                          type="text"
                          variant="outlined"
                          color="primary"
                          density="comfortable"
                          required
                          :rules="[(v) => !!v || '']"
                        />
                        <v-select
                          v-model="SignUP.AlumniType"
                          label="Alumni Type *"
                          type="text"
                          variant="outlined"
                          color="primary"
                          density="comfortable"
                          :items="Alumni_Type"
                          required
                          :rules="[(v) => !!v || '']"
                        />

                        <v-text-field
                          v-model="SignUP.UserName"
                          label="User Name *"
                          type="text"
                          variant="outlined"
                          color="primary"
                          density="comfortable"
                          required
                          :rules="[(v) => !!v || '']"
                        />

                        <v-text-field
                          v-model="SignUP.Email"
                          label="Email Address"
                          type="email"
                          variant="outlined"
                          color="primary"
                          density="comfortable"
                          required
                        />

                        <div class="text-center mt-n4 font-weight-bold">Or</div>
                        <v-row>
                          <v-col cols="3">
                            <v-autocomplete
                              v-model="SignUP.Country_Code"
                              label="Code"
                              type="text"
                              :items="countryCodes"
                              variant="outlined"
                              color="primary"
                              density="comfortable"
                              class="mt-1"
                            />
                          </v-col>
                          <v-col cols="9">
                            <v-text-field
                              v-model="SignUP.Contact_Number"
                              label="Contact Number"
                              type="Number"
                              variant="outlined"
                              color="primary"
                              density="comfortable"
                              class="mt-1"
                              required
                              :rules="[
                                (v) =>
                                  !v ||
                                  v.length === 10 ||
                                  'Contact number must be 10 digits',
                              ]"
                            />
                          </v-col>
                        </v-row>

                        <v-btn
                          type="submit"
                          size="large"
                          block
                          class="mb-4 gradient-btn"
                          :loading="SignUpLoading"
                          @click.prevent="validateSignUp"
                        >
                          Sign Up
                        </v-btn>

                        <p class="text-center">
                          Already have an account?
                          <a href="#" @click="step = 1">Login</a>
                        </p>
                      </v-form>
                    </v-card>
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
import { signIn, confirmSignIn, signOut } from "aws-amplify/auth";

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
        Country_Code: "+91",
        Contact_Number: "",
      },
      Alumni_Type: ["School", "University", "Corporate"],

      rules: {
        required: (v) => !!v || "",
        email: (v) =>
          /.+@.+\..+/.test(v) || "Please enter a valid email address",
      },
      countryCodes: ["+91", "+1"],
      IsOTPFieldEnabled: false,
    };
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
            this.loginLoader = true;
            this.user = await signIn({
              username: this.form.email.toLowerCase(),
              options: {
                authFlowType: "CUSTOM_WITHOUT_SRP",
              },
            });
            console.log("this.user", this.user);
            if (
              this.user.nextStep.signInStep ==
              "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
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
                // this.startCountdown();
              }, 1000);
              this.$forceUpdate();
            }
          } catch (error) {
            console.log("erro", error);
            if (error.message == "There is already a signed in user.") {
              this.loginLoader = true;
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
                console.log("yes");
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
          user_name: this.SignUP.UserName,
          user_country_code: this.SignUP.Contact_Number
            ? this.SignUP.Country_Code
            : undefined,
          phone_number: this.SignUP.Contact_Number
            ? this.SignUP.Country_Code + this.SignUP.Contact_Number
            : undefined,
        };
        console.log("inputparams", inputparams);

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
          this.$store.commit("SET_USER_MAIL", this.SignUP.Email);
          this.ActivateMethod();
        }
        this.SignUpLoading = false;
      } catch (error) {
        console.log("error while Signing Up", error);
        this.SignUpLoading = false;
        this.SnackBarComponent = {
          snackbarVmodel: true,
          snackbarColor: "red",
          snackbarMessage: error.message,
        };
      }
    },
    ActivateMethod() {
      this.$router.push("/LandingPage");
    },
  },
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4f8;
}

.full-height {
  height: 85vh !important; /* ensures vertical centering */
}

/* Card Wrapper */
.login-wrapper {
  min-height: 620px !important;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.15);
}

/* Gradient Button */
.gradient-btn {
  background: linear-gradient(90deg, #00c6ff, #007bff);
  color: white !important;
  font-weight: bold;
  border-radius: 8px;
  text-transform: none;
  transition: 0.3s ease-in-out;
}
.gradient-btn:hover {
  background: linear-gradient(90deg, #0056b3, #0099cc);
}
/* Left Branding Panel */
.branding {
  background: linear-gradient(135deg, #84bbf6, #1b263b);
  color: white;
  text-align: center;
  padding: 40px;
}
.branding-title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
}
.branding-subtitle {
  font-size: 14px;
  opacity: 0.8;
}

/* Right Form Panel */
.form-section {
  background: #ffffff;
}
/* Circles inside Branding Panel */
.branding {
  position: relative; /* needed for absolute circles */
  overflow: hidden; /* ensures circles don't leak outside */
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2); /* transparent white */
}

.circle-1 {
  width: 180px;
  height: 180px;
  top: -40px;
  left: -40px;
}

.circle-2 {
  width: 120px;
  height: 120px;
  bottom: 20%;
  right: -40px;
}

.circle-3 {
  width: 80px;
  height: 80px;
  bottom: -30px;
  left: 30%;
}
</style>
