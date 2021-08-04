import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummery=(props)=>{
    const ingredientSummery =Object.keys(props.ingredients)
    .map(igKey=>{
        return(<li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}</span>:{props.ingredients[igKey]}</li>)
    })
    return(
    <Aux>
        <h3> Your Order</h3>
        <p>A delecious burger with the following ingredients:</p>
        <ul>
            {ingredientSummery}
        </ul>
        <p><strong>Total Price:{props.price.toFixed(2)} </strong></p>
        <p>Continue to Checkout ?</p>
        <Button btnType='Danger'  clicked={props.purchaseCancelled}>CANCEL</Button>
        <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
    )
    

}

export default orderSummery