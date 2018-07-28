<template>
<v-app light>
    
    <!-- Toolbar -->
    <v-toolbar dark color="primary">
        <v-toolbar-side-icon @click.stop="toggleDrawer()"></v-toolbar-side-icon>
        <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>refresh</v-icon>
        </v-btn>
        
        <v-menu bottom left>
            <v-btn slot="activator" icon dark>
                <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
                <v-list-tile v-for="i in selectItems" :key="i" @click="rigthMenu(i)">
                    <v-list-tile-title v-text="i"></v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
    </v-toolbar>
    <!-- Toolbar -->

    <v-layout wrap style="max-height: 1000px; overflow-y: scroll">
        <v-container>
            <v-layout justify-center>
                <div v-if="transitionComponent === 'Home'">
                    Welcome
                </div>
                <div v-else-if="transitionComponent === 'Articulos'">
                    <lista-articulos />
                </div>
                <div v-else-if="transitionComponent === 'Perfil'">
                    aqui perfil
                </div>
                <div v-else-if="transitionComponent === 'Precios'">
                    <lista-precios />
                </div>
                <div v-else-if="transitionComponent === 'Cotizacion'">
                    <lista-moneda />
                </div>
                <div v-else-if="transitionComponent === 'Clientes'">
                    <lista-clientes />
                </div>
                <div v-else-if="transitionComponent === 'Proveedor'">
                    <lista-proveedores />
                </div>
                <div v-else-if="transitionComponent === 'Cta/Cte'">
                    <cuenta-corriente />
                </div>
            </v-layout>
        </v-container>
    
    <!-- Drawer -->
    <v-navigation-drawer
        v-model="drawer"
        temporary
        absolute
    >
    <v-list class="pa-1">
        <v-list-tile avatar>
            <v-list-tile-avatar>
                <v-avatar color="teal">
                    <span class="white--text headline">{{firstnameLetter}}</span>
                </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-content>
                <v-list-tile-title>{{fullname}}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
     <v-list dense class="pt-0">
      <v-list-tile v-for="item in drawerItems" :key="item.title" @click="drawerMenu(item.title)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <!-- Drawer -->

    </v-layout>
</v-app>
</template>

<script>

// Libs
import axios from "axios";

// Components
import ListaArticulos from "@/components/Articulos/ListaArticulos";
import ListaMoneda from "@/components/Moneda/ListaMoneda";
import Precios from "@/components/Precios/Precios";
import Cliente from "@/components/Cliente/Cliente";
import Proveedor from "@/components/Proveedor/Proveedor";
import CtaCte from "@/components/CtaCte/CtaCte";
// Config
import { 
    CONFIG
} from "../../config/index";

export default {
    components:{
        'lista-articulos': ListaArticulos,
        'lista-moneda': ListaMoneda,
        'lista-precios': Precios,
        'lista-clientes': Cliente,
        'lista-proveedores': Proveedor,
        'cuenta-corriente': CtaCte
    },
    beforeMount() {
        this.title = 'Darsena-17';
        let savedSession = (this.$localStorage.get('session') !== undefined)
                            ?
                            JSON.parse(this.$localStorage.get('session')) : '';
        if (savedSession === null) {
            this.$router.push({path: '/'});
        } else {

            this.username = savedSession.user.email;
            this.fullname = savedSession.user.nombres + ' ' + savedSession.user.apellido;
            this.firstnameLetter = savedSession.user.nombres.charAt(0);
            this.token = savedSession.token;
            this.transitionComponent = (this.$localStorage.get('componentActive') !== undefined)
                            ?
                            this.$localStorage.get('componentActive') : '';
        }
    },
    name: "Home",
    props: {},
    data() {
        return {
            title: '',
            fullname: '',
            firstnameLetter: '',
            username: '',
            token: '',
            selectItems: [
                'Cerrar sesión'
            ],
            drawer: null,
            drawerItems: [
                {
                    title: 'Perfil',
                    icon: 'account_circle'
                }, {
                    title: 'Home',
                    icon: 'dashboard'
                }, {
                    title:'Articulos',
                    icon: 'shopping_cart'
                }, {
                    title: 'Precios',
                    icon: 'insert_chart',
                }, {
                    title: 'Cotizacion',
                    icon: 'attach_money'
                }, {
                    title: 'Clientes',
                    icon: 'person_add'
                }, {
                    title: 'Proveedor',
                    icon: 'local_shipping'
                }, {
                    title: 'Cta/Cte',
                    icon: 'bar_chart'
                }
            ],
            message: {
                success: true,
                content: ""
            },
            transitionComponent: ''
        }
    },
    computed: {
        // 
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        drawerMenu(option) {
            let self = this;
            if (option === 'Perfil') {
                if (self.transitionComponent !== 'Perfil') {
                    self.transitionComponent = 'Perfil';
                    self.$localStorage.set('componentActive',self.transitionComponent);

                }
                this.toggleDrawer();
            } else if (option === 'Articulos') {
                if (self.transitionComponent !== 'Articulos') {
                    self.transitionComponent = 'Articulos';
                    self.$localStorage.set('componentActive',self.transitionComponent);

                }
                this.toggleDrawer();
            } else if (option === 'Home') {
                if (self.transitionComponent !== 'Home') {
                    self.transitionComponent = 'Home';
                    self.$localStorage.set('componentActive',self.transitionComponent);

                }
                this.toggleDrawer();
            } else if (option === 'Precios') {
                if (self.transitionComponent !== 'Precios') {
                    self.transitionComponent = 'Precios';
                    self.$localStorage.set('componentActive', self.transitionComponent);
                }
                this.toggleDrawer();
            } else if (option === 'Cotizacion') {
                if (self.transitionComponent !== 'Cotizacion') {
                    self.transitionComponent = 'Cotizacion';
                    self.$localStorage.set('componentActive', self.transitionComponent);
                }
                this.toggleDrawer();
            } else if (option === 'Clientes') {
                if (self.transitionComponent !== 'Clientes') {
                    self.transitionComponent = 'Clientes';
                    self.$localStorage.set('componentActive', self.transitionComponent);
                }
                this.toggleDrawer();
            } else if (option === 'Proveedor') {
                if (self.transitionComponent !== 'Proveedor') {
                    self.transitionComponent = 'Proveedor';
                    self.$localStorage.set('componentActive', self.transitionComponent);
                }
                this.toggleDrawer();
            } else if (option === 'Cta/Cte') {
                if (self.transitionComponent !== 'Cta/Cte') {
                    self.transitionComponent = 'Cta/Cte';
                    self.$localStorage.set('componentActive', self.transitionComponent);
                }
                this.toggleDrawer();
            }
        },
        rigthMenu(option) {
            if (option === 'Cerrar sesión') {
                this.logout();
            }
        },
        logout() {
            let self = this;
            
            axios({
                method: "DELETE",
                url: CONFIG.SERVICE_BASE + CONFIG.SERVICE_URL.LOGOUT,
                headers: {
                    "Authorization": "Bearer " + self.token
                },
            })
            .then(success => {
                console.log(success);
                self.$localStorage.remove('session');
                self.$localStorage.remove('componentActive');

                self.$router.push({path: '/'});
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
}
</script>

<style>

</style>
