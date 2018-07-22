<template>
    <v-card>
        <v-card-text style="height:216.5px;">
            <v-container fluid v-if="job !== null">
                <v-layout row>
                    <v-flex xs12 sm6 order-lg2>
                        <table>
                            <tr>
                                <td class="order_info_lable">Due Date:</td>
                                <td :class="job.last_inhand_date | returnPriorityColor">{{job.last_inhand_date | returnPriorityDates}}</td>
                            </tr>
                            <tr>
                                <td class="order_info_lable">Sizing Due:</td>
                                <td :class="job.sizing_due_date | returnPriorityColor">{{job.sizing_due_date | returnPriorityDates}}</td>
                            </tr>
                        </table>
                    </v-flex>
                    <v-flex sm6>
                        <table>
                            <tr>
                                <td class="order_info_lable">Status:</td>
                                <td>{{job.status }}</td>
                            </tr>
                            <tr>
                                <td class="order_info_lable">Art Due:</td>
                                <td :class="job.art_due_date | returnPriorityColor">{{job.art_due_date | returnPriorityDates}}</td>
                            </tr>
                        </table>
                    </v-flex>
                </v-layout>
            </v-container>            
            <v-container fluid v-else>
                <v-layout row>
                    <v-flex xs12 order-lg2>
                        <h3 class="title">Select Job from list to see details</h3>
                    </v-flex>
                </v-layout>
            </v-container>            
        </v-card-text>
        <v-card-actions>
          <v-btn :class="{hidden : job == null}" flat color="orange">Go to SalesOrder</v-btn>
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
    props:['job'],
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
.order_info_lable{
    font-weight: bold;
    text-align: left;
}
td {
    padding:5px; 
}
.hidden{
    visibility: hidden;
}
</style>
