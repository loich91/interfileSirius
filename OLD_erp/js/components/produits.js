const produits = {
    template: `
<div class="post">
    <h1>Liste des produits</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <!-- on vérifie que users n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "user" -->
    <ul v-if="produits" id="example-1">
        <li v-for="produit in produits">
        
        {{ produit.name_product }}
     
       
      
            <router-link :to="{ name: 'produit', params: { id: produit.id_product }}">Voir</router-link>
            <router-link :to="{ name: 'modifProduits', params: { id: produit.id_product }}">modifier</router-link>
            <router-link :to="{ name: 'delProduits', params: { id: produit.id_product }}">supprimer</router-link>
        </li>
   
    </ul>
  </div>
`,
    data() {
        return {
            loading: true,
            produits: {},
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
            axios.get('http://192.168.1.122/gstock/back-end/index.php').then(response => {
                loading=false;
                console.log(response.data);
                this.produits=response.data;
              
            });
        }
    }
};