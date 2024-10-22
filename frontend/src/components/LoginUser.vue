<template>
  <article>
    <Menu />  
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
        
        <input id="name" type="email" name="email" placeholder="Email" required>
        <input id="word" type="password" name="password" placeholder="Password" required>
        <a href="#">Esqueceu a senha?</a>
        <button @click="homepage">entrar</button>
        <button @click="register">cadastrar</button>

      </form>
    </div>
  </article>
</template>
<script>

</script>
<style lang="css" src="../styles/loginuser.css"/>
