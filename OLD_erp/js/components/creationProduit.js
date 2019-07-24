const creationProduits = {
    template: 
    `
    <div>
    
    
    
    <h1>ajout produit</h1>
 
    
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <p v-if="produit">
        Nom: <input v-model="produit.nom" placeholder="indiquez la valeur"> <br />
        référence: <input v-model="produit.ref" placeholder="indiquez la valeur"> <br />
        quantité: <input v-model="produit.qty" placeholder="indiquez la valeur"><br />
        prix:<input v-model="produit.price " placeholder="indiquez la valeur"> <br />
        <button v-on:click="creation">validez</button>
        {{message}}
       
    </p>
    </div>
    `,

    data() {
        return {
            
            produit: {},
            error: null,
            message:''
           
        }
    },
    methods: {

    
        creation() {
            const params = new URLSearchParams();
                console.log('je suis dedans')   
            
            params.append('name',this.produit.nom);
            params.append('ref',this.produit.ref);
            params.append('qty',this.produit.qty);
            params.append('price',this.produit.price);
         
            axios.post('http://files.sirius-school.be/products-api/?action=insertProduct',params).then(response =>{
               
             console.log(response.data)
            if (this.response.data.status=='success') {
                this.message='produit afficher';
            }
            else{
                this.message='erreur';
            }
            });
    
        }
    }
}

