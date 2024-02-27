<template>
  <div class="">



    <!-- Modal Section -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute w-full h-full bg-gray-800 opacity-50 modal-overlay"></div>
      <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
        <!-- Modal content goes here -->
        <div class="px-6 py-4 text-left modal-content">
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">Add Categories</p>
            <button @click="closeModal" class="text-3xl font-bold">
              &#215;
            </button>
          </div>
          <!-- Add your photo upload form or any other content here -->
          <form class="w-full card" @submit.prevent="addCategories">
            <div class="form-group">
              <label for="" class="text-grey">Name</label>
              <input type="text" class="input-field" v-model="category.name" />
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
            <div class="text-4xl font-bold text-dark">Portofolio Category</div>
            <p class="text-grey">Your category</p>
          </div>
          <button @click="openModal" class="btn btn-primary">Add Category</button>
        </div>
      </div>


    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Categories</div>
            <p class="text-grey">The Art of Design</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3">
        <p v-if="$fetchState.pending">Fetching categories...</p>
        <div v-else class="card py-6 md:!py-10 md:!px-[38px] !gap-y-0 relative"
          v-for="category in categories.data.result.data">
          <button v-if="category.portofolio.length === 0" @click="deleteCategory(category.id)" style="color: rgb(247, 108, 108);"
            class="absolute text-3xl font-bold top-2 right-2">
            &#215;
          </button>
          <div class="m-auto font-bold text-center text-brightYellow">
            {{ category.name }}
          </div>
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
      categories: [],
      isModalOpen: false,
      category: {
        name: ''
      },
    }
  },
  async fetch() {
    try {
      this.categories = await this.$axios.get('/category', {
        params: {
          limit: 100,
        }
      })
    } catch (error) {
      window.alert("An error occurred: " + error.message);
    }
  }, methods: {

    async deleteCategory(categoryId) {
      // Display a confirmation dialog
      const isConfirmed = window.confirm(
        'Are you sure you want to delete this portofolio? You will delete the all things associated with this category.'
      )

      // If the user confirms, proceed with deletion
      if (isConfirmed) {
        try {
          // Make a DELETE request to the /photo endpoint with the photo ID to delete
          await this.$axios.delete(`/category/${categoryId}`)

          // Optionally, you can perform additional actions after successful deletion
          console.log('Category deleted successfully')

          // Fetch the updated portofolio data
          await this.fetch()

          // You may want to update the portofolios array or perform other actions as needed
        } catch (error) {
          // Handle errors, such as displaying an error message
          console.error('Error deleting hero:', error)
          window.alert("An error occurred: " + error.message);
        }
      }
    },

    async fetch() {
      try {
        this.categories = await this.$axios.get('/category', {
        params: {
          limit: 100,
        }
      })
      } catch (error) {
        window.alert("An error occurred: " + error.message);
      }

    },



    openModal() {
      this.isModalOpen = true
    },



    closeModal() {
      (this.isModalOpen = false)
    },



    async addCategories() {
      try {
        // Use $axios.put for updating an existing resource
        let response = await this.$axios.post('/category', this.category)

        await this.fetch()
        // Close the modal
        this.isModalOpen = false

        console.log(response)
      } catch (error) {
        console.error(error)
        window.alert("An error occurred: " + error.message);
      }
    },

  }
}
</script>
