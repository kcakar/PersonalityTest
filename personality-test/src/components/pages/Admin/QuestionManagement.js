import React from 'react';
import PropTypes from 'prop-types';
import { Segment,Header,Transition,Button} from 'semantic-ui-react'
import LanguageSelector from '../../presentation/LanguageSelector';

class QuestionManagement extends React.Component{ 
    constructor(props){
        super(props);

        this.state={
            visible:false,
            data:[],
        }
    }

    componentDidMount(){
        this.setState({
                visible:true,
            });
    }

    fillQuestions(){
        let questions=[];
        for(let i=0;i<63;i++){
            questions.push(<Button key={i} color="red" circular>{i}</Button>)
        }
        return questions;
    }
    render(){
        const { data } = this.state;

        return (
        <Transition visible={this.state.visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Sorular</Header>
                <LanguageSelector />
                <Segment>
                    {this.fillQuestions()}
                </Segment>
            </div>
        </Transition>
        )
    }
}

QuestionManagement.propTypes = {
    questionData:PropTypes.any.isRequired
}

export default QuestionManagement;