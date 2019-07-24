
//changer url et copier partie page detail ok ,changer params

const New = {
    template: `
    <div class="prod">
    <h1>xxx New Product {{ $route.params.id }} xxx</h1>
    <router-link to="/"id= back>Go Back to List</router-link><br>

    
        Name : 
        <input v-model="prod.name" type="text" placeholder="Add Product Name  "><br>
    

        Description:
      
        <input v-model="prod.description" type="text" placeholder="Add description "><br>
        Qty : 
        
         <input v-model="prod.qty " type="text" placeholder="Add Product Qty "><br>
         Category:
         <input v-model="prod.category" type="text" placeholder="Add category"><br>
       
        
       sales Price  €€€ : 
           
        <input v-model="prod.salesPrice" type="text" placeholder="Add sales Price "><br>
        purchase Price  €€€ : 
        <input v-model="prod.purchasePrice" type="text" placeholder="Add purchase Price "><br>
       

      
   
      



    <div>
   
    <button v-on @click="insertProduct" id=button> SUBMIT NEW </button>
    {{message}}
</div>


</div>

`,
    data() {
        return {
            loading: true,
            prod: {},
            //{}= un objet
            message: '',
            id: null,
            error: null,
            idCaterogie:null,
            nameCategorie:'',
        }
    },

    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.obtenir();
    },

    watch: {
        // call again the method if the route changes
        '$route': 'insertProduct'
    },
    methods: {

        obtenir(){

            axios.get("http://192.168.1.46/travail2/git/gstock/back-end/pages/category.php").then(response => {
                console.log(response.data);
            
                // this.prods = response.data.products;
                //remplacer le .products par ce que  Anthony&compagnie va nous renvoyer URL API//
                // .products qu on recupere dans API de Ludo//

            });



        },

        insertProduct() {
            const params = new URLSearchParams();

            params.append('description', this.prod.description);
            params.append('name', this.prod.name);
            params.append('quantity', this.prod.quantity);
            params.append('sale_price', this.prod.price);
            params.append('purschase_price', this.prod.price);


            axios.post('http://192.168.1.46/travail2/git/gstock/back-end/pages/create_product_V2.php', params).then(response => {
                console.log(response);
                this.loading = false;

                if (response.data.status == 'success') {
                    this.message = 'produit ajouté';
                }
                else {
                    this.message = 'Désolé impossible';
                }

                //console.log(this.prod);//
                //ajouter message comme pour la meteo //REPONSE API
            });
        }
    }
}







