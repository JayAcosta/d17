<template>
    <v-app light>
        <v-toolbar dark :color="colorNavBar">
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
    <v-layout wrap style="max-height: 1000px; overflow-y: scroll">
        <v-container>
            <v-layout justify-center>
                <div v-if="transitionComponent === 'Artículos'">
                    <lista-articulos :right="rightNumber" />
                </div>
                <div v-else-if="transitionComponent === 'Clientes'">
                    <lista-clientes :right="rightNumber" />
                </div>
                <div v-else-if="transitionComponent === 'Ventas'">
                    <lista-ventas :right="rightNumber" />
                </div>
                <div v-else-if="transitionComponent === 'Precios'">
                    <lista-precios :right="rightNumber" />
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

// Libs.
import axios from "axios";
import atob from "atob";

// Componentes Web.
import Ventas from "@/components/Ventas/Ventas";
import Precios from "@/components/Precios/Precios";
import ListaArticulos from "@/components/Articulos/ListaArticulos";
import Cliente from "@/components/Cliente/Cliente";


// Config
import { 
    CONFIG
} from "../../config/index";

export default {
    components: {
        "lista-ventas": Ventas,
        "lista-articulos": ListaArticulos,
        "lista-clientes": Cliente,
        "lista-precios": Precios
    },
    beforeMount() {
        this.title = "Ventas D17";
        
        let savedSession = (this.$localStorage.get("session") !== undefined) ? JSON.parse(this.$localStorage.get("session")) : "";
        
        if (savedSession === null) {
            this.$router.push({ path: "/" });
        } else {
            
            this.username = savedSession.user.email;
            this.fullname = savedSession.user.nombres + " " + savedSession.user.apellido;
            this.firstnameLetter = savedSession.user.nombres.charAt(0);
            this.token = savedSession.token;
            this.transitionComponent = (this.$localStorage.get("componentActive") !== undefined) ? this.$localStorage.get('componentActive') : "";
            this.loadModules();
        }
    },
    name: "HomeSeller",
    props: {},
    data() {
        return {
            id: 0,
            token: "",
            title: "",
            fullname: "",
            firstnameLetter: "",
            username: "",
            colorNavBar: "",
            selectItems: ["Cerrar sesión"],
            drawer: null,
            drawerItems: [],
            message: {
                success: true,
                content: ""
            },
            transitionComponent: "",
            rightNumber: 0
        }
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        loadModules() {
            let self = this;

            let localStore = self.$localStorage.get("session");

            let getModules = atob(JSON.parse(localStore).user.credentials);

            let getColor = atob(JSON.parse(localStore).user.credentials);

            let getRight = atob(JSON.parse(localStore).user.credentials);

            let parseModules = JSON.parse(getModules);

            for (let i = 0; i < parseModules[3].modules.length; i++) {
                self.drawerItems.push(parseModules[3].modules[i]); 
            }

            self.colorNavBar = JSON.parse(getColor)[1].motive;
            self.rightNumber = JSON.parse(getRight)[0].right;
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
                if (err.response.status === 401) {
                    self.$localStorage.remove('session');
                    self.$router.push({path: '/'});
                } else {
                    console.log(err);
                }
            });
        },
        drawerMenu(option) {
            let self = this;
            
            if (option === 'Artículos') {
                if (self.transitionComponent !== 'Artículos') {
                    self.transitionComponent = 'Artículos';
                    self.$localStorage.set('componentActive',self.transitionComponent);

                }
                self.toggleDrawer();
            } else if (option === 'Clientes') {
                if (self.transitionComponent !== 'Clientes') {
                    self.transitionComponent = 'Clientes';
                    self.$localStorage.set('componentActive', self.transitionComponent);
                }
                self.toggleDrawer();
            } else if (option === 'Ventas') {
                if (self.transitionComponent !== 'Ventas') {
                    self.transitionComponent = 'Ventas';
                    self.$localStorage.set('componentActive', self.transitionComponent);
                }
                self.toggleDrawer();
            } else if (option === 'Precios') {
                if (self.transitionComponent !== 'Precios') {
                    self.transitionComponent = 'Precios';
                    self.$localStorage.set('componentActive', self.transitionComponent);
                }
                self.toggleDrawer();
            }
        }

    }
}
</script>

<style>

</style>
