<script setup>
import { ref } from "vue";
import { Chart, Grid, Line, Responsive, Pie, Tooltip } from "vue3-charts";
import { color, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";

import VChart, { THEME_KEY } from "vue-echarts";
import VueApexCharts from "vue3-apexcharts";
const images = ref([
  {
    id: 1,
    name: "A.Z.Samanov",
    url: "https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  },
  {
    id: 2,
    name: "U.M.Nazirov",
    url: "https://img.freepik.com/free-photo/elegant-smiling-man-typing-computer_23-2147580170.jpg",
  },
  {
    id: 3,
    name: "T.T.Karimov",
    url: "https://img.freepik.com/premium-photo/young-businessman-using-laptop_651396-912.jpg",
  },
  {
    id: 4,
    name: "L.M.Jumayev",
    url: "https://img.freepik.com/premium-photo/young-businessman-working-office-with-serious-face-working-laptop_219766-5450.jpg",
  },
]);
const chartData = {
  series: [
    {
      name: "Sales",
      data: [44, 55, 41, 67, 22, 43, 65],
    },
    {
      name: "Revenue",
      data: [13, 23, 20, 8, 13, 27, 15],
    },
  ],
  labels: ["M", "T", "W", "T", "F", "S", "S"],
};
const chartDataBar = {
  series: [65, 34, 45, 12, 52],
  labels: ["Amir Tex", "Developer Tex", "Uz Tex", "City Tex", "New Tex"],
};

const apexOptions = {
  colors: ["#3056D3", "#80CAEE"],
  chart: {
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "category",
    categories: chartData.labels,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};
const chart = ref(null);

const apexOptionsBar = {
  chart: {
    type: "donut",
    width: 380,
  },
  colors: ["#3C50E0", "#fcd34d", "#22c55e", "#fb7185", "#38bdf8"],
  labels: chartData.labels,
  legend: {
    show: false,
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "55%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

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
      radius: "70%",
      center: ["50%", "60%"],
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
  <div
    class="grid 2xl:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-2 grid-rows-1"
  >
    <div class="w-full lg:col-span-6 2xl:grid-cols-6 row-span-1 bg-white p-2">
      <div class="p-1 mb-2">
        <div class="shadow p-1 text-center mb-3 align-center bg-slate-200">
          Bo'limlar bo'yicha
        </div>
        <v-chart class="chart" :option="option" autoresize />
      </div>
      <div class="p-1 mt-2">
        <div class="shadow p-1 text-center mb-3 align-center bg-slate-200">
          Mijozlar bo'yicha
        </div>
        <div
          class="col-span-4 mb-4 p-4 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4"
        >
          <div>
            <div id="chartTwo" class="-ml-5 -mb-9">
              <VueApexCharts
                type="bar"
                height="335"
                :options="apexOptions"
                :series="chartData.series"
                ref="chart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full flex-row lg:col-span-6 2xl:grid-cols-6 row-span-1 bg-white p-2"
    >
      <div>
        <div class="shadow p-1 mt-1 text-center align-center bg-slate-200">
          Sotuv statistikasi
        </div>
        <div
          class="mb-4 p-4 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <div>
            <div id="chartTwo" class="-ml-5 -mb-9">
              <VueApexCharts
                type="bar"
                height="335"
                :options="apexOptions"
                :series="chartData.series"
                ref="chart"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <div class="shadow p-1 text-center align-center bg-slate-200 mb-2">
          Aktiv xodimlar
        </div>
        <div
          class="grid 2xl:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-3 gap-1 text-[12px] md:grid-cols-4"
        >
          <div
            v-for="image in images"
            :key="image.id"
            class="xl:w-full xl:h-[200px] md:w-full gap-1 sm:w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="rounded-t-lg 2xl:w-full xl:w-full md:w-full h-[150px] sm:w-full"
                :src="image.url"
                alt="image.name"
              />
            </a>
            <div class="p-4">
              <a href="#">
                <h6
                  class="mb-2 2xl:text-[13px] sm:text-[12px] text-center font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ image.name }}
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
