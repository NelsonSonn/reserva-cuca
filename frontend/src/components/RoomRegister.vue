<template>
    <div>
        <h1>Cadastro de Sala</h1>
        <form @submit.prevent="roomForm">
            <div>
                <label for="name">Nome</label>
                <input type="text" v-model="name" required />
            </div>
            <div>
                <label for="roomType">Categoria da sala</label>
                <select v-model="roomType" required>
                    <option value="LABORATORY">Laboratório</option>
                    <option value="THEATER">Teatro</option>
                    <option value="CINEMA">Cinema</option>
                    <option value="COWORK">Cowork</option>
                    <option value="LIBRARY">Biblioteca</option>
                    <option value="STUDIO">Estúdio</option>
                    <option value="CINECLUBE">Cineclube</option>
                    <option value="MULTIUSO">Multiuso</option>
                </select>
            </div>
           
            <div>
                <label for="cucaName">CUCA</label>
                <select v-model="cucaName" required>
                    <option value="BARRA">Barra</option>
                    <option value="PICI">Pici</option>
                    <option value="MONDUBIM">Mondubim</option>
                    <option value="JOSE_WALTER">José Walter</option>
                    <option value="JANGURUSSU">Jangurussu</option>
                </select>
            </div>
            <div>
                <label for="roomCapability">Room Capability:</label>
                <input type="number" v-model="roomCapability" min="0" max="200" required />
            </div>
            <div>
                <label for="responsibleSector">Setor responsável</label>
                <select v-model="responsibleSector" required>
                    <option value="SPORT">Esporte</option>
                    <option value="CULTURE">Cultura</option>
                    <option value="TECHNOLOGY">Tecnologia</option>
                    <option value="GERENCY">Gerência</option>
                    <option value="RH">RH</option>
                </select>
            </div>
            <button type="submit">Cadastrar</button>
            <div v-if="error" class="error">{{ error }}</div>
        </form>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            roomType: '',
            cucaName: '',
            roomCapability: 0,
            responsibleSector: '',
            error: ''
        };
    },
    methods: {
        roomForm() {
        this.error = ''; 
        let room = {
        name: this.name,
        cucaName: this.cucaName,
        roomType: this.roomType,
        roomCapability: this.roomCapability,
        responsibleSector: this.responsibleSector
      };
      axios.post('http://localhost:3000/api/rooms', room, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => {
          if (res.status === 201) {
            this.error = 'Sala cadastrada com sucesso.';
            this.name = '';
            this.roomType = '';
            this.cucaName = '';
            this.roomCapability = 0;
            this.responsibleSector = '';
          }
        })
        .catch(err => {
          if (err.response.status === 400) {
            this.error = 'Sala já cadastrada.';
          } else if(err.response.status === 500) {
            this.error = 'Falha ao cadastrar. Favor tentar novamente.';
          }
        });
    },
  },
};
</script>

<style scoped>
.error {
    color: red;
}
</style>