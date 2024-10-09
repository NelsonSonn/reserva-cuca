<template>
    <v-card color="white" class="rounded-lg" flat>
        <v-sheet tile height="54" class="d-flex">
            <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chvron-left</v-icon>
            </v-btn>
            <v-select v-model="type" :items="types" dense outlined hide-details class="ma-2" label="type"></v-select>
            <v-select v-model="mode" :items="modes" dense outlined hide-detail label="event-overlap-mode" class="ma-2"></v-select>
            <v-select v-model="weekday" :items="weekdays" dense outlined hide-details label="weekdays" class="ma-2"></v-select>
            <v-spacer></v-spacer>        
            <v-btn icon class="ma-2" @click="$refs.calendar.next()">
                <v-icon>mdi-chvron-right</v-icon>
            </v-btn>
        </v-sheet>
        <v-sheet height="600">
            <v-calendar ref="calendar" v-model="value" :weekdays="weekday" :type="type" :events="events" :events-overlap-mode="mode" :event-overlap-threshold="30" :event-color="getEventColor" @charge="getEvents"></v-calendar>
        </v-sheet>
    </v-card>
</template>

<style></style>

<script>
export default{
data:()=>({
type:"mês",
types:["mês","week","day","4day"],
mode:"stack",
modes:["stack","column"],
weekday:[0,1,2,3,4,5,6],
weekdays:[
{text:"sabado - domingo",value:[0,1,2,3,4,5,6]},
{text:"segunda - domingo",value:[6,5,4,3,2,1,0]},
{text:"segunda - sexta",value:[1,2,3,4,5]},
{text:"segunda,quarta,sexta",value:[1,3,5]},
],
value:"",
eventes:[],
colors:[
"blue",
"indigo",
"deep-purple",
"cyan",
"green",
"orange",
"grey darker-1",
],
names:[
"feriados",
"consultas",
"dias",
"evanto",
"aniversario",
"conferencias",
"reunioes",
]
}),
}
</script>