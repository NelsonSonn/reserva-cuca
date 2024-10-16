<template>
      <link rel="icon" href="<%= BASE_URL %>favicon.ico">
      <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined" rel="stylesheet">  
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
    <center><VDatePicker is-dark="system" v-model.range="range" mode="dateTime" class="dark-theme"/></center>

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
          icon: "settings",
          children:{

          }
        },{
          label:"Sair",
          icon: "logout",
        
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
  background-color: rgb(5, 184, 255);
    
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