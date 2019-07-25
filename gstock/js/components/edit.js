


const Edit = {
    template: `
    <div class="prod">
    <h1>  Modifier Produit n° {{ $route.params.id }}</h1>
    <router-link to="/"id= back>retour</router-link><br>
    

        Nom : 
        <input type="text"v-model="prod.name" ><br>
        Stock : 
        
         <input type="text" v-model="prod.quantity" ><br>
        €€€ : 
           
        <input type="text" v-model="prod.price" ><br>
    <div>
   
    <button v-on @click="updateProduct" id=modifbutton> Modifier produit </button>
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
            error: null
        }
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
        this.updateProduct();
    },

    watch: {
        // call again the method if the route changes
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            const params = new URLSearchParams();
            params.append('id', this.$route.params.id);

            axios.post('http://192.168.1.46/travail2/git/gstock/back-end/pages/detail.php', params).then(response => {
                // console.log(response);
                this.loading = false;
                this.prod = response.data.product;
                console.log(this.prod);
            });

        },

        updateProduct() {
            const params = new URLSearchParams();

            params.append('category',this.id_category);
            params.append('description', this.prod.description);
            params.append('name', this.prod.name_product);
            params.append('quantity', this.prod.quantity);
            params.append('sale_price', this.prod.salesPrice);
            params.append('purchase_price', this.prod.purchasePrice);


            axios.get('http://192.168.1.46/travail2/git/gstock/back-end/pages/update_productV2.php', params).then(response =>{
            //axios.get('http://localhost/travail2/git/gstock/back-end/pages/update_productV2.php', params).then(response => 
                console.log(response);
                this.loading = false;

                if (response.data.status == 'success') {
                    this.message = 'produit modifié';
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




