import React from 'react';
import PropTypes from 'prop-types';
import { Container,Header,Transition,Segment,Image } from 'semantic-ui-react';
import PulseButton from '../../presentation/PulseButton';
import logo from '../../../assets/enneagram.svg';


class Intro extends React.Component{
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
            <div className="intro-container flex-center">
                <section className="intro flex-center">
                    <Transition visible={this.state.visible} animation='scale' duration={500}>
                        <Container className="centered" text>
                            <Segment textAlign='center' size='big' >
                                <Image src={logo} size='medium' circular />  
                                <Header as='h1'>Enneagram</Header>     
                                <ul>
                                    <li>Kişilik testi yaklaşık &#123;XX&#125; dakika sürecektir.</li>
                                    <li>Teste daha sonra kaldığınız yerden devam edebilirsiniz.</li>
                                </ul>
                                <PulseButton positive url={this.props.testUrl}>Teste başlayın</PulseButton>
                            </Segment>
                        </Container>
                    </Transition>
                </section>
            </div>
        )
    }
}

Intro.propTypes = {
    testUrl:PropTypes.any.isRequired,
}

export default Intro;