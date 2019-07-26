


//components prods= liste produits prod=detail produit 

//modifier les boutons et liens en fonction de Jonatan 
 //<img src="images/image1.jpg" alt="ink venice">//

 // <img class="logo" src="image/Logo.png">//
const Prods = {
    template: `
<div class="post">
  
  <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
        
        <h1>   <router-link to="/" id=menuprods> Liste des Produits</router-link></h1>
    <table class="bordtab" v-if="prods" id="prod">
        <tr class="table-product-header">
            <th>Dénomination</th>
            <th>Catégorie</th>
            <th>Prix d'achat</th>
            <th>Prix de vente</th>
            <th>Stock</th>
            <th></th>
            <th></th>

        </tr>
        <tr v-for="prod in prods" class="table-product-line">
            <td> <router-link :to="{ name: 'details', params: { id: prod.id_product }}" id=view>{{ prod.name_product }}</router-link></td>
            <td>{{ prod.name_category }}</td>
            <td>{{prod.purschase_price}}</td>
            <td>{{ prod.sale_price }}</td>
            <td>{{ prod.quantity }}</td>
            <td>
            <button v-on @click=" update" id=button> Modifier</button>
            <button v-on @click=" DeleteProduct" id=button>  </button>
              <router-link :to="{ name: 'edit', params: { id: prod.id_product }}"id=up>Modifier</router-link>
              <router-link :to="{ name: 'sup', params: { id: prod.id_product }}"id=del>Supprimer</router-link>
            </td>
        </tr>
    </table>

  </div>
`,


    data() {
        return {
            loading: true,
            prods: null,
            error: null
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    methods: {
        
        fetchData() {
                axios.get('http://192.168.1.46/travail2/git/gstock/back-end/index.php').then(response =>{
                //axios.get('http://localhost/travail2/git/gstock/back-end/index.php').then(response => {
                console.log(response.data);
                this.loading = false;
                this.prods = response.data;
                // this.prods = response.data.products;
                //remplacer le .products par ce que  Anthony&compagnie va nous renvoyer URL API//
                // .products qu on recupere dans API de Ludo//

            });
        }
    }
};