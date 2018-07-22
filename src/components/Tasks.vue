<template>
    <v-card>
        <v-card-text style="height:216.5px;">
            <v-container fluid style="padding:0;" v-if="tasks !== null && tasks.length > 0">
                <v-layout row>
                    <v-flex xs12 order-lg2>
                        <v-list>
                            <v-list-tile v-for="task in tasks" :key="task.title">
                                <v-list-tile-action>
                                <v-checkbox></v-checkbox>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                <v-list-tile-title><b>{{task.title}}</b> &nbsp; <small class="blue--text">By: {{task.finishDate | returnPriorityDates}}</small></v-list-tile-title>
                                <v-list-tile-sub-title>{{task.description}}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-spacer></v-spacer>
                                <v-list-tile-action>
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
                                <v-list-tile-action>
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
          <v-btn flat color="cyan">Add Task</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
import moment from 'moment';
export default {
    data() {
        return {

        }
    },
    props:['tasks'],
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
    }
}
</script>

<style>

</style>
