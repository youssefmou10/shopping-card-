import { createStore } from 'vuex'
import axios from "axios";
export default createStore({
  state: {
    products:[],
    productsInBag:[]
  },
  mutations: {
    loadProduct(state,products){
        state.products=products
    },
    loadBag(state,products){
      state.productsInBag=products
     },
    addToBag(state,product)
    {
      // ajouter des produits ou produit du panier
      state.productsInBag.push(product);
      localStorage.setItem("productsInBag",JSON.stringify(state.productsInBag))
    },
    removeFromBag(state,productId)
    {
      var updatedInBag=state.productsInBag.filter(item => productId !=item.id);
      state.productsInBag=updatedInBag
      localStorage.setItem("productsInBag",JSON.stringify(state.productsInBag))
      }
  },
  actions: {
      loadProduct({commit}){
        axios.get('https://fakestoreapi.com/products').then(
          response=>{
            commit('loadProduct',response.data);
          }
        )
      },
      loadBag({commit}){
        if(localStorage.getItem("productsInBag"))
        {
          commit('loadBag',JSON.parse(localStorage.getItem("productsInBag")));

        }
         
        
      },
      addToBag({commit},product){
        commit('addToBag',product)

      },
      removeFromBag({commit},productId){
        if(confirm("Are you sure to remove this item ? "))
        {
          commit('removeFromBag',productId)
        }
       
       }
  },
  modules: {
  }
})
