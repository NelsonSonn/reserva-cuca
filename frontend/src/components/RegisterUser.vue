<template>
  <article>
    <div class="container">
      <div class="overlay-container">
        <img src="../assets/logo-cuca.png" alt="" class="photo-container">
        <div class="overlay">
          <div class="overlay-right">
            
            <!---<button class="invert">cadastrar</button>-->
          </div>
        </div>
      </div>
      <form class="sign-up" action="#">
        <h2>Entrar na conta:</h2>
        <div>Use seu email para entrar</div>
        <input type="email" name="email" placeholder="Email" v-model="email">
        <input type="password" name="password" placeholder="Password" v-model="password">
        <input type="tel" name="telephone" placeholder="Telephone" v-model="tel">
        <select id="role" name="role">
        <option value="none" required="">não selecionado</option>
        <option value="GERENCY" >gerencia</option>
        <option value="TEACHER" >professor</option>
        <option value="SUPERVISOR" >supervisão</option>
        <option value="COORDINATOR" >cordernação</option>
    
</select>

        <a href="#">Esqueceu a senha?</a>
        <button @click="login">cadastrar</button>

      </form>
    </div>
  </article>
</template>
<script>
import axios from 'axios';
export default{
  name:'LoginUser',
  data(){
    return{
      email:'',
      password:'',
      error:'',
    }
  },
  methods:{
    login(){
      let user={
        email:this.email,
        password:this.password
      }
      axios.post('http://localhost:3000/login',user)
      .then(res=>{
        if(res.status===200){
          localStorage.setItem('token',res.data.token);
          this.$router.push('/side')
        
        }
      },err=>{
          console.log(err.response.data.error)
        
      })
    }
  }
}
</script>
<style scoped>
.container {
  position: relative;
  width: 768px;
  height: 620px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to bottom, rgb(255, 255, 255), rgba(0, 238, 255, 0.733));
  margin: auto; /* Center horizontally */
  display: flex; /* Center vertically */
  align-items: center;
  justify-content: center;
}

.overlay-container {
  position: absolute;
  top: 0;
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
  background-color: rgb(0, 0, 0);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
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
}</style>

