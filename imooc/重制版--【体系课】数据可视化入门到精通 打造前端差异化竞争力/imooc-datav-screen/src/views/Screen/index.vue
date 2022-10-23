<template>
  <div class="container">
    <loading v-if="!ready">Loading...</loading>
    <container :options="{width: 3840, height: 2160}" v-else>
      <div class="header">
        <top-header />
      </div>
      <div class="separator-wrapper">
        <separator />
      </div>
      <div class="center">
        <div class="left">
          <div class="left1">
            <total-user
              :today-user="userData.userToday"
              :growth-last-day="+userData.userGrowthLastDay || 0"
              :growth-last-month="+userData.userGrowthLastMonth || 0"
              ref="totalUser"
            />
          </div>
          <div class="left2">
            <average-age
              :data="ageData"
              :avg-age="+userData.averageAge || 0"
              ref="averageAge"
            />
          </div>
          <div class="left3">
            <total-device :data="deviceData" />
          </div>
          <div class="left4">
            <total-gender :data="userData.gender" />
          </div>
          <div class="left5">
            <line-chart :data="userData.rider" />
          </div>
          <div class="left6">
            <bar-chart :data="userData.category" />
          </div>
        </div>
        <div class="right">
          <div class="right-top1">
            <center-header :data="userData" />
          </div>
          <div class="right-top2">
            <country-category
              :data="['ALL', '北京', '上海', '深圳', '杭州', '南京', '武汉']"
            />
          </div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left1">
                <earth :data="mapData" />
              </div>
              <div class="right-left2">
                <country-category
                  :data="['订单量', '销售额', '用户数', '退单量']"
                  :color="['rgb(178, 209, 126)', 'rgb(116, 166, 49)']"
                />
              </div>
              <div class="right-left3">
                <dv-border-box-8 :color="['rgb(66, 68, 70)', 'rgb(251,253,142)']">
                  <average-view :data="realTimeOrder" />
                </dv-border-box-8>
              </div>
              <div class="right-left4">
                <schedule-view />
              </div>
            </div>
            <div class="right-right">
              <div class="right-right1">
                <plan-list :data="userData.areaSales" />
              </div>
              <div class="right-right2">
                <activate-user :data="userData.areaTop" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
  /* eslint-disable */
  import { getCurrentInstance } from 'vue'
  import Loading from '../../components/Loading'
  import Container from '../../components/Container'
  import TopHeader from '../../components/TopHeader2/index'
  import TotalUser from '../../components/TotalUser/index'
  import Separator from '../../components/Separator/index'
  import AverageAge from '../../components/AverageAge/index'
  import TotalDevice from '../../components/TotalDevice/index'
  import Earth from '../../components/Earth/datavMap.vue'
  import TotalGender from '../../components/TotalGender/index'
  import LineChart from '../../components/LineChart/index'
  import BarChart from '../../components/BarChart/index'
  import CenterHeader from '../../components/CenterHeader/index'
  import CountryCategory from '../../components/CountryCategory/index'
  import AverageView from '../../components/AverageView/index'
  import ScheduleView from '../../components/ScheduleView/index'
  import PlanList from '../../components/PlanList/index'
  import ActivateUser from '../../components/ActivateUser/index'

  import { useScreenData } from './useScreenData'

  export default {
    components: {
      Loading,
      Container,
      ActivateUser,
      PlanList,
      ScheduleView,
      AverageView,
      CountryCategory,
      CenterHeader,
      BarChart,
      LineChart,
      TotalGender,
      Earth,
      TotalDevice,
      AverageAge,
      Separator,
      TotalUser,
      TopHeader
    },
    setup () {
      const context = getCurrentInstance().ctx
      const { ready, userData, ageData, deviceData, realTimeOrder, mapData } = useScreenData(context, { once: false })

      return {
        ready,
        userData,
        ageData,
        deviceData,
        realTimeOrder,
        mapData
      }
    }
  }
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    // background-color: rgb(50, 47, 48);
    background: rgb(29, 29, 29);
    color: #fff;
    font-size: 48px;

    #imooc-screen-container {
      display: flex;
      flex-direction: column;

      .header {
        height: 167px;
        margin-top: 10px;
      }

      .separator-wrapper {
        height: 10px;
      }

      .center {
        flex: 1;
        display: flex;

        .left {
          flex: 0 0 860px;
          display: flex;
          flex-direction: column;
          width: 860px;
          height: 100%;
          margin: 0 10px;
          box-sizing: border-box;
          background: rgb(60, 61, 64);

          .left1, .left2, .left3, .left4, .left5, .left6 {
            padding-bottom: 20px;
          }

          .left1 {
            height: 300px;
          }

          .left2 {
            height: 320px;
          }

          .left3 {
            height: 280px;
          }

          .left4 {
            height: 230px;
          }

          .left5 {
            height: 360px;
          }

          .left6 {
            height: 360px;
          }
        }

        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          margin: 0 10px;
          max-width: 2960px;
          overflow: hidden;

          .right-top1 {
            height: 206px;
            margin-bottom: 20px;
          }

          .right-top2 {
            height: 48px;
            margin-bottom: 20px;
          }

          .right-bottom {
            flex: 1;
            display: flex;

            .right-left {
              display: flex;
              flex-direction: column;
              width: 1917px;

              .right-left1 {
                height: 999px;
              }

              .right-left2 {
                height: 80px;
                padding-top: 20px;
                box-sizing: border-box;
              }

              .right-left3 {
                height: 350px;
                margin-top: 10px;

                .dv-border-box-8 {
                  width: 100%;
                  height: 100%;
                  padding: 5px;
                  box-sizing: border-box;
                  background: rgb(66, 68, 70);
                  border-radius: 10px;
                  box-shadow: 10px 10px 10px rgba(0, 0, 0, .3);
                }
              }

              .right-left4 {
                height: 220px;
                margin-top: 10px;
              }
            }

            .right-right {
              flex: 1;
              display: flex;
              flex-direction: column;
              margin-left: 10px;

              .right-right1 {
                width: 100%;
                height: 999px;
                padding-right: 10px;
                box-sizing: border-box;
              }

              .right-right2 {
                width: 100%;
                height: 650px;
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
  }
</style>
