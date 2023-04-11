<template>
  <section>
    <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
      <!-- Top Section -->
      <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
        <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden">
            <svg class="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7">
              </path>
            </svg>
          </a>
          <div class="text-[32px] font-semibold text-dark">
            Students
          </div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[516px] w-full">
            <input type="text" name="" id=""
              class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200
                                                                                                                                                                                                                                                  focus:ring-2 transition-all duration-300 w-full"
              placeholder="Search people, team, project">
          </form>
          <a href="#" class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot">
            <img src="/assets/svgs/ic-bell.svg" alt="">
          </a>
        </div>
      </section>

      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row">
            <div>
              <div class="text-xl font-medium text-dark">
                Statistics
              </div>
              <p class="text-grey">Your students statistics</p>
            </div>
            <!-- <NuxtLink :to="{ name: 'companies-id-employees-create' }" class="btn btn-primary">Add Employee</NuxtLink> -->
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">In Total</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  425,000
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Active</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  205,399
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Inactive</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  142,593
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Visual</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  425,000
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Auditori</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  205,399
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-grey">Kinestetik</p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  142,593
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">
                Student
              </div>
            </div>
          </div>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <button @click="searchTable()"></button>
          <vue-good-table :columns="options.columns" :rows="rows"
            :search-options="{ enabled: true, placeholder: 'Search table...' }" :line-numbers="true" :pagination-options="{
              enabled: true,
              mode: 'records',
              perPage: 20,
              perPageDropdown: [3, 7, 9],
              dropdownAllowAll: false,
              setCurrentPage: 2,
              prevLabel: 'prev',
              rowsPerPageLabel: 'Rows per page',
              ofLabel: 'of',
              pageLabel: 'page', // for 'pages' mode
              allLabel: 'All',
              infoFn: (params) => `my own page ${params.firstRecordOnPage}`,
            }" styleClass="vgt-table bordered" class="table">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'actions'">
                <button class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  @click="viewDetail(props.row.id)">View More</button>
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </section>
    </div>



    <!-- Modal -->
    <div class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true"
      v-if="isModalVisible">
      <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>

        <!-- Modal panel -->
        <div
          class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <!-- Modal header -->
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                  Profile Details
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <span class="font-bold">Name:</span> {{ detailStudent.name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-bold">NIM:</span> {{ detailStudent.nim }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-bold">Program Name:</span> {{ detailStudent.program_name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    <span class="font-bold">Question:</span>
                  </p>
                  <div>
                    <ol class="pl-5">
                      <li class="text-sm text-gray-500" v-for="detailResult in detailResults">Question {{
                        detailResult.question_id }}
                        : {{
                          (() => {
                            switch (detailResult.answer) {
                              case "1":
                                return "Sangat Baik";
                              case "2":
                                return "Kurang Baik";
                              case "3":
                                return "Tidak Baik";
                              default:
                                return "unknown answer";
                            }
                          })()
                        }}</li>
                    </ol>
                  </div>
                  <!-- Add more profile details here -->
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button"
              class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="isModalVisible = false">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>


  </section>
</template>
<script>
export default {
  middleware: 'admin',
  layout: 'dashboard',
  data() {
    return {
      options: {
        columns: [
          {
            label: 'Name',
            field: 'name',
            sortable: true
          },
          {
            label: 'Program Name',
            field: 'program_name',
            sortable: true
          },
          {
            label: 'NIM',
            field: 'nim',
            sortable: true
          },
          {
            label: 'Actions',
            field: 'actions',
            html: true,
            sortable: false
          },
        ]
      },
      rows: [],
      detailStudent: [],
      detailResults: [],
      isModalVisible: false,
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    //fetch data from datatable
    fetchData() {
      this.$axios.get('/getuser')
        .then(response => {
          this.rows = response.data.result;
        })
        .catch(error => {
          console.error(error);
        });
    },

    //search data from datatabel
    searchTable() {
      this.$refs.myTable.search(this.searchText);
    },

    //fetch data for detail studnt data
    async viewDetail(id) {

      //get student detail
      try {
        const response = await this.$axios.get(`/getuser?id=${id}`);
        this.detailStudent = response.data.result;
        this.isModalVisible = true;
      } catch (error) {
        console.error(error);
      }

      try {
        // this.detailResults = await this.$axios.get(`/answer?student_id=${id}`)
        const response = await this.$axios.get(`/answer?student_id=${id}`);
        this.detailResults = response.data.result.data;
      } catch (error) {
        console.error(error)
      }

    },

  },
}
</script>
