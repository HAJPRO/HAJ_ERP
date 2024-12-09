<script setup>
import { ref } from "vue";
import { Chart, Grid, Line, Responsive, Pie, Tooltip } from "vue3-charts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

const option = ref({
  title: {
    left: "center",
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Bo'yoq", "To'quv", "Yigiruv", "Tikuv", "Sotuv"],
  },
  series: [
    {
      type: "pie",
      radius: "55%",
      center: ["40%", "60%"],
      data: [
        { value: 335, name: "Bo'yoq" },
        { value: 310, name: "To'quv" },
        { value: 234, name: "Yigiruv" },
        { value: 135, name: "Tikuv" },
        { value: 1548, name: "Sotuv" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});

const data = ref([
  { name: "Jan", pl: 1000, avg: 500, inc: 300 },
  { name: "Feb", pl: 2000, avg: 900, inc: 400 },
  { name: "Mar", pl: 5000, avg: 1300, inc: 700 },
  { name: "Apr", pl: 400, avg: 400, inc: 500 },
  { name: "May", pl: 200, avg: 100, inc: 200 },
  { name: "Jun", pl: 600, avg: 400, inc: 300 },
  { name: "Jul", pl: 500, avg: 200, inc: 100 },
  { name: "Avg", pl: 7000, avg: 3000, inc: 1000 },
  { name: "Sen", pl: 1800, avg: 900, inc: 200 },
  { name: "Okt", pl: 5200, avg: 2200, inc: 900 },
  { name: "Nov", pl: 1200, avg: 400, inc: 150 },
  { name: "Des", pl: 6000, avg: 2800, inc: 950 },
]);
// const direction = ref("horizontal");
const axis = ref({
  primary: {
    type: "band",
  },
  secondary: {
    domain: ["dataMin", "dataMax + 100"],
    type: "linear",
    ticks: 8,
  },
});

const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0,
});
</script>

<template>
  <div class="grid grid-cols-8 gap-2 grid-rows-1">
    <div class="w-full col-span-3 row-span-1 bg-white p-2">
      <div class="p-1 mb-2">
        <div class="shadow p-1 text-center mb-3 align-center bg-slate-200">
          Bo'limlar bo'yicha
        </div>
        <v-chart class="chart col-span-1" :option="option" autoresize />
      </div>
      <div class="p-1 mt-2">
        <div class="shadow p-1 text-center mb-3 align-center bg-slate-200">
          Mijozlar bo'yicha
        </div>
        <v-chart class="chart col-span-1" :option="option" autoresize />
      </div>
    </div>

    <div class="w-full flex-row col-span-5 row-span-1 bg-white p-2">
      <div>
        <div class="shadow p-1 mt-1 text-center align-center bg-slate-200">
          Sotuv statistikasi
        </div>
        <Chart
          class="w-[100%] col-span-1 bg-white p-2"
          :size="{ width: 650, height: 310 }"
          :data="data"
          :margin="margin"
          direction="horizontal"
        >
          <template #layers>
            <Grid strokeDasharray="2,2" />
            <Area
              :dataKeys="['name', 'pl']"
              type="monotone"
              :areaStyle="{ fill: 'url(#grad)' }"
            />
            <Line
              :dataKeys="['name', 'pl']"
              type="monotone"
              :lineStyle="{
                stroke: '#9f7aea',
              }"
            />
            <Marker
              v-if="marker"
              :value="1000"
              label="Mean."
              color="green"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <defs>
              <linearGradient id="grad" gradientTransform="rotate(90)">
                <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
                <stop offset="100%" stop-color="white" stop-opacity="0.4" />
              </linearGradient>
            </defs>
          </template>

          <template #widgets>
            <Tooltip
              borderColor="#48CAE4"
              :config="{
                pl: { color: '#9f7aea' },
                avg: { hide: true },
                inc: { hide: true },
              }"
            />
          </template>
        </Chart>
      </div>
      <div class="mt-2">
        <div class="shadow p-1 text-center align-center bg-slate-200 mb-2">
          Aktiv xodimlar
        </div>
        <div class="grid grid-cols-4 gap-1 text-[12px] flex-wrap">
          <div
            class="w-auto h-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="rounded-t-lg w-auto h-[150px]"
                src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
                alt=""
              />
            </a>
            <div class="p-4">
              <a href="#">
                <h6
                  class="mb-2 text-[13px] text-center font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Naimov Nazir
                </h6>
              </a>
            </div>
          </div>
          <div
            class="w-full h-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="rounded-t-lg w-full h-[150px]"
                src="https://img.freepik.com/free-photo/elegant-smiling-man-typing-computer_23-2147580170.jpg"
                alt=""
              />
            </a>
            <div class="p-5">
              <a href="#">
                <h6
                  class="mb-2 text-[13px] text-center font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Samarov Sarvar
                </h6>
              </a>
            </div>
          </div>
          <div
            class="w-full h-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="rounded-t-lg w-full h-[150px]"
                src="https://img.freepik.com/premium-photo/young-businessman-using-laptop_651396-912.jpg"
                alt=""
              />
            </a>
            <div class="p-5">
              <a href="#">
                <h6
                  class="mb-2 text-[13px] text-center font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Nurimov Jasur
                </h6>
              </a>
            </div>
          </div>
          <div
            class="w-full h-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="rounded-t-lg w-full h-[150px]"
                src="https://img.freepik.com/premium-photo/young-businessman-working-office-with-serious-face-working-laptop_219766-5450.jpg"
                alt=""
              />
            </a>
            <div class="p-5">
              <a href="#">
                <h6
                  class="mb-2 text-[13px] text-center font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  Gulyamov Saman
                </h6>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  color: #2ecc71;
}
.chart {
  height: 45vh;
  width: 50vh;
}
</style>
