<template>
    <div>
        <md-table
            v-model="tipoArticulos"
            md-card
            @md-selected="onSelect"
            md-sort="name"
            md-sort-order="asc"
            >
            <md-table-toolbar>
                <h1 class="md-title">With auto select and alternate headers</h1>
            </md-table-toolbar>
            <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>
                
                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button">
                        <md-icon>delete</md-icon>
                    </md-button>
                </div>
            </md-table-toolbar>
            
            <md-table-row slot="md-table-row" slot-scope="{ item }" :md-disabled="item.name.includes('Stave')" md-selectable="multiple" md-auto-select>
                <md-table-cell md-label="Id" md-sort-by="id">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Nombre" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Fecha" md-sort-by="fecha_creacion">{{ item.fecha_creacion }}</md-table-cell>
                </md-table-row>
        </md-table>

    <p>Selected:</p>
    {{ selected }}
  </div>
</template>

<script>
export default {
  name: "TipoArticuloTable",
  data: () => ({
    selected: [],
    searched: [],
    search: null,
    tipoArticulos: [
      {
        id: 1,
        name: "Repuestos",
        fecha_creacion: "2017-01-04"
      },
      {
        id: 2,
        name: "SmartPhone",
        fecha_creacion: "2017-02-04"
      }
    ]
  }),
  methods: {
    onSelect(items) {
      this.selected = items;
    },
    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} user${plural} selected`;
    }
  }
};
</script>

<style>
</style>
