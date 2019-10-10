import React, {Component} from 'react';
import Button from '../Button';

import './withVisualForm.css';

export default (Comp, title) => {
    return class extends Component{

        goToCreateUserPage = () => this.props.history.push('/add');

        renderMenuContext = () => {
            return (
                <div className='menuContext'>
                    <span>{ title || 'Users' }</span>
                    <Button 
                        onClick={ () => this.goToCreateUserPage() }
                        text='Add new'
                        variant='add'
                    />
                </div>
            );
        }
        
        render(){
            return (
                <div className='contentWrapper'>
                    { this.renderMenuContext() }
                    <Comp {...this.props} />
                </div>
            );
        }
    } 
}