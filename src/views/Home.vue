<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex">
        <v-spacer></v-spacer>
        <v-btn @click="openDlgNewGearItem">Add item</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <gear-grid ref="gearDataGrid"></gear-grid>
      </v-col>
    </v-row>

    <!-- add gear item dialog-->
    <v-dialog
        v-model="dlgAddGearItem"
        width="500">
      <v-card>
        <v-card-title>
          Add a new item to your gear list
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="frmNewGearItem" v-model="newGearItemValid">
            <!-- brand -->
            <v-text-field
                v-model="newGearItem.brand"
                label="Brand"
                required
                :rules="[v => !!v || 'Please enter a brand']"
            ></v-text-field>
            <!-- model -->
            <v-text-field
                v-model="newGearItem.model"
                label="Model"
                required
                :rules="[v => !!v || 'Please enter a model']"
            ></v-text-field>
            <!-- type -->
            <v-radio-group
                v-model="newGearItem.type"
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
                v-model="newGearItem.technology"
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
          <v-btn class="primary" :disabled="!newGearItemValid" @click="saveNewGearItem">Save</v-btn>
          <v-btn text @click="dlgAddGearItem = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </v-container>
</template>

<script>

import GearGrid from '@/components/GearGrid.vue';
import db from '@/fb.js';

export default {
  name: 'Home',
  data() {
    return {
      dlgAddGearItem: false,
      newGearItemValid: false,
      newGearItem: this.getNewGearItemTemplate(),
    };
  },

  methods: {
    openDlgNewGearItem() {
      this.newGearItem = this.getNewGearItemTemplate();
      if (this.$refs.frmNewGearItem) this.$refs.frmNewGearItem.reset();
      this.dlgAddGearItem = true;
    },

    saveNewGearItem() {
      // TODO: check if exists
      // TODO: add loader
      if (this.newGearItemValid) {
        this.newGearItem.added = new Date();
        db.collection('gear').add(this.newGearItem).then((response) => {
          console.log(response);
          console.log('added to db');
          this.$refs.gearDataGrid.getGearData();
          this.dlgAddGearItem = false;
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

  components: { GearGrid },
};
</script>
