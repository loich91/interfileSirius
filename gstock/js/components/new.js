
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
        
         <input v-model="prod.quantity " type="text" placeholder="Add Product Qty "><br>
         
         Category:
         <div>
         <select  v-model="id_category">

         <option v-for="categorie in categories" v-bind:value="categorie.id_category"  >{{categorie.name_category}}</option>
        </div>
        
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
            categories:{},
            id_category:null,
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
                this.categories=response.data;
                // this.prods = response.data.products;
                //remplacer le .products par ce que  Anthony&compagnie va nous renvoyer URL API//
                // .products qu on recupere dans API de Ludo//

            });



        },

        insertProduct() {
            console.log(this.id_category)
            const params = new URLSearchParams();
            params.append('category',this.id_category);
            params.append('description', this.prod.description);
            params.append('name', this.prod.name);
            params.append('quantity', this.prod.quantity);
            params.append('sale_price', this.prod.salesPrice);
            params.append('purchase_price', this.prod.purchasePrice);


            axios.post('http://192.168.1.46/travail2/git/gstock/back-end/pages/create_product_V3.php', params).then(response => {
                console.log(response.data);
                this.loading = false;

                if (response.data.error =='false') {
                    this.message = 'réussi';
                }
                else {
                    this.message = 'ça merde';
                }

                //console.log(this.prod);//
                //ajouter message comme pour la meteo //REPONSE API
            });
        }
    }
}







