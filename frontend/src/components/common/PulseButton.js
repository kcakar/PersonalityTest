import React from 'react';
import { Button,Transition} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';


class PulseButton extends React.Component{
    state={
        visible:true,
        duration:200,
        animation:'pulse',
        isLoading:false,
        isClicked:false
    }

    handleClick=()=>{
        if(!this.state.isClicked)
        {
            this.setState({visible:!this.state.visible,isClicked:true});
            setTimeout(this.callClickHandler,this.state.duration);
        }
    }    

    callClickHandler=()=>{
        if(this.props.url)
        {
            this.props.history.push(this.props.url);        
        }
        else{
            this.props.onClick();
        }
        this.setState({isClicked:false});
    }

    render(){
        return (
            <Transition animation={this.state.animation} duration={this.state.duration} visible={this.state.visible}>
                <Button className={this.state.isLoading?"loading":""} onClick={this.handleClick} url={this.props.url} color='orange'>
                    <span>{this.props.children}</span>
                </Button>
            </Transition>
        )
    }
}

export default withRouter(PulseButton);

    

