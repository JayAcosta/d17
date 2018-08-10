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
                                <v-subheader inset><v-container class="text-xs-center text-md-center">INHABILITADOS</v-container></v-subheader>
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
                                    <v-btn icon ripple v-on:click="enableProvider(item)">
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
                    <v-container v-else-if="isList === ''">
                        <v-form>
                            <v-layout row wrap>
                                <v-text-field
                                    v-model="picDescrip"
                                    label="Descripción"
                                    name="desc"
                                    :disabled="disbleField"
                                    required
                                ></v-text-field>
							</v-layout>
                            <v-layout row wrap >
                                <input type="file" accept="image/*" @change="processFile($event)" />
                            </v-layout>
                        </v-form>
                        <br />
                        <v-divider ></v-divider>
                        <v-list two-line subheader>
                            <v-subheader inset><v-container class="text-xs-center text-md-center">LISTA DE SELLOS</v-container></v-subheader>
                            <v-list-tile
                                v-for="item in picItem"
                                :key="item.id"
                            >
                            <v-btn icon ripple v-on:click="showSeal(item)">
                                <v-icon color="green lighten-1">photo</v-icon>
                            </v-btn>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.desc }}</v-list-tile-title>
                            </v-list-tile-content>
                            
                            
                            <v-list-tile-action>
                                <v-btn icon ripple v-on:click="deleteSeal(item)">
                                    <v-icon color="red lighten-1">clear</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-container>
                </v-card-text>
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-container v-if="isImage === false">
                        <v-container v-if="isList === false">
                        <v-container v-if="isEdit === true">
                            <v-flex class="text-md-right text-xs-right">
                                <v-btn color="warning darken-1" flat @click.native="editProvider">Modificar</v-btn>
                                <v-btn color="red darken-1" flat @click.native="closeDialog">Cancelar</v-btn>
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
                    </v-container>
                    <v-container v-else-if="isImage === true">
                        <v-flex class="text-md-right text-xs-right">
                            <v-btn color="blue darken-1" flat v-on:click="sendImage" >Enviar</v-btn>
                            <v-btn color="red darken-1" flat @click.native="closeDialogImage">Cancelar</v-btn>
                        </v-flex>
                    </v-container>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <template>
            <v-card>
                <v-card-title>
                    Lista de Proveedores
                    
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
                            <v-btn icon class="mx-0" @click="openDialogImage(props.item)">
                                <v-icon color="blue">collections</v-icon>
                            </v-btn>
                            <v-btn icon class="mx-0" @click="disableProvider(props.item)">
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
                this.getProviders();
                
            }
    },
    name: "Proveedor",
    data() {
        return {
            id: 0,
            token: 0,
            search: '',
            dialog: false,
            title: '',
            itemsTipoDocumento: [],
            selectTipoDocumento: '',
            idTipoDocumento: 0,
            disbleField: false,
            showNDocument: false,
            nDocumento: '',
            mask: '',
            names: '',
            email: '',
            emailOpt: '',
            postalCode: '',
            phone: '',
            phoneOpt: '',
            direccion: '',
            obs: '',
            snackbar: false,
            y: 'top',
            x: null,
            mode: '',
            timeout: 6000,
            message: {
                success: true,
                content: ''
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
            items: [],
            isImage: false,
            foto: '',
            picDescrip: '',
            picItem: []
            
        }
    },
    methods: {
        processFile(event) {
            this.foto = event.target.files[0];
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
                }
            });
        },
        getProviders() {
            let self = this;
            axios({
                method: 'GET',
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.LISTPROVIDER,
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
        openDialog() {
            let self = this;
            self.dialog = !self.dialog;
            self.title = 'Agregar Proveedor'
            self.getIdTipoDocumento();

        },
        closeDialog() {
            let self = this;
            
            self.dialog = !self.dialog;
            setTimeout(() => {
                self.isEdit = false;
            }, 800);
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
        sendForm() {
            let self = this;
            
            axios({
                method: 'POST',
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.ADDPROVIDER,
                headers: {
                    "Authorization": "Bearer " + self.token
                },
                data: {
                    id_tipo_documento: self.idTipoDocumento,
                    n_documento: self.nDocumento,
                    email: self.email,
                    email_opt: self.emailOpt,
                    nombres: self.names,
                    direccion: self.direccion,
                    codigo_postal: self.postalCode,
                    telefono: self.phone,
                    telefono_opt: self.phoneOpt,
                    observacion: self.obs
                }
             })
             .then(success => {
                 let response = success.data;
                 self.handleSnackbar(response.success, response.content);
                 self.tableItems = [];
                 self.getProviders();
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
                        if (validationErr.id_tipo_documento) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.id_tipo_documento[0];
                        
                        }
                        if (validationErr.n_documento) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.n_documento[0];
                            
                        }
                        if (validationErr.email) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.email[0];
                            
                        }
                        if (validationErr.email_opt) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.email_opt[0];
                            
                        }
                        if (validationErr.nombres) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.nombres[0];

                        }
                        if (validationErr.direccion) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.direccion[0];

                        }
                        if (validationErr.codigo_postal) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.codigo_postal[0];

                        }
                        if (validationErr.telefono) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.telefono[0];

                        }
                        if (validationErr.telefono_opt) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.telefono_opt[0];

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
        disableProvider(props) {
            let self = this;

            let conf = confirm("Esta seguro de inhabilitar este proveedor?");
            
            if (conf === true) {
                
                axios({
                    method: 'DELETE',
                    url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.DISABLEPROVIDER + '/' +props.ID,
                    headers: {
                        "Authorization": "Bearer " + self.token
                    }
                })
                .then(success => {
                    let response = success.data;
                    
                    self.handleSnackbar(response.success, response.content);
                    self.tableItems = [];
                    self.getProviders();
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        self.$localStorage.remove('session');
                        self.$router.push({path: '/'});
                    } else {
                        console.log(error);
                    }
                });
            } else {
                return false;
            }
        },
        openDialogEdit(props) {
            let self = this;

            self.dialog = !self.dialog;
            self.title = "Editar Proveedor";
            self.isEdit = true;
            if (props.TIP_DOC_DES === 'CUIL') {
                self.showNDocument = true;
                self.mask = '##-########-#';
            } else if (props.TIP_DOC_DES === 'CUIT') {
                self.showNDocument = true;
                self.mask = '##-########-#';
            } else if (props.TIP_DOC_DES === 'DNI') {
                self.showNDocument = true;
                self.mask = '##.###.###';
            }

            self.getIdTipoDocumento();
            self.id = props.ID,
            self.selectTipoDocumento = props.TIP_DOC_DES;
            self.nDocumento = props.N_DOC;
            self.names = props.NOM;
            self.email = props.EMAIL;
            self.emailOpt = props.EMAIL_OPT;
            self.postalCode = props.COD_POS;
            self.phone = props.TEL;
            self.phoneOpt = props.TEL_OPT;
            self.direccion = props.DIR;
            self.obs = props.OBS;

        },
        editProvider() {
            let self = this;

            axios({
                method: "POST",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.UPDATEPROVIDER + "/" + self.id,
                headers: {
                    "Authorization": "Bearer " + self.token
                },
                data: {
                    id_tipo_documento: self.idTipoDocumento,
                    n_documento: self.nDocumento,
                    email: self.email,
                    email_opt: self.emailOpt,
                    nombres: self.names,
                    direccion: self.direccion,
                    codigo_postal: self.postalCode,
                    telefono: self.phone,
                    telefono_opt: self.phoneOpt,
                    observacion: self.obs,
                    _method: "put"
                }
            })
            .then(success => {
                let response = success.data;
                
                self.isEdit = false;
                self.handleSnackbar(response.success, response.content);
                self.tableItems = [];
                self.getProviders();
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
                        if (validationErr.id_tipo_documento) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.id_tipo_documento[0];
                        }
                        if (validationErr.n_documento) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.n_documento[0];
                        }
                        if (validationErr.email) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.email[0];
                        }
                        if (validationErr.email_opt) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.email_opt[0];
                        }
                        if (validationErr.nombres) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.nombres[0];
                        }
                        if (validationErr.direccion) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.direccion[0];
                        }
                        if (validationErr.codigo_postal) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.codigo_postal[0];
                        }
                        if (validationErr.telefono) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.telefono[0];
                        }
                        if (validationErr.telefono_opt) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.telefono_opt[0];
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
        refreshTable() {
            let self = this;

            self.tableItems = [];
            self.getProviders();
        },
        getDisableProvider() {
            let self = this;
            
            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.GETDISABLEDPROVIDERS,
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
        openDialogList() {
            let self = this;
            
            self.dialog = !self.dialog;
            self.isList = true;
            self.title = "Habilitar Proveedor";
            self.getDisableProvider();
        },
        closeDialogList() {
            let self = this;
            
            self.dialog = !self.dialog;
            setTimeout(() => {
                self.isList = false;
                self.items = [];
            }, 500);
        },
        openDialogImage(props) {
            let self = this;
    
            self.dialog = !self.dialog;
            self.id = props.ID;
            self.isImage = true;
            self.isList = '';
            self.title = "Gestionar Sellos";

            self.getProviderSeal(props.ID);

        },
        closeDialogImage() {
            let self = this;

            self.dialog = !self.dialog;
            setTimeout(() => {
                self.isImage = false;
                self.isList = false;
                self.picItem = [];
            }, 500);
        },
        getProviderSeal(id) {
            let self = this;
            
            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.PROVIDER+'/'+id+CONFIG.SERVICE_URL.SEAL,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
             })
             .then(success => {
                 for (let i = 0; i < success.data.rows.length; i++) {
                     self.picItem.push({
                         id: success.data.rows[i].SEAL_ID,
                         desc: success.data.rows[i].SEAL_DES
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
        showSeal(props) {
            window.open(CONFIG.SERVICE_BASE+CONFIG.SERVICE_URL.PROVIDER+CONFIG.SERVICE_URL.SEAL+"/"+props.id+CONFIG.SERVICE_URL.SERVE);
        },
        deleteSeal(props) {
            let self = this;

            let conf = confirm("Esta seguro de eliminar este Sello");

            if (conf === true) {

                axios({
                    method: "DELETE",
                    url: CONFIG.SERVICE_BASE+CONFIG.SERVICE_URL.PROVIDER+CONFIG.SERVICE_URL.SEAL+"/"+props.id,
                    headers: {
                        "Authorization": "Bearer " + self.token
                    }
                })
                .then(success => {
                    let response = success.data;

                    self.picItem = [];
                    self.handleSnackbar(response.success, response.content);
                    self.closeDialogImage();
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
        sendImage() {
            let self = this;
            let formData = new FormData();

            formData.append("descripcion", self.picDescrip);
            formData.append("fotoSello", self.foto);

            axios({
                method: "POST",
                url: CONFIG.SERVICE_BASE+CONFIG.SERVICE_URL.PROVIDER+"/"+self.id+CONFIG.SERVICE_URL.SEAL,
                headers: {
                    "Authorization": "Bearer " + self.token
                },
                data: formData
            })
            .then(success => {
                let response = success.data;
                
                self.picDescrip = '';
                self.foto = '';
                self.picItem = [];
                self.handleSnackbar(response.success, response.content);
                self.closeDialogImage();
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
                        if (validationErr.descripcion) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.descripcion[0];
                        }
                        if (validationErr.fotoSello) {
                            self.message.success = self.message.success,
                            self.message.content = validationErr.fotoSello[0];
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
        enableProvider(props) {
            let self = this;

            let conf = confirm("Esta seguro de habilitar este Proveedor ?");

            if (conf === true) {
                axios({
                    method: "POST",
                    url: CONFIG.SERVICE_BASE+CONFIG.SERVICE_URL.ENABLEPROVIDER+"/"+props.id,
                    headers: {
                        "Authorization": "Bearer " + self.token
                    },
                    data: {
                        _method: "put",
                    }
                })
                .then(success => {
                    let response = success.data;
                
                    self.items = [];
                    self.handleSnackbar(response.success, response.content);
                    self.closeDialogList();
                    self.refreshTable();
                })
                .catch(err => {
                    if (err.response.status === 401) {
                        self.$localStorage.remove('session');
                        self.$router.push({path: '/'});
                    } else {
                        console.log(err);
                    }
                })
            } else {
                return false;
            }
        }
    }
}
</script>

<style>

</style>
