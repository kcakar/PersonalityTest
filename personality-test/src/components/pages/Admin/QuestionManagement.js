import React from 'react';
import { Segment,Header,Transition,Button} from 'semantic-ui-react'
import LanguageSelector from '../../presentation/LanguageSelector';
import QuestionData from '../../mockdata/Questions';
import QuestionEditor from './QuestionEditor';
import {withToastManager } from 'react-toast-notifications';

class QuestionManagement extends React.Component{ 
    constructor(props){
        super(props);

        this.state={
            visible:false,
            data:[],
            allQuestions:[],
            language:"tr",
            selectedQuestion:null,
            selectedOrder:0,
        }

        this.handleLanguageChange=this.handleLanguageChange.bind(this);
        this.filterQuestionsByLanguage=this.filterQuestionsByLanguage.bind(this);
        this.selectQuestion=this.selectQuestion.bind(this);
        this.handleQuestionChange=this.handleQuestionChange.bind(this);
        this.saveQuestion=this.saveQuestion.bind(this);
    }

    componentDidMount(){
        const data=this.filterQuestionsByLanguage(QuestionData,this.state.language);
        this.setState({
            visible:true,
            data,
            allQuestions:QuestionData,
            selectedQuestion:data[0],
            selectedOrder:1
        });
    }

    handleLanguageChange(e,{value}){
        const data=this.filterQuestionsByLanguage(this.state.allQuestions,value);
        this.setState({language:value,data,selectedOrder:1,selectedQuestion:data[0]});
    }

    filterQuestionsByLanguage(allQuestions,language){
        let data=[];
        for(let i=1;i<64;i++){
            const question=allQuestions.find(x=>x.language===language &&x.order===i);
            data.push(question||this.getNewQuestionModel(i,language))
        }
        return data;
    }
    
    getNewQuestionModel(order,language){
        return {text:"",order,personalityType:1,language};
    }

    selectQuestion(selectedOrder){
        const selectedQuestion=this.state.data.find((q)=>q.order===selectedOrder);
        this.setState({selectedQuestion,selectedOrder});
    }

    saveQuestion(){
        //save here
        const { toastManager } = this.props;
        toastManager.add('Soru kaydedildi', { appearance: 'success' ,autoDismiss: true,autoDismissTimeout:3000});
    }

    handleQuestionChange(selectedQuestion){
        this.setState({selectedQuestion});
    }

    render(){
        const {data,selectedQuestion,selectedOrder}=this.state;
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
                    <QuestionEditor selectedQuestion={selectedQuestion} handleQuestionChange={this.handleQuestionChange} saveQuestion={this.saveQuestion}/>
                </Segment>
            </div>
        </Transition>
        )
    }
}

export default withToastManager(QuestionManagement);