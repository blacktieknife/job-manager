<template>
  <div style="height:325px; overflow:auto;">
      <v-list-tile ripple v-for="(job) in filteredJobs" :key="job.id" :jobid="job.id" class="v_list_item" @click="handleJobClick(job.id)">
          <v-list-tile-content style="border-bottom:1.3px solid silver;">
          <v-list-tile-title :title="job.jobName">{{ job.id }} {{ job.jobName }}</v-list-tile-title>
          <v-list-tile-sub-title style="font-size:.79rem">DueDate:{{job.last_inhand_date | moment}}  <span>Art Due: {{job.art_due_date | moment}}</span> <span>Art Due: {{job.art_due_date | moment}}</span></v-list-tile-sub-title>
          </v-list-tile-content>
          
          <v-list-tile-action style="border-bottom:1.3px solid silver;" v-if="job.tasks.length > 0">
        <v-tooltip left>
            <v-btn 
            slot="activator"
            icon
            @click="taskClick"
            :data-job-id="job.id"
            :ripple="false"
          >
            <v-icon
              :color="job.last_inhand_date | priorityColor"
              >
            date_range
            </v-icon>
          </v-btn>
          <span>{{job.tasks.length}} Tasks</span>
        </v-tooltip>
          </v-list-tile-action>
          
        <v-list-tile-action style="border-bottom:1.3px solid silver;" v-if="job.art_due_date !== null">
        <v-tooltip left>
          <v-btn
            icon
            slot="activator"
            :ripple="false" 
            @click="artDueClick"
            :data-job-id="job.id"
            :data-art-due="job.art_due_date"
          >
              <v-icon
              :color="job.art_due_date | priorityColor"
              >
              photo_album
              </v-icon>
          </v-btn>
           <span>Art Due : {{job.art_due_date | moment}}</span>
        </v-tooltip>
          </v-list-tile-action>
           <v-list-tile-action style="border-bottom:1.3px solid silver;" v-if="job.sizing_due_date !== null" >
            <v-tooltip left>
          <v-btn
          slot="activator"
            icon
            :ripple="false" 
            @click="sizingDueClick"
            :data-job-id="job.id"
            :data-sizing-due="job.sizing_due_date"
            :title="job.sizing_due_date | moment"
          >
              <v-icon
              :color="job.sizing_due_date | priorityColor"
              >
              swap_vert
              </v-icon>
          </v-btn>
           <span>Sizing Due : {{job.sizing_due_date | moment}}</span>
        </v-tooltip>
          </v-list-tile-action>
           <v-list-tile-action style="border-bottom:1.3px solid silver;"  v-if="momentIsGreaterOrEqual(job.last_inhand_date)">
            <v-tooltip left>
          <v-btn
          slot="activator" 
            icon
            :ripple="false" 
            
            :data-job-id="job.id"
            :data-sizing-due="job.last_inhand_date"
            :title="job.last_inhand_date | moment"
          >
              <v-icon
              :color="job.last_inhand_date | priorityColor"
              >
              error
              </v-icon>
          </v-btn>
           <span>Last In Hand : {{job.last_inhand_date | moment}}</span>
        </v-tooltip>
          </v-list-tile-action>
      </v-list-tile>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'JobsList',
  data() {
    return {
      sortVar:'',
      searchTerm:'',
      jobs:[],
    }
  },
  props:['sortBy','search', 'passedTask'],
  filters:{
        moment(date){
            return moment(date).format("MMM Do, Y");
        },
        priorityColor(date){
            if(moment(date).isSameOrBefore(moment(Date.now()))){
                return "red lighten-1";
            } else if(moment(date).subtract(7,'days').isSameOrBefore(moment(Date.now()))){
                return "orange lighten-2";
            } else {
                return "green lighten-3"
            }
        }   
    },
  watch: {
      sortBy(val){
          if(val){
              this.sortVar = val;
          } else {
              this.sortVar = '';
          }
      },
      search(val){
          if(val){
              this.searchTerm = val;
          } else {
              this.searchTerm = '';
          }
      },
      passedTask(val){
          if(val){
              const foundEl = this.jobs.find(el=>el.id == val.jobId);
              const newTask = {
                  id:foundEl.tasks.length + 1,
                  title:val.title,
                  startDate:moment().format(),
                  finishDate:val.finishByDate,
                  description:val.description,
                  completed:false,
              }
              foundEl.tasks.push(newTask);
          }
      }
  },  
  methods:{
      momentIsGreaterOrEqual(date) {
        return moment(date).isSameOrBefore(moment(Date.now()));
    },
    handleListItemClick(i) {
        console.log("List Item click")
        console.log(this.selected)
    },
    taskClick(e){
        e.stopPropagation();
        e.preventDefault();
        console.log("task click")
        console.log(e.target.dataset['jobId'])   
    },
    artDueClick(e){
        e.stopPropagation();
        e.preventDefault();
        console.log("art due click")
        console.log(e.target.dataset['jobId'])
        console.log(e.target.dataset['artDue'])   
    },
    sizingDueClick(e){
        e.stopPropagation();
        e.preventDefault();
        console.log("sizing due click")
        console.log(e.target.dataset['jobId'])   
        console.log(e.target.dataset['sizingDue'])   
    },
    handleJobClick(jobId, e){
      const job_id = typeof(jobId) === 'number' && jobId > 0 ? jobId : false;
      if(job_id) {
        document.querySelectorAll('.v-list__tile--link').forEach((tile)=>{
            if(tile.attributes['jobid'] && parseInt(tile.attributes['jobid'].value) === jobId) { 
                tile.parentElement.classList.add('selected-job');
            } else {
                tile.parentElement.classList.remove('selected-job');
            }
        })
        const selectedJob = this.jobs.find((el)=>el.id === job_id);  
        this.$emit("newSelectedJob", selectedJob);
      }
    }
  },
  computed:{
    filteredJobs(){
      if(this.sortVar == ''){
          return this.jobs.filter((job)=>{
              return job.keyWords.join(',').toLowerCase().includes(this.searchTerm.toLowerCase()) || job.jobName.toLowerCase().includes(this.searchTerm.toLowerCase()) || job.id.toString().includes(this.searchTerm)
          }).sort((a,b)=>a.last_inhand_date > b.last_inhand_date) 
      } else if(this.sortVar == 'art'){
          return this.jobs.filter((job)=>{
              return  job.keyWords.join(',').toLowerCase().includes(this.searchTerm.toLowerCase()) || job.jobName.toLowerCase().includes(this.searchTerm.toLowerCase()) || job.id.toString().includes(this.searchTerm)
          }).sort((a,b)=>{
              if(!a.hasOwnProperty('art_due_date') || !b.hasOwnProperty('art_due_date') ){
                  return 0;
              }
              let compair = 0;
              if(a.art_due_date > b.art_due_date){
                  compair = 1;
              } else if (a.art_due_date < b.art_due_date){
                  compair = -1;
              }
              return compair;
              }) 
      } else if(this.sortVar == 'sizing'){
          return this.jobs.filter((job)=>{
              return job.keyWords.join(',').toLowerCase().includes(this.searchTerm.toLowerCase()) || job.jobName.toLowerCase().includes(this.searchTerm.toLowerCase()) || job.id.toString().includes(this.searchTerm)
          }).sort((a,b)=>a.sizing_due_date > b.sizing_due_date) 
      } else {
          return this.jobs;
      }
    },
  },
  created() {
    this.jobs = [
                {
                    "id":100, 
                    jobName:"Rastle in the rabmle Reall long tooo long name with lots of chanere", 
                    status:"Normal",
                    art_due_date:new Date('07/15/2018'),
                    sizing_due_date:new Date('07/30/2018'),
                    last_inhand_date:new Date('08/11/2018'),
                    keyWords:["goerge", "hallie", "1234 N Greely", "Portland", "Or", "brian"],
                    tasks:[
                        {
                            title:"greete John", startDate:"07/16/2018", finishDate:"7/30/2018", description:"Meet with john at airport 7/30, 12am", completed:false
                        },
                        {
                            title:"Final shipping address", startDate:"07/16/2018", finishDate:"8/2/2018", description:"Need final shipping address before order complete", completed:false
                        },
                    ],
                },
                {
                    "id":20000, 
                    jobName:"Patooto Trot Inv TS12",
                    status:"Critical",
                    art_due_date:new Date('07/20/2018'),
                    sizing_due_date:new Date('7/23/2018'),
                    last_inhand_date:new Date('08/10/2018'),
                    keyWords:["purple", "green", "Red", "White"],
                    tasks:[
                        {
                            id:1, title:"Ask for more time", startDate:"07/16/2018", finishDate:"7/25/2018", description:"Factory need more time to produce garments", completed:false
                        },
                        {
                            id:2, title:"Follow up on post delivery", startDate:"07/16/2018", finishDate:"8/25/2018", description:"Call customer after event to ensure product was satisfactory", completed:false
                        },
                    ],
                },
                {
                    "id":3000, 
                    jobName:"Test Job Name #3",
                    status:"Unknown",
                    art_due_date:new Date('07/02/2018'),
                    sizing_due_date:new Date('07/02/2018'),
                    last_inhand_date:new Date('07/25/2018'),
                    keyWords:["astros", "mets", "dodgers"],
                    tasks:[]

                },
                {
                    "id":400, 
                    jobName:"RingoStars Bingo",
                    status:"Normal",
                    art_due_date:null,
                    sizing_due_date:null,
                    last_inhand_date:new Date('07/1/2018'),
                    keyWords:["cowboys", "indians", "victory", "stew"],
                    tasks:[]
                },
                {
                    "id":500000, 
                    jobName:"Flingo Camino",
                    status:"Normal",
                    art_due_date:new Date('08/21/2018'),
                    sizing_due_date:new Date('08/21/2018'),
                    last_inhand_date:new Date('08/30/2018'),
                    keyWords:["cowboys", "indians", "victory", "stew"],
                    tasks:[]
                },
                {
                    "id":60000,
                    jobName:"Randy's Ruse Ride",
                    status:"Critical",
                    art_due_date:new Date('07/08/2018'),
                    sizing_due_date:new Date('07/15/2018'),
                    last_inhand_date:new Date('08/05/2018'),
                    keyWords:["cowboys", "indians", "victory", "stew"],
                    tasks:[]
                },
                {
                    "id":7, 
                    jobName:"Another Tooes to ddee",
                    status:"Critical",
                    art_due_date:new Date('07/08/2018'),
                    sizing_due_date:new Date('07/15/2018'),
                    last_inhand_date:new Date('08/05/2018'),
                    keyWords:["cowboys", "indians", "victory", "stew"],
                    tasks:[]
                },
            
            ]
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.v_list_item{
  cursor: pointer !important;
}
.selected-job{
    border-left:5.5px solid rgb(18, 18, 83) !important;
    background-color:rgb(195, 243, 255);
}
</style>