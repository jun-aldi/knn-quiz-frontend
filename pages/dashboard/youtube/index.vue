<template>
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
    <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
      <div class="flex items-center justify-between gap-4">
        <a href="#" id="toggleOpenSidebar" class="lg:hidden">
          <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
          </svg>
        </a>
        <div class="text-[32px] font-semibold text-dark">Youtube Section</div>
      </div>
    </section>

    <!-- Modal Section -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute w-full h-full bg-gray-800 opacity-50 modal-overlay"></div>
      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
        <!-- Modal content goes here -->
        <div class="px-6 py-4 text-left modal-content">
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">Add Youtube Video</p>
            <button @click="closeModal" class="text-3xl font-bold">
              &#215;
            </button>
          </div>
          <!-- Add your photo upload form or any other content here -->
          <form class="w-full card" @submit.prevent="addYoutube">
            <div class="form-group">
              <label for="" class="text-grey">Youtube Video URL</label>
              <input type="text" class="input-field" v-model="addYoutubes.src" />
            </div>
            <button type="submit" class="w-full btn btn-primary mt-[14px]">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row">
          <div>
            <div class="text-xl font-medium text-dark">Statistics</div>
            <p class="text-grey">Your Youtube Video</p>

          </div>
          <button @click="openModal" class="btn btn-primary">Add Youtube</button>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">In Total</p>

              <div v-if="youtubes" class="text-[32px] font-bold text-brightYellow mt-[6px]">{{ totalYoutubes }}</div>
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
            <div class="text-xl font-medium text-dark">Youtubes</div>
            <p class="text-grey">Display</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3">
        <p v-if="$fetchState.pending">Fetching youtubes...</p>
        <!-- Card -->
        <div v-else class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
          v-for="youtube in youtubes.data.result.data">
          <youtube :video-id="getYoutubeVideoId(youtube.src)" :player-width="250" :player-height="300" @ready="ready" @playing="playing">
          </youtube>
          <button @click="deleteYoutube(youtube.id)" class="my-4 text-white bg-red-400 btn">
            Delete
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getIdFromURL } from "vue-youtube-embed";


export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      isModalOpen: false,
      totalYoutubes: 0,
      youtubes: [],
      addYoutubes: {
        src: null,
      },
    }
  },

  async fetch() {
    (this.youtubes = await this.$axios.get('/youtube', {
      params: {
        limit: 100,
      },
    })),
      this.totalYoutubes = this.youtubes.data.result.total;
  },
  methods: {
    ready(event) {
      this.player = event.target;
    },
    playing(event) {
      console.log("playing");
    },
    change() {
      //this.videoId = "use another video id";
    },
    async deleteYoutube(youtubeId) {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this youtube video?'
      )

      // If the user confirms, proceed with deletion
      if (isConfirmed) {
        try {
          // Make a DELETE request to the /photo endpoint with the photo ID to delete
          await this.$axios.delete(`/youtube/${youtubeId}`)

          // Optionally, you can perform additional actions after successful deletion
          console.log('Youtube deleted successfully')

          // Fetch the updated portofolio data
          await this.fetch()

          // You may want to update the portofolios array or perform other actions as needed
        } catch (error) {
          // Handle errors, such as displaying an error message
          console.error('Error deleting youtube:', error)
        }
      }
    },

    async fetch() {
      (this.youtubes = await this.$axios.get('/youtube', {
        params: {
          limit: 100,
        },
      })),
        this.totalYoutubes = this.youtubes.data.result.total;
    },

    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    getYoutubeVideoId(youtubeUrl) {
    return getIdFromURL(youtubeUrl);
  },
    // add Heroes
    async addYoutube() {
      try {
        // Send Registration Data to Server
        let response = await this.$axios.post('/youtube', this.addYoutubes)

        await this.fetch()

        this.isModalOpen = false

        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
