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

    <div
      v-else
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
    >
      <div class="p-1 space-y-4 md:space-y-6 sm:p-8">
        <div class="px-6 py-3 font-bold border-b-1 border-neutral-200">
          <h1>{{ questions.data.result.description }}</h1>
        </div>
        <div class="p-6">
          <blockquote>
            <form @submit.prevent="answerQuestion">
              <div
                v-for="detailChoices in questions.data.result.choices"
                class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]"
              >
                <input
                  class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="radio"
                  id="radioDefault01"
                  :value="detailChoices.id"
                  name="choice_id"
                  v-model="answer.choice_id"
                />
                <label
                  class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                  for="radioDefault01"
                >
                  {{ detailChoices.name }}
                </label>
              </div>
              <div class="flex justify-center mt-6" v-if="id > 30">
                <button type="submit" class="w-full btn btn-primary">
                  Result
                </button>
              </div>
              <!-- for next question -->
              <div class="flex justify-center mt-6" v-else>
                <button type="submit" class="w-full btn btn-primary">
                  Next
                </button>
              </div>
            </form>
          </blockquote>
        </div>
      </div>
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
      if (this.$route.params.id > 29) {
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
