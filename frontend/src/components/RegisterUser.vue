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
<style lang="css" src="../styles/register.css"></style>

