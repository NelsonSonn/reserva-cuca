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
        <label for="ROLE">Cargo:</label>
        <select id="ROLE" name="role">
        <option value="GERENCY">gerencia</option>
        <option value="TEACHER">professor</option>
        <option value="SUPERVISOR">supervisão</option>
        <option value="COORDINATOR">cordernação</option>
    
</select>

        <a href="#">Esqueceu a senha?</a>
        <button >entrar</button>
        <button >cadastrar</button>

      </form>
    </div>
  </article>
</template>
<style lang="css" src="../styles/register.css"></style>

