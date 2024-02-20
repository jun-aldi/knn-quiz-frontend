<template>
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
    <section
      class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
    >
      <div class="flex items-center justify-between gap-4">
        <a href="#" id="toggleOpenSidebar" class="lg:hidden">
          <svg
            class="w-6 h-6 text-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            ></path>
          </svg>
        </a>
        <div class="text-[32px] font-semibold text-dark">Promotion Section</div>
      </div>
    </section>

    <!-- Modal Section -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        class="absolute w-full h-full bg-gray-800 opacity-50 modal-overlay"
      ></div>
      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md"
      >
        <!-- Modal content goes here -->
        <div class="px-6 py-4 text-left modal-content">
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">Add Photo Promotion</p>
            <button @click="closeModal" class="text-3xl font-bold">
              &#215;
            </button>
          </div>
          <!-- Add your photo upload form or any other content here -->
          <form @submit.prevent="addPromotion">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <img
                  v-if="previewImageUrl"
                  :src="previewImageUrl"
                  alt="Uploaded Preview"
                  class="w-16 h-16 mb-4 rounded-full"
                />
                <svg
                  v-else
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <!-- Your SVG path here -->
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span v-if="previewImageUrl" class="font-semibold"
                    >Image Uploaded</span
                  >
                  <span v-else class="font-semibold">Click to upload</span> or
                  drag and drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  WEBP or JPEG (MAX. 1MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                @change="handleFileUpload"
              />
            </label>
            <button
              type="submit"
              class="text-white bg-brightYellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2"
            >
              Add Promotion
            </button>
          </form>
        </div>
      </div>
    </div>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div
          class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
        >
          <div>
            <div class="text-xl font-medium text-dark">Statistics</div>
            <p class="text-grey">Your promotions</p>
          </div>
          <button @click="openModal" class="btn btn-primary">
            Add Promotion
          </button>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">In Total</p>

              <div
                v-if="promotions"
                class="text-[32px] font-bold text-brightYellow mt-[6px]"
              >
                {{ totalPromotions }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Promotions</div>
            <p class="text-grey">Display</p>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
      >
        <p v-if="$fetchState.pending">Fetching promotions...</p>
        <!-- Card -->
        <div
          v-else
          class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
          v-for="promotion in promotions.data.result.data"
        >
          <img
            :src="'https://aka-backend.test/' + promotion.src"
            alt=""
            class="max-h-[200px]"
            @click.prevent="
              openFullPage('https://aka-backend.test/' + promotion.src)
            "
          />
          <button
            @click="deletePromotion(promotion.id)"
            class="my-4 text-white bg-red-400 btn"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      fullPageImageUrl: '',
      isFullPageVisible: false,
      savedScrollPosition: 0,
      isModalOpen: false,
      totalPromotions: 0,
      promotions: [],
      srcPhoto: '',
      previewImageUrl: null,
    }
  },

  async fetch() {
    ;(this.promotions = await this.$axios.get('/promosi', {
      params: {
        limit: 100,
      },
    })),
      (this.totalPromotions = this.promotions.data.result.total)
  },
  methods: {
    async deletePromotion(promotionId) {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this promotion?'
      )

      // If the user confirms, proceed with deletion
      if (isConfirmed) {
        try {
          // Make a DELETE request to the /photo endpoint with the photo ID to delete
          await this.$axios.delete(`/promosi/${promotionId}`)

          // Optionally, you can perform additional actions after successful deletion
          console.log('Promosi deleted successfully')

          // Fetch the updated portofolio data
          await this.fetch()

          // You may want to update the portofolios array or perform other actions as needed
        } catch (error) {
          // Handle errors, such as displaying an error message
          console.error('Error deleting promosi:', error)
          window.alert('An error occurred while deleting promosi: ' + error.message);
        }
      }
    },

    async fetch() {
      ;(this.promotions = await this.$axios.get('/promosi', {
        params: {
          limit: 100,
        },
      })),
        (this.totalPromotions = this.promotions.data.result.total)
    },

    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },

    async addPromotion() {
      try {
        // Ensure that srcPhoto is set to the correct file data
        if (!this.srcPhoto) {
          console.error('Please upload an image.')
          return
        }

        // Create FormData object
        let formData = new FormData()
        formData.append('src', this.srcPhoto)

        // Send Photo Data to Server using FormData
        let response = await this.$axios.post('/promosi', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        // Fetch Again
        await this.fetch()

        this.srcPhoto = '' // Clear the srcPhoto field after sending
        this.previewImageUrl = '' // Clear the srcPhoto field after sending

        // Close the modal
        this.isModalOpen = false

        console.log(response)
      } catch (error) {
        console.error(error)
        window.alert('An error occurred while add promotion: ' + error.message);
      }
    },

    handleFileUpload(event) {
      const input = event.target
      if (input.files && input.files[0]) {
        // Set the srcPhoto to the selected File object
        this.srcPhoto = input.files[0]

        // Set the preview image URL
        const reader = new FileReader()
        reader.onload = () => {
          this.previewImageUrl = reader.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },

    openFullPage(imageUrl) {
      // Save the current scroll position
      this.savedScrollPosition = window.scrollY

      // Set the scroll position to the top
      window.scrollTo({
        top: 0,
        behavior: 'auto', // You can change this to 'smooth' for a smooth scroll
      })

      // Set the full page image URL and make it visible
      this.fullPageImageUrl = imageUrl
      this.isFullPageVisible = true
    },

    closeFullPage() {
      // Close the full page
      this.isFullPageVisible = false

      // Restore the scroll position after a short delay to ensure the image is closed
      setTimeout(() => {
        window.scrollTo({
          top: this.savedScrollPosition,
          behavior: 'auto', // You can change this to 'smooth' for a smooth scroll
        })
      }, 100)
    },
  },
}
</script>
<style>
#fullpage {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
}

#fullpage img {
  max-width: 100vw;
  /* Set maximum width to the viewport width */
  max-height: 100vh;
  /* Set maximum height to the viewport height */
  width: auto;
  height: auto;
  object-fit: contain;
  /* Ensure the image maintains its aspect ratio and fits within the container */
}
</style>
