import React from 'react';
import {Segment,Header,Transition} from 'semantic-ui-react'
import { toast } from "react-toastify";

import QuestionEditor from './QuestionEditor';
import LanguageSelector from '../../common/LanguageSelector';
import ApiHelper from '../../../helpers/ApiHelper';
import QuestionSelector from './QuestionSelector';

class QuestionManagement extends React.Component{ 
    state={
        visible:false,
        turkishQuestions:[],
        data:[],
        language:"tr",
        selectedQuestion:null,
        referenceQuestion:null
    }

    componentDidMount=()=>{
        this.getQuestionsByLanguage(this.state.language);
    }

    getQuestionsByLanguage=(language)=>{
        return ApiHelper.functions.question.getAllByLanguage(language)
            .then(data=>{
                data=this.fillEmptyQuestions(data,language);
                if(language==="tr"){
                 this.setState({visible:true,language,data,turkishQuestions:data,selectedQuestion:data[0],referenceQuestion:data[0]})
                }
                else{
                 const referenceQuestion=this.state.turkishQuestions.find(q=>q.order===1);
                 this.setState({visible:true,language,data,selectedQuestion:data[0],referenceQuestion:referenceQuestion })
                }
            })
            .catch(err=>{
                toast.error(err.message,{position: toast.POSITION.TOP_CENTER});            
            })
    }

    handleLanguageChange=(e,{value})=>{
        this.getQuestionsByLanguage(value);
    }

    fillEmptyQuestions=(questions,language)=>{
        let {turkishQuestions}=this.state;
        if(language==="tr")//no eempty questions for turkish
        {
            return questions;
        }
        else{
            let data=turkishQuestions.map(turkishQuestion=>{
                const question = questions.find(x =>
                    x.order === turkishQuestion.order &&
                    x.stage === turkishQuestion.stage &&
                    x.personalityType === turkishQuestion.personalityType &&
                    x.wingType === turkishQuestion.wingType &&
                    x.altType === turkishQuestion.altType);

                return question || this.getNewQuestionModel(turkishQuestion,language);
            })
            return data;
        }
    }
    
    getNewQuestionModel=(turkishQuestion,newLanguage)=>{
        let {language,text,id,...rest}=turkishQuestion;
        return {
                text:"",
                language:newLanguage,
                ...rest
            };
    }

    selectQuestion=(question)=>{
        const selectedQuestion=this.state.data.find((q)=>q.order===question.order && q.stage===question.stage && q.personalityType===question.personalityType && q.wingType===question.wingType && q.altType===question.altType);
        const referenceQuestion=this.state.turkishQuestions.find((q)=>q.order===question.order && q.stage===question.stage && q.personalityType===question.personalityType && q.wingType===question.wingType && q.altType===question.altType);
        this.setState({selectedQuestion,referenceQuestion});
    }

    saveQuestion=()=>{
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
            toast.error(err.message,{position: toast.POSITION.TOP_CENTER});        
        })
    }

    handleQuestionChange=(selectedQuestion)=>{
        this.setState({selectedQuestion});
    }

    render(){
        const {data,selectedQuestion,referenceQuestion}=this.state;
        return (
        <Transition visible={this.state.visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Sorular</Header>
                <LanguageSelector handleLanguageChange={this.handleLanguageChange} selected={this.state.language}/>
                <Segment>
                    <p>Aşağıdaki ekranda seçili dil için çevirisi olan sorular yeşil, olmayan sorular ise kırmızı ile işaretlenmiştir. İlgili sayıya tıklayarak soruyu düzenleyebilirsiniz.</p>
                    <p>Bir dildeki tüm soruları çevirirseniz, dil sistemde otomatik olarak aktifleşecektir.</p>
                    <p>Bir sorunun puanlanacak kişilik tipini sadece Türkçe'den değiştirebilirsiniz. Değişiklik tüm dilleri etkiler.</p>
                    <QuestionSelector 
                        selectQuestion={this.selectQuestion} 
                        selectedQuestion={selectedQuestion} 
                        questionData={data}
                    />
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