import React from 'react';
import PropTypes from 'prop-types';
import { Container,Header,Transition,Segment } from 'semantic-ui-react';
import PulseButton from './../presentation/PulseButton';


class Test extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
        }
    }

    componentDidMount(){
        this.setState({visible:true});
    }

    render(){
        return(
            <Transition visible={this.state.visible} animation='scale' duration={500}>
                <section className="test">
                    <Container className="intro">
                        <Segment textAlign='center' size='big'>           

                        </Segment>
                    </Container>
                </section>
            </Transition>
        )
    }
}

Test.propTypes = {
    handleNextQuestion:PropTypes.func.isRequired,
}

export default Test;