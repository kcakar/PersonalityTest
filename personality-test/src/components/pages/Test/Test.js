import React from 'react';
import PropTypes from 'prop-types';
import { Container,Transition,Segment,Radio,Progress,Icon } from 'semantic-ui-react';
import PulseButton from '../../presentation/PulseButton';
import Loading from '../../presentation/Loading';
import { Redirect} from 'react-router-dom';

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentAnswer:0,
            questionCount:2,
            currentQuestion:null,
            stage:0,
            questionVisible:true,
            personality:{
                type1:0,
                type2:0,
                type3:0,
                type4:0,
                type5:0,
                type6:0,
                type7:0,
                type8:0,
                type9:0,
            }
        }
        this.selectAnwser=this.selectAnwser.bind(this);
        this.animateQuestionText=this.animateQuestionText.bind(this);
        this.handleAnswer=this.handleAnswer.bind(this);
        this.applyAnswer=this.applyAnswer.bind(this);
        this.finishTest=this.finishTest.bind(this);
    }

    componentDidMount(){
        let currentQuestion=null;

        if(!this.state.currentQuestion)//test just started,get the first question
        {
            currentQuestion=Object.assign({},this.props.getQuestion(1));
        }

        const questionCount=this.props.getQuestionCount();
        this.setState({questionCount,currentQuestion});
    }

    componentWillUnmount(){
        this.finishTest();
    }

    animateQuestionText(currentQuestion){
        this.setState({questionVisible:false});
        setTimeout(() => {
            this.setState({currentQuestion,currentAnswer:0});
            this.setState({questionVisible:true});
        }, 200);
    }

    moveToNextQuestion(){
        let currentQuestion=Object.assign({},this.state.currentQuestion);
        currentQuestion.order++;
        console.log(currentQuestion.order)
        if(currentQuestion.order>this.state.questionCount)
        {
            this.finishTest();
        }
        else{
            currentQuestion=this.props.getQuestion(currentQuestion.order);
            this.animateQuestionText(currentQuestion);
        }
    }

    finishTest(){
        this.setState({isFinished:true,currentQuestion:null,currentAnswer:0});
        this.props.testFinished(this.state.personality);
    }

    getMood(value){
        switch (value) {
            case -2:
                return {
                    color:"red",
                    name:"frown outline"
                }
            case -1:
                return {
                    color:"orange",
                    name:"frown outline"
                }
            case 0:
                return {
                    color:"grey",
                    name:"meh outline"
                }
            case 1:
                return {
                    color:"olive",
                    name:"smile outline"
                }
            case 2:
                return {
                    color:"green",
                    name:"smile outline"
                }
            default:
                return {
                    color:"green",
                    name:"meh outline"
                }
        }
    }

    selectAnwser(currentAnswer){
        this.setState({currentAnswer});
    }

    handleAnswer(answer){
        this.applyAnswer();
        this.moveToNextQuestion();
    }

    applyAnswer(){
        let personality=Object.assign({},this.state.personality);
        personality["type"+this.state.currentQuestion.personalityType]+=this.state.currentAnswer;
        console.log(personality);
        this.setState({personality});
    }

    render(){
        if(this.state.isFinished){
            return <Redirect to="/Results" />
        }
        const mood=this.getMood(this.state.currentAnswer);



        let content= !this.state.currentQuestion? <Loading/>:
            <div className="flex-center">
                <section className="test-container centered">
                    <div className="progress">
                        <Progress indicating  value={this.state.currentQuestion.order} total={this.state.questionCount} progress='ratio'/>
                    </div>
                    <Transition visible={this.state.questionVisible} animation='fade' duration={200}>
                        <section className="test">
                            <Container>
                                <Segment textAlign='center' size='big' className="question">        
                                    <div className="question-text">
                                        <span>{this.state.currentQuestion.text}</span>
                                    </div>
                                    <div className="answers-container">
                                        <div className="mood-container">
                                            <Icon.Group size='huge'>
                                                <Icon  color={mood.color} name={mood.name} />
                                            </Icon.Group>
                                        </div>
                                    
                                        <div className="answers">
                                            <div className="answer">
                                                <Radio
                                                    label="Hiç katılmıyorum"
                                                    name='radioGroup'
                                                    value={-2}
                                                    checked={this.state.currentAnswer === -2}
                                                    onChange={()=>this.selectAnwser(-2)}
                                                />
                                            </div>
                                            <div className="answer">
                                                <Radio
                                                    label="Katılmıyorum"
                                                    name='radioGroup'
                                                    value={-1}
                                                    checked={this.state.currentAnswer === -1}
                                                    onChange={()=>this.selectAnwser(-1)}
                                                />
                                            </div>
                                            <div className="answer">
                                                <Radio
                                                    label="Kararsızım"
                                                    name='radioGroup'
                                                    value={-1}
                                                    checked={this.state.currentAnswer === 0}
                                                    onChange={()=>this.selectAnwser(0)}
                                                />
                                            </div>
                                            <div className="answer">
                                                <Radio
                                                    label="Katılıyorum"
                                                    name='radioGroup'
                                                    value={-1}
                                                    checked={this.state.currentAnswer === 1}
                                                    onChange={()=>this.selectAnwser(1)}
                                                />
                                            </div>
                                            <div className="answer">
                                                <Radio
                                                    label="Çok katılıyorum"
                                                    name='radioGroup'
                                                    value={-1}
                                                    checked={this.state.currentAnswer === 2}
                                                    onChange={()=>this.selectAnwser(2)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="submit">
                                        <PulseButton onClick={this.handleAnswer}>Cevapla</PulseButton>
                                    </div>
                                </Segment>
                            </Container>
                        </section>
                    </Transition>
                </section>
            </div>
            ;
        return content;
    }
}

Test.propTypes = {
    getQuestion:PropTypes.func.isRequired,
    getQuestionCount:PropTypes.func.isRequired,
    testFinished:PropTypes.func.isRequired,
}

export default Test;