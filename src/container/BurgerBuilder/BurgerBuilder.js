import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler' ;

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {


    state = {
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        spinner:false
    }

    componentDidMount(){
        axios.get('https://react-my-burger-d52c7-default-rtdb.firebaseio.com/ingredients')
        .then(( res )=>{
          this.setState({
              ingredients:res.data
          })
        })
    }


    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchasableState(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })

    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinueHandler = () => {
      this.setState({
          spinner:true
      })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ak',
                address: {
                    village: 'kakrala',
                    street: '173'
                }
            }
        }
        axios.post('orders.json', order).then((response) => {
            console.log(response);
            this.setState({
                spinner:false, purchasing:false
            })
        }).catch((error) => {
            console.log(error);
            this.setState({
                spinner:false, purchasing:false
            })
        })
    }

    updatePurchasableState = (ingredient) => {
        const sum = Object.keys(ingredient)
            .map(igKey => {
                return ingredient[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }


    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummery = null;
       
        let burger =<Spinner/>
        if( this.state.ingredients){
        burger = (
        <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
            ingredientAdded={this.addIngredientsHandler}
            ingredientRemoved={this.removeIngredientsHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchasingHandler}
            purchasable={this.state.purchasable} />
            </Aux>
            )
            orderSummery = <OrderSummery
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        purchaseContinue={this.purchaseContinueHandler}
        purchaseCancelled={this.purchaseCancelHandler} />
        }
        if(this.state.spinner){
            orderSummery = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
               {burger}
            </Aux>
        );
    };
}

export default withErrorHandler(BurgerBuilder,axios);