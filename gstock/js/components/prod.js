////components prods= liste produits prod=detail produit 

//changer en fonction des noms des back-end API+le tableau
//changer Url + changer Variable back end params en fonction de leur noms

const Prod = {
    template: `
    <div class="detail">
    <h1> Détail du produit {{ prod.name_product }} </h1>
    <router-link to="/" id= back>Retour</router-link><br>
    
    <p v-if="prod">
    <h2>
     
        Nom : {{ prod.name_product }} <br>
    
        Description: {{prod.description}}<br>
        Quantité : {{ prod.quantity }}<br>
        
         Prix de vente : {{ prod.sale_price }}<br>
         Prix d achat:{{prod.purschase_price}}<br>
        </h2>
    </p>
    </div>
`,
data() {
    return {
        loading: true,
        prod: {},
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
        params.append('id_product', this.$route.params.id);
        console.log(this.$route.params.id);
      
                    //axios.post('http://192.168.1.46/travail2/git/gstock/back-end/pages/detail.php', params).then(response =>
                    axios.post('http://automatons.be/projet/travail2/git/gstock/back-end/pages/detail.php', params).then(response =>
                {
             console.log(response.data);
            this.loading = false;
            this.prod = response.data;
            console.log(this.prod.name_product);
        });
    }
}
}

