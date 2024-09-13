<template>
  <div id="app">
  <div id="login">
    <img src="../assets/logo-cuca.png" alt="logo" height="200" width="200"><br>
    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="user.name" type="text" name="name" required>
      </p>
      <p>
      <label for="password">Senha:</label>
      <input id="password" v-model="user.password" type="password" name="password" required>
    </p>
        <button @click="home">entrar</button>
        <button @click="register">cadastrar</button>
      </div>
      </div>
  </template>
  


  <script>
  export default {
  data() {
    return {
      user: {
        name: '',
        password: ''
      }
    };
  },
  methods: {
    home() {
      this.$router.push('/');
    },
    register() {
      // Implementar a lógica para o cadastro
      alert('Cadastro não implementado');
    }
  }
}
  
  </script>
  <style lang="css" src="../styles/login.css"></style>
  