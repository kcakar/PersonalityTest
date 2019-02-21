import React from 'react';
import PropTypes from 'prop-types';
import { Container,Transition,Segment,Radio,Progress,Icon,Image,Header } from 'semantic-ui-react';
import { Redirect} from 'react-router-dom';
import {withToastManager} from 'react-toast-notifications';

import Intro from './Intro';
import PulseButton from '../../common/PulseButton';
import ApiHelper from '../../../helpers/ApiHelper';

class Test extends React.Component{
    state={
        questions:[],
        options:{
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            option5:"",
        },
        language:"tr",
        currentAnswer:0,
        currentQuestion:null,
        stage:"-1",
        questionVisible:true,
    }

    componentDidMount(){
        const {toastManager}=this.props;
        ApiHelper.functions.test.getQuestions(1,"tr")
            .then(result=>{
                let {currentQuestion,...rest}=result;
                this.setState({currentQuestion: result.questions[currentQuestion-1],...rest});
            })
            .catch((err)=>{
                toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
            })
    }

    componentWillUnmount(){
        this.finishTest();
    }

    testStart=()=>{
        const {toastManager}=this.props;

        let currentQuestion=this.state.currentQuestion;

        if(!currentQuestion)//test just started,get the first question
        {
            currentQuestion=Object.assign({},this.getQuestion(1));
        }
        ApiHelper.functions.test.update({stage:"1",questionId:currentQuestion.id})
            .then(result=>{
                this.setState({currentQuestion,stage:"1"});
            })
            .catch((err)=>{
                toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
            })
    }

    getQuestion=(order) => {
        return this.state.questions[order - 1];
    }

    finishTest=() => {
        this.setState({isFinished:true,currentQuestion:null,currentAnswer:0});
        this.props.testFinished(this.state.personality);
    }

    selectAnwser=(currentAnswer) => {
        this.setState({currentAnswer});
    }

    handleAnswer=(answer) => {
        this.applyAnswer();
    }

    applyAnswer=() => {
        const {toastManager}=this.props;
        const {currentQuestion,currentAnswer}=this.state;
        const answer={
            questionId:currentQuestion.id,
            selectedOption:currentAnswer.toString()
        };
        const nextQuestion=this.getQuestion(currentQuestion.order+1);
        const nextQuestionId=nextQuestion?nextQuestion.id:null;
        ApiHelper.functions.test.saveAnswer(answer,nextQuestionId)
            .then(result=>{
                this.setState({...result});
                this.moveToNextQuestion();
            })
            .catch((err)=>{
                toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
            })
    }

    moveToNextQuestion=() => {
        let currentQuestion=Object.assign({},this.state.currentQuestion);
        currentQuestion.order++;
        if(currentQuestion.order>this.state.questions.length)
        {
            this.finishTest();
        }
        else{
            currentQuestion=this.getQuestion(currentQuestion.order);
            this.animateQuestionText(currentQuestion);
        }
    }

    animateQuestionText=(currentQuestion) => {
        this.setState({questionVisible:false});
        setTimeout(() => {
            this.setState({currentQuestion,currentAnswer:0});
            this.setState({questionVisible:true});
        }, 200);
    }
    
    renderStage1=()=>{
        const {options}=this.state;
        return <section className="test flex-center">
                <div className="test-container centered">
                    <div className="progress">
                        <Progress indicating  value={this.state.currentQuestion.order} total={this.state.questions.length} progress='ratio'/>
                    </div>
                        <section className="test">
                            <Container>
                                <Transition visible={this.state.questionVisible} animation='fade' duration={100}>
                                    <Segment textAlign='center' size='big' className="question">        
                                        <div className="question-text">
                                            <span>{this.state.currentQuestion.text}</span>
                                        </div>
                                        <div className="answers-container">
                                            <div className="answers">
                                                <div className="answer">
                                                    <Radio label={options.option1} value={-2} checked={this.state.currentAnswer === -2} onChange={()=>this.selectAnwser(-2)} name='radioGroup'/>
                                                </div>
                                                <div className="answer">
                                                    <Radio label={options.option2} name='radioGroup' value={-1} checked={this.state.currentAnswer === -1} onChange={()=>this.selectAnwser(-1)} />
                                                </div>
                                                <div className="answer">
                                                    <Radio label={options.option3} name='radioGroup' value={-1} checked={this.state.currentAnswer === 0} onChange={()=>this.selectAnwser(0)} />
                                                </div>
                                                <div className="answer">
                                                    <Radio label={options.option4} name='radioGroup' value={-1} checked={this.state.currentAnswer === 1} onChange={()=>this.selectAnwser(1)} />
                                                </div>
                                                <div className="answer">
                                                    <Radio label={options.option5} name='radioGroup' value={-1} checked={this.state.currentAnswer === 2} onChange={()=>this.selectAnwser(2)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="submit">
                                            <PulseButton onClick={this.handleAnswer}>Cevapla</PulseButton>
                                        </div>
                                    </Segment>
                                </Transition>
                            </Container>
                        </section>
                </div>
            </section>;

    }

    render(){
        const {stage,questions}=this.state;
        console.log(questions)

        if(this.state.isFinished){
            return <Redirect to="/Results" />
        }
        switch (stage) {
            case "-1":
                return <Intro isLoaded={questions.length>0} testStart={this.testStart}/>
            case "1":
                return this.renderStage1();
            default:
            return <Intro isLoaded={questions.length>0} testStart={this.testStart}/>
        }

    }
}

Test.propTypes = {
    testFinished:PropTypes.func.isRequired,
}

export default withToastManager(Test);