

const Edit = {
    template: `
    <div class="prod">
    <h1>xxx update {{ $route.params.id }} xxx</h1>
    <router-link to="/"id= back>Go Back to List</router-link><br>

    
        Name : 
        <input v-model="prod.name_product" type="text" placeholder="Add Product Name  "><br>
    

        Description:
      
        <input v-model="prod.description" type="text" placeholder="Add description "><br>
        Qty : 
        
         <input v-model="prod.quantity " type="text" placeholder="Add Product Qty "><br>
         <div>
         Category:
        
         <select  v-model="id_category">

         <option v-for="categorie in categories" v-bind:value="categorie.id_category">{{categorie.name_category}}</option>
        </div>
        
       sales Price  €€€ : 
           
        <input v-model="prod.salesPrice" type="text" placeholder="Add sales Price "><br>
        purchase Price  €€€ : 
        <input v-model="prod.purchasePrice" type="text" placeholder="Add purchase Price "><br>
       

      
   
      



    <div>
   
    <button v-on @click="update" id=button> SUBMIT NEW </button>
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
            //axios.get("http://localhost/travail2/git/gstock/back-end/pages/category.php").then(response => {
                console.log(response.data);
                this.categories=response.data;
                // this.prods = response.data.products;
                //remplacer le .products par ce que  Anthony&compagnie va nous renvoyer URL API//
                // .products qu on recupere dans API de Ludo//

            });



        },

        update() {

            console.log(this.$route.params.id)
            console.log(this.id_category)
            const params = new URLSearchParams();
            params.append('id_product',this.$route.params.id);
            params.append('category',this.id_category);
            params.append('description', this.prod.description);
            params.append('name', this.prod.name_product);
            params.append('quantity', this.prod.quantity);
            params.append('sale_price', this.prod.salesPrice);
            params.append('purchase_price', this.prod.purchasePrice);

            axios.post('http://192.168.1.46/travail2/git/gstock/back-end/pages/update_productV2.php', params).then(response =>{
           
                console.log(response.data);
                this.loading = false;

                if (response.data.error == false) {
                    this.message = response.data.message;
                }
                else {
                    this.message = response.data.message;
                }


                //console.log(this.prod);//
                //ajouter message comme pour la meteo //REPONSE API
            });
        }
    }
}