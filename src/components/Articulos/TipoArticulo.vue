<template>
  <v-app light>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
            <v-btn
              fixed
              dark
              fab
              bottom
              right
              color="blue"
              v-on:click="dialog = !dialog"
            >
              <v-icon>add</v-icon>
            </v-btn>
      </v-flex>
      <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                    <v-card-title>
                        <v-toolbar color="teal lighten-3" dark>
                            <v-flex justify-center>
                                <v-toolbar-title>Modulo Tipos Articulos</v-toolbar-title>
                            </v-flex>
                        </v-toolbar>
                    </v-card-title>
                    <v-card-text>
						<v-container fluid class="px-3">
							<v-form>
                <v-layout row wrap>
									<v-text-field
										label="Nombre"
										name="nombre"
										v-model="nombre"
										required
									></v-text-field>
								</v-layout>
							</v-form>
							<!-- Existe -->
							</v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-flex class="text-md-right text-xs-right">
                          <v-btn color="primary" v-on:click="sendForm">Enviar</v-btn>
                          <v-btn color="error" v-on:click="dialog = !dialog">Cancelar</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-snackbar
              :timeout="timeout"
              :top="y === 'top'"
              :bottom="y === 'bottom'"
              :right="x === 'right'"
              :left="x === 'left'"
              :multi-line="mode === 'multi-line'"
              :vertical="mode === 'vertical'"
              v-model="snackbar"
            >
          {{ message.content }}
          <v-btn flat color="pink" @click.native="showSnackbar = false">Close</v-btn>
          </v-snackbar>
    </v-layout>
  </v-app>
</template>

<script>
import axios from "axios";
import { CONFIG } from "../../config/index";

export default {
  name: "TipoArticulo",
  props: {},
  data() {
    return {
      nombre: "",
      message: {
        success: true,
        content: ""
      },
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      dialog: false
    };
  },
  methods: {
    sendForm() {
      let self = this;
      if (self.nombre !== "") {

        axios({
          method: "POST",
          url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.TIPOSARTICULOSADD,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            nombre: self.nombre
          }
        })
          .then(response => {
              self.message.success = response.data.success;
              self.message.content = response.data.content;

              self.dialog = false;

              self.nombre = '';

              this.handleSnackbar(self.message.success, self.message.content);
          })
          .catch(error => {
            let validationErr = error.response.data.error;
            if (error.response.status === 400) {
              if (validationErr.nombre) {
                self.message.success = false;
                self.message.content = validationErr.nombre[0];
              }
            } else if (error.response.status === 409) {
                self.message.success = error.response.data.success;
                self.message.content = error.response.data.content;
            } else {
              console.log(error);
            }
            this.handleSnackbar(self.message.success, self.message.content);
          });
      } else {
        this.handleSnackbar(false, "Campos Vacios.");
      }
    },
    cleanForm() {
        let self = this;
        self.nombre = '';
        self.showDialog = false;

    },
    handleSnackbar(success, content) {
      let self = this;
      self.message.success = success;
      self.message.content = content;
      self.snackbar = true;

      setTimeout(function() {
        self.snackbar = false;
      }, 2000);
    }
  }
};
</script>

<style>
</style>
