const delProduits = {
    template: `

    <div>
    
    
    
    <h1>produit n° {{ $route.params.id }}</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <p v-if="produit">
    Nom: {{ produit.name}} <br />
    référence: {{ produit.ref}} <br />
    quantité: {{ produit.qty}} <br />
    prix: {{ produit.price }} <br />
    <button v-on:click="del">confirmer</button>
    <button v-on:click="reoriente">annuler</button>

    {{message}}
   
    `,

    data() {
        return {
            loading: true,
            produit: {},
            error: null,
            message:'',
            confirmation:false
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

            const params = new URLSearchParams();
               
            params.append('id',this.$route.params.id);
            console.log(this.$route.params.id)
            axios.post('http://files.sirius-school.be/products-api/?action=getDetail',params).then(response =>{
                this.produit=response.data.product;
                this.loading= false;
                
            });

        },

        reoriente(){

            router.push({ name: 'produits' })
        },
        
     
        del() {


            const params = new URLSearchParams();
                   
            params.append('id',this.$route.params.id);
            console.log(this.$route.params.id)
            axios.post('http://files.sirius-school.be/products-api/?action=deleteProduct',params).then(response =>{
                console.log(this.response.data)
                if (this.response.data.status=='success') {
                    this.message='produit supprimer avec succès'


                    
                }

                else{

                    this.message='erreur lors de la suppression du produit'
                }
                
            });
        }
    }

}