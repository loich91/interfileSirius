


const Edit = {
    template: `
    <div class="prod">
    <h1> xxx Update your Product n° {{ $route.params.id }} xxx</h1>
    <router-link to="/"id= back>Go Back to List</router-link><br>
    

        IdProduit:<input type="text" v-model= "prod.id_product" ><br>
        Name : 
        <input type="text"v-model="prod.name" ><br>
        Ref. : 
        <input type="text" v-model="prod.ref"  ><br>
        Qty : 
        
         <input type="text" v-model="prod.qty" ><br>
        €€€ : 
           
        <input type="text" v-model="prod.price" ><br>
    <div>
   
    <button v-on @click="updateProduct" id=modifbutton> UPDATE PRODUCT </button>
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

            axios.post('http://files.sirius-school.be/products-api/?action=getDetail', params).then(response => {
                // console.log(response);
                this.loading = false;
                this.prod = response.data.product;
                console.log(this.prod);
            });

        },

        updateProduct() {
            const params = new URLSearchParams();

            params.append('ref', this.prod.ref);
            params.append('name', this.prod.name);
            params.append('qty', this.prod.qty);
            params.append('price', this.prod.price);
            params.append('id', this.$route.params.id);

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




