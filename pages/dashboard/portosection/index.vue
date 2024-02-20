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
        <div class="text-[32px] font-semibold text-dark">Portofolio Shows Section</div>
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
            <p class="text-2xl font-bold">Add Show</p>
            <button @click="closeModal" class="text-3xl font-bold">
              &#215;
            </button>
          </div>
          <!-- Add your photo upload form or any other content here -->
          <form class="w-full card" @submit.prevent="addHeroes">
            <div class="form-group">
              <label for="" class="text-grey">Portofolio Add</label>
              <p v-if="$fetchState.pending">Fetching portofolio...</p>
              <select
                v-else
                @change="fetchPhotos"
                v-model="heros.portofolio_id"
                class="appearance-none input-field form-icon-chevron_down"
              >
                <option
                  :value="portofolio.id"
                  v-for="portofolio in portofolios.data.result.data"
                >
                  {{ portofolio.title }}
                </option>
              </select>
            </div>
            <div
              class="form-group"
              v-if="heros.portofolio_id && !fetchingPhotos"
            >
              <label for="" class="text-grey">Photo</label>
              <p v-if="$fetchState.pendingPhotos">Fetching photo...</p>
              <select
                v-else
                v-model="heros.photo_id"
                class="appearance-none input-field form-icon-chevron_down"
              >
                <option
                  :style="{
                    backgroundImage: `url('https://aka-backend.test/${photo.src}')`,
                  }"
                  :value="photo.id"
                  v-for="photo in photos.result.data"
                >
                  {{ photo.desc }}
                </option>
              </select>
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
        <div
          class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
        >
          <div>
            <div class="text-xl font-medium text-dark">Statistics</div>
            <p class="text-grey">Your portofolio show</p>
          </div>
          <button @click="openModal" class="btn btn-primary">Add Shows</button>
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">In Total</p>
              <div  v-if="shows" class="text-[32px] font-bold text-brightYellow mt-[6px]">{{ totalShows}}</div>
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
            <div class="text-xl font-medium text-dark">Portofolio Shows</div>
            <p class="text-grey">Display</p>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
      >
        <p v-if="$fetchState.pending">Fetching portofolio shows...</p>
        <!-- Card -->
        <div
          v-else
          class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
          v-for="show in shows.data.result.data"
        >
          <img
            :src="'https://aka-backend.test/' + show.photo.src"
            alt=""
            class="max-h-48"
          />
          <div class="mt-6 mb-1 font-semibold text-center text-dark">
            {{ show.photo.portofolio.title }}
          </div>
          <button
            @click="deleteHero(show.id)"
            class="text-white bg-red-400 btn"
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
      isModalOpen: false,
      totalShows: 0,
      shows: [],
      photos: [],
      portofolios: [],
      heros: {
        portofolio_id: null,
        photo_id: null,
      },
      fetchingPhotos: false,
    }
  },
  watch: {
    'heros.portofolio_id': {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.fetchPhotos()
        }
      },
    },
  },
  async fetch() {
    ;(this.shows = await this.$axios.get('/shows', {
      params: {
        limit: 100,
      },
    })),
      (this.portofolios = await this.$axios.get('/portofolio', {
        params: {
          limit: 100,
        },
      }))
      this.totalShows = this.shows.data.result.total;
  },
  methods: {
    async deleteHero(heroId) {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this show?'
      )

      // If the user confirms, proceed with deletion
      if (isConfirmed) {
        try {
          // Make a DELETE request to the /photo endpoint with the photo ID to delete
          await this.$axios.delete(`/shows/${heroId}`)

          // Optionally, you can perform additional actions after successful deletion
          console.log('Show deleted successfully')

          // Fetch the updated portofolio data
          await this.fetch()

          // You may want to update the portofolios array or perform other actions as needed
        } catch (error) {
          // Handle errors, such as displaying an error message
          console.error('Error deleting hero:', error)
        }
      }
    },

    async fetch() {
      ;(this.shows = await this.$axios.get('/shows', {
        params: {
          limit: 100,
        },
      })),
        (this.portofolios = await this.$axios.get('/portofolio', {
          params: {
            limit: 100,
          },
        }))
        this.totalShows = this.shows.data.result.total;
    },

    async fetchPhotos() {
      if (this.heros.portofolio_id) {
        try {
          this.fetchingPhotos = true // Set fetchingPhotos to true
          const response = await this.$axios.get('/photo', {
            params: {
              portofolio_id: this.heros.portofolio_id,
              limit: 100,
            },
          })
          this.photos = response.data
        } catch (error) {
          console.error('Error fetching photos:', error)
        } finally {
          this.fetchingPhotos = false // Set fetchingPhotos to false after fetching
        }
      }
    },
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },

    // add Heroes
    async addHeroes() {
      try {
        // Send Registration Data to Server
        let response = await this.$axios.post('/shows', this.heros)

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
