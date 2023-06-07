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
        <div class="text-[32px] font-semibold text-dark">Question List</div>
      </div>
      <div class="flex items-center gap-4">
        <form class="shrink md:w-[516px] w-full">
          <input
            type="text"
            name=""
            id=""
            class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
            placeholder="Search people, team, project"
          />
        </form>
        <a
          href="#"
          class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot"
        >
          <img src="/assets/svgs/ic-bell.svg" alt="" />
        </a>
      </div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Questions List</div>
            <p class="text-grey">Your questions list</p>
          </div>
        </div>
      </div>
      <p v-if="$fetchState.pending">Fetching questions...</p>
      <div
        v-else
        class="w-full px-6 py-4 my-4 bg-white rounded-lg shadow-lg"
        v-for="question in questions.data.result.data"
      >
        <h2 class="mb-4 text-xl font-medium text-dark">
          Question number {{ question.id }}
        </h2>
        <label class="block mb-2 text-grey">Question:</label>
        <p
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="text"
        >
          {{ question.description }}
        </p>
        <button
          class="px-4 py-2 mt-4 btn-primary"
          @click="viewQuestion(question.id)"
        >
          Edit
        </button>
      </div>
    </section>

    <!-- Modal backdrop -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      v-if="isModalVisible"
    >
      <!-- Modal content container -->
      <div class="w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg">
        <!-- Modal header -->
        <div class="px-4 py-3 bg-gray-100">
          <h2 class="text-lg font-semibold text-gray-800">Modal Header</h2>
        </div>
        <!-- Modal body with form -->
        <div class="p-4">
          <form>
            <div class="mb-4">
              <label
                class="block mb-2 font-medium text-gray-700"
                for="username"
              >
                Description
              </label>
              <input
                class="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                type="text"
                v-model="detailQuestion.description"
              />
            </div>
            <!-- <button
              class="px-4 py-2 font-bold rounded btn-primary hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Edit
            </button> -->
          </form>
          <div
            v-for="(detailChoices, index) in detailQuestion.choices"
            :key="index"
          >
            <form>
              <div class="mb-4">
                <input type="hidden" v-model="detailChoices.question_id" />
                <label class="block mb-2 font-medium text-gray-700" for="name">
                  {{ index + 1 }}
                </label>
                <input
                  class="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  type="text"
                  v-model="detailChoices.name"
                />
                <label
                  class="block mb-2 font-medium text-gray-700"
                  for="category_id"
                >
                  Kategori
                </label>
                <select
                  class="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                  v-model="detailChoices.category_id"
                >
                  <option value="1">auditorial</option>
                  <option value="2">kenestetic</option>
                  <option value="3">visual</option>
                </select>
              </div>
            </form>
          </div>

          <div class="flex items-center justify-end">
            <button
              class="px-4 py-2 font-bold rounded btn-primary hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              @click="saveAllEdits"
            >
              Save Edit
            </button>
            <button
              type="button"
              class="inline-flex justify-center w-full px-4 py-2 text-base font-bold text-white border border-transparent rounded-md shadow-sm bg-rose-700 hover:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="isModalVisible = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'admin',
  layout: 'dashboard',
  data() {
    return {
      questions: [],
      detailQuestion: [],
      detailChoices: [],
      isModalVisible: false,
    }
  },
  async fetch() {
    this.questions = await this.$axios.get('/question', {
      params: {
        quiz_id: 1,
      },
    })
  },

  methods: {
    //fetch question for detail purpose
    async viewQuestion(id) {
      //get student detail
      try {
        const response = await this.$axios.get(`/question?id=${id}`)
        this.detailQuestion = response.data.result
        this.isModalVisible = true
      } catch (error) {
        console.error(error)
      }
    },

    async editQuestion(id) {
      try {
        let response = await this.$axios.post(
          `/question/update/${id}`,
          this.detailQuestion
        )
        console.log(response)
      } catch (err) {
        console.log(err)
      }

      // await this.fetch()
      // this.isModalVisible = false
    },

    // async editChoices(id) {
    //   try {
    //     let response = await this.$axios.post(
    //       `/choice/update/${id}`,
    //       this.detailChoices
    //     )
    //     console.log(response)
    //   } catch (err) {
    //     console.log(err)
    //   }

    //   await this.fetch()
    //   // this.isModalVisible = false
    // },

    async saveAllEdits() {
      for (const detailChoice of this.detailQuestion.choices) {
        try {
          let response = await this.$axios.post(
            `/choice/update/${detailChoice.id}`,
            detailChoice
          )
          console.log(response)
        } catch (err) {
          console.log(err)
        }
      }

      await this.editQuestion(this.detailQuestion.id)
      // Refresh the question list after saving the edits
      this.questions = await this.$axios.get('/question', {
        params: {
          quiz_id: 1,
        },
      })
      this.isModalVisible = false
      // this.isModalVisible = false
    },
  },
}
</script>
