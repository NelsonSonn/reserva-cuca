
<template>
  <div id="app">
      <nav class="top-side">
      </nav>
      <header class="top-bar">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

      <nav class="top-nav">           
          </nav>
  
          <div class="user-info"> 
            <button class="register">Cadastro</button>
            <button class="user"> Login</button>
          </div>
        </header>
       <div>
        <h1>Reserva</h1>
        <hr>
       </div>
       <div>
          <h1>CUCA:pici</h1>
          Data: <input type="date"><br>
          Hora Inicio: <input type="time"><br>
          Hora Fim: <input type="time">
              
          <div>
            <table class="table table-dark">
              <thead><tr>
              <th>id:</th>
              <th>cuca:</th>
              <th>area:</th>
              <th>sala:</th>
              <th>data:</th>
              <th>horario entrada:</th>
              <th>horario saida:</th>
             </tr>             
            </thead>
         <tbody>
            <tr v-for="(reserves, index) in this.reserve" :key="index">             
              <td>{{ reserves.id }}</td>
              <td>{{ reserves.cuca }}</td>
              <td>{{ reserves.area }}</td>
              <td>{{ reserves.room }}</td>
              <td>{{ reserves.date }}</td>
              <td>{{ reserves.time-intro }}</td>
              <td>{{ reserves.time-end }}</td>

              <td>
                <RouterLink to="/">edit</RouterLink>
              <button>delete</button>
              </td>
            </tr>
        </tbody>
       
        </table>

          </div>
       </div>
     <!--<aside class="side-bar">
          <button class="button-aside">Reservar sala</button>
          <button class="button-aside">Consultar salas</button>
          <button class="button-aside">Equipamentos</button><br>
          <button class="button-aside">Sair</button>
       </aside>
-->        
        <footer>
          <p>Endereço: Rua dos Manguezais, S/N - São João do Tauape, Fortaleza - CE. 60135-645 Funcionamento: 08 às 12h e 13 às 17h Telefone: (85) 3488-9665</p>
        </footer>
  
        <main class="content">
          <!-- Conteúdo principal vai aqui -->
        </main>
      </div>
      </template>
    <script>
    import axios from "axios";
      export default {
      // eslint-disable-next-line vue/multi-word-component-names
        name:'reserve',
        data(){
          return{
            reserve:[]
        }
      },
      mounted(){
        this.getReserve();

      },
      methods:{
        getReserve(){
          axios.get('http://localhost:3000/reserve').then(res => { 
            this.reserve = res.data
            //console.log(this.reserve)
          });
        }
      },
    }
    </script>
  <style lang="css" src="../styles/main.css"></style>
  <style lang="css" src="../styles/layout.css"></style>
