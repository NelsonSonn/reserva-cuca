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
      this.error = ''; // Limpa a mensagem de erro anterior
      let user = {
        email: this.email,
        password: this.password,
      };
      axios.post('http://localhost:3000/login', user)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            this.$router.push('/side');
          }
        })
        .catch(err => {
          this.error = err.response.data.error || 'Erro ao fazer login';
          console.log(this.error);
        });
    },
    register() {
      // Lógica para o cadastro deve ser implementada aqui
      console.log('Cadastrar usuário');
    },
  },
};
</script>

<style lang="css" src="../styles/loginuser.css"></style>
