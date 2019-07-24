const modifProduits = {
    template: 
    `
    <div>
    
    
    
    <h1>produit n° {{ $route.params.id }}</h1>
    <div v-if="loading" class="loading">
      Loading...
    </div>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <p v-if="produit">
        Nom: <input v-model="produit.name" placeholder="indiquez la valeur"> <br />
        référence: <input v-model="produit.ref" placeholder="indiquez la valeur"> <br />
        quantité: <input v-model="produit.qty" placeholder="indiquez la valeur"><br />
        prix:<input v-model="produit.price " placeholder="indiquez la valeur"> <br />
        <button v-on:click="modif">validez</button>
       
    </p>
    </div>
    `,
        data() {
            return {
                loading: true,
                produit: null,
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

                const params = new URLSearchParams();
                   
                params.append('id',this.$route.params.id);
                console.log(this.$route.params.id)
                axios.post('http://files.sirius-school.be/products-api/?action=getDetail',params).then(response =>{
                    this.produit=response.data.product;
                    this.loading= false;
                    
                });

            },
            
            modif() {
                const params = new URLSearchParams();
                    console.log('je suis dedans')   
                params.append('id',this.$route.params.id);
                params.append('name',this.produit.name);
                params.append('ref',this.produit.ref);
                params.append('qty',this.produit.qty);
                params.append('price',this.produit.price);
                console.log(this.$route.params.id)
                axios.post('http://files.sirius-school.be/products-api/?action=updateProduct',params).then(response =>{
                    this.produit=response.data.product;
                    this.loading= false;
                    alert('valeur modifier ')
                    
                });
            }
        }
    }
    
    /*http://files.sirius-school.be/products-api/?action=getDetail*/
    


