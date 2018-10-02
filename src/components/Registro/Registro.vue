<template>
    <v-app light>
        <v-container fluid>
            <v-dialog v-model="dialog" max-width="500px" persistent>
                <v-card>
                    <v-card-title>
                        <v-flex class="text-md-center text-xs-center">
                            <span class="headline">Registrar Usuario</span>
                        </v-flex>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-container fluid class="px-3">
                                <v-layout row wrap>
                                    <v-text-field
                                        label="Nombres"
                                        name="nombres"
                                        v-model="nombres"
                                        :error-messages="nombresErrors"
                                        @input="$v.nombres.$touch()"
                                        @blur="$v.nombres.$touch()"
                                        required
                                    ></v-text-field>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-text-field
                                        label="Apellido"
                                        name="apellidos"
                                        v-model="apellidos"
                                        :error-messages="apellidosErrors"
                                        @input="$v.apellidos.$touch()"
                                        @blur="$v.apellidos.$touch()"
                                        required
                                    ></v-text-field>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-text-field
                                        label="Email"
                                        name="email"
                                        v-model="email"
                                        :error-messages="emailErrors"
                                        @input="$v.email.$touch()"
                                        @blur="$v.email.$touch()"
                                        placeholder="ejemplo@dominio.com"
                                        autocapitalize="off"
                                        required
                                    ></v-text-field>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-select
                                        :items="items"
                                        v-model="selectPrivilegio"
                                        label="Privilegio"
                                        :error-messages="privilegioErrors"
                                        @input="$v.selectPrivilegio.$touch()"
                                        @blur="$v.selectPrivilegio.$touch()"
                                        single-line
                                    ></v-select>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-text-field
                                        label="Contraseña"
                                        name="password"
                                        v-model="password"
                                        :error-messages="passwordErrors"
                                        @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()"
                                        required
                                        type="password"
                                    ></v-text-field>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-text-field
                                        label="Confirmar Contraseña"
                                        name="c_password"
                                        v-model="c_password"
                                        :error-messages="passwordConfirmErrors"
                                        @input="$v.c_password.$touch()"
                                        @blur="$v.c_password.$touch()"
                                        required
                                        type="password"
                                    ></v-text-field>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-flex class="text-md-right text-xs-right">
                            <v-btn color="primary" v-on:click="sendForm" >Enviar</v-btn>
                            <v-btn color="error" v-on:click="dialogEvent(false)">Cancelar</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-btn
                color="pink"
                dark
                fixed
                bottom
                right
                fab
                v-on:click="dialogEvent(true)"
            >
                <v-icon>add</v-icon>
            </v-btn>
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
                    <v-btn flat color="pink" @click.native="snackbar = false">Cerrar</v-btn>
                </v-snackbar>
        </v-container>
    </v-app>
</template>

<script>

import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

import { CONFIG } from "../../config/index";

export default {
  name: "Registro",
  props: {},
  mixins: [validationMixin],
  validations: {
    nombres: {
      required
    },
    apellidos: {
      required
    },
    email: {
      required,
      email
    },
    selectPrivilegio: {
      required
    },
    password: {
      required,
      minLength: minLength(8)
    },
    c_password: {
      sameAsPassword: sameAs("password")
    }
  },
  data() {
    return {
      snackbar: false,
      y: "top",
      x: null,
      mode: "",
      timeout: 6000,
      message: {
        success: true,
        content: ""
      },
      selectPrivilegio: null,
      items: [
          {
              text: "Repartidor",
              value: 4
          }, {
              text: "Vendedor",
              value: 3
          }, {
              text: "Cajero",
              value: 2
          }, {
              text: "Encargado Gral",
              value: 1
          }, {
              text: "Admin",
              value: 0
          }
        ],
      dialog: false,
      nombres: "",
      apellidos: "",
      email: "",
      password: "",
      c_password: ""
    };
  },
  computed: {
    nombresErrors() {
      const errors = [];
      if (!this.$v.nombres.$dirty) return errors;
      !this.$v.nombres.required && errors.push("Nombres requerido.");
      return errors;
    },
    apellidosErrors() {
      const errors = [];
      if (!this.$v.apellidos.$dirty) return errors;
      !this.$v.apellidos.required && errors.push("Apellido requerido.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email requerido.");
      !this.$v.email.email && errors.push("Formato de Email invalido.");
      return errors;
    },
    privilegioErrors() {
        const errors = [];
        if (!this.$v.selectPrivilegio.$dirty) return errors;
        !this.$v.selectPrivilegio.required && errors.push("Seleccione un Privilegio.");
        return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password requerida.");
      !this.$v.password.minLength && errors.push("Maximo 8 caracteres.");
      return errors;
    },
    passwordConfirmErrors() {
      const errors = [];
      if (!this.$v.c_password.$dirty) return errors;
      !this.$v.c_password.sameAsPassword &&
        errors.push("Contraseñas no coinciden.");
      return errors;
    }
  },
  methods: {
    sendForm() {
      let self = this;
      self.$v.$touch();

      if (self.$v.$invalid) {
        console.log("ERROR");
      } else {
        axios({
          method: "POST",
          url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.REGISTRO,
          headers: {
            "Content-Type": "application/json"
          },
          data: {
            nombres: self.nombres,
            apellido: self.apellidos,
            privilegio: self.selectPrivilegio,
            email: self.email,
            password: self.password,
            c_password: self.c_password
          }
        })
          .then(success => {
            self.message.success = success.data.success;
            self.message.content = success.data.content;
            
            self.dialogEvent(false);
            self.handleSnackbar(self.message.success, self.message.content);
            
            setTimeout(function() {
                self.cleanForm();
            }, 500);
          })
          .catch(err => {
              let validationErr = err.response.error;
              let customErr = err.response.data;
              
              if (err.response.status === 400) {
                if (customErr) {
                    self.message.success = customErr.success;
                    self.message.content = customErr.content;

                }
                if (validationErr) {
                    if (validationErr.nombres) {
                        self.message.success = false,
                        self.message.content = validationErr.nombres[0];
                    }
                    if (validationErr.apellido) {
                        self.message.success = false,
                        self.message.content = validationErr.apellido[0];

                    }
                    if (validationErr.email) {
                        self.message.success = false,
                        self.message.content = validationErr.email[0];

                    }
                    if (validationErr.password) {
                        self.message.success = false,
                        self.message.content = validationErr.password[0];

                    }
                    if (validationErr.c_password) {
                        self.message.success = false,
                        self.message.content = validationErr.c_password[0];
                        
                    }
                }
            } else if (err.response.status === 401) {
              self.$localStorage.remove('session');
              self.$router.push({path: '/'});
            } else {
                console.log(err);
            }
            
            self.handleSnackbar(self.message.success, self.message.content);
          });
      }
    },
    dialogEvent(status) {
      this.dialog = status;
      this.$v.$reset();
    },
    handleSnackbar(success, content) {
      let self = this;
      self.message.success = success;
      self.message.content = content;
      self.snackbar = true;

      setTimeout(function() {
        self.snackbar = false;
      }, 3000);
    },
    cleanForm() {
        this.nombres = "";
        this.apellidos = "";
        this.email = "";
        this.password = "";
        this.c_password = "";
    }
  }
};
</script>

<style>
</style>
