<template>
    <v-app light>
        <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs4 sm4 md4>
          <v-card color="blue-grey lighten-1">
              <v-toolbar color="blue lighten-2" dark>
          <v-toolbar-title>Ventas</v-toolbar-title>
        </v-toolbar>
          <v-card-text class="px-0">
              <v-container>
           <v-layout wrap style="max-height: 250px; overflow-y: scroll">
            <v-card width="800px">
                <v-list two-line subheader>
                    
                    <v-list-tile
                        v-for="item in salesItems"
                        :key="item.title"
                        avatar
                    >
                    
                    <v-list-tile-avatar>
                        <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                        <!-- <v-list-tile-sub-title>{{ item.typeSale }}</v-list-tile-sub-title> -->
                        <v-list-tile-sub-title>{{ item.name }}</v-list-tile-sub-title>
                    </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1" v-on:click="loadDetail(item)">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
       </v-layout>
       </v-container>
       <v-toolbar color="teal lighten-2" dark>
            <v-toolbar-title>Reparaciones</v-toolbar-title>
        </v-toolbar>
       <v-container>
           <v-layout wrap style="max-height: 250px; overflow-y: scroll">
            <!-- detalle aqui  -->
           </v-layout>
       </v-container>
       <v-toolbar color="orange lighten-2" dark>
            <v-toolbar-title>Reparto</v-toolbar-title>
        </v-toolbar>
       <v-container>
           <v-layout wrap style="max-height: 250px; overflow-y: scroll">
            <!-- detalle aqui  -->
           </v-layout>
       </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 sm6 md6>
          <v-card color="blue-grey lighten-1">
          <v-card-text class="px-0">
              <v-container >
           <v-card v-if="showDetail == true" class="card--flex-toolbar">
               <v-toolbar color="grey darken-1" dark>
                   <v-toolbar-title>Lista Detalle</v-toolbar-title>
                </v-toolbar>
                    <v-card-text>
                        <br />
                        <v-layout row wrap>
                            <v-flex xs12 sm12 md12>
                                <b>{{fullname}}</b>
                            </v-flex>
                        </v-layout>
                        <br />
                        <v-layout row wrap>
                            <v-flex xs12 sm2 md2>
                                Cantidad
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                Descripción
                            </v-flex>
                            <v-flex xs12 sm2 md2>
                                Precio
                            </v-flex>
                            <v-flex xs12 sm2 md2>
                                Subtotal
                            </v-flex>
                        </v-layout>
                        <template v-for="slot in detailArr">
                            <v-container grid-list-md style="padding-bottom: 0px; padding-top: 0px;">
                                <v-layout row wrap>
                                    <v-flex xs12 sm2 md2>
                                        <input
                                            type="text"
                                            style="font-size: 10px; width: 42px;"
                                            v-model="slot.cant"
                                            readonly
                                        />
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <input
                                            type="text"
                                            style="font-size: 10px; width: 149px;"
                                            v-model="slot.descrip"
                                            readonly
                                        />
                                    </v-flex>
                                    <v-flex xs12 sm2 md2 style="padding-left: 22px;">
                                        <input
                                            type="text"
                                            style="font-size: 10px; width: 42px;"
                                            v-model="slot.price"
                                            readonly
                                        />
                                    </v-flex>
                                    <v-flex xs12 sm2 md2 style="padding-left: 22px;">
                                        <input
                                            type="text"
                                            style="font-size: 10px; width: 42px;"
                                            v-model="slot.subtotal"
                                            readonly
                                        />
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </template>
                        <br />
                        <v-layout row wrap>
                            <v-flex xs12 sm10 md10>
                                Total:
                            </v-flex>
                            <v-flex xs12 sm2 md2>
                                <input
                                    type="text"
                                    style="font-size: 10px; width: 42px;"
                                    v-model="totalConst"
                                    readonly
                                />
                            </v-flex>
                        </v-layout>
                        <v-container>
                            <v-layout row wrap>
                            <v-flex xs12 sm12 md12 class="text-xs-left text-sm-left text-md-left">
                                Abonado:
                            </v-flex>
                            <v-flex xs10 sm10 md10>
                                Efectivo
                            </v-flex>
                            <v-flex xs2 sm2 md2 class="text-xs-right text-sm-right text-md-right">
                                <input
                                    type="text"
                                    style="font-size: 10px; width: 149px;"
                                    v-model="abonadoCash"
                                    readonly
                                />
                            </v-flex>
                            <v-flex xs10 sm10 md10>
                                Débito
                            </v-flex>
                            <v-flex xs2 sm2 md2 class="text-xs-right text-sm-right text-md-right">
                                <input
                                    type="text"
                                    style="font-size: 10px; width: 149px;"
                                    v-model="abonadoDebit"
                                    readonly
                                />
                            </v-flex>
                            <v-flex xs10 sm10 md10>
                                Cheque
                            </v-flex>
                            <v-flex xs2 sm2 md2 class="text-xs-right text-sm-right text-md-right">
                                <input
                                    type="text"
                                    style="font-size: 10px; width: 149px;"
                                    v-model="abonadoCheck"
                                    readonly
                                />
                            </v-flex>
                            <v-flex v-if="totalRef >= 0" xs10 sm10 md10 class="text-xs-left text-sm-left text-md-left">
                                Faltante:
                            </v-flex>
                            <v-flex v-if="totalRef >= 0" xs2 sm2 md2 class="text-xs-right text-sm-right text-md-right">
                                <input
                                    type="text"
                                    style="font-size: 10px; width: 149px;"
                                    v-model="totalRef"
                                    readonly
                                />
                            </v-flex>
                            <v-flex v-if="totalFavor != 0" xs10 sm10 md10 class="text-xs-left text-sm-left text-md-left">
                                A Favor:
                            </v-flex>
                            <v-flex v-if="totalFavor != 0" xs2 sm2 md2 class="text-xs-right text-sm-right text-md-right">
                                <input
                                    type="text"
                                    style="font-size: 10px; width: 149px;"
                                    v-model="totalFavor"
                                    readonly
                                />
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card-text>
                <v-card-actions>
                    <v-container v-if="total == 0 || total < 0" xs12 sm12 md12 class="text-xs-center text-sm-center text-md-center">
                        <v-btn
                            round
                            dark
                            color="blue lighten-1"
                            v-on:click="consolidateCharge"
                        >
                            Consolidar
                        </v-btn>
                        <v-btn
                            round
                            dark
                            color="red lighten-1"
                            v-on:click="cleanData"
                        >
                            Limpiar
                        </v-btn>
                    </v-container>
                </v-card-actions>
            </v-card>
            <v-card v-if="showDetail == false">
                    <v-toolbar color="grey darken-1" dark>
                            <v-toolbar-title>Lista Detalle</v-toolbar-title>
                        </v-toolbar>
                    <v-card-text>
                        Click en cualquier Venta, Reparación o Reparto para continuar.
                    </v-card-text>
            </v-card>
       </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2 sm2 md2>
        <v-card dark color="blue-grey lighten-1">
            <v-toolbar color="indigo lighten-2" dark>
                <v-toolbar-title>Cobros</v-toolbar-title>
            </v-toolbar>
          <v-card-text class="px-0">
              <v-btn round color="success" :disabled="disableCash" v-on:click="openCashModal">Efectivo</v-btn>
              <br /><br />
              <v-btn round color="cyan" :disabled="disableDebit" v-on:click="openDebitModal">Débito</v-btn>
              <br /><br />
              <v-btn round color="warning" :disabled="disableCredit" v-on:click="payCredit">Crédito</v-btn>
              <br /><br />
              <v-btn round color="primary" :disabled="disableCheck" v-on:click="openCheckModal">Cheque</v-btn>
              <br /><br />
              <v-btn round color="info" :disabled="disableCtaCte" v-on:click="openCtaCteModal">Cta/Cte</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-card-title class="headline">
            <v-container class="text-xs-center text-sm-center text-md-center">
                {{modalTitle}}
            </v-container>
        </v-card-title>
        <v-card-text>
            <v-layout row wrap  v-if="payActive == 'cash' || payActive == 'debit'">
                <v-flex xs12 sm12 md12>
                    <v-text-field
                        type="number"
                        :max="totalInicial"
                        min="0"
                        label="Monto"
                        v-model="total"
                        prefix="$"
                        readonly
                    ></v-text-field>
                </v-flex>
                <v-flex xs6 sm6 md6>
                    <v-btn fab dark small color="red lighten-1" v-on:click="subTotal">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs6 sm6 md6>
                    <v-btn fab dark small color="blue lighten-1" v-on:click="sumTotal">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex xs12 sm12 md12>
                    <v-slider
                        v-model="total"
                        :max="totalInicial"
                        min="0"
                        step="1"
                    ></v-slider>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-if="payActive == 'cta/cte'">
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex x12 sm3 md3>
                            <v-text-field
                                label="N# Factura"
                                v-model="correlative"
                                readonly
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                            <v-text-field
                                label="Descripción"
                                v-model="giroDescrip"
                                required
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm3 md3>
                            <v-text-field
                                type="number"
                                label="Total"
                                step="0.01"
                                min="0"
                                prefix="$"
                                v-model="total"
                                readonly
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-layout>
            <v-layout row wrap v-if="payActive == 'check'">
                <!-- <template v-for="data in checkData">
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 md6>
                                        {{data.id}}
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        {{data.cant}}
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </template> -->
                <v-flex xs12 sm12 md12>
                    <v-autocomplete
                        @change="changedValue"
                        @selected="bank"
                        :items="bankList"
                        v-model="bank"
                        label="Bancos"
                        single-line
                        item-text="name"
                        return-object
                        autocomplete
                    ></v-autocomplete>
                </v-flex>
                <v-container grid-list-xs grid-list-sm grid-list-md>
                    <v-layout wrap>
                        <v-flex xs6 sm6 md6>
                            <v-menu
                                :close-on-content-click="false"
                                v-model="menu1"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                                min-width="290px"
                            >
                            <v-text-field
                                slot="activator"
                                v-model="computedDateFormatted1"
                                label="Emision"
                                persistent-hint
                                prepend-icon="event"
                                readonly
                            ></v-text-field>
                                <v-date-picker v-model="date1" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs6 sm6 md6>
                            <v-menu
                                :close-on-content-click="false"
                                v-model="menu2"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                                min-width="290px"
                            >
                            <v-text-field
                                slot="activator"
                                v-model="computedDateFormatted2"
                                label="Cobro"
                                persistent-hint
                                prepend-icon="event"
                                readonly
                            ></v-text-field>
                                <v-date-picker v-model="date2" no-title @input="menu2 = false"></v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-container grid-list-xs grid-list-sm grid-list-md>
                    <v-layout wrap>
                        <v-flex xs6 sm6 md6>
                            <v-text-field
                                type="number"
                                label="N#"
                                min="1"
                                v-model="nCheck"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6 sm6 md6>
                            <v-text-field
                                type="number"
                                label="Monto"
                                min="1"
                                v-model="montCheck"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-container grid-list-xs grid-list-sm grid-list-md>
                    <v-layout wrap>
                        <v-flex xs6 sm6 md6>
                            <v-text-field
                                label="Propietario"
                                v-model="fullname"
                                readonly
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs6 sm6 md6>
                            <v-text-field
                                label="Títular"
                                v-model="creator"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-container grid-list-xs grid-list-sm grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12 md12>
                            <v-list two-line>
                                <v-list-tile
                                    v-for="item in checkData"
                                    :key="item.id"
                                >
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <b>Número:</b> {{item.num}}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                                
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <b>Monto:</b> {{item.mont}}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                                <!-- <v-list-tile-action>
                                    <v-btn icon ripple v-on:click="deleteCheck(item.num)">
                                        <v-icon color="red">remove</v-icon>
                                    </v-btn>
                                </v-list-tile-action> -->
                                </v-list-tile>
                            </v-list>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-container grid-list-xs grid-list-sm grid-list-md>
                    <v-btn fab dark color="blue lighten-1" v-on:click="addCheck">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </v-container>
            </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="payActive === 'cash' || payActive === 'debit'" color="red darken-1" flat @click.native="cancelPayCashDebitCredit">Cancelar</v-btn>
          <v-btn v-if="payActive === 'cash'" color="blue darken-1" flat @click.native="payCash">Aceptar</v-btn>
          <v-btn v-if="payActive === 'debit'" color="blue darken-1" flat @click.native="payDebit">Aceptar</v-btn>
          <v-btn v-if="payActive === 'check'" color="red darken-1" flat @click.native="cancelPayCheck">Cancelar</v-btn>
          <v-btn v-if="payActive === 'check'" color="blue darken-1" flat @click.native="payCheck">Aceptar</v-btn>
          <v-btn
            v-if="payActive === 'cta/cte'"
            outline
            color="indigo"
            class="white--text"
            @click.native="consolidateCharge"
            >
                Agregar Giro
          </v-btn>
          <v-btn
            v-if="payActive === 'cta/cte'"
            outline
            color="red"
            class="white--text"
            @click.native="cancelPayCtaCte"
            >
                Cancelar
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
            this.token = savedSession.token;
            this.getSales();

        }
    },
    name: "Cobros",
    props: {
		right: Number
	},
    data() {
        return {
            id: 0,
            idCli: 0,
            idFac: 0,
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
            salesItems: [],
            showDetail: false,
            detailArr: [],
            totalInicial: 0,
            totalConst: 0,
            total: 0,
            totalRef: 0,
            totalOther: 0,
            dialog: false,
            fullname: '',
            disableCash: true,
            disableDebit: true,
            disableCredit: true,
            disableCheck: true,
            disableCtaCte: true,
            abonadoDebit: 0,
            abonadoCash: 0,
            abonadoCheck: 0,
            payActive: '',
            modalTitle: '',
            date2: null,
            date1: null,
            menu1: false,
            dateFormatted1: null,
            menu2: false,
            bank: '',
            bankList: [],
            nCheck: '',
            montCheck: '',
            checkData: [],
            creator: '',
            totalFavor: 0,
            subCheck: 0,
            checkNumArr: [],
            checkSumArr: [],
            totalRef: 0,
            correlative: 0,
            giroDescrip: '',
            typeSale: 0,
            disableAceptar: false
        }
    },
    computed: {
        computedDateFormatted1 () {
            return this.formatDate1(this.date1);
        },
        computedDateFormatted2() {
            return this.formatDate1(this.date2);
        }
    },
    watch: {
        date1 (val) {
            this.dateFormatted1 = this.formatDate1(this.date1);
        },
        date2 (val) {
            this.dateFormatted1 = this.formatDate1(this.date2);
        }
    },
    methods: {
        getBanks() {
            let self = this;
            
            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.GETBANKS,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                for (let i = 0; i < success.data.rows.length; i++) {
                    self.bankList.push({
                        id: success.data.rows[i].id,
                        code: success.data.rows[i].code,
                        name: success.data.rows[i].name
                     });
                }
            })
            .catch(err => {
                console.log(err);
            });

        },
        formatDate1 (date) {
            if (!date) return null;
            
            const [year, month, day] = date.split('-');
            
            return `${day}-${month}-${year}`;
        },
        parseDate1 (date) {
            if (!date) return null;
            
            const [month, day, year] = date.split('/');
            
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        getSales() {
            let self = this;
            
            axios({
                method: "GET",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.GETSALES,
                headers: {
                    "Authorization": "Bearer " + self.token
                }
            })
            .then(success => {
                  for (let i = 0; i < success.data.rows.length; i++) {
                     self.salesItems.push({
                         icon: 'shopping_basket',
                         iconClass: 'grey lighten-1 white--text',
                         title: success.data.rows[i].COR_FAC,
                         typeSale: success.data.rows[i].TIP_VEN,
                         subtitle: moment(success.data.rows[i].CRE_FEC).format("DD-MM-YYYY"),
                         client: success.data.rows[i].ID_CLI,
                         fac: success.data.rows[i].ID_FAC,
                         id: success.data.rows[i].ID,
                         codigoFactura: success.data.rows[i].COR_FAC,
                         estatus: success.data.rows[i].EST,
                         items: JSON.parse(success.data.rows[i].ITEMS),
                         name: self.verifyName(success.data.rows[i].NOM),
                         total: success.data.rows[i].TTL,
                         dir: success.data.rows[i].DIR,
                         favor: (success.data.rows[i].SAL_FAV != null) ? success.data.rows[i].SAL_FAV : 0
                     });
                }
            })
            .catch(err => {
                console.log(err);
            });


        },
        loadDetail(arr) {
            let self = this;
            
            self.fullname = '';
            self.detailArr = [];
            self.showDetail = true;
            self.abonadoDebit = 0;
            self.abonadoCash = 0;
            
            for (let j = 0; j < arr.items.length; j++) {
                self.detailArr.push({
                    cant: arr.items[j].CANTIDAD,
                    descrip: arr.items[j].DESCRIPCION,
                    price: arr.items[j].PRECIO,
                    subtotal: arr.items[j].SUBTOTAL,
                });
            }
            
            if (arr.typeSale == 1) {
                self.disableDebit = false;
                self.disableCredit = false;
                self.disableCash = false;
                self.disableCheck = true;
                self.disableCtaCte = true;
                
                self.typeSale = 1;
                self.total = arr.total;
                self.totalInicial = arr.total;
                self.totalConst = arr.total;
                self.totalRef = arr.total;
                self.id = arr.id;
                self.idFac = arr.fac;
            
            } else {
                self.disableDebit = true;
                self.disableCash = false;
                self.disableCtaCte = false;
                self.disableCheck = false;
                self.disableCredit = true;
                
                let partsOfStr = arr.dir.split(',');
                
                self.typeSale = 2;
                self.fullname = arr.name+' '+partsOfStr[1];
                self.total = arr.total;
                self.totalInicial = arr.total;
                self.totalConst = arr.total;
                self.totalRef = arr.total;
                self.correlative = arr.title;
                self.id = arr.id;
                self.idCli = arr.client;
                self.idFac = arr.fac;
                self.totalFavor = arr.favor;

                if (arr.favor != 0) {
                    self.totalRef = parseFloat(self.totalRef) - parseFloat(arr.favor);
                    self.total = self.totalRef;
                    self.totalInicial = self.totalRef;
                }
            }
        },
        verifyTypeSale(sale) {
            if (sale == 1) {
                return "Venta"
            }
        },
        verifyName(name) {
            if (name == null) {
                return 'Por menor';
            } else {
                return name;
            }
        },
        openCashModal() {
            let self = this;
            
            self.payActive = "cash";
            self.modalTitle = "Pago en Efectivo";
            self.dialog = !self.dialog;
        },
        openDebitModal() {
            let self = this;
            
            self.payActive = "debit";
            self.modalTitle = "Pago en Debito"
            self.dialog = !self.dialog;
        },
        openCheckModal() {
            let self = this;
            
            self.payActive = "check";
            self.bankList = [];
            self.getBanks();
            self.modalTitle = "Pago en Cheque"
            self.dialog = !self.dialog;
        },
        openCtaCteModal() {
            let self = this;

            self.payActive = 'cta/cte';
            self.modalTitle = "Cuenta Corriente";
            self.dialog = !self.dialog;
        },
        payCash() {
            let self = this;
            
            if (self.total > self.totalInicial) {
                self.handleSnackbar(false, "Monto supera el total");

            } else {
                setTimeout(function() {
                    self.abonadoCash = (parseFloat(self.abonadoCash) + parseFloat(self.total));
                    self.total = (parseFloat(self.totalRef) - parseFloat(self.total));
                    self.totalRef = self.total;
                    self.totalOther = self.total;
                    self.totalInicial = self.totalRef;
                    self.totalFavor = (self.totalFavor - self.totalFavor);
                }, 500);
                
                self.dialog = !self.dialog;       
            }
        },
        payDebit() {
            let self = this;
            
            if (self.total > self.totalInicial) {
                self.handleSnackbar(false, "Monto supera el total");
            
            } else {
                setTimeout(function() {
                    self.abonadoDebit = (parseFloat(self.abonadoDebit) + parseFloat(self.total));
                    self.total = (parseFloat(self.totalInicial) - parseFloat(self.total));
                    self.totalRef = self.total;
                    self.totalOther = self.total;
                    self.totalInicial = self.totalRef;
                    self.totalFavor = (self.totalFavor - self.totalFavor);
                }, 500);
                
                self.dialog = !self.dialog;       
            } 
        },
        payCredit() {
            let self = this;

            window.alert('Coming soon.');
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
        sumTotal() {
            let self = this;

            self.total = parseInt(self.total) + 1;
        },
        subTotal() {
            let self = this;

            self.total = parseInt(self.total) - 1;
        },
        addCheck() {
            let self= this;
            let prepared = true;
            
            if (self.bank == '') {
                prepared = false;
                self.message.success = false;
                self.message.content = "Seleccione un Banco para continuar.";

            }
            if (self.date1 == null) {
                prepared = false;
                self.message.success = false;
                self.message.content = "Seleccione una fecha de Emision.";

            }
            if (self.date2 == null) {
                prepared = false;
                self.message.success = false;
                self.message.content = "Seleccione una fecha de Cobro.";

            }
            if (self.nCheck == '') {
                prepared = false;
                self.message.success = false;
                self.message.content = "Introduzca número de Cheque.";

            }
            if (self.montCheck == '') {
                prepared = false;
                self.message.success = false;
                self.message.content = "Introduzca monto de Cheque.";

            }
            if (prepared === true) {
                if (self.checkNumArr.indexOf(self.nCheck) == -1) {
                    self.checkNumArr.push(self.nCheck);
                    self.checkData.push({
                     bankId: self.bank.id,
                     inDate: self.date1 != null ? self.date1 : null,
                     outDate: self.date2,
                     num: self.nCheck,
                     mont: self.montCheck,
                     owner: self.fullname,
                     creator: self.creator != '' ? self.creator : null
                 });
                
                 self.date1 = null;
                 self.date2 = null;
                 self.nCheck = '',
                 self.montCheck = '';
                 self.creator = '';
                } else {
                    self.handleSnackbar(false, "Número de Cheque ya registrado.");        
                }
            } else  {
                self.handleSnackbar(self.message.success, self.message.content);
            }
                
                // self.abonadoCheck = (parseFloat(self.abonadoCheck) + parseFloat(self.montCheck));
                // self.total = (parseFloat(self.totalInicial) - parseFloat(self.abonadoCheck));
                // self.totalOther = parseFloat(self.total);
                // self.totalInicial = self.total;

                // self.dialog = !self.dialog;
        },
        cancelPayCheck() {
            let self = this;
            // Aqui
            // let conf = confirm("Eliminará la lista de Cheques. Desea continuar?");
            
            setTimeout(function(){ 
                // self.checkData = [];
                self.bank = '';
                self.date1 = '';
                self.date2 = '';
                self.nCheck = '';
                self.montCheck = '';
                self.creator = '';
            }, 500);

            self.dialog = !self.dialog;
        },
        changedValue() {
            let self = this;

        },
        deleteCheck(num) {
            let self = this;
            let conf = confirm('Esta seguro de Eliminar este Cheque?');
            
            if (conf === true) {
                for (let i = 0; i < self.checkData.length; i++) {
                    if (self.checkData[i].num == num) {
                        if (self.abonadoCheck != 0) {
                            self.abonadoCheck = (parseFloat(self.abonadoCheck) - parseFloat(self.checkData[i].mont));
                            self.totalRef = parseFloat(self.totalRef) + parseFloat(self.checkData[i].mont);
                            // aqui
                            self.totalFavor = parseFloat(self.totalFavor) - parseFloat(self.checkData[i].mont);
                        }
                        // console.log(self.totalRef);
                        // TODO
                        // if (self.totalRef >= 0) {
                        //     self.disableAceptar = true;
                        // }

                        self.checkData.splice(i,1);
                        break;
                        
                    }
                }

                if (self.totalRef > 0) {
                    self.disableCash = false;
                }

                for (let j = 0; j < self.checkNumArr.length; j++) {
                    if (self.checkNumArr[j] == num) {
                        self.checkNumArr.splice(j,1);
                        break;
                        
                    }
                }

                for (let z = 0; z < self.checkSumArr.length; z++) {
                    if (self.checkSumArr[z] == num) {
                        self.checkSumArr.splice(z, 1);
                        break;
                    }
                }
                
            } else {
                return false;
            }
        },
        payCheck() {
            let self = this;
            
            for (let i = 0;  i < self.checkData.length; i++) {
                if (self.checkSumArr.indexOf(self.checkData[i].num) == -1) {
                    let sum = 0;
                    self.checkSumArr.push(self.checkData[i].num);
                    sum = parseInt(self.subCheck) + parseInt(self.checkData[i].mont);
                    self.abonadoCheck = parseFloat(self.abonadoCheck) + sum;
                    self.total = (parseFloat(self.totalRef) - sum);
                    self.totalRef = self.total;
                    self.totalInicial = self.totalRef;
                    if (self.total < 0) {
                        self.totalFavor = self.total * -1;
                        self.disableCash = true;
                        // TODO
                        // self.disableCash = true;
                    }
                } else {
                    console.log('ya existe');
                }
            }

            
            self.totalFavor = (self.totalFavor < 0) ? self.totalFavor + self.totalConst : self.totalFavor;
            
            // for (let i = 0; i < self.checkData.length; i++) {
            //     if (self.checkSumArr.indexOf(self.checkData[i].num) == -1) {
            //         self.checkSumArr.push(self.checkData[i].num);
            //         self.subCheck = parseFloat(self.subCheck) + parseFloat(self.checkData[i].mont);

            //         self.abonadoCheck = self.subCheck;
            //         self.total = (parseFloat(self.totalRef) - parseFloat(self.abonadoCheck));
            //         self.totalRef = self.total;
            //         self.totalOther = self.total;
            //         self.totalInicial = self.totalRef;
            //     }
            // }
            

        
            // TODO
            // Revisar
            // self.totalInicial = self.total;
            
            self.dialog = !self.dialog;
            console.log(self.total);
        },
        cancelPayCashDebitCredit() {
            let self = this;

            // setTimeout(function() {
            //     self.total = self.totalInicial;
            // }, 500);

            self.dialog = !self.dialog;
        },
        cleanData() {
            let self = this;
            let conf = confirm("Esta seguro de inicializar los Pagos?");

            if (conf === true) {
                self.abonadoDebit = 0;
                self.abonadoCash = 0;
                self.abonadoCheck = 0;
                self.totalRef = self.totalConst;
                self.total = self.totalRef;
                self.totalInicial = self.totalRef;
                self.disableCash = false;
                self.totalFavor = 0;
                self.detailArr = [];
                self.checkNumArr = [];
                self.checkSumArr = [];
                self.checkData = [];

            } else {
                return false;
            }
        },
        addGiro() {
            let self = this;
            let conf = confirm("Está seguro de Agregar este Giro a la Cuenta Corriente?");

            if (conf === true) {
                
                // let paymenTotal = {
                //     cash: (self.abonadoCash != 0) ? self.abonadoCash : 0,
                //     debit: (self.abonadoDebit != 0) ? self.abonadoDebit : 0,
                //     check: (self.abonadoCheck != 0) ? self.abonadoCheck : 0,
                //     ctaCte: (self.total != 0) ? self.total : 0
                // };

                // console.log(paymenTotal);





            // id de la venta
            // console.log(self.id);

            // id del cliente
            // console.log(self.idCli);

            // json de articulos de la compra
            // console.log(self.detailArr);
            
            // total del paquete
            // console.log(self.totalConst);

            // json de los cheques
            // console.log(self.checkData);
            
            // let paymenTotal = {
            //     cash: (self.abonadoCash != 0) ? self.abonadoCash : 0,
            //     debit: (self.abonadoDebit != 0) ? self.abonadoDebit : 0,
            //     check: (self.abonadoCheck != 0) ? self.abonadoCheck : 0
            // };     
            } else {
                return false;
            }
        },
        cancelPayCtaCte() {
            let self = this;
            
            setTimeout(function() {
                self.giroDescrip = '';
            }, 500);

            self.dialog = !self.dialog;
        },
        consolidateCharge() {
            let self = this;
            let conf = window.confirm("Esta Seguro de Consolidar este Cobro?");

            if (conf === true) {
                
                let paymenTotal = {
                    cash: (self.abonadoCash != 0) ? self.abonadoCash : 0,
                    debit: (self.abonadoDebit != 0) ? self.abonadoDebit : 0,
                    check: (self.abonadoCheck != 0) ? self.abonadoCheck : 0,
                    ctaCte: (self.total > 0) ? self.total : 0
                };
                
                axios({
                    method: "POST",
                    url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.CHARGE,
                    headers: {
                        "Authorization": "Bearer " + self.token
                    },
                    data: {
                        idClient: (self.idCli !== 0) ? self.idCli : 0,
                        idSale: self.id,
                        idFac: self.idFac,
                        typeSale: self.typeSale,
                        giroDesc: self.giroDescrip,
                        purchaseItems: JSON.stringify(self.detailArr),
                        checkTotal: (self.checkData.length) ? JSON.stringify(self.checkData) : "",
                        paymentTotal: JSON.stringify(paymenTotal),
                        inFavor: (self.totalFavor != 0) ? self.totalFavor : 0,
                        totalRef: self.totalConst
                    }
                })
                .then(success => {
                    let response = success.data;
                    
                    self.handleSnackbar(response.success, response.content);
                    self.showDetail = false;
                    self.salesItems = [];
                    self.checkNumArr = [];
                    self.checkSumArr = [];
                    self.detailArr = [];
                    self.abonadoDebit = 0;
                    self.abonadoCash = 0;
                    self.abonadoCheck = 0;
                    self.totalRef = 0;
                    self.total = 0;
                    self.totalInicial = 0;
                    self.totalConst = 0;
                    self.disableCash = false;
                    self.getSales();

                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                return false;
            }
        }
    }
}
</script>

<style>


</style>
