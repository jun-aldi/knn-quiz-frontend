<template>
  <section>

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
    <div v-else>
      <!-- Top Section -->
      <!-- Modal Section -->
      <div v-if="isModalEditOpen" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
        <div class="absolute w-full h-full bg-gray-800 opacity-50 modal-overlay"></div>
        <div
          class="z-50 w-11/12 max-h-full mx-auto my-8 overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
          <!-- Modal content goes here -->
          <div class="px-6 py-4 text-left modal-content">
            <div class="flex items-center justify-between pb-3">
              <p class="text-2xl font-bold">Update About</p>
              <button @click="closeEditModal" class="text-3xl font-bold">
                &#215;
              </button>
            </div>
            <!-- Add your photo upload form or any other content here -->
            <form class="w-full card" @submit.prevent="updateAbout">
              <div class="form-group">
                <label for="" class="text-grey">Description</label>
                <textarea class="input-field" v-model="abouts.title"></textarea>
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Misi</label>
                <textarea class="input-field" v-model="abouts.misi"></textarea>
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Visi</label>
                <textarea class="input-field" v-model="abouts.visi"></textarea>
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Foto Deskripsi</label>
                <input type="file" class="input-field" ref="fotoDeskripsiInput" />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Foto Misi</label>
                <input type="file" class="input-field" ref="fotoMisiInput" />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Foto Visi</label>
                <input type="file" class="input-field" ref="fotoVisiInput" />
              </div>

              <button type="submit" class="w-full mt-4 btn btn-primary">
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
                  CV. AGUNA KARYA BUWANA
                </div>
              </div>
              <div class="flex-row">
                <button @click="openEditModal" class="btn btn-primary">
                  Update About
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
                <p class="font-bold">CV. AGUNA KARYA BUWANA</p>
                <p class="">
                  {{ abouts.title }}
                </p>
              </div>
            </div>
          </div>

          <!-- Lokasi -->
          <div class="card !gap-y-10 min-h-[50px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Our Vision</p>
                <p class="">{{ abouts.visi }}</p>
              </div>
            </div>
          </div>

          <!-- Deskripsi -->
          <div class="card !gap-y-10 min-h-[50px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-bold">Our Mission</p>
                <p class="">{{ abouts.misi }}</p>
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
                  <div class="text-xl font-medium text-dark">Photos</div>
                </div>
              </div>
            </div>
            <div class="grid gap-6 md:grid-cols-3">
              <div class="card md:min-h-[400px]">
                <div class="m-auto text-center">
                  <img :src="'https://akaapi.cloud/' + abouts.src_title" alt="" class="max-h-[200px]" @click.prevent="
      openFullPage('https://akaapi.cloud/' + abouts.src_title)
      " />
                  <p>Gambar Pertama</p>
                </div>
              </div>
              <div class="card md:min-h-[400px]">
                <div class="m-auto text-center">
                  <img :src="'https://akaapi.cloud/' + abouts.src_visi" alt="" class="max-h-[200px]" @click.prevent="
      openFullPage('https://akaapi.cloud/' + abouts.src_visi)
      " />
                  <p>Gambar Visi</p>
                </div>
              </div>
              <div class="card md:min-h-[400px]">
                <div class="m-auto text-center">
                  <img :src="'https://akaapi.cloud/' + abouts.src_misi" alt="" class="max-h-[200px]" @click.prevent="
      openFullPage('https://akaapi.cloud/' + abouts.src_misi)
      " />
                  <p>Gambar Misi</p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

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
      fullPageImageUrl: '',
      isFullPageVisible: false,
      savedScrollPosition: 0,

      abouts: [],
      descPhoto: '',
      srcPhoto: '',


      isModalOpen: false,
      isModalEditOpen: false,
      previewImageUrl: null,
      portofolio: {},

    }
  },

  async fetch() {
    try {
      const response = await this.$axios.get('/about', {
        params: {
          limit: 10,
        },
      })
      this.abouts = response.data.result.data[0]
    } catch (error) {
      window.alert("An error occurred: " + error.message);
    }


  },
  methods: {
    async updateAbout() {
      const { id, title, misi, visi } = this.abouts;

      try {
        // Create a FormData object to send both text and file data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('misi', misi);
        formData.append('visi', visi);

        // Append files to FormData if they are not undefined
        if (this.$refs.fotoDeskripsiInput.files[0]) {
          formData.append('src_title', this.$refs.fotoDeskripsiInput.files[0]);
        }
        if (this.$refs.fotoMisiInput.files[0]) {
          formData.append('src_misi', this.$refs.fotoMisiInput.files[0]);
        }
        if (this.$refs.fotoVisiInput.files[0]) {
          formData.append('src_visi', this.$refs.fotoVisiInput.files[0]);
        }

        // Use Axios to send the updated about information to the server, including files
        await this.$axios.post(`/about/update/1`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.isModalEditOpen = false;
        await this.fetch();
        // Handle success, e.g., show a success message or redirect
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error updating about:', error);
        window.alert('An error occurred while edit: ' + error.message);
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
      const response = await this.$axios.get('/about', {
        params: {
          limit: 10,
        },
      })
      this.abouts = response.data.result.data[0]

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
      this.fetch();
      (this.isModalEditOpen = false)
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
