<template>
    <v-app light>
        <v-container fluid>

            <v-dialog v-model="dialog" max-width="500px" persistent>
                <v-card>
                    <v-card-title>
                        <v-flex class="text-md-center text-xs-center">
                            <span class="headline">Cambiar Contraseña</span>
                        </v-flex>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-container fluid class="px-3">
                                <v-layout row wrap>
                                    <v-text-field
                                        label="Verificar Contraseña"
                                        v-model="password"
                                        required
                                        type="password"
                                    ></v-text-field>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-container class="text-xs-center text-md-center">
                                        <v-btn v-on:click="" color="success">Verificar</v-btn>
                            </v-container>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-flex class="text-md-right text-xs-right">
                            <!-- <v-btn color="primary" v-on:click="" >Confirmar</v-btn> -->
                            <v-btn color="error" v-on:click="dialog = !dialog">Cancelar</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-card width="500">
                <v-card-title>
                    <v-flex class="text-md-center text-xs-center">
                        <v-avatar size="80" color="teal">
                            <span class="white--text headline">{{fullnameLetter}}</span>
                        </v-avatar>
                    </v-flex>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-container fluid class="px-3">
                            <v-layout row wrap>
                                <v-text-field
                                    label="Nombres"
                                    v-model="firstname"
                                    :readonly="true"
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-text-field
                                    label="Apellido"
                                    v-model="lastname"
                                    :readonly="true"
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-text-field
                                    label="Email"
                                    v-model="email"
                                    :readonly="true"
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-text-field
                                    label="Privilegio"
                                    v-model="profile"
                                    :readonly="true"
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-container class="text-xs-center text-md-center">
                                    <v-btn v-on:click="showBarcode()" outline color="primary">Ver Código de Barras</v-btn>
                                </v-container>
                            </v-layout>
                            <v-layout row wrap>
                            <v-container class="text-xs-center text-md-center">
                                    <v-btn v-on:click="openModalChangePasswd()" outline color="orange accent-4">Cambiar Contraseña</v-btn>
                            </v-container>
                            </v-layout>
                        </v-container>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>

import axios from "axios";
import atob from "atob";
import { CONFIG } from "../../config/index";

export default {
    beforeMount() {
        let savedSession = (this.$localStorage.get('session') !== undefined) ? JSON.parse(this.$localStorage.get('session')) : '';
            if (savedSession === null) {
                this.$router.push({path: '/'});
            } else {
                this.token = savedSession.token;
                this.fullnameLetter = savedSession.user.nombres.charAt(0) + "" + savedSession.user.apellido.charAt(0);
                this.firstname = savedSession.user.nombres;
                this.lastname =  savedSession.user.apellido;
                this.email = savedSession.user.email;
                
                let decodePriv = JSON.parse(atob(savedSession.user.credentials))[0].right;
                let privilege = "";

                if (decodePriv == 0) {
                    privilege = "Administrador";
                } else if (decodePriv == 1) {
                    privilege = "Encargado Gral";
                } else if (decodePriv == 2) {
                    privilege = "Cajero";
                } else if (decodePriv == 3) {
                    privilege = "Vendedor";
                } else {
                    privilege = "Repartidor";
                }
                
                this.profile = privilege;
            }
    },
    name: "Perfil",
    props: {},
    data() {
        return {
            id: 0,
            token: "",
            firstname: "",
            lastname: "",
            email: "",
            profile: "",
            fullnameLetter: "",
            dialog: false,
            password: "",
            newPassword: "",
            newPasswordComfirm: ""
        }
    },
    methods: {
        openModalChangePasswd() {
            let self = this;

            self.dialog = !self.dialog;
        },
        verifyPassword() {
            let self = this;
        }
    }
}
</script>

<style>

</style>
