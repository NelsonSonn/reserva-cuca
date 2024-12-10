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
      <form class="sign-up" @submit.prevent="login">
        <h2>Entrar na conta:</h2>
        <div>Use seu email para entrar</div>
        
        <input id="name" type="email" name="email" placeholder="Email" v-model="email" required>
        <input id="word" type="password" name="password" placeholder="Password" v-model="password" required>
        <a href="#">Esqueceu a senha?</a>
        <button type="submit">Entrar</button>
        <button @click.prevent="register">Cadastrar</button>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </article>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginUser',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      this.error = ''; 
      let user = {
        email: this.email,
        password: this.password,
      };
      axios.post('http://localhost:3000/api/login', user)
        .then(res => {
          if (res.status === 200 && res.data) {
            localStorage.setItem('token', res.data.token);
            this.$router.push('/calendar');
          } else {
            this.error = 'Falha ao autenticar. Favor tentar novamente.';
          }
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.error = 'Email ou senha inválidos.';
          } else {
            this.error = 'Falha ao autenticar. Favor tentar novamente.';
          }
        });
    },
    register() {
      this.$router.push('/register');
    },
  },
};
</script>

<style lang="css" src="../styles/loginuser.css"></style>
