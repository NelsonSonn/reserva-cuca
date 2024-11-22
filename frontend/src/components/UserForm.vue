<template>
  <NavBar />

<div>

    <h2>Gerenciamento de Arquivos</h2>

    <!-- Formulário para upload -->
    <div>
      <input type="file" @change="handleFileUpload" />
      <button @click="uploadFile" :disabled="!selectedFile">Upload</button>
    </div>

    <!-- Lista de arquivos -->
    <div v-if="files.length">
      <h3>Arquivos:</h3>
      <ul>
        <li v-for="file in files" :key="file.id">
          <span>{{ file.name }}</span>
          <button @click="viewFile(file.id)">Visualizar</button>
          <button @click="deleteFile(file.id)">Excluir</button>
          <button @click="editFile(file.id)">Editar</button>
        </li>
      </ul>
    </div>

    <!-- Exibição do arquivo -->
    <div v-if="viewingFile">
      <h3>Visualizando Arquivo: {{ currentFile.name }}</h3>
      <pre>{{ currentFile.content }}</pre>
      <button @click="closeFileView">Fechar</button>
    </div>

    <!-- Edição de arquivo -->
    <div v-if="editingFile">
      <h3>Editando Arquivo: {{ currentFile.name }}</h3>
      <textarea v-model="currentFile.content"></textarea>
      <button @click="saveFileEdit">Salvar</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
  </div>

</template>

<script>
import NavBar from './NavBar.vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      files: [],  // Lista de arquivos
      selectedFile: null, // Arquivo selecionado para upload
      currentFile: null, // Arquivo sendo visualizado ou editado
      viewingFile: false, // Flag para visualização
      editingFile: false, // Flag para edição
    };
  },
  methods: {
    // Carregar arquivos (simulação de backend)
    loadFiles() {
      this.files = JSON.parse(localStorage.getItem('files')) || [];
    },

    // Upload de arquivo
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },

    uploadFile() {
      if (this.selectedFile) {
        const newFile = {
          id: Date.now(),
          name: this.selectedFile.name,
          content: 'Conteúdo do arquivo carregado', // Simulação de conteúdo
        };
        this.files.push(newFile);
        localStorage.setItem('files', JSON.stringify(this.files));
        this.selectedFile = null;
      }
    },

    // Visualizar arquivo
    viewFile(id) {
      const file = this.files.find(f => f.id === id);
      this.currentFile = file;
      this.viewingFile = true;
    },

    // Fechar visualização
    closeFileView() {
      this.viewingFile = false;
      this.currentFile = null;
    },

    // Editar arquivo
    editFile(id) {
      const file = this.files.find(f => f.id === id);
      this.currentFile = { ...file };
      this.editingFile = true;
    },

    // Salvar edição de arquivo
    saveFileEdit() {
      const index = this.files.findIndex(f => f.id === this.currentFile.id);
      if (index !== -1) {
        this.files[index] = this.currentFile;
        localStorage.setItem('files', JSON.stringify(this.files));
        this.cancelEdit();
      }
    },

    // Cancelar edição de arquivo
    cancelEdit() {
      this.editingFile = false;
      this.currentFile = null;
    },

    // Excluir arquivo
    deleteFile(id) {
      this.files = this.files.filter(f => f.id !== id);
      localStorage.setItem('files', JSON.stringify(this.files));
    },
  },
  created() {
    this.loadFiles(); // Carregar arquivos ao inicializar o componente
  },
};
</script>

<style scoped>
/* Estilos simples */
h2 {
  color: #333;
}

button {
  margin-left: 10px;
}

textarea {
  width: 100%;
  height: 150px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}
</style>
