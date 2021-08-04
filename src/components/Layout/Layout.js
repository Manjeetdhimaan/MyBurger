import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state={
        showDrawerHandler:false
    }
    sideDrawerCloseHandler=()=>{
      this.setState({showDrawerHandler:false})
    }
    
    drawerToggler = () => {
     this.setState((prevState)=>{
        return {showDrawerHandler:!prevState.showDrawerHandler}
     })
    }
    render() {
        return (

            
            <Aux>
                <Toolbar drawerToggler={this.drawerToggler}/>
                <SideDrawer  open={this.state.showDrawerHandler} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;