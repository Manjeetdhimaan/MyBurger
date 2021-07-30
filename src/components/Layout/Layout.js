import React from 'react';
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.css'
const layout = (props) => {
    return (
        <Aux>
            <div> Toolbar, SiderDrawer, BackDrop</div>
            <main >
                {props.children}
            </main>

        </Aux>
    )
}

export default layout