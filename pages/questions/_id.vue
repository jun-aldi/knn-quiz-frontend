<template>
  <section
    class="py-[50px] flex flex-col items-center justify-center px-4 items-center h-screen"
  >
    <a
      href="#"
      class="flex items-center mb-6 text-2xl font-semibold text-gray-900"
    >
      <img
        class="w-8 h-8 mr-2"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        alt="logo"
      />
      Dio Quiz
    </a>
    <button
      v-if="$fetchState.pending"
      disabled
      type="button"
      class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
    >
      <svg
        aria-hidden="true"
        role="status"
        class="inline w-4 h-4 mr-3 text-gray-200 animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="#1C64F2"
        />
      </svg>
      Loading...
    </button>
    <div v-else>
      <p>{{ questions.data.result.description }}</p>
      <form class="w-full card" @submit.prevent="answerQuestion">
        <div
          v-for="detailChoices in questions.data.result.choices"
          class="flex items-center mb-4"
        >
          <input
            id="default-radio-1"
            type="radio"
            :value="detailChoices.id"
            name="choice_id"
            v-model="answer.choice_id"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <label
            for="default-radio-1"
            class="ml-2 text-sm font-medium text-grey"
            >{{ detailChoices.name }}</label
          >
        </div>
        <!-- for result -->
        <div class="flex justify-center mt-[14px]" v-if="id > 5">
          <button type="submit" class="w-full mx-2 btn btn-primary">
            Result
          </button>
        </div>

        <!-- for next question -->
        <div class="flex justify-center mt-[14px]" v-else>
          <button type="submit" class="w-full mx-2 btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import { mapState } from 'vuex'
export default {
  middleware: 'auth',
  data() {
    return {
      visual: 0,
      kinesthetic: 0,
      auditorial: 0,
      questions: [],
      answer: {
        student_id: this.$store.state.auth.user.id,
        question_id: this.$route.params.id,
        choice_id: '',
      },
    }
    },

  async fetch() {
    this.questions = await this.$axios.get('/question', {
      params: {
        id: this.$route.params.id,
      },
    })
  },
  computed: {
    id() {
      // You can access the id parameter from the $route object
      return this.$route.params.id
    },
  },

  methods: {
    countVariables() {
      this.result.data.forEach((item) => {
        if (item.choice && item.choice.category_id) {
          switch (item.choice.category_id) {
            case 1:
              this.visual++
              break
            case 2:
              this.kinesthetic++
              break
            case 3:
              this.auditorial++
              break
          }
        }
      })
    },

    async answerQuestion() {
      //submit data answer
      let response = await this.$axios.post('/answer', this.answer)

      //conditional for question
      if (this.$route.params.id > 2) {
        //go to result
        try {
          const response = await this.$axios.get('/answer', {
            params: {
              student_id: this.$store.state.auth.user.id,
            },
          })
          this.result = response.data.result
          this.countVariables()
          try {
            const response = await this.$axios.post('/student', {
              amount_visual: this.visual,
              amount_kinesthetic: this.kinesthetic,
              amount_auditorial: this.auditorial,
              // type: this.type,
              user_id: this.$store.state.auth.user.id,
            })
            console.log(response.data)
          } catch (error) {
            console.error(error)
          }
          this.$router.push({
            name: 'result-id',
            params: {
              id: this.$store.state.auth.user.id,
            },
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        //go to next question
        try {
          const nextId = parseInt(this.$route.params.id) + 1
          this.$router.push({
            name: 'questions-id',
            params: {
              id: nextId,
            },
          })
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
}
</script>
