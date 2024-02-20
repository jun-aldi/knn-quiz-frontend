<template>
  <section>
    <button v-if="$fetchState.pending" disabled type="button"
      class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
      <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor" />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="#1C64F2" />
      </svg>
      Loading...
    </button>
    <!-- Main Content -->
    <div v-else class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
      <!-- Top Section -->


      <!-- Modal Section -->
      <div v-if="isModalEditOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute w-full h-full bg-gray-800 opacity-50 modal-overlay"></div>
        <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
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
                <textarea class="input-field" v-model="abouts.title" />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Misi</label>
                <textarea class="input-field" v-model="abouts.misi" />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Visi</label>
                <textarea class="input-field" v-model="abouts.visi" />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Foto Deskripsi</label>
                <input type="file" class="input-field" ref="fotoDeskripsiInput"  />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Foto Misi</label>
                <input type="file" class="input-field" ref="fotoMisiInput" />
              </div>
              <div class="form-group">
                <label for="" class="text-grey">Foto Visi</label>
                <input type="file" class="input-field" ref="fotoVisiInput"/>
              </div>

              <button type="submit" class="w-full btn btn-primary mt-[14px]">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>

      <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
        <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden">
            <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
          </a>

          <div class="text-[32px] font-semibold text-dark">About</div>
        </div>
      </section>

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
                  <img :src="'https://aka-backend.test/' + abouts.src_title" alt="" class="max-h-[200px]" @click.prevent="
                    openFullPage('https://aka-backend.test/' + abouts.src_title)
                    " />
                  <p>Gambar Pertama</p>
                </div>
              </div>
              <div class="card md:min-h-[400px]">
                <div class="m-auto text-center">
                  <img :src="'https://aka-backend.test/' + abouts.src_visi" alt="" class="max-h-[200px]" @click.prevent="
                    openFullPage('https://aka-backend.test/' + abouts.src_visi)
                    " />
                  <p>Gambar Visi</p>
                </div>
              </div>
              <div class="card md:min-h-[400px]">
                <div class="m-auto text-center">
                  <img :src="'https://aka-backend.test/' + abouts.src_misi" alt="" class="max-h-[200px]" @click.prevent="
                    openFullPage('https://aka-backend.test/' + abouts.src_misi)
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
    const response = await this.$axios.get('/about', {
      params: {
        limit: 10,
      },
    })
    this.abouts = response.data.result.data[0]

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
