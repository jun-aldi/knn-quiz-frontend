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

        <!-- Loading -->
        <div v-if="$fetchState.pending" class="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen">
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

    <!-- Main Content -->
    <div v-else class="">
      <!-- Top Section -->

      <!-- Modal Section -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute w-full h-full bg-gray-800 opacity-50 modal-overlay"></div>
        <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
          <!-- Modal content goes here -->
          <div class="px-6 py-4 text-left modal-content">
            <div class="flex items-center justify-between pb-3">
              <p class="text-2xl font-bold">Add Photo</p>
              <button @click="closeModal" class="text-3xl font-bold">
                &#215;
              </button>
            </div>
            <!-- Add your photo upload form or any other content here -->
            <form @submit.prevent="addPhoto">
              <label for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <img v-if="previewImageUrl" :src="previewImageUrl" alt="Uploaded Preview"
                    class="w-16 h-16 mb-4 rounded-full" />
                  <svg v-else class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <!-- Your SVG path here -->
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span v-if="previewImageUrl" class="font-semibold">Image Uploaded</span>
                    <span v-else class="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    WEBP or JPEG (MAX. 1MB)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload" />
              </label>
              <div class="my-4 form-group">
                <label for="" class="text-grey">Description</label>
                <textarea type="text" class="input-field" v-model="descPhoto" />
              </div>
              <button type="submit"
                class="text-white bg-brightYellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal Section -->
      <div v-if="isModalEditPhotoOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute w-full h-full bg-gray-800 opacity-50 modal-overlay"></div>
        <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
          <!-- Modal content goes here -->
          <div class="px-6 py-4 text-left modal-content">
            <div class="flex items-center justify-between pb-3">
              <p class="text-2xl font-bold">Update Photo</p>
              <button @click="closeEditPhotoModal" class="text-3xl font-bold">
                &#215;
              </button>
            </div>
            <!-- Add your photo upload form or any other content here -->
            <form @submit.prevent="updatePhoto">
              <label for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <img v-if="editPreviewImageUrl" :src="editPreviewImageUrl" alt="Uploaded Preview"
                    class="w-16 h-16 mb-4 rounded-full" />
                  <svg v-else class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"></svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span v-if="editPreviewImageUrl" class="font-semibold">Image Uploaded</span>
                    <span v-else class="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    WEBP or JPEG (MAX. 1MB)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" @change="handleEditFileUpload"
                  ref="photoEditInput" />
              </label>
              <div class="my-4 form-group">
                <label for="" class="text-grey">Description</label>
                <textarea type="text" class="input-field" v-model="editDescPhoto" />
              </div>
              <button type="submit"
                class="text-white bg-brightYellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-2">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal Section -->
      <div v-if="isModalEditOpen" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <div class="absolute w-full h-full bg-gray-800 opacity-50 modal-overlay"></div>
        <div
          class="z-50 w-11/12 max-h-full mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
          <!-- Modal content goes here -->
          <div class="px-6 py-4 text-left modal-content">
            <div class="flex items-center justify-between pb-3">
              <p class="text-2xl font-bold">Update Portofolio</p>
              <button @click="closeEditModal" class="text-3xl font-bold">
                &#215;
              </button>
            </div>
            <!-- Add your photo upload form or any other content here -->
            <form class="w-full card" @submit.prevent="updatePortofolio">
              <div class="form-group">
                <label for="" class="text-grey">Name</label>
                <input type="text" class="input-field" v-model="portofolios.title" />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Title</label>
                <input type="text" class="input-field" v-model="portofolios.subtitle" />
              </div>

              <div class="form-group">
                <label for="" class="text-grey">Category</label>
                <p v-if="$fetchState.pending">Fetching roles...</p>
                <select v-else name="roles" v-model="portofolios.portofolio_category_id"
                  class="appearance-none input-field form-icon-chevron_down">
                  <option :value="category.id" v-for="category in categories.data.result.data">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Location</label>
                <input type="text" class="input-field" v-model="portofolios.location" />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Description</label>
                <textarea type="text" class="input-field" v-model="portofolios.desc" />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Year</label>
                <input type="number" class="input-field" v-model="portofolios.year" />
              </div>
              <button type="submit" class="w-full btn btn-primary mt-[14px]">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>


      <section class="pt-[50px]">
        <!-- Section Header -->

        <section class="pt-[10px]">
          <!-- Section Header -->
          <div class="mb-[30px]">
            <div class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row">
              <div>
                <div class="text-4xl font-bold text-dark">
                  {{ portofolios.title }}
                </div>
                <p class="text-grey">{{ portofolios.subtitle }}</p>
                <p class="font-semibold text-brightYellow">
                  {{ portofolios.year }}
                </p>
              </div>
              <div class="flex-row">
                <button @click="deletePortofolio(portofolios.id)" class="text-white bg-red-400 btn">
                  Delete
                </button>
                <button @click="openEditModal" class="btn btn-primary">
                  Update
                </button>
              </div>
            </div>
          </div>
        </section>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:gap-11">
          <!-- Kategori -->
          <div class="card !gap-y-10 min-h-[50px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Kategori</p>
                <p class="text-grey">
                  {{ portofolios.portofolio_category.name }}
                </p>
              </div>
            </div>
          </div>

          <!-- Lokasi -->
          <div class="card !gap-y-10 min-h-[50px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Lokasi</p>
                <p class="text-grey">{{ portofolios.location }}</p>
              </div>
            </div>
          </div>

          <!-- Deskripsi -->
          <div class="card !gap-y-10 min-h-[50px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Deskripsi</p>
                <p class="text-grey">{{ portofolios.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-[50px]">
        <div class="grid md:grid-cols-1 gap-11">
          <!-- Documents -->
          <div>
            <!-- Section Header -->
            <div class="mb-[10px]">
              <div class="flex items-center justify-between gap-6">
                <div>
                  <div class="text-xl font-medium text-dark">Galeri</div>
                  <div class="font-bold text-blue">GUNAKAN FOTO UKURAN KURANG DARI 1MB DAN FORMAT WEBP UNTUK LOADING YANG LEBIH CEPAT</div>
                </div>
              </div>
            </div>
            <div class="grid gap-6 md:grid-cols-3">
              <div v-for="photo in portofolios.photo" class="card md:min-h-[400px]">
                <div class="m-auto text-center">
                  <img :src="'https://akaapi.cloud/' + photo.src" alt="" class="max-h-[200px]" @click.prevent="
      openFullPage('https://akaapi.cloud/' + photo.src)
      " />
                  <p class="my-4">
                    {{ photo.desc }}
                  </p>
                  <div class="grid justify-center">
                    <button type="button" class="p-3 m-2 bg-red-200 rounded-xl text-red btn btn-danger"
                      @click="deletePhoto(photo.id)">
                      Delete
                    </button>
                    <button type="button" class="p-3 bg-brightYellow rounded-xl text-red btn btn-danger"
                      @click="openEditPhotoModal(photo.id)">
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <div class="card md:min-h-[100px]">
                <div class="m-auto text-center">
                  <button type="button" class="btn btn-primary" @click="openModal">
                    Add Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id="fullpage" @click="closeFullPage" v-if="isFullPageVisible">
        <img :src="fullPageImageUrl" alt="Full Page Image" />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  layout: 'dashboard',
  middleware: 'auth',
  data() {
    return {
      editingPhotoId: null,
      editDescPhoto: '',
      editSrcPhoto: '',
      editPreviewImageUrl: '',
      isLoading: false,
      isModalEditPhotoOpen: false,
      categories: [],
      fullPageImageUrl: '',
      isFullPageVisible: false,
      savedScrollPosition: 0,
      portofolios: [],
      descPhoto: '',
      srcPhoto: '',
      portofolioId: this.$route.params.id,
      isModalOpen: false,
      isModalEditOpen: false,
      previewImageUrl: null,
      portofolio: {},
    }
  },

  async fetch() {
    try {
      const response = await this.$axios.get('/portofolio', {
        params: {
          id: this.$route.params.id,
          limit: 100,
        },
      })
      this.portofolios = response.data.result
      this.categories = await this.$axios.get('/category', {
        params: {
          limit: 100,
        },
      })
    } catch (error) {
      window.alert("An error occurred: " + error.message);
    }

  },
  methods: {
    async updatePortofolio() {
      try {
        // Use $axios.put for updating an existing resource
        let response = await this.$axios.post(
          `/portofolio/update/${this.$route.params.id}`,
          this.portofolios
        )

        await this.fetch()
        // Close the modal
        this.isModalEditOpen = false
        this.isLoading = true
      } catch (error) {
        console.error(error)
        window.alert("An error occurred: " + error.message);
      } finally {
        this.isLoading = false
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
    async fetch() {
      try {
        const response = await this.$axios.get('/portofolio', {
          params: {
            id: this.$route.params.id,
            limit: 100,
          },
        })
        this.portofolios = response.data.result
        this.categories = await this.$axios.get('/category', {
          params: {
            limit: 100,
          },
        })
      } catch (error) {
        window.alert("An error occurred: " + error.message);
      }
    },

    async deletePhoto(photoId) {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this photo?'
      )

      // If the user confirms, proceed with deletion
      if (isConfirmed) {
        this.isLoading = true
        try {
          // Make a DELETE request to the /photo endpoint with the photo ID to delete
          await this.$axios.delete(`/photo/${photoId}`)

          // Optionally, you can perform additional actions after successful deletion
          console.log('Photo deleted successfully')

          // Fetch the updated portofolio data
          await this.fetch()

          // You may want to update the portofolios array or perform other actions as needed
        } catch (error) {
          // Handle errors, such as displaying an error message
          console.error('Error deleting photo:', error)
        } finally {
          this.isLoading = false
        }
      }
    },

    async deletePortofolio(portoId) {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this portofolio? You will delete the heroes and portfolios associated with this portfolio.'
      )

      // If the user confirms, proceed with deletion
      if (isConfirmed) {
        this.isLoading = true
        try {
          // Fetch the portfolio data to get the associated photo IDs
          const portfolioData = await this.$axios.get('/portofolio', {
            params: {
              id: portoId,
              limit: 100,
            },
          })
          const photoIds = portfolioData.data.result.photo.map(
            (photo) => photo.id
          )

          // Fetch the hero data to get the associated photo IDs
          const heroData = await this.$axios.get('/hero', {
            params: {
              portofolio_id: portoId,
              limit: 100,
            },
          })
          const heroIds = heroData.data.result.data.map((hero) => hero.id)

          // Fetch the portofolio shows data to get the associated photo IDs
          const showData = await this.$axios.get('/shows', {
            params: {
              portofolio_id: portoId,
              limit: 100,
            },
          })
          const showIds = showData.data.result.data.map((hero) => hero.id)

          // Make a DELETE request to the /portofolio endpoint with the portfolio ID to delete
          await this.$axios.delete(`/portofolio/${portoId}`)

          // Delete associated photos
          for (const photoId of photoIds) {
            await this.$axios.delete(`/photo/${photoId}`)
          }

          // Delete associated hero
          for (const heroId of heroIds) {
            await this.$axios.delete(`/hero/${heroId}`)
          }

          // Delete associated portofolios shows
          for (const showId of showIds) {
            await this.$axios.delete(`/shows/${showId}`)
          }

          // Optionally, you can perform additional actions after successful deletion
          console.log('Portofolio deleted successfully')

          this.$router.push({
            name: 'dashboard-portofolio',
          })

          // You may want to update the portofolios array or perform other actions as needed
        } catch (error) {
          // Handle errors, such as displaying an error message
          console.error('Error deleting photo:', error)
          window.alert("An error occurred: " + error.message);
        } finally {
          this.isLoading = false
        }
      }
    },

    async addPhoto() {
      try {
        // Ensure that srcPhoto is set to the correct file data
        if (!this.srcPhoto) {
          console.error('Please upload an image.')
          return
        }
        this.isLoading = true

        // Create FormData object
        let formData = new FormData()
        formData.append('desc', this.descPhoto)
        formData.append('src', this.srcPhoto)
        formData.append('portofolio_id', this.$route.params.id)

        // Send Photo Data to Server using FormData
        let response = await this.$axios.post('/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        // Fetch Again
        await this.fetch()

        // Reset data properties
        this.descPhoto = ''
        this.srcPhoto = '' // Clear the srcPhoto field after sending
        this.previewImageUrl = '' // Clear the srcPhoto field after sending

        // Close the modal
        this.isModalOpen = false


      } catch (error) {
        console.error(error)
        if (error.response && error.response.data && error.response.data.meta) {
          window.alert("An error occurred: " + error.response.data.meta.message);
        } else {
          window.alert("An error occurred");
        }
      } finally {
        this.isLoading = false
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

    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      ; (this.previewImageUrl = null), (this.isModalOpen = false)
    },
    openEditModal() {
      this.isModalEditOpen = true
    },
    closeEditModal() {
      this.fetch()
        ; (this.previewImageUrl = null), (this.isModalEditOpen = false)
    },
    openEditPhotoModal(photoId) {
      const photo = this.portofolios.photo.find((p) => p.id === photoId);
      this.editingPhotoId = photoId;
      this.editDescPhoto = photo.desc;
      this.editSrcPhoto = photo.src;
      this.editPreviewImageUrl = 'https://akaapi.cloud/' + this.editSrcPhoto;
      this.isModalEditPhotoOpen = true;
    },
    closeEditPhotoModal() {
      this.isModalEditPhotoOpen = false
    },
    async updatePhoto() {
      try {
        if (!this.editingPhotoId) {
          console.error('No photo selected for update.');
          return;
        }

        this.isLoading = true;

        let formData = new FormData();
        formData.append('desc', this.editDescPhoto);

        if (this.$refs.photoEditInput.files[0]) {
          // If a new file is selected, upload it
          formData.append('src', this.$refs.photoEditInput.files[0]);
        }

        formData.append('portofolio_id', this.$route.params.id);

        await this.$axios.post(`/photo/update/${this.editingPhotoId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        await this.fetch();

        // Reset data properties
        this.editingPhotoId = null;
        this.editDescPhoto = '';
        this.editSrcPhoto = '';
        this.editPreviewImageUrl = '';
        this.isModalEditPhotoOpen = false;
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.meta) {
          window.alert('An error occurred: ' + error.response.data.meta.message);
        } else {
          window.alert('An error occurred');
        }
      } finally {
        this.isLoading = false;
      }
    },

    handleEditFileUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        // Set the editSrcPhoto to the selected File object
        this.editSrcPhoto = input.files[0];

        // Set the editPreviewImageUrl
        const reader = new FileReader();
        reader.onload = () => {
          this.editPreviewImageUrl = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
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
