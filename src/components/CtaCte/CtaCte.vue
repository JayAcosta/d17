<template>
    <v-app light>
        <v-container fluid>
            <v-card>
                <v-card-title primary-title>
                    <v-flex class="text-md-center text-xs-center">
                        <span class="headline">Cuenta corriente</span>
                    </v-flex>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-layout row wrap>
                            <v-autocomplete
                                @change="changedValue"
                                @selected="selectClient"
                                :items="itemsClients"
                                v-model="selectClient"
                                label="Seleccione un Cliente"
                                single-line
                                item-text="clientName"
                                return-object
                                persistent-hint
                            ></v-autocomplete>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>

            <template v-if="getAccount === true">
                <v-card>
                    <v-card-title>
                        Cuenta corriente
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Buscar"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="tableItems"
                        :search="search"
                        hide-actions
                    >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center text-md-center">{{ props.item.FEC_MOV }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.DES_GIR }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.DEU_CLI }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.MON_GIR }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.SAL }}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                    </v-data-table>
                </v-card>
                <v-form>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 sm3 md3>
                            <v-text-field
                                v-model="minDate"
                                label="Fecha"
                                persistent-hint
                                prepend-icon="event"
                                readonly
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field
                                label="Descripción"
                                v-model="descrip"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2 md2>
                            <v-text-field
                                type="number"
                                label="Deuda"
                                @change="changeIngreso"
                                v-model="ingreso"
                                :disabled="disableIngreso"
                                step="0.01"
                                min="0"
                                prefix="$"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2 md2>
                            <v-text-field
                                type="number"
                                label="Pago"
                                @change="changePago"
                                v-model="pago"
                                :disabled="disablePago"
                                step="0.01"
                                min="0"
                                prefix="$"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2 md2>
                            <v-text-field
                                type="number"
                                label="Saldo"
                                v-model="balance"
                                step="0.01"
                                readonly
                                prefix="$"
                            ></v-text-field>
                        </v-flex>
                        <v-btn
                            outline
                            color="indigo"
                            class="white--text"
                            @click.native="addNewGiro"
                        >
                            Agregar Giro
                        </v-btn>
                        <v-btn
                            outline
                            color="orange"
                            class="white--text"
                            @click.native="initializeData"
                        >
                            Limpiar Campos
                        </v-btn>
                    </v-layout>
                </v-container>
                
                </v-form>
            </template>
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
// Libs
import axios from "axios";
import moment from "moment";

// Config
import { CONFIG } from "../../config/index";

export default {
    beforeMount() {
        let savedSession = (this.$localStorage.get('session') !== undefined)
                                ?
                            JSON.parse(this.$localStorage.get('session')) : '';
        if (savedSession === null) {
            this.$router.push({path: '/'});
        } else {
            this.minDate = moment(new Date()).format("DD/MM/YYYY");
            this.token = savedSession.token;
            this.fillSelectClients();
            
        }
    },
    name: "CtaCte",
    data() {
        return {
            id: 0,
            token: "",
            snackbar: false,
            y: "top",
            x: null,
            mode: "",
            timeout: 6000,
            message: {
                success: true,
                content: ""
            },
            itemsClients: [],
            selectClient: "",
            idClient: 0,
            disablePago: false,
            disableIngreso: false,
            getAccount: "",
            tableItems: [],
            headers: [
                {
                    text: "FECHA",
                    value: "FEC_MOV",
                    sortable: false
                }, {
                    text: "DESCRIPCIÓN",
                    value: "DES_GIR",
                    sortable: false
                }, {
                    text: "DEUDA",
                    value: "DEU_CLI",
                    sortable: false
                }, {
                    text: "PAGO",
                    value: "MON_GIR",
                    sortable: false
                }, {
                    text: "SALDO",
                    value: "SAL",
                    sortable: false
                }
            ],
            search: "",
            date: null,
            dateFormatted: null,
            menu1: false,
            minDate: "",
            pago: 0,
            ingreso: 0,
            balance: 0,
            balanceAnterior: 0,
            total: 0,
            descrip: ""
        }
    },
    methods: {
        fillSelectClients() {
            let self = this;

            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.FILLCLIENT,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.itemsClients.push({
                        id: success.data.rows[i].ID,
                        idb: success.data.rows[i].IDB,
                        idc: success.data.rows[i].IDC,
                        nDoc: success.data.rows[i].N_DOC,
                        clientName: success.data.rows[i].NOM,
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
            
        },
        changedValue(selected) {
            let self = this;
            self.id = selected.id;
            
            if (selected.idb !== null && selected.idc !== null) {
                self.getAccount = true;
                self.tableItems = [];
                self.getAccountMovement();
            } else {
                self.getAccount = true;
                self.tableItems = [];
                self.getAccountMovement();
            }
        },
        addNewAccount() {
            console.log('hola');
        },
        addNewGiro() {
            let self = this;
            let conf = confirm("Esta seguro de agregar este giro?");
            
            if (conf === true) {
                axios({
                    method: "POST",
                    url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.CLIENT+"/"+self.id+CONFIG.SERVICE_URL.MOV,
                    headers: {
                        "Authorization": "Bearer " + self.token
                    },
                    data: {
                        descripcion: self.descrip,
                        ingreso: self.ingreso,
                        pago: self.pago,
                        saldo: self.balance,
                        fecha: self.minDate
                    }
                })
                .then(success => {
                    let response = success.data;
                    self.handleSnackbar(response.success, response.content);
                    self.tableItems = [];
                    self.getAccountMovement();
                    self.initializeData();
                    
                })
                .catch(err => {
                    console.log(err);
                });   
            } else {
                return false;
            }
        },
        getAccountMovement() {
            let self = this;

            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.CLIENT+"/"+self.id+CONFIG.SERVICE_URL.ACCOUNT,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.tableItems.push(success.data.rows[i]);
                    self.balance = success.data.rows[i].SAL;
                    self.balanceAnterior = success.data.rows[i].SAL;
                
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        changePago() {
            let self = this;
            self.balance = self.balanceAnterior;
            self.disableIngreso = true;

            self.balance = (parseFloat(self.balance) - parseFloat(self.pago));

            if (self.pago == 0) {
                self.balance = self.balanceAnterior;
                self.disableIngreso = false;
            }

        },
        changeIngreso() {
            let self = this;
            self.balance = self.balanceAnterior;
            self.disablePago = true;

            self.balance = (parseFloat(self.balance) + parseFloat(self.ingreso));

            if (self.ingreso == 0) {
                self.balance = self.balanceAnterior;
                self.disablePago = false;
            }

        },
        initializeData() {
            this.descrip = '';
            this.ingreso = 0;
            this.pago = 0;
            this.balance = this.balanceAnterior;
            this.disablePago = false;
            this.disableIngreso = false;
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
    }

}
</script>

<style>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
</style>
