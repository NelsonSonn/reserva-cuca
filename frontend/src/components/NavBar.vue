<template>
  <nav>
    <div class="logo">
      <a href="calendar"><img src="../assets/logo-cuca.png" alt="" class="photo-container"></a>

    </div>
    <ul :style="{ maxHeight: menuOpen ? '300px' : '0px' }" id="menuList">
      <h3><li><a href="calendar"><i class="fa-solid fa-home" style="color: #000;"></i> Inicio</a></li></h3>
      <h3><li><a href="registerroom"><i class="fa-solid  fa-calendar-days" style="color: #000;"></i> Salas</a></li></h3>
      <h3><li><a href="register"><i class="fa-solid fa-gear" style="color: #000;"></i> Configurações</a></li></h3>
      <h3><li><a href="/"><i class="fa-solid fa-right-from-bracket" style="color: #000;"></i> Sair</a></li></h3>
    </ul>
    <div class="menu-icon" @click="toggleMenu">
      <i class="fa-solid fa-bars" style="color: #000;"></i>
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
  box-shadow: 0 3px 10px rgba(133, 132, 132, 0.2), 0 10px 10px rgba(0, 0, 0, 0.1);
  background: linear-gradient(to right, #eaeaea, #3bb4b0);
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
  color: #313131;
  transition: color 0.3s;
}

nav ul li a:hover {
  color: #ffffff; /* Alterar cor do link ao passar o mouse */
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
    background: #008db8;
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