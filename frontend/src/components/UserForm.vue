<template>
  <div>
    <input type="file" @change="onFileChange" />
    <button @click="uploadFile" :disabled="!selectedFile">Enviar</button>
    <div v-if="fileName">Arquivo selecionado: {{ fileName }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFile: null,
      fileName: ''
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
        const response = await fetch('URL_DO_SEU_ENDPOINT', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Erro ao fazer upload do arquivo.');
        }

        const result = await response.json();
        console.log('Arquivo enviado com sucesso:', result);
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos opcionais aqui */
</style>
