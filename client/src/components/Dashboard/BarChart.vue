<template>
  <div class="grid grid-cols-8 gap-2 grid-rows-1">
    <div class="w-full col-span-3 row-span-1 shadow bg-white p-2">
      <div class="shadow p-1 text-center align-center bg-slate-100">
        Bo'limlar bo'yicha
      </div>
      <Responsive>
        <template #main="{ width }">
          <Chart
            direction="circular"
            :size="{ width: 500, height: 400 }"
            :data="data"
            :margin="{
              left: Math.round((width - 400) / 2),
              top: 40,
              right: 0,
              bottom: 10,
            }"
            :axis="axis"
            :config="{ controlHover: false }"
          >
            <template #layers>
              <Pie
                :dataKeys="['name', 'pl']"
                :pie-style="{ innerRadius: 100, padAngle: 0.05 }"
              />
            </template>
            <template #widgets>
              <Tooltip
                :config="{
                  name: { hide: false },
                  avg: { hide: false },
                  pl: { label: 'value' },
                  inc: { hide: false },
                }"
                hideLine
              />
            </template>
          </Chart>
        </template>
      </Responsive>
    </div>
    <div class="w-full flex-row col-span-5 row-span-1 shadow bg-white p-2">
      <div>
        <div class="shadow p-1 text-center align-center bg-slate-100">
          Sotuv statistikasi
        </div>
        <Chart
          class="w-[100%] col-span-1 shadow bg-white p-2"
          :size="{ width: 650, height: 200 }"
          :data="data"
          :margin="margin"
          :direction="direction"
          :axis="axis"
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
        <div class="shadow p-1 text-center align-center bg-slate-100">
          Aktiv xodimlar
        </div>
        <Chart
          class="w-full col-span-1 shadow bg-white p-2"
          :size="{ width: 650, height: 200 }"
          :data="data"
          :margin="margin"
          :direction="direction"
          :axis="axis"
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Chart, Grid, Line, Responsive, Pie, Tooltip } from "vue3-charts";

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
const direction = ref("horizontal");
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0,
});

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
</script>
<style scoped>
#app {
  color: #2ecc71;
}
</style>
