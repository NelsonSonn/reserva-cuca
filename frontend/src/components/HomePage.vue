<template>
  <nav class="navbar">
    
    <div class="navbar-brand">
      <div class="navbar-burger" @click="toggleMenu">
      </div>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-end">
        <a class="navbar-item" href="#">Home</a>
        <a class="navbar-item" href="#">Sobre</a>
        <a class="navbar-item" href="#">Serviços</a>
        <a class="navbar-item" href="#">Contato</a>
        <a class="navbar-item" href="#">Sair</a>
      </div>
    </div>
  </nav>
 

  <div vw class="enabled">
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    }
  },
  mounted() {
    // Verifique se o objeto `window.VLibras` já está definido para evitar erros
    if (window.VLibras) {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    } else {
      // Adiciona o script do VLibras se ainda não estiver carregado
      const script = document.createElement('script');
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.onload = () => {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
      };
      document.head.appendChild(script);
    }
  }
};
</script>

<style lang="css" src="../styles/homepage.css"/>
