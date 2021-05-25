<template>
  <div>
    <v-card elevation="0"
            outlined
            @drop.prevent="onDrop($event)"
            @dragover.prevent="dragover = true"
            @dragenter.prevent="dragover = true"
            @dragleave.prevent="dragover = false"
            :class="{ 'grey lighten-2': dragover, 'drop-zone' : !uploadedImage }">
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- remove image button-->
        <v-btn v-if="uploadedImage" icon @click="uploadedImage = null">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text class="mt-0">
        <!--dropzone -->
        <v-row v-if="!imageUrl"
               class="d-flex flex-column"
               dense
               align="center"
               justify="center"
               @click="$refs.uploadInput.$refs.input.click()">
          <v-icon class="" size="60">mdi-cloud-upload</v-icon>
          <p>
            Drop image here, or click to select one.
          </p>
        </v-row>
        <!-- hidden input for upload via click -->
        <v-file-input ref="uploadInput" v-show="false" accept="image/*" @change="onFileSelected"></v-file-input>
        <v-img v-if="imageUrl" :src="imageUrl" max-height="200px" contain></v-img>
      </v-card-text>
    </v-card>
    <v-progress-linear class="my-3" v-if="progress > 0" :value="progress"></v-progress-linear>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
  name: 'ImageUpload',

  data() {
    return {
      dragover: false,
      multiple: false,
      uploadedImage: null,
      progress: 0,
    };
  },

  computed: {
    imageUrl() {
      return this.uploadedImage ? URL.createObjectURL(this.uploadedImage) : null;
    },
  },

  methods: {
    onFileSelected(file) {
      if (Array.isArray(file)) {
        console.error('Only one image can be saved');
      } else {
        this.uploadedImage = file;
      }
    },

    onDrop(e) {
      this.dragover = false;
      if (e.dataTransfer.files.length > 1) {
        console.error('Only one image can be saved');
      } else {
        const file = e.dataTransfer.files[0];
        if (file.type.includes('image')) {
          this.uploadedImage = file;
        } else {
          console.error('Please choose an image');
        }
      }
    },

    async uploadImage() {
      return new Promise((resolve) => {
        if (this.uploadedImage) {
          const storageRef = firebase.storage().ref(`${this.uploadedImage.name}`).put(this.uploadedImage);
          storageRef.on(`state_changed`, snapshot => {
                this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              }, error => {
                console.log(error.message);
              },
              () => {
                this.progress = 100;
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                  console.log(url);
                  resolve(url);
                });
              },
          );
        } else {
          resolve();
        }
      });
    },
  },
};
</script>

<style scoped>
.drop-zone {
  cursor: pointer;
}

progress {
  width: 100%;
}
</style>