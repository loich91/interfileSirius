


const Sup = {
    template: `
    <div class="prod">
   
    <h1> Supprimer Produit n° {{ $route.params.id }}</h1>
    <router-link to="/"id= back>retour</router-link><br>
    

        IdProduit:<input type="text" v-model= "prod.id_product" ><br>
        Nom : 
        <input type="text"v-model="prod.name" ><br>
        
        Stock: 
        
         <input type="text" v-model="prod.qty" ><br>
        €€€ : 
           
        <input type="text" v-model="prod.price" ><br>
    <div>
   
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
        this.deleteProduct();
    },

    watch: {
        // call again the method if the route changes
        '$route':'fetchData'
    },
    methods: {
        fetchData() {
            const params = new URLSearchParams();
            params.append('id', this.$route.params.id);
          
            axios.post('http://files.sirius-school.be/products-api/?action=getDetail',params).then(response => {
                // console.log(response);
                this.loading = false;
                this.prod = response.data.product;
                console.log(this.prod);
            });

        },
        
        deleteProduct() {
            const params = new URLSearchParams();

            params.append('ref', this.prod.ref);
            params.append('name', this.prod.name);
            params.append('qty', this.prod.qty);
            params.append('price', this.prod.price);
            params.append('id', this.$route.params.id);

            axios.post('http://files.sirius-school.be/products-api/?action=deleteProduct',params).then(response => {
                console.log(response);
                this.loading = false;

                if (response.data.status == 'success') {
                    this.message = 'produit supprimé';
                }
                else {
                    this.message = 'Désolé impossible de modifier';
                }

                //console.log(this.prod);//
                //ajouter message comme pour la meteo //REPONSE API
            });
        }
    }
}








