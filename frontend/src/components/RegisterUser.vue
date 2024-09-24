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
        <input type="email" name="email" placeholder="Email">
        <input type="password" name="password" placeholder="Password">
        <input type="tel" name="telephone" placeholder="Telephone">
        <input type="date" name="date" placeholder="date">
        <a href="#">Esqueceu a senha?</a>
        <button @click="loginuser">entrar</button>
        <button @click="register">cadastrar</button>

      </form>
    </div>
  </article>
</template>
<style lang="css" src="../styles/register.css"></style>

