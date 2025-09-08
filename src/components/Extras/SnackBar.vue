<template>
  <v-snackbar
    absolute
    v-model="SnackBarComponent.SnackbarVmodel"
    location="top right"
    color="white"
    class="mt-4"
    :timeout="SnackBarComponent.timeout"
  >
    <span
      class="text-center"
      :class="`text-${SnackBarComponent.SnackbarColor}`"
    >
      <v-icon
        size="small"
        location="start"
        :color="SnackBarComponent.SnackbarColor"
      >
        {{
          SnackBarComponent.SnackbarColor == "green"
            ? "mdi-checkbox-marked-circle"
            : SnackBarComponent.SnackbarColor == "red"
            ? "mdi-close-circle"
            : ""
        }}
      </v-icon>
      <span class="ml-4 black--text font-weight-bold">{{
        ` ${SnackBarComponent.SnackbarText}`
      }}</span>
    </span>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    SnackBarComponent: Object,
  },
  methods: {},
};
</script>
