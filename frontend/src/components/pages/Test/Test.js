import React from 'react';
import { Container,Transition,Segment,Radio,Progress,Image,Header } from 'semantic-ui-react';
import { Redirect} from 'react-router-dom';
import {  toast } from "react-toastify";

import Intro from './Intro';
import PulseButton from '../../common/PulseButton';
import ApiHelper from '../../../helpers/ApiHelper';
import urls from '../../../helpers/URLs';
import logo from '../../../assets/enneagram.svg';

class Test extends React.Component{
    state={
        currentQuestion:null,//question to show for stage 1
        questions:[], //questions to ask on stage 1
        options:{//option texts for stage 1
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            option5:"",
        },//after stage one, options change depending on the answers before.
        stageOptions:[

        ],//stage 2 and 4 are deny based
        deniedOptions:[

        ],
        stage:"-1",
        language:"tr",
        currentAnswer:0,//selected option is held here
        questionVisible:true,
        isLoadingButton:false
    }

    componentDidMount(){
        ApiHelper.functions.test.getStage("tr")
            .then(result=>{
                if(result.stage!=="finished")
                {
                    let {currentQuestion,...rest}=result;
                    if(result.questions){
                        currentQuestion= result.questions[currentQuestion-1]
                    }
                    this.setState({currentQuestion,...rest});
                }
                else{
                    this.setState({isFinished:true,stage:result.stage,currentQuestion:null,currentAnswer:0})
                }
            })
            .catch((err)=>{
                toast.error(err.message,{position: toast.POSITION.TOP_CENTER});
            })
    }

