<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import Title from "@/components/Title.vue";
import { PaintService } from "@/ApiServices/Paint/paint.service";
import { SpinningService } from "@/ApiServices/Spinning/spinning.service";
// import HeaderTabLink from "../../../components/Spinning/HeaderTabLink"
// import MainTable from "../../../components/Spinning/MainTable"
const is_cancel = ref(false);
const Cancel = () => {
  is_cancel.value = !is_cancel.value;
};
const cancel_reason = ref({
  user_id: "",
  reason: "",
});
const CancelAndOfReason = () => {
  console.log(cancel_reason.value);
};
const cardId = ref();
const outerVisible = ref(false);
const innerVisible = ref(false);
const openModalById = (id) => {
  outerVisible.value = true;
  cardId.value = id;
};
const model = ref({});
// const getModel = async () => {
//   const data = await PaintService.getModel();
//   model.value = data.data;
// };
const Confirm = async () => {
  try {
    const Id = await SpinningService.confirm({ id: cardId.value });
    window.location.href = "/explore/department/spinning/working/plan";
  } catch (error) {
    console.log(error);
  }
};
const Save = async () => {
  try {
    const data = await PaintService.create({
      items: model.value,
      id: cardId.value,
    });
    outerVisible.value = false;
  } catch (err) {
    console.log(err);
  }
};

const items = ref([]);
const sprinning_quantitiy = ref();
const provide_quantitiy = ref();
const getAll = async () => {
  const data = await SpinningService.getAll();
  items.value = data.data.allPosts;
  const spinning = data.data.allSpinningItems;
  sprinning_quantitiy.value = spinning.length;
  provide_quantitiy.value = data.data.allPosts.length;
};
const isActive = ref(0)
const ActiveTabLink = (num) => {
  if (num === 0) {
    isActive.value = 0
  }
  if (num === 1) {
    isActive.value = 1
  }
  if (num === 2) {
    isActive.value = 2
  }
  if (num === 3) {
    isActive.value = 3
  }
  if (num === 4) {
    isActive.value = 4
  }
  if (num === 5) {
    isActive.value = 5
  }

}
onMounted(async () => {
  try {
    await getAll();
  } catch (err) {
    console.log(err);
  }
});


</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Yigiruv reja iqtisod</h3>
      </template>
    </Title>
    <!-- <HeaderTabLink />
    <MainTable /> -->

  </div>
</template>
<style></style>
