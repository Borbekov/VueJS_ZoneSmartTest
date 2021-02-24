<template>
  <div id="table">
    {{text}}
  </div>
</template>

<script>
export default {
  name: 'table',
  data: () => ({
    text: "table page"
  })
}
</script>

<style lang="scss">
#table {
  background: #E5E5E5;
  width: 100%;
  height: 100%;
}
</style>
