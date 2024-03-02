<template>
  <section>
    <!-- Loading -->
    <div v-if="isLoading" class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
      <div class="flex flex-col items-center px-5 py-2 bg-white border rounded-lg">
        <div class="relative block w-20 h-5 mt-2 loader-dots">
          <div class="absolute top-0 w-3 h-3 mt-1 rounded-full bg-brightYellow"></div>
          <div class="absolute top-0 w-3 h-3 mt-1 rounded-full bg-brightYellow"></div>
          <div class="absolute top-0 w-3 h-3 mt-1 rounded-full bg-brightYellow"></div>
          <div class="absolute top-0 w-3 h-3 mt-1 rounded-full bg-brightYellow"></div>
        </div>
        <div class="mt-2 text-xs font-medium text-center text-gray-500">
          Loading...
        </div>
      </div>
    </div>

    <div>
      <!-- Modal Section -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute w-full h-full bg-gray-800 opacity-50 modal-overlay"></div>
        <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
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
                <select v-else @change="fetchPhotos" v-model="heros.portofolio_id"
                  class="appearance-none input-field form-icon-chevron_down">
                  <option :value="portofolio.id" v-for="portofolio in portofolios.data.result.data">
                    {{ portofolio.title }}
                  </option>
                </select>
              </div>
              <div class="form-group" v-if="heros.portofolio_id && !fetchingPhotos">
                <label for="" class="text-grey">Photo</label>
                <p v-if="$fetchState.pendingPhotos">Fetching photo...</p>
                <select v-else v-model="heros.photo_id" class="appearance-none input-field form-icon-chevron_down">
                  <option :style="{
                    backgroundImage: `url('https://aka-backend.test/${photo.src}')`,
                  }" :value="photo.id" v-for="photo in photos.result.data">
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
          <div class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row">
            <div>
              <div class="text-4xl font-bold text-dark">Portofolio Section</div>
              <p class="text-grey">Your promotions</p>
            </div>
            <button @click="openModal" class="btn btn-primary">Add Shows</button>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:gap-11">
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">In Total</p>
                <div v-if="shows" class="text-[32px] font-bold text-brightYellow mt-[6px]">{{ totalShows }}</div>
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

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3">
          <p v-if="$fetchState.pending">Fetching portofolio shows...</p>
          <!-- Card -->
          <div v-else class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
            v-for="show in shows.data.result.data">
            <img :src="'https://akaapi.cloud/' + show.photo.src" alt="" class="max-h-[200px]" />
            <div class="mt-6 mb-1 font-semibold text-center text-dark">
              {{ show.photo.portofolio.title }}
            </div>
            <button @click="deleteHero(show.id)" class="text-white bg-red-400 btn">
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      isLoading: false,
      isSidebarHidden: true,
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
    try {
      ; (this.shows = await this.$axios.get('/shows', {
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
    } catch (error) {
      // Handle errors, such as displaying an error message
      console.error('Error deleting youtube:', error)
      window.alert("An error occurred: " + error.message);
    }

  },
  methods: {
    toggleNavbar() {
      console.log("yea")
      this.isSidebarHidden = false;
    },
    async deleteHero(heroId) {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this show?'
      )

      // If the user confirms, proceed with deletion
      if (isConfirmed) {
        this.isLoading = true
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
          // Handle errors, such as displaying an error message
          console.error('Error deleting youtube:', error)
          window.alert("An error occurred: " + error.message);
        }
        finally {
          this.isLoading = false
        }
      }
    },

    async fetch() {
      try {
        ; (this.shows = await this.$axios.get('/shows', {
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
      } catch (error) {
        // Handle errors, such as displaying an error message
        console.error('Error:', error)
        window.alert("An error occurred: " + error.message);
      }

    },

    async fetchPhotos() {

      if (this.heros.portofolio_id) {
        this.isLoading = true
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
          // Handle errors, such as displaying an error message
          console.error('Error:', error)
          window.alert("An error occurred: " + error.message);
        } finally {
          this.fetchingPhotos = false
          this.isLoading = false // Set fetchingPhotos to false after fetching
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
        this.isLoading = true
        // Send Registration Data to Server
        let response = await this.$axios.post('/shows', this.heros)

        await this.fetch()

        this.isModalOpen = false
        this.heros = {
          portofolio_id: "",
          photo_id: "",
        };

        console.log(response)
      } catch (error) {
        console.log(error)
        // Handle errors, such as displaying an error message
        console.error('Error:', error)
        window.alert("An error occurred: " + error.message);
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
<style>
.loader-dots div {
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.loader-dots div:nth-child(1) {
  left: 8px;
  animation: loader-dots1 0.6s infinite;
}

.loader-dots div:nth-child(2) {
  left: 8px;
  animation: loader-dots2 0.6s infinite;
}

.loader-dots div:nth-child(3) {
  left: 32px;
  animation: loader-dots2 0.6s infinite;
}

.loader-dots div:nth-child(4) {
  left: 56px;
  animation: loader-dots3 0.6s infinite;
}

@keyframes loader-dots1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes loader-dots3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes loader-dots2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
