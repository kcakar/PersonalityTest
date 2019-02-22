import React from 'react';
import {Segment,Header,Transition,Button} from 'semantic-ui-react'
import { ToastContainer, toast } from "react-toastify";

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
        
        return ApiHelper.functions.question.getAllByLanguage(language)
            .then(data=>{
                data=this.fillEmptyQuestions(data,language);
                if(language==="tr"){
                 this.setState({visible:true,language,data,turkishQuestions:data,selectedOrder:1,selectedQuestion:data[0],referenceQuestion:data[0]})
                }
                else{
                 const referenceQuestion=this.state.turkishQuestions.find(q=>q.order===1);
                 this.setState({visible:true,language,data,selectedOrder:1,selectedQuestion:data[0],referenceQuestion:referenceQuestion })
                }
            })
            .catch(err=>{
    toast.error(err.message,{position: toast.POSITION.TOP_CENTER});            })
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
        const referenceQuestion=this.state.turkishQuestions.find((q)=>q.order===selectedOrder);
        this.setState({selectedQuestion,selectedOrder,referenceQuestion});
    }

    saveQuestion(){
        
        let {selectedQuestion,referenceQuestion}=this.state;
        //eğer soru türkçe değilse, kişilik tipini türkçe referans sorudan alır.
        if(selectedQuestion.language!=="tr"){
            selectedQuestion.personalityType=referenceQuestion.personalityType;
        }
        ApiHelper.functions.question.createOrUpdate(this.state.selectedQuestion)
        .then(()=>{
            toast.success('Soru kaydedildi',{position: toast.POSITION.TOP_CENTER});
        })
        .catch(err=>{
toast.error(err.message,{position: toast.POSITION.TOP_CENTER});        })
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
                    <p>Bir sorunun puanlanacak kişilik tipini sadece Türkçe'den değiştirebilirsiniz. Değişiklik tüm dilleri etkiler.</p>
                    <Segment className="question-selector">
                        {data.map((question,index)=>
                            {
                                const order=index+1;
                                const color = question.text ?"green":"red";
                                return <Button className={selectedOrder===order?"selected-question":""} onClick={()=>this.selectQuestion(order)} key={order} color={color}>{order}</Button>
                            }
                        )}
                    </Segment>
                    <QuestionEditor 
                        selectedQuestion={selectedQuestion} 
                        referenceQuestion={referenceQuestion} 
                        handleQuestionChange={this.handleQuestionChange} 
                        saveQuestion={this.saveQuestion}
                        language={this.state.language}
                    />
                </Segment>
            </div>
        </Transition>
        )
    }
}

export default QuestionManagement;