<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4 items-center h-screen">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
      <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
      Dio Quiz
    </a>
    <form class="w-full card ">
      <p>Apa yang akan kamu lakukan ketika bertemu singa?</p>
      <div class="flex items-center mb-4">
        <input id="default-radio-1" type="radio" value="" name="default-radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500">
        <label for="default-radio-1" class="ml-2 text-sm font-medium text-grey">Default
          radio</label>
      </div>
      <div class="flex items-center">
        <input checked id="default-radio-2" type="radio" value="" name="default-radio"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ">
        <label for="default-radio-2" class="ml-2 text-sm font-medium text-grey">Checked
          state</label>
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
  name: 'Quiz Page'
}
</script>
