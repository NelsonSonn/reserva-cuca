<template>
  <nav>
    <div class="logo">
      <img src="../assets/logo-cuca.png" alt="" class="photo-container">
    
    </div>
    <ul :style="{ maxHeight: menuOpen ? '300px' : '0px' }" id="menuList">
      <li><a href="#"><i class="fa-solid fa-gears" style="color: #000000;"></i>Home</a></li>
      <li><a href="#"><i class="fa-solid fa-folder-open" style="color: #000000;"></i>About</a></li>
      <li><a href="#"><i class="fa-solid fa-square-poll-vertical" style="color: #000000;"></i>Services</a></li>
      <li><a href="#"><i class="fa-solid fa-bell" style="color: #000000;"></i>Product</a></li>
      <li><a href="#"><i class="fa-solid fa-user" style="color: #000000;"></i>Contact</a></li>
    </ul>
    <div class="menu-icon" @click="toggleMenu">
      <i class="fa-solid fa-bars"></i>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: true, // Controla o estado de abertura do menu
    };
  },
  methods: {
    // Alterna o estado do menu (aberto/fechado)
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
.photo-container {
    width: 140px;  /* Ajuste a largura conforme necessário */
    height: 90px; /* Ajuste a altura conforme necessário */
  }
html,
body {
  height: 100%;
  width: 100%;
  background: #3498db;
}

nav {
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1be6db;
  position: relative;
  height: 70px;
}

.logo {
  color: #fff;
}

nav ul {
  display: flex;
  gap: 30px;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li a {
  text-decoration: none;
  color: #030303;
  transition: color 0.3s;
}

nav ul li a:hover {
  color: #3498db; /* Alterar cor do link ao passar o mouse */
}

.menu-icon {
  display: none;
  cursor: pointer; /* Deixa o ícone interativo */
}

.menu-icon i {
  color: #fff; /* Cor do ícone */
  font-size: 30px;
}

@media (max-width: 600px) {
  nav ul {
    position: absolute;
    top: 70px;
    left: 0;
    right:80px;
    flex-direction: column;
    text-align: center;
    background: #00437a;
    gap: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out; /* Transição suave */
    max-height: 0; /* Inicialmente oculto */
  }

  nav ul li {
    padding: 20px;
    padding-top: 0;
  }

  .menu-icon {
    display: block;
  }

  /* Quando o menu estiver aberto, ajusta a altura */
  nav ul[style*="max-height: 300px"] {
    max-height: 300px;
  }
}
</style>
