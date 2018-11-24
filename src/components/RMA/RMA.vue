<template>
    <v-app light>
        <v-container fluid>
            <v-dialog v-model="dialog" max-width="500px" persistent>
                <v-card>
                    <v-card-title>
                        <v-flex class="text-md-center text-xs-center">
                            <span class="headline">Operaciones</span>
                        </v-flex>
                    </v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                    label="Descripción"
                                    readonly    
                                    outline
                                    v-model="descrip"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                    type="number"
                                    :max="max"
                                    :min="min"
                                    label="Cantidad"
                                    v-model="cantidad"
                                    readonly
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-slider
                                    v-model="cantidad"
                                    :max="max"
                                    :min="min"
                                    step="1"
                                ></v-slider>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-textarea
                                    v-model="obs"
                                    label="Observación"
                                    required
                                ></v-textarea>
                            </v-flex>
                            <v-radio-group v-model="type" row>
                                <v-radio label="REEMBOLSO / CTA-CTE" value="0"></v-radio>
                                <v-radio label="DEVOLUCIÓN" value="1"></v-radio>
                            </v-radio-group>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-flex class="text-md-right text-xs-right">
                            <v-btn color="primary" v-on:click="sendDevolutionForm">Enviar</v-btn>
                            <v-btn color="error" v-on:click="dialog = !dialog">Cancelar</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-card>
                <v-card-title primary-title>
                    <v-flex class="text-md-center text-xs-center">
                        <span class="headline">RMA</span>
                    </v-flex>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-layout row wrap>
                            <v-autocomplete
                                @change="changedValue"
                                autofocus
                                @selected="selectProv"
                                :items="itemsProv"
                                v-model="selectProv"
                                label="Seleccione un Cliente"
                                single-line
                                item-text="NOM_ZON"
                                return-object
                                persistent-hint
                                outline
                            ></v-autocomplete>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
            <br />
            <template>
                <v-card>
                    <v-card-title>
                        Lista de Items
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="tableItems"
                        hide-actions
                    >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center text-md-center">{{ props.item.DESCRIPCION }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.CANTIDAD }}</td>
                        <td class="text-xs-center text-md-center">{{ formatDate(props.item.FECHA) }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.PRECIO }}</td>
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="seeDevolution(props.item)">
                                <v-icon color="primary">compare_arrows</v-icon>
                            </v-btn>
                        </td>
                    </template>
                    </v-data-table>
                </v-card>

                <v-container grid-list-md>
                    <v-layout row wrap >
                        <v-flex xs12 sm3 md3>
                            <v-select
                                @change="changedValueDays"
                                @selected="selectDays"
                                :items="itemsDays"
                                v-model="selectDays"
                                label="Días"
                                single-line
                                item-text="name"
                                return-object
                                persistent-hint
                                outline
                                :disabled="disableField"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm3 md9>
                            <v-form v-on:submit.prevent="verifyBarcode">
                                <v-text-field
                                    label="Código de Barra"
                                    v-model="barcode"
                                    required
                                    ref="bc"
                                    outline
                                    :disabled="disableField"
                                ></v-text-field>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-container>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md12>
                            <v-btn color="teal" v-on:click="verifyBarcode()" dark large>Verificar</v-btn>
                        </v-flex>
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
import { 
    CONFIG
} from "../../config/index";

export default {
    beforeMount() {
        let savedSession = (this.$localStorage.get('session') !== undefined)
                                ?
                            JSON.parse(this.$localStorage.get('session')) : '';
        if (savedSession === null) {
            this.$router.push({path: '/'});
            } else {
                this.token = savedSession.token;
                this.getProviders();
                
            }
    },
    name: "RMA",
    data() {
        return {
            id: 0,
            idClient: 0,
            daysVal: 0,
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
            disableField: true,
            disableButton: true,
            itemsDays: [{
                id: 1,
                name: "7 días"
            }, {
                id: 2,
                name: "30 días"
            }, {
                id: 3,
                name: "45 días"
            }, {
                id: 4,
                name: "60 días"
            }],
            tableItems: [],
            headers: [
                {
                    text: "DESCRIPCIÓN",
                    value: "DESCRIPCION",
                    sortable: false
                },
                {
                    text: "CANTIDAD",
                    value: "CANTIDAD",
                    sortable: false
                },
                {
                    text: "FECHA",
                    value: "FECHA",
                    sortable: false
                },
                {
                    text: "PRECIO",
                    value: "PRECIO",
                    sortable: false
                },
                {
                    text: "ACCIONES",
                    sortable: false
                }
            ],
            barcode: "",
            cantidad: 0,
            readOnly: true,
            itemsProv: [],
            selectProv: "",
            selectDays: "",
            dialog: false,
            descrip: "",
            min: 0,
            max: 0,
            arrItem: [],
            obs: "",
            type: '0'
        }
    },
    methods: {
        changedValue(selected) {
            let self = this;
            
            self.idClient = selected.ID;
            self.daysVal = 0;
            self.selectDays = "";
            self.barcode = "";
            self.tableItems = [];
            self.disableField = false;
            
        },
        changedValueDays(selected) {
            let self = this;

            if (selected.id == 1) {
                self.daysVal = 7;
            } else if (selected.id == 2) {
                self.daysVal = 30;
            } else if (selected.id == 3) {
                self.daysVal = 45;
            } else {
                self.daysVal = 60
            }
        },
        getProviders() {
            let self = this;
            
            axios({
                method: 'GET',
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.FILLCLIENT,
                headers: {
                    "Authorization": "Bearer " + self.token
                    }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.itemsProv.push(success.data.rows[i]);
                }
            })
            .catch(err => {
                if (err.response.status === 401) {
                    self.$localStorage.remove('session');
                    self.$router.push({path: '/'});
                }
            });
        },
        verifyBarcode() {
            let self = this;

            self.tableItems = [];

            if (self.selectDays != "" && self.barcode != "") {
                axios({
                method: "POST",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.RMACLIENT + "/"+self.idClient,
                headers: {
                    "Authorization": "Bearer " + self.token
                },
                data: {
                    interval: self.daysVal,
                    barcode: self.barcode
                }
            })
            .then(success => {
                let response = success.data;

                if (response.rows.length) {
                    for (let i = 0; i < response.rows.length; i++) {
                        self.tableItems.push(response.rows[i]);
                    }
                } else {
                    self.handleSnackbar(false, "Articulo no encontrado.");
                }
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
            });
            } else {
                self.handleSnackbar(false, "Complete los Campos para continuar.");
            }
        },
        formatDate(date) {
            let self = this;

            return moment(date).format('DD/MM/YYYY');;

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
        seeDevolution(item) {
            let self = this;

            self.arrItem = item;

            self.dialog = !self.dialog;

            self.descrip = item.DESCRIPCION;
            self.cantidad = item.CANTIDAD;
            self.min = 1;
            self.max = item.CANTIDAD;
        },
        sendDevolutionForm() {
            let self = this;

            self.arrItem.CANTIDAD = self.cantidad;

            self.arrItem.SUBTOTAL = parseFloat(self.arrItem.CANTIDAD) * parseFloat(self.arrItem.PRECIO);
            
            console.log(self.type);
            
            // console.log(self.idClient);
            // console.log(self.obs);
        }
    }
}
</script>

<style>

</style>
