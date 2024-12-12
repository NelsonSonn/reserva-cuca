<template>
     <!-- Tabela com todas as salas -->
     <div class="table-containerr">
      <div class="itemsPerPage">
      <h3><span>Items por página</span>
        <select v-model="itensPorPag">
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select></h3>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Categoria:</th>
            <th>CUCA:</th>
            <th>Capacidade:</th>
            <th>Setor:</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in paginatedRooms" :key="room.id">
            <td>{{ room.name }}</td>
            <td>{{ room.roomType }}</td>
            <td>{{ room.cucaName }}</td>
            <td>{{ room.roomCapability }}</td>
            <td>{{ room.responsibleSector }}</td>
            <td>
              <button @click="editRoom(room.id)">Editar</button>
              <button @click="deleteRoom(room.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  <div class="containerr">
  <div class="form-containerr">
    <h1 style="  text-align:center;
">Gerenciamento de Salas</h1>
    <form @submit.prevent="handleSubmit">
      <div class="formulario">
      <div>
        <h3><label for="name">Nome da sala: <br></label>
        <input type="text" v-model="room.name" id="name" required>
      </h3>
      </div>
      <div>
        <h3><label for="roomType">Categoria da Sala:<br></label>
      
        <select v-model="room.roomType" required> 
          <option value="LABORATORY">LABORATÓRIO</option>
          <option value="THEATER">TEATRO</option>
          <option value="CINEMA">CINEMA</option>
          <option value="COWORK">COWORK</option>
          <option value="LIBRARY">BIBLIOTECA</option>
          <option value="STUDIO">ESTÚDIO</option>
          <option value="CINECLUBE">CINECLUBE</option>  
          <option value="MULTIUSO">MULTIUSO</option>
        </select>
      </h3></div>
      
      <div>
      <h3><label for="cucaName">CUCA:<br></label>
        <select v-model="room.cucaName" required style="  width: calc(20% - 20px);
" >
          <option value="PICI">PICI</option>
          <option value="BARRA">BARRA</option>
          <option value="JANGURUSSU">JANGURUSSU</option>
          <option value="MONDUBIM">MONDUBIM</option>
          <option value="JOSE_WALTER">JOSÉ WALTER</option>
        </select>
      </h3></div>
      
      <div>
      <h3><label for="roomCapability">Capacidade da Sala:<br></label>
        <input type="number" required v-model="room.roomCapability" min="0" max="200" style="  width: calc(7% - 20px);
" >
      </h3></div>
      <div>
      <h3><label for="responsibleSector">Setor responsável:<br></label>
        <select v-model="room.responsibleSector" required style="  width: calc(20% - 20px);
" >
          <option value="SPORT">Esporte</option>
          <option value="CULTURE">Cultura</option>
          <option value="TECHNOLOGY">Tecnologia</option>
          <option value="GERENCY">Gerência</option>
          <option value="RH">RH</option>
        </select>
      </h3>
      </div>
      <button type="submit">{{ isEditing ? 'Alterar' : 'Cadastrar' }}</button>
      <div v-if="room.error" class="error">{{ room.error }}</div>
      </div>
      
    </form>
</div>
</div>
 
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      room: {
        id: null,
        name: '',
        roomType: '',
        cucaName: '',
        roomCapability: 0,
        responsibleSector: '',
        error: ''
      },
      rooms: [],
      itensPorPag: 5,
      currentPage: 0,
      isEditing: false
    };
  },
  computed: {
    paginatedRooms() {
      const start = this.currentPage * this.itensPorPag;
      const end = start + this.itensPorPag;
      return this.rooms.slice(start, end);
    }
  },
  methods: {
    handleSubmit() {
      if (this.isEditing) {
        this.updateRoom();
      } else {
        this.roomForm();
      }
    },
    roomForm() {
      this.room.error = ''; 
      const token = localStorage.getItem('token');

      if(!this.room.name || !this.room.roomType || !this.room.cucaName || !this.room.roomCapability || !this.room.responsibleSector) {
        this.room.error = 'Preencha todos os campos.';
        return;
      }
      
      axios.post('http://localhost:3000/api/rooms', this.room, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(res => {
        if (res.status === 201) {
          this.room.error = 'Sala cadastrada com sucesso.';
          // Limpa os campos do formulário
          this.room.id = null;
          this.room.name = '';
          this.room.roomType = '';
          this.room.cucaName = '';
          this.room.roomCapability = 0;
          this.room.responsibleSector = '';
          this.isEditing = false;
          // Atualiza a lista de salas
          this.fetchRooms();
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          this.room.error = 'Sala já cadastrada.';
        } else {
          this.room.error = 'Falha ao cadastrar. Favor tentar novamente.';
        }
      });
    },
    fetchRooms() {
      axios.get('http://localhost:3000/api/rooms', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(res => {
        this.rooms = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    },
    editRoom(id) {
      const room = this.rooms.find(room => room.id === id);
      if(room){
        this.room = { ...room};
        this.isEditing = true;
      }
    },
    updateRoom() {
      const token = localStorage.getItem('token');
      axios.put(`http://localhost:3000/api/rooms/${this.room.id}`, this.room, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(() => {
        this.room.error = 'Sala alterada com sucesso.';

        this.room.id = null;
        this.room.name = '';
        this.room.roomType = '';
        this.room.cucaName = '';
        this.room.roomCapability = 0;
        this.room.responsibleSector = '';
        this.isEditing = false;
        
        this.fetchRooms();
      })
      .catch(err => {
        console.log(err);
      });
    },	
    
    deleteRoom(id) {
      const token = localStorage.getItem('token');
      axios.delete(`http://localhost:3000/api/rooms/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(() => {
        this.fetchRooms();
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.fetchRooms();
  }
};
</script>

<style scoped>

input {
  background-color: #fff;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  width: calc(30% - 50px);
  border-radius: 8px;
  border-bottom: 1px solid gray;
  box-shadow: inset 0 1px 2px black, 0 -1px 1px #fff, 0 1px 0 #fff;
}

input:focus {
  outline: none;
  background-color: #d2d2d2eb;
}

select{background-color: #fff;
  border: none;
  padding: 8px 15px;
  margin: 6px 0;
  width: calc(25% - 20px);
  border-radius: 8px;
  border-bottom: 1px solid gray;
  box-shadow: inset 0 1px 2px black, 0 -1px 1px #fff, 0 1px 0 #fff;
}
h3 {
  color:#4d4d4d;
}
.containerr {
  display: flex;
  justify-content: space-between;
  
}

.form-containerr {
  text-align:left;
  background-color: #00ffea;
  margin-top: 20px;
  width: 45%;
  height: 5%;
  margin-right: 130px;
  padding: 1rem;
  border-radius: 20px;
  color: #000000;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.1);


}


.table-containerr {

  width: 22%;
  margin-bottom:-160px;
  margin-left: 1300px;
  border: 1px solid #00ffea;
  padding: 1rem;
  border-radius: 20px;
  color: #000000;
  
}

.formulario{
  margin-right: 30px;
  margin-bottom: 250px;
}

.error {
  color: red;
}

button {
  border-radius: 20px;
  border: 1px solid;
  background-color: rgb(0, 0, 0);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 0.1s ease-in;
}

button:active {
  transform: scale(0.9);
}

button:focus {
  outline: none;
}

button.invert {
  background-color: transparent;
  border-color: #fff;
}
button:hover {
  color:rgba(169, 169, 169, 1);
}
</style>