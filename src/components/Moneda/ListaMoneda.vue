<template>
    <v-app light>
        <v-container fluid>
            <v-dialog v-model="dialog" max-width="500px" persistent>
                <v-card>
                    <v-card-title>
                        <span class="headline">Cotización USD</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form>
                                <v-layout row wrap>
                                    <v-text-field
                                        type="number"
										min="1"
										step="0.01"
										placeholder="0.00"
										label="Cambio Actual"
										name="exchange"
										v-model="exchange"
										prefix="$"
                                        required
                                    ></v-text-field>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="updateCurrency">Enviar</v-btn>
                        <v-btn color="red darken-1" flat @click.native="dialog = !dialog">Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <template>
                <v-card>
                    <v-card-title>
                        Lista de Cotizaciones
                        
                        <v-btn flat icon color="blue" v-on:click="editItem">
                            <v-icon>add</v-icon>
                        </v-btn>
                        <v-btn flat icon color="green" v-on:click="refreshDataTable">
                            <v-icon>cached</v-icon>
                        </v-btn>
                        
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
                        :items="desserts"
                        :search="search"
                    >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center text-md-center">{{ props.item.DENOMINATION }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.SYMBOL }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.EXCHANGE }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.CREATED }}</td>
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
                this.getCurrency();

			}
		},
    name: "ListaMoneda",
    data() {
        return {
            token: '',
            id: '',
            created: '',
            exchange: 0,
            denomination: '',
            disabled: true,
            message: {
				success: true,
				content: ""
			},
			snackbar: false,
			y: 'top',
			x: null,
			mode: '',
            timeout: 6000,
            dialog: false,
            headers: [
                {
                    text: 'Denominacion',
                    value: 'DENOMINATION',
                    sortable: false
                }, {
                    text: 'Simbolo',
                    value: 'Symbol',
                    sortable: false
                }, {
                    text: 'Cotización',
                    value: 'EXCHANGE',
                    sortable: false
                }, {
                    text: 'Fecha de Creación',
                    value: 'CREATED',
                    sortable: false
                }],
            desserts: [],
            search: ''
        }
    },
    methods: {
        getCurrency() {
            let self = this;

            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.GETCURRENCY,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    success.data.rows[i].CREATED = moment(success.data.rows[i].CREATED).format('DD/MM/YYYY');
                    self.desserts.push(success.data.rows[i]);
                }
            })
            .catch(error => {
                console.log(error);
            });
            
        },
        updateCurrency() {
            let self = this;

            axios({
                method: "POST",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.ADDCURRENCY,
                headers: {
                    "Authorization": "Bearer " + self.token
                },
                data: {
                    cambio: self.exchange
                }
            })
            .then(success => {
                let response = success.data;
                self.dialog = !self.dialog;
                self.cambio = 0;
                self.desserts =  [];
                self.getCurrency();
                self.handleSnackbar(response.success, response.content);
                
            })
            .catch(error => {
                console.log(error);
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
        editItem() {
            let self = this;
            self.dialog = !self.dialog;
            
        },
        refreshDataTable() {
            let self = this;
            self.desserts = [];
            self.getCurrency()
        }
    }
}
</script>

<style>

</style>
