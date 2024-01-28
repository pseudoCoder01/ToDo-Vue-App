<template>
  <div class="card-body">
        <Router-view />
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      baseUrl: window.location.origin + "/",
    };
  },
};
</script>
