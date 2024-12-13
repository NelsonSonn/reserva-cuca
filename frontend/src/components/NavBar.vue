<template>
  <nav>
    <div class="logo">
      <a href="calendar"><img src="../assets/logo-cuca.png" alt="" class="photo-container"></a>

    </div>
    <ul :style="{ maxHeight: menuOpen ? '300px' : '0px' }" id="menuList">
      <li><a href="calendar"><i class="fa-solid fa-home" style="color: #fff;"></i> Inicio</a></li>
      <li><a href="registerroom"><i class="fa-solid  fa-calendar-days" style="color: #fff;"></i> Salas</a></li>
      <li><a href="register"><i class="fa-solid fa-gear" style="color: #fff;"></i> Configurações</a></li>
      <li><a href="/"><i class="fa-solid fa-right-from-bracket" style="color: #fff;"></i> Sair</a></li>
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
  background: #00ffd5;
  position: relative;
  height: 70px;
  margin-top: -8px;
  margin-right: -8px;
  margin-left: -8px;
  border-radius: 10px;
  
}

.logo {
  color: #ffffff;
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
  color: #ffffff;
  transition: color 0.3s;
}

nav ul li a:hover {
  color: #747474; /* Alterar cor do link ao passar o mouse */
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
    right:300px;
    text-align:center;
    flex-direction: column;
    background: #636363;
    gap: 0;
    overflow: hidden;
    transition: all 0.5s ease-in-out; /* Transição suave */
    max-height: 0; /* Inicialmente oculto */
    border-radius: 10px;

  }

  nav ul li {
    padding: 20px;
    padding-top: 0;
    padding-right:0px;

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