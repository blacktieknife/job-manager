<template>
    <v-card>
        <v-card-text style="height:216.5px;">
            <v-container fluid style="padding:0;">
                <v-layout row>
                    <v-flex xs12 order-lg2>
                      Customer Stuff here
                    </v-flex>
                </v-layout>
            </v-container>               
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange">Go to Customer Record</v-btn>
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
    props:['customer'],
    copmuted:{

    },
    filters:{
 
    },
}
</script>

<style>

</style>