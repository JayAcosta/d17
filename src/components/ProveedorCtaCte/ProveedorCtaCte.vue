<template>
    <v-app light>
        <v-container fluid>
            <v-dialog v-model="dialog" max-width="800px" persistent>
                <v-card>
                    <v-card-title>
                        <span class="headline">Detalle del Giro</span>
                    </v-card-title>
                    <v-card-text>
                        <template v-for="slot in timeslots">
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex xs12 sm2 md2>
                                        <v-text-field
                                            label="Cantidad"
                                            outline
                                            v-model="slot.cant"
                                            readonly
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field
                                            label="Descripción"
                                            outline
                                            v-model="slot.descrip"
                                            readonly
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm2 md2>
                                        <v-text-field
                                            label="Precio"
                                            outline
                                            v-model="slot.price"
                                            readonly
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm2 md2>
                                        <v-text-field
                                            label="Subtotal"
                                            outline
                                            v-model="slot.subtotal"
                                            readonly
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <!-- <input type="text" name="performances" v-model="slot.timestamp" placeholder="index"> -->
                            </v-container>
                        </template>
                        <v-container v-if="seeDate === false" grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12 sm2 md2>
                                    <v-text-field
                                        type="number"
                                        label="Cant"
                                        v-model="cant"
                                        min="1" 
                                        required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field
                                        label="Descripción"
                                        v-model="descripGiro"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm2 md2>
                                    <v-text-field
                                        type="number"
                                        label="Precio"
                                        min="0"
                                        v-model="price"
                                        @change="changeCantXPrecio"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm2 md2>
                                    <v-text-field
                                        type="number"
                                        label="Subtotal"
                                        v-model="subtotal"
                                        readonly
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-container v-if="addItemGiro === true">
                            <v-btn dark large fab color="primary" v-on:click="addAnother">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-container>
                        <v-container v-else>

                        </v-container>
                        <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex v-if="seeDate === false" xs12 sm2 md8>
                                <v-radio-group v-model="radios" row>
                                    <v-radio label="Pago" value="pago"></v-radio>
                                    <v-radio label="Deuda" value="deuda"></v-radio>
                                </v-radio-group>
                            </v-flex>
                            <v-flex v-else-if="seeDate === true" xs12 sm2 md8>
                                <v-text-field
                                    label="Fecha"
                                    v-model="detailDate"
                                    outline
                                    readonly
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm2 md2>
                                <v-text-field
                                    label="N# factura"
                                    v-model="nFactura"
                                    outline
                                    :readonly="disabled"
                                    required
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm2 md2>
                                <v-text-field
                                    label="Total"
                                    v-model="total"
                                    outline
                                    readonly
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card-text>
                <v-card-actions v-if="seeDate === false">
                    <v-container v-if="okGiro === true">
                        <v-flex class="text-md-right text-xs-right">
							<v-btn color="blue darken-1" flat v-on:click="saveDetail" >OK</v-btn>
							<v-btn color="red darken-1" flat @click.native="cancelDetail">Cancelar</v-btn>
                        </v-flex>
                    </v-container>
                    <v-container v-else-if="okGiro === false">
                    <v-flex class="text-md-right text-xs-right">
                        <v-btn color="red darken-1" flat @click.native="cancelDetail">Cancelar</v-btn>
                    </v-flex>
                    </v-container>
                </v-card-actions>
                <v-card-actions v-else-if="seeDate === true">
                    <v-flex class="text-md-right text-xs-right">
                        <v-btn color="red darken-1" flat @click.native="closeDetail">Cancelar</v-btn>
                    </v-flex>
                </v-card-actions>
            </v-card>
        </v-dialog>
            <v-card>
                <v-card-title primary-title>
                    <v-flex class="text-md-center text-xs-center">
                        <span class="headline">Cuenta Corriente Proveedor</span>
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
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="seeDetail(props.item)">
                                <v-icon color="blue">more</v-icon>
                            </v-btn>
                        </td>
                        <td class="text-xs-center text-md-center">{{ props.item.FEC_MOV }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.N_FAC }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.DES_GIR_PRO }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.DEU_PRO }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.MON_PRO }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.SAL_PRO }}</td>
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
                                readonly
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
                                readonly
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
                            color="green"
                            class="white--text"
                            @click.native="addDetail"
                        >
                            Agregar Detalle
                        </v-btn>
                        <v-btn
                            outline
                            color="indigo"
                            class="white--text"
                            @click.native="addNewGiro"
                        >
                            Agregar Giro
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
            this.fillSelectProviders();
        }
    },
    name: "ProveedorCtaCte",
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
                    text: "OPERACIONES",
                    sortable: false
                }, {
                    text: "FECHA",
                    value: "FEC_MOV",
                    sortable: false
                }, {
                    text: "N# FACTURA",
                    value: "N_FAC",
                    sortable: false
                },{
                    text: "DESCRIPCIÓN",
                    value: "DES_GIR_PRO",
                    sortable: false
                }, {
                    text: "DEUDA",
                    value: "DEU_PRO",
                    sortable: false
                }, {
                    text: "PAGO",
                    value: "MON_PRO",
                    sortable: false
                }, {
                    text: "SALDO",
                    value: "SAL_PRO",
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
            descrip: "",
            dialog: false,
            timeslots: [],
            cant: 0,
            price: 0,
            descripGiro: "",
            subtotal: 0,
            addItemGiro: false,
            okGiro: false,
            radios: "pago",
            nFactura: "",
            seeDate: false,
            detailDate: "",
            itemsStr: "",
            disabled: false

        }
    },
    methods: {
        addAnother: function() {
            let self = this;
            
            self.timeslots.push({
                cant: self.cant,
                descrip: self.descripGiro,
                price: self.price,
                subtotal: self.subtotal
            });

            self.total = (parseFloat(self.total) + parseFloat(self.subtotal));

            self.okGiro = true;
            self.cant = 0;
            self.descripGiro = "";
            self.price = 0;
            self.subtotal = 0;

            self.addItemGiro = false;
    },
        fillSelectProviders() {
            let self = this;

            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.FILLPROVIDER,
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
                if (err.response.status === 401) {
                    self.$localStorage.remove('session');
                    self.$router.push({path: '/'});
                } else {
                    console.log(err);
                }
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
        addNewGiro() {
            let self = this;
            
            let conf = confirm("Esta seguro de agregar este Giro");
            
            if (conf === true) {
                axios({
                    method: "POST",
                    url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.PROVIDER+"/"+self.id+CONFIG.SERVICE_URL.MOV,
                    headers: {
                        "Authorization": "Bearer " + self.token
                    },
                    data: {
                        descripcion: self.descrip,
                        ingreso: self.ingreso,
                        pago: self.pago,
                        saldo: self.balance,
                        fecha: self.minDate,
                        detalle: JSON.stringify(self.timeslots),
                        total: self.total,
                        nFactura: self.nFactura
                    }
                })
                .then(success => {
                    let response = success.data;
                    
                    self.handleSnackbar(response.success, response.content);
                    self.tableItems = [];
                    self.timeslots = [];
                    self.nFactura = "";
                    self.total = 0;
                    self.initializeData();
                    self.getAccountMovement();
                })
                .catch(err => {
                    let validationErr = err.response.data.errors;
                    
                    if (err.response.status === 400) {
                        if (validationErr.descripcion) {
                            self.message.success = false;
                            self.message.content = validationErr.descripcion[0];
                        }
                        if (validationErr.ingreso) {
                            self.message.success = false;
                            self.message.content = validationErr.ingreso[0];
                        }
                        if (validationErr.pago) {
                            self.message.success = false;
                            self.message.content = validationErr.pago[0];
                        }
                        if (validationErr.saldo) {
                            self.message.success = false;
                            self.message.content = validationErr.saldo[0];
                        }
                        if (validationErr.nFactura) {
                            self.message.success = false;
                            self.message.content = validationErr.nFactura[0];
                        }
                } else if(err.response.status === 401) {
                    self.$localStorage.remove('session');
                    self.$router.push({path: '/'});
                } else {
                    self.message.success = err.response.data.success;
                    self.message.content = err.response.data.content;
                }
                self.handleSnackbar(self.message.success, self.message.content);
                });
            } else {
                return false;
            }
        },
        getAccountMovement() {
            let self = this;
            
            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.PROVIDER+"/"+self.id+CONFIG.SERVICE_URL.ACCOUNT,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.tableItems.push(success.data.rows[i]);
                    
                    self.balance = success.data.rows[i].SAL_PRO;
                    self.balanceAnterior = success.data.rows[i].SAL_PRO;
                
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    self.$localStorage.remove('session');
                    self.$router.push({path: '/'});
                } else {
                    console.log(err);
                }
            });
        },
        changeCantXPrecio() {
            let self = this;

            self.subtotal = (parseFloat(self.price) * parseFloat(self.cant));

            if (self.subtotal !== 0) {
                self.addItemGiro = true;
            }
            
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
        saveDetail() {
            let self = this;

            let conf = confirm("Esta seguro de salvar este Detalle?");

            if (conf === true) {
                if (self.radios === "pago") {
                    self.pago = self.total;
                    self.dialog = !self.dialog;

                    self.balance = self.balanceAnterior;
                    self.disableIngreso = true;

                    self.balance = (parseFloat(self.balance) - parseFloat(self.pago));

                    if (self.pago == 0) {
                        self.balance = self.balanceAnterior;
                        self.disableIngreso = false;
                    }
                } else if (self.radios === "deuda") {
                    self.ingreso = self.total;
                    self.dialog = !self.dialog;
                    
                    self.balance = self.balanceAnterior;
                    self.disablePago = true;
                    
                    self.balance = (parseFloat(self.balance) + parseFloat(self.ingreso));
                    
                    if (self.ingreso == 0) {
                        self.balance = self.balanceAnterior;
                        self.disablePago = false;
                    }
                    
                }
            } else {
                return false;
            }
        },
        cancelDetail() {
            let self = this;

            let conf = confirm("Esta seguro de cancelar Detalle?");

            if (conf === true) {
                self.dialog = !self.dialog;
                self.ingreso = 0;
                self.pago = 0;
                self.descrip = "";

                setTimeout(function() {
                    self.timeslots = [];
                    self.total = 0;
                    self.radios = "pago";
                    self.okGiro = false;
                }, 1000);
            } else {
                return false;
            }
        },
        addDetail() {
            let self = this;

            self.dialog = !self.dialog;
            setTimeout(() => {
                self.ingreso = 0;
                self.pago = 0;
                self.balance = 0;
            }, 1500);
        },
        seeDetail(item) {
            let self = this;

            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.MOV+"/"+item.AID+CONFIG.SERVICE_URL.DET,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.nFactura = success.data.rows[i].N_FAC;
                    self.total = success.data.rows[i].TTL;
                    self.detailDate = success.data.rows[i].FEC_MOV;
                    self.itemsStr = success.data.rows[i].ITE_DET;
                }

                self.seeDate = true;
                self.disabled = true;
                self.dialog = !self.dialog;
                self.timeslots = JSON.parse(self.itemsStr);
            })
            .catch(err => {
                if (err.response.status === 401) {
                    self.$localStorage.remove('session');
                    self.$router.push({path: '/'});
                } else {
                    console.log(err);
                }
            });
        },
        closeDetail() {
            this.dialog = !this.dialog;
            this.seeDate = false;
            this.disabled = false;
            this.timeslots = [];
            this.nFactura = "";
            this.total = 0;
        }
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
