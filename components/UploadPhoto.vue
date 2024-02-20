<!-- AddPhotoModal.vue -->
<template>
  <div class="modal" v-if="isModalOpen">
    <!-- Modal content goes here -->
    <!-- For simplicity, you can add a close button for now -->
    <button @click="closeModal">Close Modal</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>
