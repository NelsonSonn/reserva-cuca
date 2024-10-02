<template>
      <link rel="icon" href="<%= BASE_URL %>favicon.ico">
      <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">
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
   <div class="menu" :class="{ 'small-menu': smallMenu }">      
      <MenuItem
        v-for="(item, index) in menuTree"
        :key="index"
        :data="item.children"
        :label="item.label"
        :icon="item.icon"
        :depth="0"
        :smallMenu="smallMenu"
      />
      <i @click="smallMenu = !smallMenu" class="material-icons">menu</i>
    </div>
  </template>
  
  <script>
  import MenuItem from './MenuItem.vue';
  
  export default {
    name: 'recursive-menu',
    data: () => ({
      smallMenu: false,
      menuTree: [
        {
          label: "Inicio",
          icon: "home",
          children: [
            {
              label: "level 1.1",
              children: [
                {
                  label: "level 1.1.1",
                  children: [
                    {
                      label: "level 1.1.1.1"
                    }
                  ]
                }
              ]
            },
            {
              label: "level 1.2"
            }
          ]
        },
        {
          label: "Plataforma",
          icon: "dashboard",
          children: [
            {
              label: "level 2.1",
            },
            {
              label: "level 2.2"
            },
            {
              label: "level 2.3"
            }
          ]
        },
        {
          label: "Configurações",
          icon: "settings"
        }
      ]
    }),
    components: {
      MenuItem
    }
  }
  </script>
  
  <style scoped>
  .menu {
  position: fixed;
  height: 100vh;
  width: 240px;
  left: 0;
  top: 0;
  border-right: 1px solid #000000;
  transition: all 0.3s ease;
  overflow: auto;
}

.menu i {
  position: fixed;
  left: 250px;
  font-size: 20px;
  top: 15px;
  user-select: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu.small-menu {
  overflow: inherit;
  width: 60px;
  padding-top: 50px;
}

.menu.small-menu i {
  left: 20px;
}

  </style>