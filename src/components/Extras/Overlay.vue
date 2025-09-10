<template>
  <v-overlay :model-value="Overlay" class="d-flex align-center justify-center">
    <v-img :width="100" src="@/assets/loader.gif" />
  </v-overlay>
</template>
<script>
export default {
  props: {
    Overlay: Boolean,
  },
};
</script>
