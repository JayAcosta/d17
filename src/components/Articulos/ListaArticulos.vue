<template>
	<v-app light>
		<v-container fluid>

			<v-dialog v-model="dialog" max-width="500px" persistent>
                <v-card>
                    <v-card-title>
                        <v-toolbar color="teal lighten-3" dark>
                            <v-flex justify-center>
                                <v-toolbar-title>Modulo Articulos</v-toolbar-title>
                            </v-flex>
                        </v-toolbar>
                    </v-card-title>
                    <v-card-text>
						<v-form v-on:submit.prevent="articleVerify">
							<v-layout row wrap>
								<v-text-field
									label="PREFIJO||COLOR||MARCA||MODELO||CALIDAD"
									v-model="verifyBarcode"
									required
									autofocus
								></v-text-field>
							</v-layout>
						</v-form>
						<v-flex class="text-md-center text-xs-center">
							<v-container v-if="editArticle === false">
							<v-btn
								round
								color="primary"
								dark
								v-on:click="articleVerify"
							>Verificar</v-btn>
							</v-container>
						</v-flex>
						<v-container v-if="barcodeExist === true" fluid class="px-3">
							<v-form>
								<v-layout row wrap>
									<v-select
										:items="itemsTiposArticulos"
										v-model="selectTiposArticulos"
										:hint="`Selecionado: ${selectTiposArticulos.state}`"
										label="Tipos Articulos"
										single-line
										item-text="state"
										return-object
										persistent-hint
										autocomplete
										:disabled="disbleField"
									></v-select>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										label="Nombre"
										name="nombre"
										v-model="nombre"
										:disabled="disbleField"
										required
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										type="number"
										min="1"
										label="Cantidad"
										name="cantidad"
										v-model="cantidad"
										:disabled="disbleField"
										required
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-select
										:items="itemsOrigen"
										v-model="selectOrigen"
										:hint="`Selecionado: ${selectOrigen.state}`"
										label="Origen"
										single-line
										item-text="state"
										:disabled="disbleField"
										return-object
										persistent-hint
										autocomplete
									></v-select>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										type="number"
										min="1"
										step="0.01"
										value="0.00"
										placeholder="0.00"
										label="Cotización Actual"
										name="cotizacion"
										v-model="cotizacion"
										readonly
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										type="number"
										min="1"
										step="0.01"
										value="0.00"
										placeholder="0.00"
										label="Costo"
										name="costo"
										v-model="costo"
										v-on:keyup="calculatePriceUSD"
										prefix="$"
										:disabled="disbleField"
										required
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										type="number"
										min="1"
										step="0.01"
										value="0.00"
										placeholder="0.00"
										label="Costo USD"
										name="costoUSD"
										v-model="costoUSD"
										suffix="$"
										:disabled="disbleField"
										readonly
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-select
										:items="itemsSello"
										v-model="selectSello"
										:hint="`Selecionado: ${selectSello.state}`"
										label="Sello"
										single-line
										item-text="state"
										:disabled="disbleField"
										return-object
										persistent-hint
										autocomplete
									></v-select>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										v-model="descripcion"
										label="Descripcion"
										name="descripcion"
										multi-line
										required
										:disabled="disbleField"
									></v-text-field>
								</v-layout>
								<v-layout row wrap v-if="editArticle === true">
									<v-container class="text-xs-center text-md-center">
										<input type="file" accept="image/*" @change="processFile($event)" />
									</v-container>
								</v-layout>
								<v-layout row wrap v-if="editArticle === false">
									<v-container class="text-xs-center text-md-center">
										<v-btn v-on:click="showImage" outline color="indigo">Ver imagen</v-btn>
									</v-container>
									<v-container class="text-xs-center text-md-center">
										<v-btn v-on:click="showBarcode" outline color="indigo">Ver Código de Barras</v-btn>
									</v-container>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										v-model="color"
										label="Color"
										name="color"
										required
										:disabled="disbleField"
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-select
										:items="itemsCalidad"
										v-model="selectCalidad"
										:hint="`Selecionado: ${selectCalidad.state}`"
										label="Calidad"
										single-line
										item-text="state"
										return-object
										persistent-hint
										autocomplete
										:disabled="disbleField"
									></v-select>
								</v-layout>
							</v-form>
							<!-- Existe -->
							</v-container>
							<v-container v-else-if="barcodeExist === false" fluid class="px-3">
								<v-form enctype="multipart/form-data">
								<v-layout row wrap>
									<v-select
										:items="itemsTiposArticulos"
										v-model="selectTiposArticulos"
										:hint="`Selecionado: ${selectTiposArticulos.state}`"
										label="Tipos Articulos"
										single-line
										item-text="state"
										return-object
										persistent-hint
										autocomplete
									></v-select>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										label="Nombre"
										name="nombre"
										v-model="nombre"
										:disabled="disbleField"
										required
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										type="number"
										min="1"
										label="Cantidad"
										name="cantidad"
										v-model="cantidad"
										:disabled="disbleField"
										required
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-select
										:items="itemsOrigen"
										v-model="selectOrigen"
										:hint="`Selecionado: ${selectOrigen.state}`"
										label="Origen"
										single-line
										item-text="state"
										:disabled="disbleField"
										return-object
										persistent-hint
										autocomplete
									></v-select>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										type="number"
										min="1"
										step="0.01"
										value="0.00"
										placeholder="0.00"
										label="Cotización Actual"
										name="cotizacion"
										v-model="cotizacion"
										prefix="USD"
										readonly
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										type="number"
										min="1"
										step="0.01"
										value="0.00"
										placeholder="0.00"
										label="Costo"
										name="costo"
										v-model="costo"
										v-on:keyup="calculatePriceUSD"
										prefix="$"
										:disabled="disbleField"
										required
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										type="number"
										min="1"
										step="0.01"
										value="0.00"
										placeholder="0.00"
										label="Costo USD"
										name="costoUSD"
										v-model="costoUSD"
										suffix="$"
										:disabled="disbleField"
										readonly
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-select
										:items="itemsSello"
										v-model="selectSello"
										:hint="`Selecionado: ${selectSello.state}`"
										label="Sello"
										single-line
										item-text="state"
										:disabled="disbleField"
										return-object
										persistent-hint
										autocomplete
									></v-select>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										v-model="descripcion"
										label="Descripcion"
										name="descripcion"
										multi-line
										required
										:disabled="disbleField"
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-container class="text-xs-center text-md-center">
										<input type="file" accept="image/*" @change="processFile($event)" />
									</v-container>
								</v-layout>
								<v-layout row wrap>
									<v-text-field
										v-model="color"
										label="Color"
										name="color"
										required
										:disabled="disbleField"
									></v-text-field>
								</v-layout>
								<v-layout row wrap>
									<v-select
										:items="itemsCalidad"
										v-model="selectCalidad"
										:hint="`Selecionado: ${selectCalidad.state}`"
										label="Calidad"
										single-line
										item-text="state"
										return-object
										persistent-hint
										autocomplete
									></v-select>
								</v-layout>
							</v-form>
							<!-- Nuevo -->
							</v-container>
							<v-container v-else>
								<h4>Coloque el código de barras para continuar.</h4> 
							</v-container>
                    </v-card-text>
                    <v-card-actions>
						<v-container v-if="newArticle === true">
                        <v-flex class="text-md-right text-xs-right">
							<v-btn color="primary" v-on:click="addNewArticle">Enviar</v-btn>
							<v-btn color="error" v-on:click="dialogEventClose()">Cancelar</v-btn>
                        </v-flex>
						</v-container>
						<v-container v-else-if="newArticle === false">
                        <v-flex class="text-md-right text-xs-right">
							<v-btn v-if="editArticle === true" color="warning" v-on:click="updateArticle">Modificar</v-btn>
							<v-btn color="error" v-on:click="dialogEventClose()">Cancelar</v-btn>
                        </v-flex>
						</v-container>
                    </v-card-actions>
                </v-card>
            </v-dialog>

			<v-dialog v-model="dialog2" max-width="500px" persistent>
				<v-card>
					<v-card-title class="headline">
						<v-container class="text-xs-center text-sm-center text-md-center">
							Importar Articulos
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
				Lista de Articulos
				<v-spacer></v-spacer>
				<v-tooltip bottom>
					<v-btn
						icon class="mx-0"
						slot="activator"
						v-on:click="openImport"
					>
						<v-icon color="blue lighten-1">arrow_upward</v-icon>
					</v-btn>
				<span>Importar Excel</span>
				<v-spacer></v-spacer>
				</v-tooltip>
				<v-form method="GET" :action="exportService">
				<v-tooltip bottom>
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
					label="Search"
					single-line
					hide-details
				></v-text-field>
				</v-card-title>
				<v-data-table
					:headers="headers"
					:items="desserts"
					:search="search"
				>
				<template slot="items" slot-scope="props">
					<td class="text-xs-center text-md-center">{{ props.item.barcode }}</td>
					<td class="text-xs-center text-md-center">{{ props.item.nombre }}</td>
					<td class="text-xs-center text-md-center">{{ props.item.cantidad }}</td>
					<td class="text-xs-center text-md-center">{{ props.item.calidad }}</td>
					<td class="text-xs-center text-md-center">{{ props.item.color }}</td>
					<td class="justify-center layout px-0">
					<v-btn icon class="mx-0" @click="editItem(props.item)">
						<v-icon color="teal">edit</v-icon>
					</v-btn>
					<v-btn icon class="mx-0" @click="deleteItem(props.item)">
						<v-icon color="pink">delete</v-icon>
					</v-btn>
					<v-btn icon class="mx-0" @click="showImageGrid(props.item)">
						<v-icon color="blue">image</v-icon>
					</v-btn>
					</td>
				</template>
				<v-alert slot="no-results" :value="true" color="error" icon="warning">
					Your search for "{{ search }}" found no results.
				</v-alert>
				</v-data-table>
			</v-card>
			</template>
			<v-btn
                color="pink"
                dark
                fixed
                bottom
                right
                fab
                v-on:click="dialogEventOpen"
            >
                <v-icon>add</v-icon>
            </v-btn>
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

