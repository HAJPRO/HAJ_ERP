<script setup>
import { ref, onMounted } from "vue";
import Title from "@/components/Title.vue";
import ProccessModal from "../../../components/Sale/ProccessModal.component.vue";
import StatusInfoModal from "../../../components/Sale/StatusModal.component.vue";
import { SaleLegalService } from "@/ApiServices/Sale/saleLegal.service";
import { useRouter } from "vue-router";
import { ToastifyService } from "../../../utils/Toastify";
import { loading } from ".././../../utils/Loader"
import SaleUpdateCardModal from "../../../components/Sale/SaleUpdateCardModal.vue";
import HeaderTabLink from "../../../components/Sale/HeaderTabLink.vue";
import MainTable from "../../../components/Sale/MainTable.vue";
const router = useRouter();

const is_status_info_modal = ref(false)
const StatusModal = (id) => {
  is_status_info_modal.value = !is_status_info_modal.value
}

const Export_Excel = async (id) => {
  try {
    const data = await SaleLegalService.export_excel({ id });
  } catch (error) {
    return ToastifyService.ToastError({ msg: error.messages });
  }
};



onMounted(async () => {
  try {

  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <div>
    <Title>
      <template v-slot:title>
        <h3>Sotuvlar</h3>
      </template>
    </Title>
    <HeaderTabLink />
    <MainTable />
    <!-- // Proccess Modal -->
    <ProccessModal @isProccess="isProccess" :isProccessModal="isProccessModal" :cardId="cardId" />
    <!-- ////// -->
    <!-- // EDIT Modal -->
    <SaleUpdateCardModal />
    <!-- // -->
    <StatusInfoModal :is_status="is_status_info_modal" />
  </div>
</template>
