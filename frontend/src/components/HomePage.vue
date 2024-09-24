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
      </div>
    </div>
  </nav>
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
  }
};
</script>

<style lang="css" src="../styles/homepage.css"/>
