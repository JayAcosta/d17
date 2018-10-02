<template>
    <v-app light>
        <v-container fluid>
            <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
            <v-card-title>
                <span class="headline">Asignar Precios</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-form>
                        <v-layout row wrap>
                            <v-text-field
                                label="Descripción"
                                name="articulo"
                                v-model="articulo"
                                readonly
                                required
                            ></v-text-field>
						</v-layout>
                        <v-layout row wrap>
                            <v-text-field
                                label="Fecha de Registro"
                                name="date"
                                v-model="dateArticle"
                                readonly
                                required
                            ></v-text-field>
						</v-layout>
                        <v-layout row wrap>
                            <v-select @change="changedValue" @selected="selectCurrency"
                                :items="itemsCurrency"
                                v-model="selectCurrency"
                                label="Seleccione Cotización"
                                single-line
                                item-text="state"
                                :disabled="disbleField"
                                return-object
                                persistent-hint
                            ></v-select>
						</v-layout>
                        <v-layout row wrap>
                            <v-text-field
                                label="Precio sugerido ARS"
                                name="cotizacion"
                                v-model="cotizacion"
                                readonly
                                prefix="$"
                            ></v-text-field>
						</v-layout>
                        <v-layout row wrap>
                            <v-text-field
                                type="number"
                                min="0"
                                label="Precio por mayor"
                                name="major"
                                v-model="major"
                                :disabled="disbleField"
                                required
                            ></v-text-field>
                        </v-layout>
                        <v-layout row wrap>
                            <v-text-field
                                type="number"
                                min="0"
                                label="Precio por menor"
                                name="minor"
                                v-model="minor"
                                :disabled="disbleField"
                                required
                            ></v-text-field>
                        </v-layout>
                        <v-layout row wrap>
                            <v-text-field
                                type="number"
                                min="0"
                                label="Precio Distribuidor"
                                name="distributor"
                                v-model="distributor"
                                :disabled="disbleField"
                                required
                            ></v-text-field>
                        </v-layout>
                        <v-layout row wrap>
                            <v-text-field
                                type="number"
                                min="0"
                                label="Precio Especial"
                                name="especial"
                                v-model="especial"
                                :disabled="disbleField"
                                required
                            ></v-text-field>
                        </v-layout>
							</v-form>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="sendForm">Enviar</v-btn>
                <v-btn color="red darken-1" flat @click.native="dialog = !dialog">Cancelar</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" max-width="500px" persistent>
				<v-card>
					<v-card-title class="headline">
						<v-container class="text-xs-center text-sm-center text-md-center">
							Importar Precios
						</v-container>
					</v-card-title>
                    <v-card-text v-if="isProcess === false">
						<v-layout row wrap>
							<!-- <v-flex xs12 sm12 md12>
								<v-switch
									label="Costo"
									color="indigo"
									v-model="swtCosto"
								></v-switch>
							</v-flex> -->
							<v-flex xs12 sm12 md12>
								<v-form enctype="multipart/form-data">
									<v-container class="text-xs-center text-md-center">
										<input type="file" id="xlsFile" accept="application/x-iwork-keynote-sffnumbers,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="processXlsx($event)" />
									</v-container>
								</v-form>
							</v-flex>
						</v-layout>
					</v-card-text>
					<v-card-text v-else-if="isProcess === true">
						<v-progress-circular
							:size="50"
							color="primary"
							indeterminate
						></v-progress-circular>

					</v-card-text>
                    <v-card-actions>
						<v-flex class="text-md-right text-xs-right">
							<v-btn v-if="excelLoad === true" dark color="teal" v-on:click="sendXlsxProcess">{{titleProcess}}</v-btn>
							<v-btn dark color="error" v-on:click="dialog2 = !dialog2">Cancelar</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            
            <template>
                <v-card>
                    <v-card-title>
                        Articulos por precio
                        <v-spacer></v-spacer>
                        <v-tooltip v-if="right == 0 || right == 1" bottom>
                            <v-btn
                                icon class="mx-0"
                                slot="activator"
                                v-on:click="openImport"
                            >
                                <v-icon color="blue lighten-1">arrow_upward</v-icon>
                            </v-btn>
                        <span>Importar Excel</span>
                        </v-tooltip>
                        <v-form method="GET" :action="exportService">
                        <v-tooltip v-if="right == 0 || right == 1" bottom>
                            <v-btn
                                type="submit"
                                icon class="mx-0"
                                slot="activator"
                            >
                                <v-icon color="green lighten-1">arrow_downward</v-icon>
                            </v-btn>
                        <span>Exportar Excel</span>
                        </v-tooltip>
                        </v-form>
                        <v-tooltip bottom>
                            <v-btn
                                icon class="mx-0"
                                slot="activator"
                                v-on:click="refresh"
                            >
                                <v-icon color="blue-grey lighten-1">autorenew</v-icon>
                            </v-btn>
                        <span>Actualizar</span>
                        </v-tooltip>
                        <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Buscar"
                        single-line
                        hide-details
                        autofocus
                    ></v-text-field>
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="desserts"
                        :search="search"
                    >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center text-md-center">{{ props.item.ARTICULO }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.COSTO }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.PRECIO_X_MAYOR }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.PRECIO_X_MENOR }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.CAMBIO_DOLAR }}</td>
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" v-on:click="openDialog(props.item)">
                                <v-icon color="teal">edit</v-icon>
                            </v-btn>
                        </td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                    </v-data-table>
                </v-card>
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
import moment from 'moment';
import { excel2json } from 'js2excel';

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
                this.getArticlesAndPrices();
                this.exportService = CONFIG.SERVICE_BASE+CONFIG.SERVICE_URL.EXPORT+CONFIG.SERVICE_URL.PRICE;
			}
		},
    name: "Precios",
    props: {
		right: Number
	},
    data() {
        return {
            token: '',
            search: '',
            headers: [
                {
                    text: 'Articulo',
                    value: 'ARTICULO',
                    sortable: false
                }, {
                    text: 'Costo',
                    value: 'COSTO',
                    sortable: false
                }, {
                    text: 'Precio x mayor',
                    value: 'PRECIO_X_MAYOR',
                    sortable: false
                }, {
                    text: 'Precio x menor',
                    value: 'PRECIO_X_MENOR',
                    sortable: false
                }, {
                    text: 'Cotización',
                    value: 'CAMBIO_DOLAR',
                    sortable: false
                }, {
					text: 'Actions',
					value: 'name',
					sortable: false
				}
            ],
            desserts: [],
            dialog: false,
            articleId: 0,
            major: 0,
            minor: 0,
            disbleField: false,
            articulo: '',
            cotizacion: 0,
            distributor: 0,
            especial: 0,
            dateArticle: '',
            itemsCurrency: [],
            selectCurrency: '',
            idTipoArticulo: 0,
            idCurrency: 0,
            cost: 0,
            costUSD: 0,
            message: {
				success: true,
				content: ""
			},
			snackbar: false,
			y: 'top',
			x: null,
			mode: '',
            timeout: 6000,
            exportService: "",
            dialog2: false,
            isProcess: false,
			titleProcess: "Procesar",
            excelLoad: false,
            jsonProcess: []
        }
    },
    methods: {
        getArticlesAndPrices() {
            let self = this;
            
            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.ALLARTICLESANDPRICE,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
             })
             .then(success => {
                 for (let i = 0; i < success.data.rows.length; i++) {
                     self.desserts.push(success.data.rows[i]);
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
        openDialog(item) {
            let self = this;
            
            self.dialog = !self.dialog;
            self.articleId = item.ID_ARTICULO;
            self.articulo = item.ARTICULO;
            self.cost = item.COSTO;
            self.costUSD = item.COSTO_USD;
            self.idTipoArticulo = item.TP_ID;
            self.major = (item.PRECIO_X_MAYOR !== null) ? (item.PRECIO_X_MAYOR.substring(1)) : 0; 
            self.minor = (item.PRECIO_X_MENOR !== null) ? (item.PRECIO_X_MENOR.substring(1)) : 0;
            self.distributor = (item.distribuidor !== null) ? (item.distribuidor) : 0;
            self.especial = (item.especial !== null) ? (item.especial) : 0;
            self.dateArticle = moment(item.fecha_creacion).format('DD/MM/YYYY');

            self.getCurrencyPrice()

        },
        sendForm() {
            let self = this;

            axios({
                method: "POST",
                url: CONFIG.SERVICE_BASE + '/articulos/'+ self.articleId +'/price',
                headers: {
                    "Authorization": "Bearer " + self.token
                },
                data: {
                    idMoneda: self.idCurrency,
                    precioMayor: self.major,
                    precioMenor: self.minor,
                    distribuidor: self.distributor,
                    especial: self.especial
                }
            })
            .then(response => {
                self.message.success = response.data.success;
                self.message.content = response.data.content;
                self.dialog = false;
                self.desserts = [];
                this.getArticlesAndPrices();
                
                this.handleSnackbar(self.message.success, self.message.content);
            })
            .catch(error => {
                let validationErr = error.response.data.errors;
                if (error.response.status === 400) {
                    if (validationErr.precioMayor) {
                        self.message.success = false;
                        self.message.content = validationErr.precioMayor[0];
                    }
                    if (validationErr.precioMenor) {
                        self.message.success = false;
                        self.message.content = validationErr.precioMenor[0];
                    }
                } else if (error.response.status === 401) {
                    self.$localStorage.remove('session');
                    self.$router.push({path: '/'});
                } else {
                    self.message.success = error.response.data.success;
                    self.message.content = error.response.data.content;
                    console.log(error);
                }
                
                this.handleSnackbar(self.message.success, self.message.content);
            });
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
        getCurrencyPrice() {
            let self = this;

            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.FILLCURRENCY,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.itemsCurrency.push({ id: success.data.rows[i].ID, state: success.data.rows[i].DESCRIPTION, value: success.data.rows[i].EXCHANGE });
                    
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    self.$localStorage.remove('session');
                    self.$router.push({path: '/'});
                }
            });
        },
        changedValue: function(selected) {
            this.idCurrency = selected.id;
            this.selectCurrency = selected;
            let total = 0;
            if (this.idTipoArticulo === 2) {
                total = (this.costUSD * selected.value) * 1.07;
            } else if (this.idTipoArticulo === 1) {
                total = (this.costUSD * selected.value) * 1.35;
            } else if (this.idTipoArticulo === 4) {
                total = (this.costUSD * selected.value) * 1.50;
            }
            
            this.cotizacion = total;
        },
        openImport() {
            let self = this;
            
            self.dialog2 = !self.dialog2;
        },
        processXlsx(event) {
            let self = this;
            let format = event.target.files[0].name.toLowerCase().split(".");
            
            if (format[1] == "xls" || format[1] == "xlsx") {
                excel2json(event.target.files, (data) => {
                    if (data.Precios) {
                        for (let i = 0; i < data.Precios.length; i++) {
                            if (data.Precios[i].ID && data.Precios[i].ARTICULO && data.Precios[i].X_MAYOR && data.Precios[i].X_MENOR) {
                                self.jsonProcess.push({
                                    ID: data.Precios[i].ID,
                                    ARTICULO: data.Precios[i].ARTICULO,
                                    X_MAYOR: data.Precios[i].X_MAYOR,
                                    X_MENOR: data.Precios[i].X_MENOR
                                });
                            }
                        }
                        
                        self.excelLoad = true;
                        } else {
                            self.handleSnackbar(false, "Nombre de Hoja de Calculo invalida.");
                            
                            setTimeout(function() {
                                document.getElementById("xlsFile").value = null;
                            }, 500);
                        }
                }, 'excel2json');
				} else {
					self.handleSnackbar(false, "Debe ser Excel (XLS - XLSX)");
					
					setTimeout(function() {
						document.getElementById("xlsFile").value = null;
					}, 500);
				}
			},
            refresh() {
                let self = this;
                
                self.desserts = [];
                
                setTimeout(function() {
                    self.getArticlesAndPrices();
                }, 200);
            },
            sendXlsxProcess() {
                let self = this;
                
                self.isProcess = true;
                self.titleProcess = "Procesando...";
                
                axios({
					method: "POST",
					url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.IMPORT + CONFIG.SERVICE_URL.PRICE,
					headers: {
						"Authorization": "Bearer " + self.token
					},
					data: {
						_method: 'put',
						prices: JSON.stringify(self.jsonProcess)
					}
				})
				.then(success => {
					let response = success.data;
					
					self.handleSnackbar(response.success, response.content);
					self.dialog2 = !self.dialog2;
                    self.swtCosto = false;
                    setTimeout(function() {
                        self.isProcess = false;
                        self.titleProcess = "Procesar"; 
                        self.excelLoad = false;
                        }, 500);
					self.desserts = [];
					this.getArticlesAndPrices();
				})
				.catch(err => {
					console.log(err);
					self.isProcess = false;
					self.titleProcess = "Procesar";
					self.excelLoad = false;
					document.getElementById("xlsFile").value = null;
				});
			},

    }
}
</script>

<style>

</style>
