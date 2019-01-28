import React from 'react';
import PropTypes from 'prop-types';
import { Container,Transition,Segment,Radio,Progress } from 'semantic-ui-react';
import PulseButton from './../presentation/PulseButton';
import Loading from './../presentation/Loading';
import { Redirect} from 'react-router-dom';

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            currentAnswer:-1,
            questionCount:2,
            currentQuestion:null,
            stage:0,
        }
    }

    componentDidMount(){
        this.setState({visible:true});
        console.log(this.state)
        if(!this.state.currentQuestion)//test just started,get the first question
        {
            const currentQuestion=Object.assign({},this.props.getQuestion(1));
            this.setState({currentQuestion});
        }
    }

    moveToNextQuestion(){
        let currentQuestion=Object.assign({},this.state.currentQuestion);
        currentQuestion.order++;
        if(currentQuestion.order>this.state.questionCount)
        {
            this.finishTest();
        }
        else{
            currentQuestion=this.props.getQuestion(currentQuestion.order);
            this.setState({currentQuestion,currentAnswer:-1});
        }
    }

    finishTest(){
        this.setState({isFinished:true,currentQuestion:null,currentAnswer:-1});
    }

    handleAnswer(answer){
        this.applyAnswer(answer);
        this.moveToNextQuestion();
    }

    applyAnswer(answer){

    }

    render(){
        if(this.state.isFinished){
            return <Redirect to="/Results" />
        }

        let content= !this.state.currentQuestion? <Loading/>:
            <section className="test-container centered">
                <div className="progress">
                    <Progress indicating  value={this.state.currentQuestion.order} total={this.state.questionCount} progress='ratio'/>
                </div>
                <Transition visible={this.state.visible} animation='scale' duration={500}>
                    <section className="test">
                        <Container>
                            <Segment textAlign='center' size='big' className="question">           
                                <div className="question-text">
                                    <span>{this.state.currentQuestion.text}</span>
                                </div>
                                <div className="answers">
                                    {this.state.currentQuestion.answers.map((answer,index)=>(
                                        <div className="answer" key={index}>
                                            <Radio
                                                label={answer.text}
                                                name='radioGroup'
                                                value={index}
                                                checked={this.state.currentAnswer === index}
                                                onChange={()=>this.setState({currentAnswer:index})}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="submit">
                                    <PulseButton onClick={()=>this.handleAnswer(this.state.currentQuestion.answers[this.state.currentAnswer])}>Cevapla</PulseButton>
                                </div>
                            </Segment>
                        </Container>
                    </section>
                </Transition>
            </section>;
        return content;
    }
}

Test.propTypes = {
    getQuestion:PropTypes.func.isRequired,
}

export default Test;