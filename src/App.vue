<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    let access_token = localStorage.getItem("access_token")
    let refresh_token = localStorage.getItem("refresh_token")
    if (access_token) {
      if (this.$router.currentRoute.path !== "/table") {
        this.$router.push("/table") 
      }
      this.$store.commit("SET_ACCESS_TOKEN", access_token)
      this.$store.commit("SET_REFRESH_TOKEN", refresh_token)
    }
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
input {
  border: 1px solid #C5C7CD;
  border-radius: 6px;
  width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 15px;
  &:focus {
    outline: none;
  }
}
.black_btn {
  background: #0F1B25;
  border-radius: 4px;
  padding: 9px 12px;
  color: #FFFFFF;
  letter-spacing: 1px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  margin-right: 10px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
}
.green_btn {
  background: #3CC8AE;
  border-radius: 4px;
  width: 100%;
  padding: 18px;
  border: none;
  color: #FFFFFF;
  letter-spacing: 1px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #3FBAA3;
  }
  &:active {
    background: #41AB97;
  }
  &:disabled {
    opacity: .5;
    cursor: no-drop;
    &:hover {
      background: #3CC8AE;
    }
  }
}
.green_txt {
  color: #1FB297;
  line-height: 22px;
  font-size: 12px;
}
</style>
