<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4 items-center h-screen">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
      <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
      Dio Quiz
    </a>
    <p v-if="$fetchState.pending">Fetching question...</p>
    <form class="w-full card " v-else>
      <p>{{ questions.data.result.description }}</p>
      <div class="flex items-center mb-4">
        <input id="default-radio-1" type="radio" value="" name="default-radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
        <label for="default-radio-1" class="ml-2 text-sm font-medium text-grey">{{ questions.data.result.choice_1
        }}</label>
      </div>
      <div class="flex items-center mb-4">
        <input id="default-radio-1" type="radio" value="" name="default-radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
        <label for="default-radio-1" class="ml-2 text-sm font-medium text-grey">{{ questions.data.result.choice_2
        }}</label>
      </div>
      <div class="flex items-center mb-4">
        <input id="default-radio-1" type="radio" value="" name="default-radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
        <label for="default-radio-1" class="ml-2 text-sm font-medium text-grey">{{ questions.data.result.choice_3
        }}</label>
      </div>
      <div class="flex justify-center mt-[14px]">
        <NuxtLink :to="{ name: 'index' }" class="w-full btn btn-primary mx-2">Previous</NuxtLink>
        <NuxtLink :to="{ name: 'questions-id' }" class="w-full btn btn-primary mx-2">Next</NuxtLink>
      </div>
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      questions: [],//simpan data
    }
  },
  async fetch() {
    this.questions = await this.$axios.get('/question', {
      params: {
        id: 1,
      }
    })
  },

}
</script>
