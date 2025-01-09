<template>
    <NavBar />
  <article>
    <div class="container">
      <div class="overlay-container">
        <img src="../assets/logo-cuca.png" alt="" class="photo-container">
      </div>
      <form class="sign-up" action="#">
        <h1>Alterar os dados</h1>
        <input type="name" name="name" placeholder="Nome" v-model="name">
        <input type="email" name="email" placeholder="Email" v-model="email">
        <input type="tel" name="telephone" placeholder="Telefone" v-model="telephone">
        <button @click="updateData">Salvar alterações</button>
        <a href="calendar"><button >Voltar</button></a>

        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </article>
</template>
<script>
import axios from 'axios';
import NavBar from './NavBar.vue';

export default{
  components:{
    NavBar
  },
  name:'LoginUser',
  data(){
    return{
      email:'',
      telephone: '',
      error:'',
      password:'',
    }
  },
  mounted(){
    this.fetchUserData()
  },
  methods:{
    fetchUserData(){
      const storedUserData = localStorage.getItem('userData');
      if(storedUserData){
        const userData = JSON.parse(storedUserData);
        const userId = userData.userId;
      axios.get('http://localhost:3000/api/users', {
        params: { id: userId },
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      })
      .then(res=>{
        const user = res.data[0];
        this.email = user.email
        this.telephone = user.telephone
        this.name = user.name
        this.role = user.role
        this.password = user.password
      })
      .catch(err=>{
        console.log('Erro ao buscar dados do usuário: \n', err)
      })
    }else{
      console.log('Nenhum dado de usuário encontrado no localStorage')
    }
    },
    updateData(){
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        const userId = userData.userId;
        let user = {
          email: this.email,
          telephone: this.telephone,
          name: this.name,
          role: this.role,
          password: this.password
        };
        console.log(user)
        axios.put(`http://localhost:3000/api/users/${userId}`, user, {
          headers: {
            Authorization: 'Bearer ' + userData.token
          }
        })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('userData', JSON.stringify({
              ...userData,
              email: this.email,
              telephone: this.telephone,
              name: this.name,
              role: this.role,
            }));
            this.error = 'Dados atualizados com sucesso';
          }
        })
        .catch(err => {
          console.log('Erro ao atualizar dados do usuário:', err.response.data.error);
          this.error = err.response.data.error;
        });
      }
    }
  }
};

</script>
<style scoped>
.container {
  position: relative;
  width: 768px;
  height: 620px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom, rgb(255, 255, 255), #23aca7);
  margin: auto; /* Center horizontally */
  display: flex; /* Center vertically */
  align-items: center;
  justify-content: center;
  margin-top: 50px; /* Adiciona um espaço entre a imagem e o formulário */

}

.overlay-container {
  position: absolute;
  top: 160px;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  
}
.photo-container

.overlay {
  position: absolute;
  left: -100%;
  height: 100%;
  width: 200%;
  background: linear-gradient(to right, aqua, rgb(255, 255, 255));
  color: #ffffff;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  
}

.overlay-right {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 40px;
  width: calc(50% - 80px);
  height: calc(100% - 140px);
  text-align: center;
  
}

h2 {
  margin: 0;
}

p {
  margin: 20px 0 30px;
}

a {
  color: black;
  text-decoration: none;
  margin: 15px;
  font-size: 1rem;
}

button {
  border-radius: 20px;
  border: 1px solid;
  background-color: #e7a570;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 33px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 0.1s ease-in;
}

button:active {
  transform: scale(0.9);
}

button:focus {
  outline: none;
}

button.invert {
  background-color: transparent;
  border-color: #fff;
}
button:hover {
  color:rgba(169, 169, 169, 1);
}
form {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 90px 60px;
  width: calc(50% - 120px);
  height: calc(50% - 120px);
  text-align: center;
  background: linear-gradient(to right, rgb(255, 255, 255), rgb(255, 255, 255));
  transition: all 0.5s ease-in-out;
  border-radius: 20px;
  
}

input {
  background-color: #fff;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  width: calc(100% - 30px);
  border-radius: 15px;
  border-bottom: 1px solid gray;
  box-shadow: inset 0 1px 2px black, 0 -1px 1px #fff, 0 1px 0 #fff;
}

input:focus {
  outline: none;
  background-color: #d2d2d2eb;
}
select{
  background-color: #fff;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  width: calc(100% - 0px);
  border-radius: 15px;
  border-bottom: 1px solid gray;
  box-shadow: inset 0 1px 2px black, 0 -1px 1px #fff, 0 1px 0 #fff;
}

.error {
color: red;
}

</style>