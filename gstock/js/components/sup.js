


const Sup = {
    template: `
    <div class="prod">
   
    <h1> Supprimer Produit n° {{ $route.params.id }}</h1>
    <router-link to="/"id= back>retour</router-link><br>
    

        IdProduit:
        <h1 type="text" v-model= "prod.id_product">{{prod.id_product}} </h1><br>
        Nom : 
        <h1 type="text"v-model="prod.name_product" >{{prod.name_product}} </h1><br>
   
   
    <button v-on @click="deleteProduct" id="deletebutton"> Supprimer </button>
  
    {{message}}
</div>


</div>

`,
    data() {
        return {
            loading: true,
            prod:{},
            //{}= un objet
            message: '',
            id: null,
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
        '$route':'fetchData'
    },
    methods: {

        
    

           
        fetchData() {
            const params = new URLSearchParams();
            params.append('id_product', this.$route.params.id);
          
            axios.post('http://192.168.1.46/travail2/git/gstock/back-end/pages/detail.php',params).then(response => {
                // console.log(response);
                this.loading = false;
                this.prod = response.data;
                console.log(this.prod);
            });

        },
        
        deleteProduct() {
            const params = new URLSearchParams();

            params.append('id_product', this.$route.params.id);

            axios.post('http://192.168.1.46/travail2/git/gstock/back-end/pages/delete_product.php',params).then(response => {
                console.log(response.data);
                this.loading = false;

                if (response.data.error == false) {
                    this.message = response.data.message;
                    
                    router.push({ name: 'produits' })
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