import axios from "axios";
import { excel2json } from 'js2excel';

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
				this.exportService = CONFIG.SERVICE_BASE+CONFIG.SERVICE_URL.EXPORT+CONFIG.SERVICE_URL.ARTICLE;
				this.getAllArticulos();
			}
		},
	name: "ListaArticulos",
	props: {},
	data() {
		return {
			id: '',
			token: '',
			search: '',
			dialog: false,
			dialog2: false,
			barcode: '',
			verifyBarcode: '',
			barcodeExist: '',
			editArticle: false,
			newArticle: false,
			disbleField: false,
			nombre: '',
			cantidad: '',
			costo: '',
			costoUSD: '',
			foto: '',
			selectSello: '',
			itemsSello: [
				{
					state: 'Fparts'
				}, {
					state: 'No Aplica'
				}
			],
			descripcion: '',
			color: '',
			selectCalidad: '',
			itemsCalidad: [
				{
					state: 'Original'
				}, {
					state: 'Generico'
				}, {
					state: 'No Aplica'
				}
			],
			selectTiposArticulos: '',
			itemsTiposArticulos: [],
			selectOrigen: '',
			itemsOrigen:[
				{
					state: 'Nacional'
				}, {
					state:'Importado'
				}
			],
			headers: [
				{
					text: 'Código Barras',
					value: 'barcode',
					sortable: false
				},{
					text: 'Nombre',
					value: 'nombre',
					sortable: false
				},{
					text: 'Cantidad (#)',
					value: 'cantidad',
					sortable: false
				},{
					text: 'Calidad',
					value: 'calidad',
					sortable: false
				},{
					text: 'Color',
					value: 'color',
					sortable: false
				}, {
					text: 'Actions',
					value: 'name',
					sortable: false
				}
			],
			desserts: [],
			message: {
				success: true,
				content: ""
			},
			snackbar: false,
			y: 'top',
			x: null,
			mode: '',
			timeout: 6000,
			cotizacion: '',
			swtCosto: false,
			jsonProcess: [],
			exportService: "",
			isProcess: false,
			titleProcess: "Procesar",
			excelLoad: false
		}},
		methods: {
			getTiposArticulos() {
				let self = this;

				axios({
					method: "GET",
					url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.FILLTIPOARTICULO,
					headers: {
						"Authorization": "Bearer " + self.token
						}
					})
					.then(success => {
						for (let i = 0; i < success.data.rows.length; i++) {
							self.itemsTiposArticulos.push({state: success.data.rows[i].name });

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
			getAllArticulos() {
				let self = this;

				axios({
					method: "GET",
					url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.ALLARTICULOS,
					headers: {
						"Authorization": "Bearer " + self.token
					}
				})
				.then(success => {
					for (let i = 0; i < success.data.rows.length; i++) {
						self.cotizacion = success.data.rows[i].CAMBIO_DOLAR;
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
			dialogEventOpen() {
				let self = this;
				self.dialog = true;
				self.editArticle = false;
				console.log(self.cotizacion);
				
			},
			dialogEventClose() {
				let self = this;
				self.editArticle = false;
				self.newArticle = false;
				self.dialog = false;

				setTimeout(function() {
					self.verifyBarcode = '';
					self.barcodeExist = '';
				}, 600);

			},
			articleVerify() {
				let self = this;

				axios({
					method: "POST",
					url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.VERIFYARTICULO,
					headers: {
						"Authorization": "Bearer " + self.token
					},
					data: {
						barcode: self.verifyBarcode
					}
				})
				.then(success => {
					let response = success.data;
					self.barcodeExist = response.success;

					if (response.success === true) {
						self.disbleField = true;
						self.getTiposArticulos();
						self.nombre = response.content.nombre;
						self.cantidad = response.content.cantidad;
						self.costo = response.content.costo;
						self.selectSello = { state: response.content.sello };
						self.selectTiposArticulos = { state: response.content.name };
						self.descripcion = response.content.descripcion;
						self.id = response.content.id;
						self.color = response.content.color;
						self.selectCalidad = { state: response.content.calidad };
						self.selectOrigen = { state: response.content.origen };

					} else if (response.success === false) {
						console.log('new');
						self.newArticle = true;
						self.disbleField = false;
						self.getTiposArticulos();
						self.id = '';
						self.descripcion = '';
						self.nombre = '';
						self.cantidad = '';
						self.costo = '';
						self.color = '';
						self.selectSello = { state: '' };
						self.selectOrigen = { state: '' };
						self.selectTiposArticulos = { state: '' };
						self.selectCalidad = { state: '' };
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
			showImage() {
				let self = this;

				window.open(CONFIG.SERVICE_BASE+CONFIG.SERVICE_URL.SERVEIMAGEARTICULOS+'/'+self.id);
			},
			showImageGrid(item) {
				window.open(CONFIG.SERVICE_BASE+CONFIG.SERVICE_URL.SERVEIMAGEARTICULOS+'/'+item.id);
			},
			showBarcode() {
				window.open(CONFIG.SERVICE_BASE+CONFIG.SERVICE_URL.GENERATEBARCODE+'/'+this.verifyBarcode);
			},
			addNewArticle() {
				let self = this;

				const formData = new FormData();

				formData.append('tipoArticulo', self.selectTiposArticulos.state);
				formData.append('nombre', self.nombre);
				formData.append('cantidad', self.cantidad);
				formData.append('costo', self.costo);
				formData.append('costo_usd', self.costoUSD);
				formData.append('sello', self.selectSello.state);
				formData.append('descripcion', self.descripcion);
				if (self.foto !== '') {
					formData.append('foto_articulo', self.foto);
				}
				formData.append('color', self.color);
				formData.append('barcode', self.verifyBarcode);
				formData.append('calidad', self.selectCalidad.state);
				formData.append('origen', self.selectOrigen.state);

				axios({
					method: "POST",
					url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.ADDARTICLE,
					headers: {
						"Authorization": "Bearer " + self.token
					},
					data: formData
				})
				.then(success => {
					let response = success.data;
					if (response.success === true) {
						self.newArticle = false;
						self.dialog = false;
						self.barcodeExist = '';
						self.selectTiposArticulo = '';
						self.nombre = '';
						self.cantidad = '';
						self.costo = '';
						self.selectSello = '';
						self.descripcion = '';
						self.foto = '';
						self.color = '';
						self.verifyBarcode = '';
						self.selectCalidad = '';
						self.selectOrigen = '';
						self.desserts = [];
						self.getAllArticulos();
						self.handleSnackbar(response.success, response.content);


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
			processFile(event) {
				this.foto = event.target.files[0];
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
			editItem(item) {
				let self = this;
				self.getTiposArticulos();
				self.disbleField = false;
				self.id = item.id;
				self.dialog = true;
				self.barcodeExist = true;
				self.newArticle = false;
				self.editArticle = true;
				self.verifyBarcode = item.barcode;
				self.selectTiposArticulos = { state: item.name };
				self.nombre = item.nombre;
				self.cantidad = item.cantidad;
				self.cotizacion = item.CAMBIO_DOLAR;
				self.costo = item.costo.toFixed(2);
				self.costoUSD = item.costo_usd.toFixed(2);
				self.selectSello = { state: item.sello };
				self.descripcion = item.descripcion;
				self.color = item.color;
				self.selectCalidad = { state: item.calidad };
				self.selectOrigen = { state: item.origen };

			},
			deleteItem(item) {
				let self = this;
				
				let conf = confirm("Esta seguro de Eliminar el Item " + item.barcode);
				if (conf == true) {
					axios({
						method: "DELETE",
						url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.DELETEARTICLE + '/' +item.id,
						headers: {
							"Authorization": "Bearer " + self.token
						}
					})
					.then(success => {
						let response = success.data;
						
						self.desserts = [];
						self.getAllArticulos();
						self.handleSnackbar(response.success, response.content);
					})
					.catch(err => {
						if (err.response.status === 401) {
							self.$localStorage.remove('session');
							self.$router.push({path: '/'});
						} else {
							console.log(err);
						}
					});
				} else {
					return false;
				}
			},
			updateArticle() {
				let self = this;
				let formData = new FormData();
				
				formData.append('tipoArticulo', self.selectTiposArticulos.state);
				formData.append('nombre', self.nombre);
				formData.append('cantidad', self.cantidad);
				formData.append('costo', self.costo);
				formData.append('costo_usd', self.costoUSD);
				formData.append('sello', self.selectSello.state);
				formData.append('descripcion', self.descripcion);
				if (self.foto !== '') {
					formData.append('foto_articulo', self.foto);
				}
				formData.append('color', self.color);
				formData.append('barcode', self.verifyBarcode);
				formData.append('calidad', self.selectCalidad.state);
				formData.append('origen', self.selectOrigen.state);
				formData.append('_method', 'put');
				
				axios({
					method: "POST",
					url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.UPDATEARTICLE + '/' +self.id,
					headers: {
						"Authorization": "Bearer " + self.token
					},
					data: formData
				})
				.then(success => {
					let response = success.data;
					if (response.success === true) {
						self.dialog = false;
						self.barcodeExist = '';
						self.selectTiposArticulo = '';
						self.nombre = '';
						self.cantidad = '';
						self.costo = '';
						self.selectSello = '';
						self.descripcion = '';
						self.foto = '';
						self.color = '';
						self.verifyBarcode = '';
						self.selectCalidad = '';
						self.selectOrigen = '';
						self.desserts = [];
						self.getAllArticulos();
						self.handleSnackbar(response.success, response.content);

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
			calculatePriceUSD() {
				this.costoUSD = (this.costo / this.cotizacion);
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
						if (data.Articulos) {
							
							for (let i = 0; i < data.Articulos.length; i++) {
								
									if (data.Articulos[i].COSTO) {
										self.jsonProcess.push(
											{
												ID: data.Articulos[i].ID,
												NOMBRE: data.Articulos[i].NOMBRE,
												BARCODE: data.Articulos[i].BARCODE,
												COSTO: data.Articulos[i].COSTO,
												TIPO_ART: data.Articulos[i].TIPO_ART,
												COLOR: data.Articulos[i].COLOR,
												CALIDAD: data.Articulos[i].CALIDAD,
												CANTIDAD: data.Articulos[i].CANTIDAD
											}
										);
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
			sendXlsxProcess() {
				let self = this;

				self.isProcess = true;
				self.titleProcess = "Procesando...";
				
				axios({
					method: "POST",
					url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.IMPORT + CONFIG.SERVICE_URL.ARTICLE,
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
					self.desserts = [];
					self.isProcess = false;
					self.titleProcess = "Procesar";
					self.excelLoad = false;
					
					this.getAllArticulos();
				})
				.catch(err => {
					console.log(err);
					self.isProcess = false;
					self.titleProcess = "Procesar";
					self.excelLoad = false;
					document.getElementById("xlsFile").value = null;
				});
			},
			refresh() {
				let self = this;

				self.desserts = [];

				setTimeout(function() {
					self.getAllArticulos();
				}, 200);
			}

		}
	};
</script>