    testStart = () => {
        let currentQuestion = this.state.currentQuestion;

        if (!currentQuestion) //test just started,get the first question
        {
            currentQuestion = Object.assign({}, this.state.questions[0]);
        }
        ApiHelper.functions.test.update({
                stage: "1",
                questionId: currentQuestion.id
            })
            .then(result => {
                this.setState({
                    currentQuestion,
                    stage: "1"
                });
            })
            .catch((err) => {
                toast.error(err.message, {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    }

    //moves to the next question on stage 1
    moveToNextQuestion=() => {
        let currentQuestion=Object.assign({},this.state.currentQuestion);
        currentQuestion.order++;
        if(currentQuestion.order>this.state.questions.length)
        {
            this.getStage();
        }
        else{
            currentQuestion=this.state.questions[currentQuestion.order - 1];
            this.animateQuestionText(currentQuestion);
        }
    }

    handleAnswer=() => {
        const {currentQuestion,currentAnswer,questions}=this.state;

        const answer={
            questionId:currentQuestion.id,
            selectedOption:currentAnswer.toString()
        };
        const nextQuestion=questions[currentQuestion.order - 1];
        const nextQuestionId=nextQuestion?nextQuestion.id:null;
        ApiHelper.functions.test.saveAnswer(answer,nextQuestionId)
            .then(result=>{
                // this.setState({...result});
                this.moveToNextQuestion();
            })
            .catch((err)=>{
                toast.error(err.message,{position: toast.POSITION.TOP_CENTER});            
            })
    }

    handleStage2Answer=()=>{
        let {deniedOptions}=this.state;
        deniedOptions.push(this.state.currentAnswer);
        if(deniedOptions.length!==3)
        {
            this.setState({deniedOptions});
            this.getStage(deniedOptions);
        }
        else{//we have decided the personality type. Lets save it.
            this.savePersonalityType();
        }
    }

    handleStage4Answer=()=>{
        let {deniedOptions}=this.state;
        deniedOptions.push(this.state.currentAnswer);
        if(deniedOptions.length!==2)
        {
            this.setState({deniedOptions});
            this.getStage(deniedOptions);
        }
        else{//we have decided the personality type. Lets save it.
            this.saveAltType();
        }
    }

    savePersonalityType=()=>{
        let {stageOptions,deniedOptions}=this.state;
        let result = stageOptions.find(o=>{
            return deniedOptions.indexOf(o.personalityType)===-1
        }).personalityType;

        ApiHelper.functions.test.update({
            stage: "3",
            personalityType:result
        })
        .then(result => {
            this.getStage();
        })
        .catch((err) => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    saveAltType=()=>{
        let {stageOptions,deniedOptions}=this.state;
        let result = stageOptions.find(o=>{
            return deniedOptions.indexOf(o.altType)===-1
        }).altType;

        ApiHelper.functions.test.update({
            stage: "finished",
            altType:result
        })
        .then(result => {
            this.getStage();
        })
        .catch((err) => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }
    
    handleStage3Answer=()=>{
        this.saveWingType();
    }

    getOtherWingOption=()=>{
        const option= this.state.stageOptions.find(o=>{return o.wingType!==this.state.currentAnswer});
        return option.wingType;
    }
    
    saveWingType=()=>{
        ApiHelper.functions.test.update({
            stage: "4-1",
            wingType:this.getOtherWingOption()
        })
        .then(result => {
            this.setState({deniedOptions:[]},this.getStage)
        })
        .catch((err) => {
            toast.error(err.message, {
                position: toast.POSITION.TOP_CENTER
            });
        })
    }

    getStage=(deniedOptions=[])=>{
        ApiHelper.functions.test.getStage(this.state.language,deniedOptions)
        .then(result=>
            {
                if(result.stage!=="finished")
                {
                    this.setState({stage:result.stage,stageOptions:result.stageOptions})
                }
                else{
                    this.setState({isFinished:true,stage:result.stage,currentQuestion:null,currentAnswer:0})
                }
            })
        .catch(err=>toast.error(err.message,{position: toast.POSITION.TOP_CENTER}));
    }

    animateQuestionText=(currentQuestion) => {
        this.setState({questionVisible:false});
        setTimeout(() => {
            this.setState({currentQuestion,currentAnswer:0});
            this.setState({questionVisible:true});
        }, 200);
    }

    selectAnwser=(currentAnswer) => {
        this.setState({currentAnswer});
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
                                                <Radio label={options.option5} name='radioGroup' value={-1} checked={this.state.currentAnswer ===  2} onChange={()=>this.selectAnwser(2)} />
                                            </div>
                                            <div className="answer">
                                                <Radio label={options.option4} name='radioGroup' value={-1} checked={this.state.currentAnswer ===  1} onChange={()=>this.selectAnwser(1)} />
                                            </div>
                                            <div className="answer">
                                                <Radio label={options.option3} name='radioGroup' value={-1} checked={this.state.currentAnswer ===  0} onChange={()=>this.selectAnwser(0)} />
                                            </div>
                                            <div className="answer">
                                                <Radio label={options.option2} name='radioGroup' value={-1} checked={this.state.currentAnswer === -1} onChange={()=>this.selectAnwser(-1)} />
                                            </div>
                                            <div className="answer">
                                                <Radio label={options.option1} name='radioGroup' value={-2} checked={this.state.currentAnswer === -2} onChange={()=>this.selectAnwser(-2)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="submit">
                                        <PulseButton onClick={this.handleAnswer} isLoading={this.state.isLoadingButton}>İlerle</PulseButton>
                                    </div>
                                </Segment>
                            </Transition>
                        </Container>
                    </section>
                </div>
            </section>;
    }

    renderStage2=()=>{
        return <section className="test flex-center">
                <div className="test-container centered">
                    <section className="test">
                        <Container>
                            <Transition visible={this.state.questionVisible} animation='fade' duration={100}>
                                <Segment textAlign='center' size='big' className="question">        
                                    <div className="question-text">
                                        <span>Aşağıdaki ifadelerden size en <b>uzak</b> olan hangisi?</span>
                                    </div>
                                    <div className="answers-container">
                                        <div className="answers">
                                            {this.state.stageOptions.map((option,index)=>
                                                <div key={index} className="answer">
                                                    <Radio label={option.text} name='radioGroup' value={option.personalityType} checked={this.state.currentAnswer === option.personalityType} onChange={()=>this.selectAnwser(option.personalityType)}/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="submit">
                                        <PulseButton onClick={this.handleStage2Answer}>İlerle</PulseButton>
                                    </div>
                                </Segment>
                            </Transition>
                        </Container>
                    </section>
                </div>
            </section>;
    }

    renderStage3=()=>{
        return <section className="test flex-center">
                <div className="test-container centered">
                    <section className="test">
                        <Container>
                            <Transition visible={this.state.questionVisible} animation='fade' duration={100}>
                                <Segment textAlign='center' size='big' className="question">        
                                    <div className="question-text">
                                        <span>Aşağıdaki ifadelerden size en <b>uzak</b> olanı hangisi?</span>
                                    </div>
                                    <div className="answers-container">
                                        <div className="answers">
                                            {this.state.stageOptions.map((option,index)=>
                                                <div key={index} className="answer">
                                                    <Radio label={option.text} name='radioGroup' value={option.wingType} checked={this.state.currentAnswer === option.wingType} onChange={()=>this.selectAnwser(option.wingType)}/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="submit">
                                        <PulseButton onClick={this.handleStage3Answer}>İlerle</PulseButton>
                                    </div>
                                </Segment>
                            </Transition>
                        </Container>
                    </section>
                </div>
            </section>;
    }

    renderStage4=()=>{
        return <section className="test flex-center">
                <div className="test-container centered">
                    <section className="test">
                        <Container>
                            <Transition visible={this.state.questionVisible} animation='fade' duration={100}>
                                <Segment textAlign='center' size='big' className="question">        
                                    <div className="question-text">
                                        <span>Aşağıdaki ifadelerden size en <b>uzak</b> olan hangisi?</span>
                                    </div>
                                    <div className="answers-container">
                                        <div className="answers">
                                            {this.state.stageOptions.map((option,index)=>
                                                <div key={index} className="answer">
                                                    <Radio label={option.text} name='radioGroup' value={option.altType} checked={this.state.currentAnswer === option.altType} onChange={()=>this.selectAnwser(option.altType)}/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="submit">
                                        <PulseButton onClick={this.handleStage4Answer}>İlerle</PulseButton>
                                    </div>
                                </Segment>
                            </Transition>
                        </Container>
                    </section>
                </div>
            </section>;
    }

    renderFinish=()=>{
        return <div className="intro-container flex-center">
        <section className="intro flex-center">
                <Transition visible={this.state.visible} animation='scale' duration={500}>
                    <Container className="centered" text>
                        <Segment textAlign='center' size='big' >
                            <Image src={logo} size='medium' circular />  
                            <Header as='h1'>Tria Akademi</Header>    
                            <ul>
                                <li>Test tamamlanmıştır.<br/> Teşekkür ederiz.</li>
                            </ul>
                        </Segment>
                    </Container>
                </Transition>
            </section>
            </div>


    }

    render(){
        const {stage,questions}=this.state;
        // if(this.state.isFinished){
        //     return <Redirect to={urls.results} />
        // }
        switch (stage) {
            case "-1":
                return <Intro isLoaded={questions.length>0} testStart={this.testStart}/>
            case "1":
                return this.renderStage1();
            case "2-1":
                return this.renderStage2();
            case "2-2":
                return this.renderStage2();
            case "2-3":
                return this.renderStage2();
            case "3":
                return this.renderStage3();
            case "4-1":
                return this.renderStage4();
            case "4-2":
                return this.renderStage4();
            case "finished":
                return this.renderFinish();
            default:
            return <Intro isLoaded={questions.length>0} testStart={this.testStart}/>
        }

    }
}

export default Test;