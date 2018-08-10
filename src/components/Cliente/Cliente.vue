<template>
<v-app light>
    <v-container fluid>
        <v-dialog v-model="dialog" max-width="500px" persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">{{title}}</span>
                </v-card-title>
                
                <v-card-text>
                    <v-container v-if="isList === true">
                        <v-list two-line subheader>
                            <v-subheader inset>Usuarios inhabilitados</v-subheader>
                            <v-list-tile
                                v-for="item in items"
                                :key="item.title"
                            >
                            <v-list-tile-avatar>
                                <v-icon class="grey lighten-1 white--text">person</v-icon>
                                </v-list-tile-avatar>
                                
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    <v-list-tile-sub-title>Email: {{ item.email }}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>Tel: {{item.phone}}</v-list-tile-sub-title>
                                    <v-list-tile-sub-title>Fecha: {{ item.subtitle }}</v-list-tile-sub-title>
                                </v-list-tile-content>
                                
                                <v-list-tile-action>
                                    <v-btn icon ripple v-on:click="enableClient(item.id)">
                                        <v-icon color="blue lighten-1">check</v-icon>
                                    </v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-container>
                    <v-container v-else-if="isList === false">
                        <v-form>
                            <v-layout row wrap>
                                <v-select @change="changedValue" @selected="selectTipoDocumento"
                                    :items="itemsTipoDocumento"
                                    v-model="selectTipoDocumento"
                                    label="Seleccione tipo de documento"
                                    single-line
                                    item-text="state"
                                    :disabled="disbleField"
                                    return-object
                                    persistent-hint
                                ></v-select>
                            </v-layout>
                            <v-layout row wrap v-if="showNDocument === true">
                                <v-text-field
                                    label="N# documento"
                                    name="document"
                                    v-model="nDocumento"
                                    :mask="mask"
                                    required
                                ></v-text-field>
                            </v-layout>
                             <v-layout row wrap>
                                <v-text-field
                                    label="Nombres"
                                    name="names"
                                    v-model="names"
                                    required
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-text-field
                                    label="Email Principal"
                                    name="email"
                                    v-model="email"
                                    placeholder="ejemplo@dominio.com"
                                    autocapitalize="off"
                                    required
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-text-field
                                    label="Email opcional"
                                    name="emailopt"
                                    v-model="emailOpt"
                                    placeholder="Opcional"
                                    autocapitalize="off"
                                    required
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-text-field
                                    label="Código postal"
                                    name="postalcode"
                                    v-model="postalCode"
                                    required
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-text-field
                                    type="number"
                                    label="Télefono principal"
                                    name="phone"
                                    v-model="phone"
                                    required
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-text-field
                                    type="number"
                                    label="Télefono opcional"
                                    name="phoneopt"
                                    v-model="phoneOpt"
                                    placeholder="Opcional"
                                    required
                                ></v-text-field>
                            </v-layout>
                            <v-layout row wrap>
                                <v-textarea
                                    v-model="direccion"
                                    label="Dirección"
                                    name="direction"
                                    :disabled="disbleField"
                                    required
								></v-textarea>
							</v-layout>
                            <v-layout row wrap>
                                <v-textarea
                                    v-model="obs"
                                    label="Observación"
                                    name="obs"
                                    :disabled="disbleField"
                                    required
								></v-textarea>
							</v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-container v-if="isList === false">
                    <v-container v-if="isEdit === true">
                        <v-flex class="text-md-right text-xs-right">
							<v-btn color="warning darken-1" flat v-on:click="editClient">Modificar</v-btn>
							<v-btn color="red darken-1" flat v-on:click="closeDialog">Cancelar</v-btn>
                        </v-flex>
					</v-container>
					<v-container v-else-if="isEdit === false">
                        <v-flex class="text-md-right text-xs-right">
							<v-btn color="blue darken-1" flat @click.native="sendForm">Enviar</v-btn>
                            <v-btn color="red darken-1" flat @click.native="closeDialog">Cancelar</v-btn>
                        </v-flex>
					</v-container>
                    </v-container>
                    <v-container v-else-if="isList === true">
                        <v-flex class="text-md-right text-xs-right">
                            <v-btn color="red darken-1" flat @click.native="closeDialogList">Cancelar</v-btn>
                        </v-flex>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <template>
            <v-card>
                <v-card-title>
                    Lista de Clientes
                    
                    <v-btn flat icon color="gray" v-on:click="refreshTable">
                        <v-icon>cached</v-icon>
                    </v-btn>
                    <v-btn flat icon color="gray" v-on:click="openDialogList">
                        <v-icon>toc</v-icon>
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
                        :items="tableItems"
                        :search="search"
                    >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center text-md-center">{{ props.item.NOM }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.TEL }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.EMAIL }}</td>
                        <td class="text-xs-center text-md-center">{{ props.item.DIR }}</td>
                        <td class="justify-center layout px-0">
                            <v-btn icon class="mx-0" @click="openDialogEdit(props.item)">
                                <v-icon color="teal">edit</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="disableClient(props.item)">
                                <v-icon color="pink">delete</v-icon>
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
                v-on:click="openDialog"
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
// Libs

