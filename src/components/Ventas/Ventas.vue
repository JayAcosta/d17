<template>
    <v-app light>
        <v-container fluid>
            <v-card>
                <v-card-title primary-title>
                    <v-flex class="text-md-center text-xs-center">
                        <span class="headline">Ventas</span>
                    </v-flex>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-layout row wrap>
                            <v-select
                                @change="changedValue"
                                @selected="selectVenta"
                                :items="itemsVenta"
                                v-model="selectVenta"
                                label="Seleccionar"
                                single-line
                                item-text="name"
                                return-object
                                persistent-hint
                                outline
                            ></v-select>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>

            <template>
                <v-form>
                <v-container>
                    <v-layout row wrap v-if="selectVenta != 'Por Menor'">
                        <v-flex xs12 sm3 md3>
                            <v-autocomplete
                                @change="changeClientValue"
                                @selected="selectClient"
                                :items="itemsClients"
                                :disabled="disable"
                                v-model="selectClient"
                                label="Seleccione un Cliente"
                                single-line
                                item-text="clientName"
                                return-object
                                persistent-hint
                                outline
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field
                                label="Documento"
                                :disabled="disable"
                                v-model="clientDocument"
                                :readonly="readOnly"
                                outline
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field
                                label="Teléfono"
                                :disabled="disable"
                                v-model="clientPhone"
                                :readonly="readOnly"
                                outline
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-alert
                                :value="true"
                                color="info"
                                icon="info"
                                outline
                            >
                                Información
                            </v-alert>
                            <!-- <v-select
                                @change="changeTipoPago"
                                :items="itemsTipoPago"
                                v-model="selectTipoPago"
                                label="Tipo de Pago"
                                single-line
                                item-text="name"
                                return-object
                                persistent-hint
                                outline
                            ></v-select> -->
                        </v-flex>
                        <v-flex xs12 sm3 md6>
                            <v-textarea
                                label="Dirección"
                                v-model="clientDir"
                                :disabled="disable"
                                :readonly="readOnly"
                                outline
                            ></v-textarea>
                        </v-flex>
                        <v-flex xs12 sm3 md6>
                            <v-textarea
                                label="Observación"
                                v-model="clientObs"
                                :disabled="disable"
                                :readonly="readOnly"
                                outline
                            ></v-textarea>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-form>
                <v-card>
                    <v-card-title>
                        Items
                        <v-spacer></v-spacer>
                        <!-- <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Buscar"
                            single-line
                            hide-details
                        ></v-text-field> -->
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="tableItems"
                        :search="search"
                        hide-actions
                    >
                    <template slot="items" slot-scope="props">
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                                <v-icon color="pink">delete</v-icon>
                            </v-btn>
                        </td>
                        <td class="text-xs-center text-md-center">{{ props.item.CANTIDAD }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.DESCRIPCION }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.PRECIO }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.SUBTOTAL }}</td>
                    </template>
                    <!-- <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert> -->
                    </v-data-table>
                </v-card>
                <!-- <v-container v-if="barcodeFinded === true" grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12 sm2 md2>
                            <v-text-field
                                min="1"
                                :max="cantArticle"
                                type="number"
                                label="Cantidad"
                                @change="changeCant"
                                outline
                                v-model="cantidad"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                label="Descripción"
                                outline
                                v-model="descripcion"
                                readonly
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2 md2>
                            <v-text-field
                                label="Precio"
                                outline
                                v-model="precio"
                                readonly
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm2 md2>
                            <v-text-field
                                label="Subtotal"
                                outline
                                v-model="subtotal"
                                readonly
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-btn dark large fab color="indigo" v-on:click="addItem">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-container> -->

                <v-container grid-list-md>
                    <v-layout row wrap >
                        <v-flex xs12 sm3 md2>
                            <v-text-field
                                min="1"
                                type="number"
                                label="Cantidad"
                                @change="changeCant"
                                v-model="cantidad"
                                step="0.01"
                                outline
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md10>
                            <v-form v-on:submit.prevent="verifyBarcode">
                                <v-text-field
                                    label="Código de Barra"
                                    v-model="barcode"
                                    required
                                    autofocus
                                    ref="bc"
                                    outline
                                ></v-text-field>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </v-container>
                
                    <v-layout row wrap>
                        <v-flex xs12 sm3 md3>
                        <v-text-field
                                type="number"
                                label="Total"
                                v-model="total"
                                readonly
                                prefix="$"
                                solo
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12>
                            <v-btn color="blue" outline dark large v-on:click="consolidate">Consolidar</v-btn>
                        </v-flex>
                        <!-- <v-flex xs12 sm3 md6>
                            <v-btn color="green" outline dark large>Apartar x 24/hrs</v-btn>
                        </v-flex> -->
                    </v-layout>
                </v-container>
            </template>

        </v-container>
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
            this.selectVenta = "Por Menor";
            this.typeSale

        }
    },
    name: "Ventas",
    props: {
		right: Number
	},
    data() {
        return {
            id: 0,
            idClient: 0,
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
            disable: true,
            itemsVenta: [{
                id: 1,
                name: "Por Menor"
            }, {
                id: 2,
                name: "Por Mayor"
            }, {
                id: 3,
                name: "Reparación"
            }],
            selectVenta: "",
            minDate: "",
            typeSale: 1,
            typeTransac: "",
            tableItems: [],
            headers: [
                {
                    text: "OPERACIONES",
                    sortable: false
                }, {
                    text: "CANTIDAD",
                    value: "CANTIDAD",
                    sortable: false
                }, {
                    text: "DESCRIPCIÓN",
                    value: "DESCRIPCION",
                    sortable: false
                }, {
                    text: "PRECIO",
                    value: "PRECIO",
                    sortable: false
                }, {
                    text: "SUBTOTAL",
                    value: "SUBTOTAL",
                    sortable: false
                }
            ],
            search: "",
            itemsTipoPago: [],
            selectTipoPago: "",
            total: 0,
            timeslots: [],
            barcode: "",
            cantidad: 1,
            precio: 0,
            subtotal: 0,
            descripcion: "",
            barcodeFinded: false,
            cantArticle: 0,
            arrId: [],
            selectClient: '',
            itemsClients: [],
            clientName: '',
            clientDocument: '',
            clientPhone: '',
            clientDir: '',
            clientObs: '',
            readOnly: true


        }
    },
    methods: {
        changeClientValue(selected) {
            let self = this;

            self.idClient = selected.id;
            self.clientDocument = selected.nDoc;
            self.clientPhone = selected.clientPhone;
            self.clientDir = selected.clientDir;
            self.clientObs = selected.clientObs;

        },
        changedValue(selected) {
            let self = this;

            if (selected.id === 1) {
                self.selectVenta = "Por Menor";
                self.typeSale = selected.id
                self.disable = true;
                self.selectClient = '';
                self.itemsClients = [];
                self.tableItems = [];
                self.total = 0;
                self.idClient = 0;
                self.clientDocument = '';
                self.clientPhone = '';
                self.clientDir = '';
                self.clientObs = '';
                // self.itemsTipoPago = [
                //     {
                //     id: 1,
                //     name: "Efectivo"
                // },  {
                //         id: 2,
                //         name: "Débito"
                //     },{
                //     id: 3,
                //     name: "Cheque"
                // }, {
                //     id: 4,
                //     name: "Transferencia"
                // }, {
                //     id: 5,
                //     name: "Credito"
                // }
                // ];
            } else if (selected.id === 2) {
                self.selectVenta = "Por Mayor";
                self.tableItems = [];
                self.total = 0;
                self.typeSale = selected.id
                self.disable = false;
                self.fillSelectProviders();
                // self.itemsTipoPago = [{
                //     id: 1,
                //     name: "Efectivo"
                // },  {
                //         id: 2,
                //         name: "Débito"
                //     },{
                //     id: 3,
                //     name: "Cheque"
                // }, {
                //     id: 4,
                //     name: "Transferencia"
                // }, {
                //     id: 5,
                //     name: "Credito"
                // }];
            } else {
                return false;
            }
        },
        changeTipoPago(selected) {
            let self = this;

            if (selected.id === 1) {
                self.typeTransac = selected.id
            } else if (selected.id === 2) {
                self.typeTransac = selected.id;
            } else {
                return false;
            }
        },
        verifyBarcode() {
            let self = this;
            
            axios({
                method: "POST",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.BARCODEVERIFY,
                headers: {
                    "Authorization": "Bearer " + self.token
                },
                data: {
                    barcode: self.barcode
                }
            })
            .then(success => {
                let response = success.data;
                
                self.id = response.content.AID;
                self.barcodeFinded = true;
                self.precio = (self.typeSale === 1) ? response.content.PRECIO_X_MENOR : response.content.PRECIO_X_MAYOR;
                self.descripcion = response.content.ARTICULO;
                self.subtotal = (parseFloat(self.cantidad) * parseFloat(self.precio));
                self.cantArticle = response.content.CANT;
                self.barcode = "";
                
                self.addItem();

            })
            .catch(err => {
                let validationErr = err.response.data.errors;
                let customErr = err.response.data;
                
                if (err.response.status === 400) {
                    if (validationErr.barcode) {
                        self.message.success = self.message.success;
                        self.message.content = customErr.content;
                        self.barcode = "";
                    }
                } else if(err.response.status === 401) {
                    self.$localStorage.remove('session');
                    self.$router.push({path: '/'});
                } else if (err.response.status === 404) {
                    self.message.success = self.message.success;
                    self.message.content = customErr.content;
                    self.barcode = "";
                } else {
                    self.message.success = err.response.data.success;
                    self.message.content = err.response.data.content;
                }

                self.handleSnackbar(self.message.success, self.message.content);
            })
        },
        handleSnackbar(success, content) {
            let self = this;
            
            self.message.success = success;
            self.message.content = content;
            self.snackbar = true;
            
            setTimeout(function() {
                self.snackbar = false;
            }, 2000);
        },
        changeCant() {
            let self = this;

            self.subtotal = (parseFloat(self.cantidad) * parseFloat(self.precio));
        },
        addItem() {
            let self = this;

            if (self.cantArticle == 0) {
                self.handleSnackbar(false, "No hay disponibilidad En Stock.");
                self.cantidad = 1;
            } else if (self.cantidad > self.cantArticle) {
                self.handleSnackbar(false, "Solo hay "+self.cantArticle+" En Stock.");
                self.cantidad = 1;
            } else if (self.cantidad == 0) {
                self.handleSnackbar(false, "Ingrese un cantidad valida.");
                self.cantidad = 1;
            } else {
                if (self.tableItems.length) {
                    for (let i = 0; i < self.tableItems.length; i++) {
                        let compareCant = (parseInt(self.tableItems[i].CANTIDAD) + parseInt(self.cantidad));
                        if (self.id == self.tableItems[i].ID) {
                            if (self.arrId.indexOf(self.id) == -1) {
                                self.arrId.push(self.id); 
                            }
                            if (compareCant > self.cantArticle) {
                                self.handleSnackbar(false, "Solo hay "+self.cantArticle+" En Stock.");
                                self.cantidad = 1;
                            } else {
                                self.tableItems[i].CANTIDAD = (parseInt(self.tableItems[i].CANTIDAD) + parseInt(self.cantidad));
                                self.tableItems[i].SUBTOTAL = (parseFloat(self.tableItems[i].CANTIDAD) * parseFloat(self.tableItems[i].PRECIO));
                                self.total = (self.total + self.subtotal);
                                break;
                            }
                        } else {
                            if (self.arrId.indexOf(self.id) == -1) {
                                self.total = (self.total + self.subtotal);
                                self.arrId.push(self.id);
                                self.tableItems.push({
                                 ID: self.id,
                                 CANTIDAD: self.cantidad,
                                 DESCRIPCION: self.descripcion,
                                 PRECIO: self.precio,
                                 SUBTOTAL: self.subtotal
                             });
                             break;
                            }
                        }
                    }

                    self.cantidad = 1;
                } else {
                    self.tableItems.push({
                        ID: self.id,
                        CANTIDAD: self.cantidad,
                        DESCRIPCION: self.descripcion,
                        PRECIO: self.precio,
                        SUBTOTAL: self.subtotal
                    });
                    
                    self.total = (parseFloat(self.total) + parseFloat(self.subtotal));
                    
                    self.barcodeFinded = false;
                    self.barcode = "";
                    self.$refs.bc.focus();
                    self.cantidad = 1;

                }
            }
        },
        deleteItem(props) {
            let self = this;

            let conf = confirm("Desea eliminar este item de la lista?");

            if (conf === true) {
                for (let i = 0; i < self.tableItems.length; i++) {
                    if (self.tableItems[i].ID === props.ID) {
                        self.total = (parseFloat(self.total) - parseFloat(self.tableItems[i].SUBTOTAL));
                        self.tableItems.splice(i,1);

                        break;
                    }
                }
            } else {
                return false;
            }
        },
        consolidate() {
            let self = this;

            let conf = confirm("Esta seguro de consolidar esta Lista de Articulos?");

            if (conf === true) {
                if (self.tableItems.length) {
                    axios({
                    method: "POST",
                    url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.SALE,
                    headers: {
                        "Authorization": "Bearer " + self.token
                    },
                    data: {
                        idClient: (self.idClient !== 0) ? self.idClient : 0,
                        tipoVenta: self.typeSale,
                        tipoPago: self.typeTransac,
                        items_venta: JSON.stringify(self.tableItems),
                        total: self.total
                    }
                })
                .then(success => {
                    let response = success.data;

                    self.handleSnackbar(response.success, response.content);
                    self.tableItems = [];
                    self.total = 0;
                    self.arrId = [];
                    self.idClient = 0;
                    self.clientDocument = '';
                    self.clientPhone = '';
                    self.clientDir = ''
                    self.clientObs = '';

                    if (self.selectVenta == "Por Mayor") {
                        self.selectVenta = "";
                        self.itemsClients = [];

                        // setTimeout(function(){
                        //     self.fillSelectProviders();
                        // }, 500);
                    }


                })
                .catch(err => {
                    let validationErr = err.response.data.errors;
                    let customErr = err.response.data;
                    
                    if (err.response.status === 400) {
                        if (validationErr.tipoPago) {
                            self.message.success = false;
                            self.message.content = validationErr.tipoPago[0];
                        }
                    } else if(err.response.status === 401) {
                        self.$localStorage.remove('session');
                        self.$router.push({path: '/'});
                    } else if (err.response.status === 404) {
                        self.message.success = self.message.success;
                        self.message.content = customErr.content;
                    } else {
                        self.message.success = err.response.data.success;
                        self.message.content = err.response.data.content;
                    }

                self.handleSnackbar(self.message.success, self.message.content);
                });
                } else {
                    self.handleSnackbar(false, "Agrege items a la lista para consolidar.");
                }
            } else {
                return false;
            }
            
        },
        fillSelectProviders() {
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
                        clientName: success.data.rows[i].NOM_ZON,
                        clientDir:  success.data.rows[i].DIR,
                        clientPhone: success.data.rows[i].TEL,
                        clientObs: success.data.rows[i].OBS

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
    }
}
</script>

<style>

</style>
