<template>
    <v-card>
        <v-card-text style="height:216.5px;">
            <v-container fluid style="padding:0;" v-if="tasks !== null && tasks.length > 0">
                <v-layout row>
                    <v-flex xs12 order-lg2>
                        <v-list>
                            <v-list-tile v-for="task in tasks" :key="task.title">
                                <v-list-tile-action>
                                <v-checkbox class="done_check" @change="(checked)=>{handleDoneCheck(checked,task.id)}"></v-checkbox>
                                </v-list-tile-action>
                                <v-list-tile-content :id="'checkContent'+task.id">
                                <v-list-tile-title><b>{{task.title}}</b> &nbsp; <small class="blue--text">By: {{task.finishDate | returnPriorityDates}}</small></v-list-tile-title>
                                <v-list-tile-sub-title>{{task.description}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-spacer></v-spacer>
                                <v-list-tile-action :id="'editCheck'+task.id">
                                <v-tooltip left>
                                    <v-btn 
                                    icon
                                    slot="activator"
                                    >
                                        <v-icon 
                                            color="cyan lighten-1"
                                        >
                                            border_color
                                        </v-icon>
                                    </v-btn>
                                    <span>Edit Task</span>
                                </v-tooltip> 
                                </v-list-tile-action>
                                <v-list-tile-action :id="'removeCheck'+task.id">
                                <v-tooltip left>   
                                    <v-btn 
                                    slot="activator"
                                    icon
                                    >
                                        <v-icon 
                                        color="red lighten-2"
                                        >
                                            remove_circle
                                        </v-icon>
                                    </v-btn>
                                    <span>Remove Task</span>
                                </v-tooltip> 
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-flex>
                </v-layout>
            </v-container>            
            <v-container fluid style="padding:0;" v-else>
                <v-layout row>
                    <v-flex xs12 order-lg2>
                       No tasks for this order.
                    </v-flex>
                </v-layout>
            </v-container>            
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="cyan" @click="dialog = true">Add Task</v-btn>
        </v-card-actions>
        <v-dialog
            v-model="dialog"
            max-width="450"
            >
            <v-card>
                <v-card-title class="headline">Add Task</v-card-title>

                <v-card-text>
                    <v-flex xs12>
                        <v-text-field label="Task Title" required max="70" v-model="title"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-textarea
                            name="input-7-1"
                            box
                            label="Task Description"
                            auto-grow
                            v-model="textArea"
                            required
                            >
                        </v-textarea>
                    </v-flex>
                    <v-flex xs12>
                        <v-menu
                            ref="menu2"
                            :close-on-content-click="false"
                            v-model="menu2"
                            :nudge-right="40"
                            :return-value.sync="finishByDate"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="finishByDate"
                            label="Finish Task Date"
                            prepend-icon="event"
                            readonly
                            required
                            ></v-text-field>
                            <v-date-picker v-model="date" @input="$refs.menu2.save(date)"></v-date-picker>

                        </v-menu>
                    </v-flex>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="dialog = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="()=>{addTask(job.id)}"
                >
                    Add Task
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import moment from 'moment';
export default {
    data() {
        return {
            cvalue:false,
            title:'',
            checkedVal:'',
            textArea:'',
            dialog:false,
            finishByDate: null,
        }
    },
    props:['tasks', 'job'],
    copmuted:{

    },
    filters:{
        returnPriorityDates(date) {
            return moment(date).format('MMM Do, YYYY');
        },
        returnPriorityColor(date) {
            if(moment(date).isSameOrBefore(moment(Date.now()))){
                return "red--text lighten-1 font-weight-black subheading";
            } else if(moment(date).subtract(7,'days').isSameOrBefore(moment(Date.now()))){
                return "orange--text lighten-2 font-weight-bold subheading";
            } else {
                return "black--text lighten-2 font-weight-normal subheading";
            }
        }
    },
    methods: {
        handleDoneCheck(checked, taskId) {
            const taskElement = document.querySelector('#checkContent'+taskId);
            if(checked) {
                taskElement.style.textDecoration = 'line-through';
            } else {
                taskElement.style.textDecoration = '';
            }
        },
        addTask(jobId) {
            if(this.title && this.textArea && this.finishByDate) {
                const taskObj = {
                jobId:jobId,
                title:this.title,
                description:this.textArea,
                finishByDate:this.finishByDate
                }
                this.$emit('addTask', taskObj);
                this.dialog = false;
                this.title = '';
                this.textArea = '';
                this.finishByDate = '';
            }
        }
    },
    created(){

    }
}
</script>

<style>

</style>
