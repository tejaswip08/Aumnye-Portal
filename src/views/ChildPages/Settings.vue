<template>
  <div>
    <!-- Tabs Header -->
    <v-tabs v-model="CurrentView" class="custom-tabs" density="compact">
      <v-tab value="ABOUT_ALUMNI">About Alumni</v-tab>
      <v-tab value="ALL_ADMIN">Administrators</v-tab>
    </v-tabs>

    <!-- Tab Content -->
    <v-window v-model="CurrentView" class="mt-4">
      <v-window-item value="ABOUT_ALUMNI">
        <AboutAlumni />
      </v-window-item>

      <v-window-item value="ALL_ADMIN">
        <AllAdmins />
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import AboutAlumni from "@/components/Settings/Cards/AboutAlumni.vue";
import AllAdmins from "@/components/Settings/Cards/AllAdmins.vue";

export default {
  components: { AboutAlumni, AllAdmins },
  data: () => ({
    CurrentView: "ABOUT_ALUMNI",
  }),
};
</script>

<style scoped>
.custom-tabs {
  max-width: 400px; /* 🔹 Prevent full screen */
}

/* Default tab text */
.custom-tabs .v-tab {
  font-weight: 600;
  color: #555; /* normal text color */
  text-transform: none;
}

/* Active tab text with bluish gradient */
.custom-tabs .v-tab.v-tab--selected {
  background: linear-gradient(90deg, #4facfe, #297e83);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
