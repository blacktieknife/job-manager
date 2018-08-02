<template>
    <v-card>
        <v-card-text style="height:216.5px;">
            <v-container fluid v-if="job !== null" style="max-height:210px;overflow:auto;padding:0;">
                <v-layout xs12 sm6 row>
                    <v-flex xs12 sm6>
                        <table style="width:100%;min-width:100px;">
                            <tr>
                                <td class="order_info_lable" >Due Date:<div style="display:inline-block; font-size:10px;cursor:pointer;"><v-icon class="is-pulled-right has-text-info" style="font-size:18px;">edit</v-icon></div></td>
                            </tr>
                            <tr>
                                <td class="order_info_data" v-html="returnDateHtml(job.last_inhand_date)"></td>
                            </tr>
                              <tr>
                                <td class="order_info_lable">Sizing Due:</td>
                            </tr>
                            <tr>
                                <td :class="['order_info_data']" v-html="returnDateHtml(job.sizing_due_date)"></td>
                            </tr>
                        </table>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <table style="width:100%;min-width:100px;">
                            <tr>
                                <td class="order_info_lable">Status:</td>
                            </tr>
                            <tr>
                                <td class='order_info_data'>{{job.status}}</td>
                            </tr>
                            <tr>
                                <td class="order_info_lable">Art Due:</td>
                            </tr>
                            <tr>
                                <td :class="['order_info_data']" v-html="returnDateHtml(job.art_due_date)"></td>
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
                return `<span :style="{fontWeight:'bolder'},{color:'#cc4040'}">${moment(date).format('MMM Do, YYYY')}</span>`;
            } else if(moment(date).subtract(7,'days').isSameOrBefore(moment(Date.now()))){
                return `<span style="fontWeight:bold;color:#d8b000;">${moment(date).format('MMM Do, YYYY')}</span>`;
            } else {
                return `<span style="fontWeight:400,color:#333;">${moment(date).format('MMM Do, YYYY')}</span>`;
            }
        }
    },
    methods:{
        returnDateHtml(date){
                if(moment(date).isSameOrBefore(moment(Date.now()))){
                return `<span style="font-weight:bolder;color:#cc4040;">${moment(date).format('MMM Do, YYYY')}</span>`;
            } else if(moment(date).subtract(7,'days').isSameOrBefore(moment(Date.now()))){
                return `<span style="font-weight:bold;color:#d8b000;">${moment(date).format('MMM Do, YYYY')}</span>`;
            } else {
                return `<span style="font-weight:400;color:#333;">${moment(date).format('MMM Do, YYYY')}</span>`;
            }
        }
        }
}
</script>

<style>
.container {
    padding:0;
}
.order_info_lable{
    font-weight:600;
    text-align: left;
    letter-spacing: .9px;
    color:#797979
}
.order_info_data{
    border-bottom:1px solid lightgrey;
    background-color: rgb(240, 240, 240);
}
td {
    padding:3px; 
}
.hidden{
    visibility: hidden;
}
</style>