import axios from "axios";

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
                this.getClients();
                
            }
        },
    name: "Cliente",
    data(){
        return {
            id: 0,
            title: '',
            search: '',
            token: '',
            dialog: false,
            disbleField: false,
            itemsTipoDocumento: [],
            selectTipoDocumento: '',
            idTipoDocumento: 0,
            nDocumento: '',
            email: '',
            emailOpt: '',
            names: '',
            direccion: '',
            postalCode: '',
            phone: '',
            phoneOpt: '',
            obs: '',
            mask: '',
            showNDocument: false,
            snackbar: false,
            y: "top",
            x: null,
            mode: "",
            timeout: 6000,
            message: {
                success: true,
                content: ""
            },
            tableItems: [],
            headers: [
                {
                    text: 'NOMBRES',
                    value: 'NOM',
                    sortable: false
                }, {
                    text: 'TELEFONO',
                    value: 'TEL',
                    sortable: false
                }, {
                    text: 'CORREO',
                    value: 'EMAIL',
                    sortable: false
                }, {
                    text: 'DIRECCIÓN',
                    value: 'DIR',
                    sortable: false
                }, {
                    text: 'OPERACIONES',
                    sortable: false
                }
            ],
            isEdit: false,
            isList: false,
            items: []
        }
    },
    methods: {
        getClients() {
            let self = this;
            
            axios({
                method: 'GET',
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.ALLCLIENT,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.tableItems.push(success.data.rows[i]);
                    
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
        getIdTipoDocumento() {
            let self = this;

            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.FILLTIPODOCUMENTO,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.itemsTipoDocumento.push({
                        id: success.data.rows[i].ID,
                        state: success.data.rows[i].DESCRIPTION
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
        changedValue: function(selected) {
            let self = this;
            self.idTipoDocumento = selected.id;
            
            if (selected.state === 'CUIL') {
                self.showNDocument = true;
                self.mask = '##-########-#';
            } else if (selected.state === 'CUIT') {
                self.showNDocument = true;
                self.mask = '##-########-#';
            } else if (selected.state === 'DNI') {
                self.showNDocument = true;
                self.mask = '##.###.###';
            }
        },
        sendForm() {
            let self = this;
            axios({
                method: "POST",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.ADDCLIENT,
                headers: {
                    "Authorization": "Bearer " + self.token
                },
                data: {
                    idTipoDocumento: self.idTipoDocumento,
                    numDocumento: self.nDocumento,
                    email: self.email,
                    emailOpt: self.emailOpt,
                    nombres: self.names,
                    direccion: self.direccion,
                    codigoPostal: (self.postalCode !== '') ? self.postalCode : 0,
                    telefono: self.phone,
                    telefonoOpt: self.phoneOpt,
                    observacion: self.obs
                }
            })
            .then(success => {
                let response = success.data;
                self.dialog = !self.dialog;
                self.handleSnackbar(response.success, response.content);
                self.tableItems = [];
                self.getClients();
                self.closeDialog();
            })
            .catch(err => {
                let validationErr = err.response.data.errors;
                let customErr = err.response.data;
                
                if (err.response.status === 400) {
                    if (customErr) {
                        self.message.success = customErr.success;
                        self.message.content = customErr.content;
                    
                    }
                    if (validationErr) {
                        if (validationErr.idTipoDocumento) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.idTipoDocumento[0];
                            
                        }
                        if (validationErr.numDocumento) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.numDocumento[0];
                            
                        }
                        if (validationErr.email) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.email[0];
                            
                        }
                        if (validationErr.emailOpt) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.emailOpt[0];
                            
                        }
                        if (validationErr.nombres) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.nombres[0];

                        }
                        if (validationErr.direccion) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.direccion[0];

                        }
                        if (validationErr.codigoPostal) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.codigoPostal[0];

                        }
                        if (validationErr.telefono) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.telefono[0];

                        }
                        if (validationErr.telefonoOpt) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.telefonoOpt[0];

                        }
                        if (validationErr.observacion) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.observacion[0];

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
        openDialog() {
            let self = this;
            self.dialog = !self.dialog;
            self.title = 'Agregar Cliente';
            self.getIdTipoDocumento();

        },
        closeDialog() {
            let self = this;
            self.dialog = false;
            self.isEdit = false;
            self.itemsTipoDocumento = [];
            self.selectTipoDocumento = '';
            self.showNDocument = false;
            self.idTipoDocumento = 0;
            self.nDocumento = '';
            self.email = '';
            self.emailOpt = '',
            self.names = '';
            self.direccion = '';
            self.postalCode = '';
            self.phone = '';
            self.phoneOpt = '',
            self.obs = '';
            
        },
        editClient() {
            let self = this;

            axios({
                method: "POST",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.EDITCLIENT+ '/' +self.id,
                headers: {
                    "Authorization": "Bearer " + self.token
                },
                data: {
                    idTipoDocumento: self.idTipoDocumento,
                    numDocumento: self.nDocumento,
                    email: self.email,
                    emailOpt: self.emailOpt,
                    nombres: self.names,
                    direccion: self.direccion,
                    codigoPostal: (self.postalCode !== '') ? self.postalCode : 0,
                    telefono: self.phone,
                    telefonoOpt: self.phoneOpt,
                    observacion: self.obs,
                    _method: "put"
                }
            })
            .then(success => {
                let response = success.data;
                self.isEdit = false;
                self.dialog = !self.dialog;
                self.handleSnackbar(response.success, response.content);
                self.tableItems = [];
                self.getClients();
                self.closeDialog();
            })
            .catch(err => {
                let validationErr = err.response.data.errors;
                let customErr = err.response.data;
                
                if (err.response.status === 400) {
                    if (customErr) {
                        self.message.success = customErr.success;
                        self.message.content = customErr.content;
                    
                    }
                    if (validationErr) {
                        if (validationErr.idTipoDocumento) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.idTipoDocumento[0];
                            
                        }
                        if (validationErr.numDocumento) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.numDocumento[0];
                            
                        }
                        if (validationErr.email) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.email[0];
                            
                        }
                        if (validationErr.emailOpt) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.emailOpt[0];
                            
                        }
                        if (validationErr.nombres) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.nombres[0];

                        }
                        if (validationErr.direccion) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.direccion[0];

                        }
                        if (validationErr.codigoPostal) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.codigoPostal[0];

                        }
                        if (validationErr.telefono) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.telefono[0];

                        }
                        if (validationErr.telefonoOpt) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.telefonoOpt[0];

                        }
                        if (validationErr.observacion) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.observacion[0];

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
        },
        openDialogEdit(item) {
            let self = this;
            self.dialog = !self.dialog;
            self.title = 'Editar Cliente';
            self.isEdit = true;
            if (item.TIP_DOC_DES === 'CUIL') {
                self.showNDocument = true;
                self.mask = '##-########-#';
            } else if (item.TIP_DOC_DES === 'CUIT') {
                self.showNDocument = true;
                self.mask = '##-########-#';
            } else if (item.TIP_DOC_DES === 'DNI') {
                self.showNDocument = true;
                self.mask = '##.###.###';
            }

            self.getIdTipoDocumento();
            self.id = item.ID,
            self.selectTipoDocumento = item.TIP_DOC_DES;
            self.nDocumento = item.N_DOC;
            self.names = item.NOM;
            self.email = item.EMAIL;
            self.emailOpt = item.EMAIL_OPT;
            self.postalCode = item.COD_POS;
            self.phone = item.TEL;
            self.phoneOpt = item.TEL_OPT;
            self.direccion = item.DIR;
            self.obs = item.OBS;
        },
        disableClient(item) {
            let self = this;

            let conf = confirm("Esta seguro de inhabilitar este cliente?");

            if (conf === true) {

                axios({
                    method: 'DELETE',
                    url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.SOFTDELETECLIENT + '/' +item.ID,
                    headers: {
                        "Authorization": "Bearer " + self.token
                    }
                })
                .then(success => {
                    let response = success.data;

                    setTimeout(() => {
                        self.items = [];
                    }, 500);
                    
                    self.handleSnackbar(response.success, response.content);
                    self.tableItems = [];
                    self.getClients();
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
        openDialogList() {
            let self = this;
            
            self.isList = true;
            self.dialog = !self.dialog;
            self.title = 'Habilitar cliente';
            self.getDisabledClients();
        },
        closeDialogList() {
            let self = this;
            
            self.dialog = !self.dialog;
            setTimeout(() => {
                self.isList = false;
                self.items = [];
            }, 500);

        },
        enableClient(item) {
            let self = this;
            
            let conf = confirm("Esta seguro de habilitar este cliente ?");

            if (conf === true) {
                axios({
                    method: "POST",
                    url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.ENABLECLIENT+ '/' +item,
                    headers: {
                        "Authorization": "Bearer " + self.token
                    },
                    data: {
                        _method: "put"
                    }
                })
                .then(success => {
                    let response = success.data;
                    
                    self.dialog = !self.dialog;
                    setTimeout(() => {
                        self.isList = false;
                        self.items = [];
                    }, 500);
                    
                    self.handleSnackbar(response.success, response.content);
                    self.tableItems = [];
                    self.getClients();
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
        getDisabledClients() {
            let self = this;

            axios({
                method: 'GET',
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.ALLDISABLEDCLIENT,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.items.push({
                        id: success.data.rows[i].ID,
                        title: success.data.rows[i].NOM,
                        email: success.data.rows[i].EMAIL,
                        phone: success.data.rows[i].TEL,
                        subtitle: success.data.rows[i].FEC_CRE
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
        refreshTable() {
            let self = this;
            
            self.tableItems = [];
            self.getClients();
        }
    }
}
</script>

<style>

</style>
