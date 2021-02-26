<template>
  <div id="login">
    <div id="wrapper">
      <h1>Вход</h1>
      <div class="input">
        <input type="text" placeholder="E-mail или телефон" v-model="email">
      </div>
      <div class="input password">
        <input :type="input_type" placeholder="Пароль" v-model="password">
        <i class="ri-eye-line" v-if="input_type === 'password'" @click="input_type = 'text'"></i>
        <i class="ri-eye-off-line" v-else @click="input_type = 'password'"></i>
      </div>
      <button class="green_btn" id="login_btn" @click="login">Войти</button>
      <p class="green_txt">Зарегистрироваться</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: 'login',
  data: () => ({
    input_type: "password",
    email: "test@zonesmart.ru",
    password: "4815162342test"
  }),
  computed: {
    ...mapGetters({

    })
  },
  methods: {
    ...mapActions({
      logInFunc: 'logIn'
    }),
    login() {
      document.getElementById("login_btn").disabled = true
      let data = {
        email: this.email,
        password: this.password
      }
      this.logInFunc(data).then(status => {
        if (status === "success") {
          document.getElementById("login_btn").disabled = false
          this.$router.push("/table")
        } else {
          document.getElementById("login_btn").disabled = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  background: #F6F9FC;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  #wrapper {
    background: #FFFFFF;
    box-shadow: 0px 14px 64px rgba(48, 56, 64, 0.16);
    border-radius: 6px;
    width: 307px;
    padding: 40px 50px;
    display: flex;
    flex-flow: column;
    align-items: center;
    h1 {
      color: #152739;
      line-height: 120%;
      font-size: 36px;
      font-weight: 500;
      color: #152739;
      margin-bottom: 40px;
    }
    .input {
      width: 100%;
      margin-bottom: 30px;
      &.password {
        position: relative;
        i {
          position: absolute;
          color: #C5C7CD;
          font-size: 20px;
          top: 15px;
          right: 17px;
          cursor: pointer;
        }
      }
    }
  }
}

</style>
