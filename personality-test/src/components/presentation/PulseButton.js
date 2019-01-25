import React from 'react';
import { Button,Transition} from 'semantic-ui-react';


class PulseButton extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:true,
            duration:200,
            animation:'pulse'
        }
        this.handleClick=this.handleClick.bind(this);
        this.callClickHandler=this.callClickHandler.bind(this);
    }

    handleClick(){
        this.setState({visible:!this.state.visible});
        setTimeout(this.callClickHandler,this.state.duration);
    }    

    callClickHandler(){
        this.props.onClick();
    }

    render(){
        return (
            <Transition animation={this.state.animation} duration={this.state.duration} visible={this.state.visible}>
                <Button positive onClick={this.handleClick}>{this.props.children}</Button>
            </Transition>
        )
    }
}

export default PulseButton

    

