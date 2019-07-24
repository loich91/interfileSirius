////components prods= liste produits prod=detail produit 

//changer en fonction des noms des back-end API+le tableau
//changer Url + changer Variable back end params en fonction de leur noms

const Prod = {
    template: `
    <div class="detail">
    <h1> Détails du produit n° {{ $route.params.id }} </h1>
    <router-link to="/" id= back>Retour</router-link><br>
    
    <p v-if="prod">
    <h2>
     
        Nom : {{ prod.name }} <br>
    
        Description: {{prod.description}}<br>
        Quantité : {{ prod.quantity }}<br>
        
        €€€ Sales Price : {{ prod.sale_price }}<br>
        €€€ Purchase Price:{{prod.purSchase_prise}}<br>
        </h2>
    </p>
    </div>
`,
data() {
    return {
        loading: true,
        prod: null,
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
        params.append('id', this.$route.params.id);
      
        axios.post('http://files.sirius-school.be/products-api/?action=getDetail', params).then(response => {
            // console.log(response);
            this.loading = false;
            this.prod = response.data.product;
            console.log(this.prod);
        });
    }
}
}

