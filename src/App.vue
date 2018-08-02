<template>
  <v-app>
    <v-layout v-bind="binding">
      <v-flex sm12 md6>
        <v-card>
           <v-toolbar color="light-blue" dark>
                <v-toolbar-title>Doug's Orders</v-toolbar-title>
                <v-spacer></v-spacer>
                   <v-text-field
                      dark
                      v-if="isSearching"
                      v-model="searchText"
                      height="30px"
                      clearable
                      placeholder="Type any keyword...">
                    </v-text-field>
                  <v-btn
                    icon
                    title="Search"
                    @click='handleSearch'
                  
                  >
                  <v-icon>search</v-icon>
                  </v-btn>
                <v-menu nudge-left="80px">
                    <v-btn
                        slot="activator"
                        dark
                        icon
                        title="Sort"
                    >
                        <v-icon>sort</v-icon>
                    </v-btn>
                    <v-list>
                        <v-list-tile-title class="sort_item" data-sort-var="" @click="handleSort">Last In Hand Date</v-list-tile-title>
                        <v-list-tile-title class="sort_item" data-sort-var="art" @click="handleSort">Art Due Date</v-list-tile-title>
                        <v-list-tile-title class="sort_item" data-sort-var="sizing" @click="handleSort">Sizing Due Date</v-list-tile-title>
                    </v-list>
                </v-menu>
            </v-toolbar>
            <jobs-list :sortBy="sortVar" :search="searchText" :passedTask="passTask" @newSelectedJob="handleSelectedJob"></jobs-list>
        
        </v-card>
      </v-flex>
      <v-flex sm12 md6>
          <v-card>
            <v-toolbar color="light-blue" dark>
                 <v-toolbar-title v-if="selectedJob == null">Order Details</v-toolbar-title>
                  <v-toolbar-title v-else>{{selectedJob.id}} {{selectedJob.jobName}}</v-toolbar-title>
            </v-toolbar>
            <v-tabs
                light
                slider-color="info"
                style="margin-top:8px"
            >
                <v-tab
                  ripple 
                >
                  Order Info
                </v-tab>
                <v-tab
                  ripple
                  :disabled="selectedJob == null" 
                >
                <v-badge right v-if="selectedTasks.length > 0">
                  <span slot="badge">{{selectedTasks.length}}</span>
                Tasks
                </v-badge>
                <template v-else>
                  Tasks
                </template>
                </v-tab>
                <v-tab
                  ripple
                  :disabled="selectedJob == null"  
                >
                  customer info 
                </v-tab>
                <v-tab-item id='order_info_content'>
                    <order-info :job="selectedJob"></order-info>
                </v-tab-item>
                <v-tab-item id='order_tasks_content'>
                    <tasks :tasks="selectedTasks" :job="selectedJob" @addTask="passTheTask"></tasks>
                </v-tab-item>
                  <v-tab-item id='order_tasks_content'>
                    <customer-info></customer-info>
                </v-tab-item>
            </v-tabs>  
                 
          </v-card>    
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import JobsList from './components/JobsList.vue';
import OrderInfo from './components/OrderInfo.vue';
import Tasks from './components/Tasks.vue';
import CustomerInfo from './components/CustomerInfo.vue';

export default {
  name: 'app',
  data() {
    return {
      sortVar:'',
      isSearching:false,
      searchText:'',
      selectedJob:null,
      selectedTasks:[],
      passTask:null
    }
  },
  computed:{
    binding(){
            const binding = {}
            if(this.$vuetify.breakpoint.smAndDown){
                binding.column = true;  
            }
            return binding;
        }
  },
  components: {
    JobsList,
    OrderInfo,
    Tasks,
    CustomerInfo
  },
  methods: {
    handleSort(e) {
      const selectedSortVar = e.target.dataset['sortVar'];
      if(selectedSortVar) {
        this.sortVar = selectedSortVar;
      } else {
        this.sortVar = '';
      }
    },
    handleSearch() {
      if(this.isSearching == false) {
        this.isSearching = true;
      } else {
        this.isSearching = false;
        this.searchText = '';
      }
    },
    handleSelectedJob(job) {
      console.log("val from selected job",job);
      this.selectedJob = job;
      this.selectedTasks = job.tasks;
    },
    passTheTask(taskObj) {
      this.passTask = taskObj;
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.v-input input{
  max-height: 38px;
}
.sort_item:hover{
  cursor: pointer;
  background-color: rgba(139, 212, 255, .5)
}
.v-text-field{
  padding-top:10px;
}
</style>
