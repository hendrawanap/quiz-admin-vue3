<template>
  <div class="border border-white border-opacity-5 rounded-lg bg-white bg-opacity-5">
    <div class="h-48 w-full bg-white bg-opacity-5 rounded-t-lg animate-pulse"></div>
    <div class="border-t border-white border-opacity-5 p-3 flex flex-col animate-pulse">
      <div>
        <h5 class="text-lg h-12 text-transparent mb-3 bg-white bg-opacity-5 rounded-full">
          {{ 'question.question' }}
        </h5>
        <h6 class="bg-white bg-opacity-5 mb-1 rounded-full text-transparent w-5/12">
          {{ 'choice' }}
        </h6>
        <h6 class="bg-white bg-opacity-5 mb-1 rounded-full text-transparent w-8/12">
          {{ 'choice' }}
        </h6>
        <h6 class="bg-white bg-opacity-5 mb-1 rounded-full text-transparent w-4/12">
          {{ 'choice' }}
        </h6>
        <h6 class="bg-white bg-opacity-5 mb-1 rounded-full text-transparent w-6/12">
          {{ 'choice' }}
        </h6>
      </div>
      <div class="flex items-center justify-between mt-2">
        <div>
            <button class="btn btn-base bg-white bg-opacity-5 mr-1 text-transparent">
              Edit
            </button>
          <button
            class="btn btn-base bg-white bg-opacity-5 ml-1 text-transparent"
            type="button"
          >
            Hapus
          </button>
        </div>
        <div
          class="max-w-max text-sm rounded-full bg-white
          bg-opacity-5 px-2 py-1 cursor-pointer text-transparent"
        >
          •
          <span>{{ 'makanan' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
