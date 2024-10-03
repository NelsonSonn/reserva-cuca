<template>
  <div class="container">
    <h1>Gerenciador de Arquivos</h1>
    <div class="file-upload">
      <input type="file" @change="onFileChange" />
      <button @click="uploadFile" :disabled="!selectedFile">Enviar</button>
      <div v-if="fileName" class="file-name">Arquivo selecionado: {{ fileName }}</div>
    </div>

    <h2>Arquivos Enviados</h2>
    <ul class="file-list">
      <li v-for="file in files" :key="file.id" class="file-item">
        {{ file.name }}
        <div class="file-actions">
          <button @click="deleteFile(file.id)">Deletar</button>
          <button @click="selectFileForUpdate(file)">Atualizar</button>
        </div>
      </li>
    </ul>

    <input v-if="fileToUpdate" type="file" @change="onFileChangeForUpdate" />
    <button v-if="fileToUpdate" @click="updateFile" :disabled="!selectedFile">Atualizar Arquivo</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      fileName: '',
      files: [],
      fileToUpdate: null,
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.fileName = file.name;
      }
    },
    async uploadFile() {
      if (!this.selectedFile) return;

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await fetch('URL_DO_SEU_ENDPOINT_UPLOAD', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Erro ao fazer upload do arquivo.');
        }

        const result = await response.json();
        console.log('Arquivo enviado com sucesso:', result);
        this.fetchFiles(); // Atualiza a lista de arquivos
      } catch (error) {
        console.error('Erro:', error);
      }
    },
    async fetchFiles() {
      try {
        const response = await fetch('URL_DO_SEU_ENDPOINT_LISTAR');
        if (!response.ok) {
          throw new Error('Erro ao buscar arquivos.');
        }
        this.files = await response.json();
      } catch (error) {
        console.error('Erro:', error);
      }
    },
    async deleteFile(fileId) {
      try {
        const response = await fetch(`URL_DO_SEU_ENDPOINT_DELETAR/${fileId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar o arquivo.');
        }

        console.log('Arquivo deletado com sucesso');
        this.fetchFiles(); // Atualiza a lista de arquivos
      } catch (error) {
        console.error('Erro:', error);
      }
    },
    selectFileForUpdate(file) {
      this.fileToUpdate = file;
      this.fileName = file.name; // Exibe o nome do arquivo atual
    },
    onFileChangeForUpdate(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    },
    async updateFile() {
      if (!this.selectedFile || !this.fileToUpdate) return;

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await fetch(`URL_DO_SEU_ENDPOINT_ATUALIZAR/${this.fileToUpdate.id}`, {
          method: 'PUT',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Erro ao atualizar o arquivo.');
        }

        console.log('Arquivo atualizado com sucesso');
        this.fetchFiles(); // Atualiza a lista de arquivos
        this.fileToUpdate = null; // Reseta o arquivo para atualização
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  },
  mounted() {
    this.fetchFiles(); // Carrega arquivos ao iniciar o componente
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
}

.file-upload {
  margin-bottom: 20px;
}

.file-name {
  margin-top: 10px;
  font-weight: bold;
}

.file-list {
  list-style-type: none;
  padding: 0;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #fff;
}

.file-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
