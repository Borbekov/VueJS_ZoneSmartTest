<template>
  <div id="wrapper">
    <div class="table_container">
      <div class="top">
        <div class="header">
          <p class="title">Таблица заказов</p>
          <div class="actions">
            <button class="black_btn">Отправления</button>
            <button class="green_btn">Экспортировать</button>
          </div>
        </div>
        <div class="filter">
          <button class="black_btn">Фильтр</button>
          <input type="text" placeholder="Поиск">
        </div>
      </div>

      <div class="table">
        <div class="header">
          <div class="row">
            <div class="main">
              <div class="column checkbox">
                <input type="checkbox" id="1" class="styled_checkbox">
                <label for="1" class="form-check-label"></label>
              </div>
              <div class="column id">
                ID
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
          </div>
        </div>
        <div class="body">
          <div class="row">
            <div class="main">
              <div class="column checkbox">
                <input type="checkbox" id="2" class="styled_checkbox">
                <label for="2" class="form-check-label"></label>
              </div>
              <div class="column id">
                1034
              </div>
              <div class="column items" @click="secondary = !secondary">
                <i class="ri-add-line"></i>
                <p>2 товара</p>
              </div>
              <div class="column date">
                01.11.2020
              </div>
              <div class="column status">
                В ожидании оплаты
              </div>
              <div class="column iconHeaders">
                <div>
                  <i class="ri-checkbox-circle-fill"></i>
                </div>
                <div>
                  <i class="ri-checkbox-circle-fill"></i>
                </div>
              </div>
              <div class="column buyer">
                Borbekov Bekzhan
              </div>
              <div class="column method">
                Почта России
              </div>
              <div class="column sum">
                $100
              </div>
            </div>
            <div class="secondary" v-if="secondary">
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
                <div class="row">
                  <div class="column name">
                    <div class="img">

                    </div>
                    <div class="text">
                      <p class="main_text">Какое-то название</p>
                      <p class="secondary_text">mac_pro16_10</p>
                    </div>
                  </div>
                  <div class="column amount">
                    11
                  </div>
                  <div class="column deliviered">
                    22
                  </div>
                  <div class="column price">
                    $100
                  </div>
                  <div class="column sum">
                    $1000
                  </div>
                </div>
                <div class="row">
                  <div class="column name">
                    <div class="img">

                    </div>
                    <div class="text">
                      <p class="main_text">Какое-то название</p>
                      <p class="secondary_text">mac_pro16_10</p>
                    </div>
                  </div>
                  <div class="column amount">
                    11
                  </div>
                  <div class="column deliviered">
                    22
                  </div>
                  <div class="column price">
                    $100
                  </div>
                  <div class="column sum">
                    $1000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table',
  data: () => ({
    secondary: false
  })
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
    .header {
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
        .column {
          color: #132739;
          opacity: 0.5;
          line-height: 14px;
          font-size: 12px;
          font-weight: normal;
          &.checkbox {
            width: 4%;
            opacity: 1;
            .styled_checkbox {
              position: absolute;
              opacity: 0;
              width: 0;
              & + label {
                position: relative;
                cursor: pointer;
              }
              & + label:before {
                content: "";
                display: inline-block;
                vertical-align: text-top;
                width: 24px;
                height: 24px;
                background: #FFFFFF;
                border: 1px solid #C5C7CD;
                border-radius: 3px;
                position: relative;
                top: 0px;
              }
              &:checked + label:after {
                content: "";
                position: absolute;
                left: 9px;
                top: 3px;
                width: 5px;
                height: 13px;
                border: solid #152739;
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
              }
            }
          }
          &.id {
            width: 6%;
            margin-right: 1%;
          }
          &.items {
            width: 11%;
            margin-right: 1%;
          }
          &.date {
            width: 11%;
            margin-right: 1%;
          }
          &.status {
            width: 10%;
            margin-right: 1%;
          }
          &.iconHeaders {
            width: 15%;
            margin-right: 1%;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
          &.buyer {
            width: 17%;
            margin-right: 1%;
          }
          &.method {
            width: 15%;
            margin-right: 1%;
          }
          &.sum {
            width: 6%;
            text-align: right;
          }
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
        .secondary {
          background: #F6F9FC;
          border-radius: 6px;
          padding: 28px 20px 20px 63px;
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
                    width: 40px;
                    height: 40px;
                    background: skyblue;
                    border-radius: 4px;
                    margin-right: 20px;
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
}
</style>
