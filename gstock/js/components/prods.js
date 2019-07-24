


//components prods= liste produits prod=detail produit 

//modifier les boutons et liens en fonction de Jonatan 
 //<img src="images/image1.jpg" alt="ink venice">//
const Prods = {
    template: `
<div class="post">

    <h1> xxxxxxx SHOP >>>  Products xxxxxxx</h1>

   
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <!-- on vérifie que prods n'est pas vide, et puis on boucle avec v-for sur un tableau d'objet "prod" -->
    <ul v-if="prods" id="prod">
        <li v-for="prod in prods"id= couleurLi >
        {{ prod.name_product }}
        
            <router-link :to="{ name: 'details', params: { id: prod.id_product }}" id=view>View</router-link>
            <router-link :to="{ name: 'edit', params: { id: prod.id_product }}"id=up>Update</router-link>
            <router-link :to="{ name: 'sup', params: { id: prod.id_product }}"id=del>Delete</router-link>
        </li>
    </ul>
   
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
            axios.get('http://192.168.1.46/travail2/git/gstock/back-end/index.php').then(response => {
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