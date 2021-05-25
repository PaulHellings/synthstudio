<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex">
        <v-spacer></v-spacer>
        <v-btn @click="openDlgGearItem(null)">Add item</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <gear-grid ref="gearDataGrid" @edit="openDlgGearItem" @delete="onDeleteClick"></gear-grid>
      </v-col>
    </v-row>

    <!-- add gear item dialog-->
    <v-dialog
        v-model="dlgAddGearItem"
        width="500">
      <v-card>
        <v-card-title>
          Gear item
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <image-upload ref="imageUpload" v-if="dlgAddGearItem" class="my-6"></image-upload>
          <v-form ref="frmGearItem" v-model="gearItemValid">
            <!-- brand -->
            <v-text-field
                v-model="gearItem.brand"
                label="Brand"
                required
                :rules="[v => !!v || 'Please enter a brand']"
            ></v-text-field>
            <!-- model -->
            <v-text-field
                v-model="gearItem.model"
                label="Model"
                required
                :rules="[v => !!v || 'Please enter a model']"
            ></v-text-field>
            <!-- type -->
            <v-radio-group
                v-model="gearItem.type"
                mandatory>
              <template v-slot:label>
                <div class="text-subtitle-1">Type of gear</div>
              </template>
              <v-radio
                  label="Synthesizer"
                  value="synthesizer"
              ></v-radio>
              <v-radio
                  label="Drum machine"
                  value="drummachine"
              ></v-radio>
              <v-radio
                  label="Midi controller"
                  value="midicontroller"
              ></v-radio>
            </v-radio-group>
            <!-- technology -->
            <v-radio-group
                v-model="gearItem.technology"
                mandatory>
              <template v-slot:label>
                <div class="text-subtitle-1">Technology used</div>
              </template>
              <v-radio
                  label="Analog"
                  value="analog"
              ></v-radio>
              <v-radio
                  label="Digital"
                  value="digital"
              ></v-radio>
              <v-radio
                  label="Virtual analog"
                  value="virtualanalog"
              ></v-radio>
            </v-radio-group>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer/>
          <v-btn class="primary" :disabled="!gearItemValid" @click="onSaveClick">Save</v-btn>
          <v-btn text @click="dlgAddGearItem = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </v-container>
</template>

<script>

import GearGrid from '@/components/GearGrid.vue';
import db from '@/fb.js';
import ImageUpload from '@/components/ImageUpload.vue';

export default {
  name: 'Home',
  data() {
    return {
      dlgAddGearItem: false,
      gearItemValid: false,
      gearItem: this.getNewGearItemTemplate(),
    };
  },

  methods: {
    openDlgGearItem(item) {
      if (this.$refs.frmGearItem) this.$refs.frmGearItem.reset();
      // next tick so resetting form is complete
      this.$nextTick(() => {
        // set item to edit, or create new one if applicable
        this.gearItem = item ? JSON.parse(JSON.stringify(item)) : this.getNewGearItemTemplate();
        this.dlgAddGearItem = true;
      });
    },

    onSaveClick() {
      // TODO: add loader
      if (this.gearItemValid) {
        if (this.gearItem.id) {
          // exists so save edits
          this.updateGearItem();
        } else {
          // does not exist, save as new
          this.saveNewGearItem();
        }
      }
    },

    // initiate image upload and set url if applicable
    async getImageUrlFromUpload(){
      const imageUrl = await this.$refs.imageUpload.uploadImage();
      if (imageUrl) this.gearItem.url = imageUrl;
    },

    async saveNewGearItem() {
     await this.getImageUrlFromUpload();
      // add 'added' prop
      this.gearItem.added = new Date();
      // save to db
      db.collection('gear').add(this.gearItem).then(() => {
        this.$store.dispatch('asyncGetGear');
        this.dlgAddGearItem = false;
      }).catch((error) => {
        console.log('Error adding new gear: ', error);
      });
    },

    async updateGearItem() {
      await this.getImageUrlFromUpload();
      db.collection('gear').doc(this.gearItem.id).get()
          .then(doc => {
            if (doc.exists) {
              doc.ref.update(this.gearItem)
                  .then(() => {
                    this.$store.dispatch('asyncGetGear');
                    this.dlgAddGearItem = false;
                  });
            }
          })
          .catch((error) => {
            console.log('Error deleting gear ', error);
          });
    },

    // TODO: delete via vuetify confirm dialog instead of browsers own
    onDeleteClick(item) {
      if (confirm(`Are you sure you want to delete ${item.model}`)) {
        db.collection('gear').doc(item.id).get()
            .then(doc => {
              if (doc.exists) {
                doc.ref.delete()
                    .then(() => {
                      this.$store.dispatch('asyncGetGear');
                    });
              }
            })
            .catch((error) => {
              console.log('Error deleting gear ', error);
            });
      }
    },

    getNewGearItemTemplate() {
      return {
        brand: null,
        model: null,
        technology: null,
        type: null,
        added: null,
      };
    },
  },

  components: {
    ImageUpload,
    GearGrid,
  },
};
</script>
