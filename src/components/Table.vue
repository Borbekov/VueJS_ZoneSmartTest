<template>
  <div id="wrapper">
    <div class="table_container">
      <div class="top">
        <div class="main_header">
          <p class="title">Таблица заказов</p>
          <div class="actions">
            <p class="logout" @click="logOut">Выйти</p>
            <button class="black_btn">Отправления</button>
            <button class="green_btn">Экспортировать</button>
          </div>
        </div>
        <div class="filter">
          <button class="black_btn">Фильтр</button>
          <input type="text" placeholder="Поиск" v-model="search_key">
        </div>
      </div>

      <!-- TABLE -->
      <div class="table">
        <div class="header">
          <div class="row">
            <div class="main" v-if="!checked_rows.length">
              <div class="column id">
                <label class="checkbox">
                  <input type="checkbox" :checked="main_checkbox" @change="mainCheck">
                  <span class="checkmark"></span>
                </label>
                <p class="text_id">ID</p>
              </div>
              <div class="column items">
                Товары
              </div>
              <div class="column date">
                Дата заказа
              </div>
              <div class="column status">
                Статус
              </div>
              <div class="column iconHeaders">
                <div>
                  Оплачено
                </div>
                <div>
                  Отправлено
                </div>
              </div>
              <div class="column buyer">
                Покупатель
              </div>
              <div class="column method">
                Метод отправки
              </div>
              <div class="column sum">
                Стоимость
              </div>
            </div>
            <div class="main" v-else>
              <div class="column id">
                <label class="checkbox">
                  <input type="checkbox" :checked="main_checkbox" @change="mainCheck">
                  <span class="checkmark"></span>
                </label>
                <p class="action" @click="updateItems">Обновить</p>
                <p class="action" @click="deleteItems">Удалить</p>
              </div>
            </div>
          </div>
        </div>
        <div class="body" v-if="is_table_data">
          <div class="row" v-for="data in table_data" :key="data.id">
            <div class="main" @click="chooseItem(data.id)">
              <div class="column id">
                <label class="checkbox">
                  <input type="checkbox" :checked="data.checked" @change="checkboxCheck(data.id)">
                  <span class="checkmark"></span>
                </label>
                <p>{{data.order_id}}</p>
              </div>
              <div class="column items">
                <i class="ri-add-line" v-if="!data.opened"></i>
                <i class="ri-close-line" v-else></i>
                <p>{{goodsAmount(data.items.length)}}</p>
              </div>
              <div class="column date">
                {{formatDate(data.create_date)}}
              </div>
              <div class="column status">
                В ожидании оплаты
              </div>
              <div class="column iconHeaders">
                <div v-if="data.is_paid">
                  <i class="ri-checkbox-circle-fill"></i>
                </div>
                <div class="empty" v-else></div>
                <div v-if="data.is_shipped">
                  <i class="ri-checkbox-circle-fill"></i>
                </div>
                <div class="empty" v-else></div>
              </div>
              <div class="column buyer">
                {{data.buyer}}
              </div>
              <div class="column method">
                Почта России
              </div>
              <div class="column sum">
                ${{data.total_price}}
              </div>
            </div>
            <!-- <transition name="fade"> -->
            <div class="secondary" v-if="data.opened">
              <div class="sec_header">
                <div class="column name">
                  Название/SKU
                </div>
                <div class="column amount">
                  Заказанное<br>количество
                </div>
                <div class="column deliviered">
                  Отправленное<br>количество
                </div>
                <div class="column price">
                  Цена
                </div>
                <div class="column sum">
                  Стоимость
                </div>
              </div>
              <div class="sec_table">
                <div class="row" v-for="subdata in data.items" :key="subdata.id">
                  <div class="column name">
                    <div class="img">
                      <img src="https://www.dior.com/beauty/version-5.1610097138803/resize-image/ep/870/580/90/0/%252FY0785220%252FV002%252FY0785220_C099600180_E01_ZHC.jpg" alt="">
                    </div>
                    <div class="text">
                      <p class="main_text">{{subdata.title}}</p>
                      <p class="secondary_text">{{subdata.sku}}</p>
                    </div>
                  </div>
                  <div class="column amount">
                    {{subdata.quantity}}
                  </div>
                  <div class="column deliviered">
                    {{subdata.quantity}}
                  </div>
                  <div class="column price">
                    ${{subdata.price}}
                  </div>
                  <div class="column sum">
                    ${{subdata.total_price}}
                  </div>
                </div>
              </div>
            </div>
            <!-- </transition> -->
          </div>
        </div>


        <!-- SCELETON -->
        <div class="body" v-else>
          <div class="row" v-for="(data, index) in [0,1,2,3,4,5,6,7,8,9]" :key="index">
            <div class="main">
              <div class="column id">
                <label class="checkbox">
                  <div class="sceleton"></div>
                </label>
                <div class="sceleton_column id"></div>
              </div>
              <div class="column items">
                <div class="sceleton_column"></div>
              </div>
              <div class="column date">
                <div class="sceleton_column"></div>
              </div>
              <div class="column status">
                <div class="sceleton_column"></div>
              </div>
              <div class="column iconHeaders">
                <div>
                  <div class="empty"></div>
                </div>
                <div>
                  <div class="empty"></div>
                </div>
              </div>
              <div class="column buyer">
                <div class="sceleton_column"></div>
              </div>
              <div class="column method">
                <div class="sceleton_column"></div>
              </div>
              <div class="column sum">
                <div class="sceleton_column"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- SCELETON -->
      </div>
      <!-- TABLE -->

      <!-- PAGINATION -->
      <div class="pagination_wrapper" v-if="total_count > 9">
        <i class="ri-arrow-left-line" @click="prevPage"></i>
        <div class="pagination">
          {{from}} — {{to}} из {{total_count}}
        </div>
        <i class="ri-arrow-right-line" @click="nextPage"></i>
      </div>
      <!-- PAGINATION -->

    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  data: () => ({
    chosen_id: "",
    main_checkbox: false,
    search_key: "",
    params: {
      limit: 10,
      offset: 0,
      search: ""
    }
  }),
  computed: {
    ...mapGetters({
      access_token: "get_access_token",
      table_data: "get_table_data",
      is_table_data: "get_is_table_data",
      checked_rows: "get_checked_rows",
      total_count: "get_total_count"
    }),
    goodsAmount() {
      return amount => {
        let text = ""
        if (amount === 1) {
          text = `${amount} товар`
        }
        if (amount < 5 && amount > 1) {
          text = `${amount} товара`
        }
        if (amount > 4 && amount < 21) {
          text = `${amount} товаров`
        }
        if (amount > 20) {
          let a = amount
          let x = "" + a
          x = x.split("")[x.length - 1]
          if (x == 1) {
            text = `${amount} товар`
          }
          if (x < 5 && x > 1) {
            text = `${amount} товара`
          }
          if (x > 4) {
            text = `${amount} товаров`
          }
        }
        return text
      }
    },
    formatDate() {
      return d => {
        let date = new Date(d)
        let dd = String(date.getDate()).padStart(2, '0')
        let mm = String(date.getMonth() + 1).padStart(2, '0')
        let yyyy = date.getFullYear()
        return dd + '.' + mm + '.' + yyyy
      }
    },
    from() {
      return this.params.offset + 1
    },
    to() {
      if (this.params.limit + this.params.offset >= this.total_count) {
        return this.total_count
      } else {
        return this.params.limit + this.params.offset 
      }
    }
  },
  methods: {
    ...mapActions({
      fetchTableData: "fetchTableData"
    }),
    mainCheck() {
      this.main_checkbox = !this.main_checkbox
      this.$store.commit("SET_ALL_CHECKBOX_STATE", this.main_checkbox)
    },
    checkboxCheck(id) {
      this.$store.commit("SET_CHECKBOX_STATE", id)
    },
    chooseItem(id) {
      this.$store.commit("SET_SUB_STATE", id)
    },
    updateItems() {
      console.log("Обновляю ", this.checked_rows)
    },
    deleteItems() {
      console.log("Удаляю ", this.checked_rows)
    },
    prevPage() {
      if (this.params.offset >= 10) {
        this.params.offset -= 10
        this.fetchTableData(this.params)  
      }
    },
    nextPage() {
      if (this.total_count - this.params.offset > 9) {
        this.params.offset += 10
        this.fetchTableData(this.params)  
      } 
    },
    logOut() {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
      this.$store.commit("RESET_STATE")
      this.$router.push("/")
    }
  },
  watch: {
    search_key() {
      this.params.search = this.search_key
      this.fetchTableData(this.params)  
    }
  },
  mounted() {
    this.fetchTableData(this.params)
    if (!this.access_token) {
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss" scoped>
#wrapper {
  background: #F6F9FC;
  width: 100%;
  height: 100vh;
  .table_container {
    margin: 0 30px;
  }
  .top {
    .main_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        color: #152739;
        line-height: 120%;
        font-size: 36px;
        font-weight: 500;
      }
      .actions {
        display: flex;
        align-items: center;
        .logout {
          margin-right: 50px;
          cursor: pointer;
          color: grey;
          &:hover {
            color: black;
          }
        }
        .green_btn {
          padding: 9px 12px;
          margin: 0;
        }
      }
    }
    .filter {
      display: flex;
      button {
        margin-right: 30px;
        background: #132739;
      }
    }
  }
  .table {
    margin-top: 20px;
    .row {
      .main {
        display: flex;
        align-items: center;
        cursor: pointer;
        .column {
          color: #132739;
          line-height: 14px;
          font-size: 12px;
          font-weight: normal;
          &.id {
            width: 15%;
            margin-right: 1%;
            display: flex;
            .checkbox {
              opacity: 1;
              display: block;
              position: relative;
              cursor: pointer;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
              }
              input:checked ~ .checkmark:after {
                display: block;
              }
              .checkmark {
                position: absolute;
                top: 5px;
                left: 0;
                height: 24px;
                width: 24px;
                border: 1px solid #C5C7CD;
                border-radius: 3px;
                background-color: #FFFFFF;
                &:after {
                  content: "";
                  position: absolute;
                  display: none;
                  left: 9px;
                  top: 2px;
                  width: 5px;
                  height: 15px;
                  border: solid #152739;
                  border-width: 0 3px 3px 0;
                  -webkit-transform: rotate(45deg);
                  -ms-transform: rotate(45deg);
                  transform: rotate(45deg);
                }
              }
              .sceleton {
                position: absolute;
                top: 5px;
                height: 25px;
                width: 25px;
                background-color: #F2F2F5;
                border-radius: 3px;
              }
            }
            p {
              margin-left: 42px;
              &.text_id {
                opacity: 0.5;
              }
            }
          }
          &.items {
            width: 9%;
            margin-right: 1%;
            opacity: 0.5;
          }
          &.date {
            width: 10%;
            margin-right: 1%;
            opacity: 0.5;
          }
          &.status {
            width: 10%;
            margin-right: 1%;
            opacity: 0.5;
          }
          &.iconHeaders {
            width: 15%;
            margin-right: 1%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            opacity: 0.5;
            .empty {
              width: 20px;
              height: 20px;
              background: #F6F9FC;
              border-radius: 100px;
            }
          }
          &.buyer {
            width: 15%;
            margin-right: 1%;
            opacity: 0.5;
          }
          &.method {
            width: 15%;
            margin-right: 1%;
            opacity: 0.5;
          }
          &.sum {
            width: 6%;
            text-align: right;
            opacity: 0.5;
          }
          .sceleton_column {
            height: 16px;
            width: 90%;
            background-color: #F2F2F5;
            border-radius: 3px;
            margin: 11px 0;
            &.id {
              margin-left: 40px;
            }
          }
        }
        .action {
          color: #3CC8AE;
          line-height: 24px;
          font-size: 14px;
          font-weight: 500;
          margin-top: 7px;
          cursor: pointer;
        }
      }
    }
    .header {
      padding: 14px 20px;
      border-radius: 6px;
      background: #FFFFFF;
    }
    .body {
      margin-top: 10px;
      border-radius: 6px;
      background: #FFFFFF;
      padding: 0 20px;
      .row {
        border-bottom: 1px solid rgba(197, 199, 205, .4);
        &:last-child {
          border-bottom: none;
        }
        .main {
          padding: 15px 0;
          color: #132739;
          .column {
            opacity: 1;
            &.id, &.items {
              color: #3CC8AE;
            }
            &.items {
              display: flex;
              align-items: center;
              cursor: pointer;
              i {
                font-size: 18px;
                margin-right: 5px;
              }
            }
            &.iconHeaders {
              i {
                color: #3CC8AE;
                font-size: 20px;
              }
            }
          }
        }
        .fade-enter-active {
          transition: 1s;
        }
        .fade-leave-active {
          transition: .2s;
        }
        .fade-enter {
          opacity: 0;
          max-height: 0;
        }
        .fade-enter-to {
          opacity: 1;
          max-height: 200px;
        }
        .fade-leave {
          opacity: 1;
          max-height: 120px;
        }
        .fade-leave-to {
          opacity: 0;
          max-height: 0;
        }
        .secondary {
          background: #F6F9FC;
          border-radius: 6px;
          padding: 28px 20px 20px 63px;
          margin-bottom: 20px;
          .sec_header {
            display: flex;
            align-items: flex-start;
            .column {
              color: #132739;
              opacity: 0.5;
              line-height: 14px;
              font-size: 12px;
              width: 20%;
              &.name {
                padding-left: 35px;
              }
              &.amount, &.deliviered {
                text-align: center;
              }
            }
          }
          .sec_table {
            background: #FFFFFF;
            border-radius: 6px;
            padding: 0 15px;
            margin-top: 10px;
            .row {
              padding: 10px 0;
              display: flex;
              align-items: center;
              &:last-child {
                border-bottom: none;
              }
              .column {
                opacity: 1;
                line-height: 14px;
                font-size: 12px;
                font-weight: normal;
                padding-left: 20px;
                width: 20%;
                &.amount, &.deliviered {
                  text-align: center;
                }
                &.name {
                  display: flex;
                  align-items: center;
                  margin-right: 1%;
                  .img {
                    min-width: 40px;
                    max-width: 40px;
                    height: 40px;
                    margin-right: 20px;
                    img {
                      width: 100%;
                      height: 100%;
                      border-radius: 4px;
                    }
                  }
                  .text {
                    p {
                      margin: 0;
                    }
                    .main_text {
                      color: #152739;
                      line-height: 125%;
                      font-size: 14px;
                      font-weight: 500;
                    }
                    .secondary_text {
                      color: #132739;
                      opacity: 0.5;
                      font-size: 12px;
                      line-height: 14px;
                      margin-top: 4px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .pagination_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
    color: #152739;
    opacity: .5;
    i {
      font-size: 16px;
      cursor: pointer;
    }
    .pagination {
      line-height: 24px;
      font-size: 14px;
      margin: 0 10px;
    }
  }
}
</style>
