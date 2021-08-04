import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 0.7,
    meat: 1.3
}

class BurgerBuilder extends Component {


    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing:false 
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
        this.setState({purchasing:true})

    }

    purchaseCancelHandler = () => {
           this.setState({
               purchasing:false
           })
    }
    purchaseContinueHandler = () => {
        alert('You Continue');
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
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummery
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseContinue = {this.purchaseContinueHandler}
                    purchaseCancelled={this.purchaseCancelHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientsHandler}
                    ingredientRemoved={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchasingHandler}
                    purchasable={this.state.purchasable} />
            </Aux>
        );
    };
}

export default BurgerBuilder;