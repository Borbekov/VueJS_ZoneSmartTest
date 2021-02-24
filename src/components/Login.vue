<template>
  <div id="login">
    <div id="wrapper">
      <h1>Вход</h1>
      <div class="input">
        <input type="text" name="email" id="email" placeholder="E-mail или телефон">
      </div>
      <div class="input password">
        <input :type="input_type" name="password" id="password" placeholder="Пароль">
        <i class="ri-eye-line" v-if="input_type === 'password'" @click="input_type = 'text'"></i>
        <i class="ri-eye-off-line" v-else @click="input_type = 'password'"></i>
      </div>
      <button>Войти</button>
      <p id="register">Зарегистрироваться</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
    input_type: "password"
  })
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
      input {
        border: 1px solid #C5C7CD;
        border-radius: 6px;
        width: 90%;
        padding: 15px;
        &:focus {
          outline: none;
        }
      }
    }
    button {
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
    }
    #register {
      color: #1FB297;
      line-height: 22px;
      font-size: 12px;
      cursor: pointer;
    }
  }
}

</style>
