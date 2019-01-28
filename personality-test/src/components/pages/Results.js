import React from 'react';
import PropTypes from 'prop-types';
import { Container,Transition,Segment } from 'semantic-ui-react';
import Loading from './../presentation/Loading';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

const data = [
    { subject: 'architect', A: 100, fullMark: 100 },
    { subject: 'logician', A: 50,  fullMark: 100 },
    { subject: 'commander', A: 30,  fullMark: 100 },
    { subject: 'debater', A: 12,  fullMark: 100 },
    { subject: 'advocate', A: 70,  fullMark: 100 },
    { subject: 'mediator', A: 95,  fullMark: 100 },
    { subject: 'protagonist', A: 60,  fullMark: 100 },
    { subject: 'campaigner', A: 23,  fullMark: 100 },
    { subject: 'logisticial', A: 65,  fullMark: 100 },
    { subject: 'defender', A: 34,  fullMark: 100 },
    { subject: 'executive', A: 43,  fullMark: 100 },
    { subject: 'consul', A: 52,  fullMark: 100 },
    { subject: 'virtuoso', A: 66,  fullMark: 100 },
    { subject: 'adventurer', A: 75,  fullMark: 100 },
    { subject: 'entrepreneur', A: 12,  fullMark: 100 },
    { subject: 'entertainer', A: 2,  fullMark: 100 },
];

class Results extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
            personality:null
        }
    }

    componentDidMount(){
        const personality=Object.assign({},this.props.getResults());
        this.setState({personality,visible:true});
    }

    render(){
        let content= !this.state.personality? <Loading/>:
            <section className="results-container centered">
                <Transition visible={this.state.visible} animation='scale' duration={500}>
                    <section className="results">
                        <Container className="intro">
                            <Segment textAlign='center' size='big'>           
                                <RadarChart className="centered" cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis angle={78} />
                                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                                </RadarChart>
                            </Segment>
                        </Container>
                    </section>
                </Transition>
            </section>


        return content;
    }
}

Results.propTypes = {
    getResults:PropTypes.func.isRequired,
}

export default Results;