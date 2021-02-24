<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    this.$router.push("/login")
  }

}
</script>

<style lang="scss">
html {
  font-family: 'Roboto', sans-serif;
}
body {
  margin: 0;
}
</style>
