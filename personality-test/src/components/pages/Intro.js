import React from 'react';
import PropTypes from 'prop-types';
import { Container,Header,Transition,Segment } from 'semantic-ui-react';
import PulseButton from './../presentation/PulseButton';


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
            <Transition visible={this.state.visible} animation='scale' duration={500}>
                <div className="flex-center">
                    <section className="intro flex-center">
                        <Container className="centered" text>
                            <Segment textAlign='center' size='big' >           
                                <Header as='h1'>Kişilik testi</Header>     
                                <ul>
                                    <li>Kişilik testi yaklaşık &#123;XX&#125; dakika sürecektir.</li>
                                    <li>Test tek yönlüdür. Cevap verilen bir soruya tekrar geri dönemezsiniz.</li>
                                    <li>Teste daha sonra kaldığınız yerden devam edebilirsiniz.</li>
                                </ul>
                                <PulseButton positive url={this.props.testUrl}>Teste başlayın</PulseButton>
                            </Segment>
                        </Container>
                    </section>
                </div>
            </Transition>
        )
    }
}

Intro.propTypes = {
    testUrl:PropTypes.any.isRequired,
}

export default Intro;