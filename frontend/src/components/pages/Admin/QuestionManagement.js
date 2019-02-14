import React from 'react';
import {Segment,Header,Transition,Button} from 'semantic-ui-react'
import {withToastManager} from 'react-toast-notifications';

import QuestionEditor from './QuestionEditor';
import LanguageSelector from '../../common/LanguageSelector';
import ApiHelper from '../../../helpers/ApiHelper';

class QuestionManagement extends React.Component{ 
    constructor(props){
        super(props);

        this.state={
            visible:false,
            data:[],
            language:"tr",
            turkishQuestions:[],
            selectedQuestion:null,
            referenceQuestion:null,
            selectedOrder:0,
        }

        this.fillEmptyQuestions=this.fillEmptyQuestions.bind(this);
        this.handleLanguageChange=this.handleLanguageChange.bind(this);
        this.handleQuestionChange=this.handleQuestionChange.bind(this);
        this.saveQuestion=this.saveQuestion.bind(this);
        this.selectQuestion=this.selectQuestion.bind(this);
    }

    componentDidMount(){
        this.getQuestionsByLanguage(this.state.language);
    }

    handleLanguageChange(e,{value}){
        this.getQuestionsByLanguage(value);
    }

    getQuestionsByLanguage(language){
        const { toastManager } = this.props;
        return ApiHelper.functions.question.getAllByLanguage(language)
            .then(data=>{
                data=this.fillEmptyQuestions(data,language);
                if(language==="tr"){
                 this.setState({visible:true,language,data,turkishQuestions:data,selectedOrder:1,selectedQuestion:data[0],referenceQuestion:data[0]})
                }
                else{
                 const referenceQuestion=this.state.turkishQuestions.find(q=>q.language==="tr"&&q.order===1);
                 this.setState({visible:true,language,data,selectedOrder:1,selectedQuestion:data[0],referenceQuestion:referenceQuestion })
                }
            })
            .catch(err=>{
                toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
            })
    }

    fillEmptyQuestions(questions,language){
        let data=[];
        for(let i=1;i<64;i++){
            const question=questions.find(x=>x.order===i);
            data.push(question||this.getNewQuestionModel(i,language))
        }
        return data;
    }
    
    getNewQuestionModel(order,language){
        return {text:"",order,personalityType:1,language};
    }

    selectQuestion(selectedOrder){
        const selectedQuestion=this.state.data.find((q)=>q.order===selectedOrder);
        const referenceQuestion=this.state.turkishQuestions.find((q)=>q.order===selectedOrder&&q.language==="tr");
        this.setState({selectedQuestion,selectedOrder,referenceQuestion});
    }

    saveQuestion(){
        const { toastManager } = this.props;
        ApiHelper.functions.question.createOrUpdate(this.state.selectedQuestion)
        .then(()=>{
            toastManager.add('Soru kaydedildi', { appearance: 'success' ,autoDismiss: true,autoDismissTimeout:3000});
        })
        .catch(err=>{
            toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
        })
    }

    handleQuestionChange(selectedQuestion){
        this.setState({selectedQuestion});
    }

    render(){
        const {data,selectedQuestion,selectedOrder,referenceQuestion}=this.state;
        return (
        <Transition visible={this.state.visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Sorular</Header>
                <LanguageSelector handleLanguageChange={this.handleLanguageChange} selected={this.state.language}/>
                <Segment>
                    <p>Aşağıdaki ekranda seçili dil için çevirisi olan sorular yeşil, olmayan sorular ise kırmızı ile işaretlenmiştir. İlgili sayıya tıklayarak soruyu düzenleyebilirsiniz.</p>
                    <p>Bir dildeki tüm soruları çevirirseniz, dil sistemde otomatik olarak aktifleşecektir.</p>
                    <Segment className="question-selector">
                        {data.map((question,index)=>
                            {
                                const order=index+1;
                                const color = question.text ?"green":"red";
                                return <Button className={selectedOrder===order?"selected-question":""} onClick={()=>this.selectQuestion(order)} key={order} color={color}>{order}</Button>
                            }
                        )}
                    </Segment>
                    <QuestionEditor selectedQuestion={selectedQuestion} referenceQuestion={referenceQuestion} handleQuestionChange={this.handleQuestionChange} saveQuestion={this.saveQuestion}/>
                </Segment>
            </div>
        </Transition>
        )
    }
}

export default withToastManager(QuestionManagement);