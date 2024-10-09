<template>
    <v-card color="white" class="rounded-lg mt-2 flat">
      <v-row>
        <v-col cols="12" sm="4">
            <v-card color="#2784ff" class="rounded-lg pg-2" flat>
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-avatar color="#dfedff" tile>
                        <v-img src="../assets/logo-cuca.png" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="12" sm="8">
                    <h4 class="white--text">Leia</h4>
                    <h6 class="white--text">43</h6>
                  </v-col>
                  <v-col cols="12" sm="8" class="mt-3">
                    <v-row>
                        <v-col cols="12" sm="4">
                            <h6 class="grey--text text---lighten-4">Height</h6>
                            <h6 class="white--text text">185</h6>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <h6 class="grey--text text---lighten-4">Height</h6>
                            <h6 class="white--text text">185</h6>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <h6 class="grey--text text---lighten-4">leBlood typeight</h6>
                            <h6 class="white--text text">ab+</h6>
                        </v-col>
                    </v-row>
                  </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col cols="12" sm="5">
            <v-card color="transparent" class="rounded-lg mx-2 px-2" flat>
            <span class="caption grey--text mt-n6">telefone</span>
            <h5 class="black--text mb-7">+85(2)423423</h5>
            <span class="caption grey--text">numero do cartao</span>
            <h5 class="black--text">00000423423</h5>
        </v-card>    
        </v-col>
        <v-col cols="12" sm="5">
            <v-card color="transparent" class="rounded-lg px-2" flat>
            <span class="caption grey--text mt-n6">Email</span>
            <h5 class="black--text mb-7">aluno@redecuca</h5>
            <span class="caption grey--text">Condição </span>
            <h5 class="black--text">salas, reservar etc</h5>
            </v-card>
        </v-col>
      </v-row>
    </v-card>
</template>

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
<style></style>