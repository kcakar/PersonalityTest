import React from 'react';
import { Segment,Header,Transition,Button,Divider,Icon} from 'semantic-ui-react'
import LanguageSelector from '../../presentation/LanguageSelector';
import QuestionData from '../../mockdata/Questions';
import QuestionEditor from './QuestionEditor';

class QuestionManagement extends React.Component{ 
    constructor(props){
        super(props);

        this.state={
            visible:false,
            data:[],
            allQuestions:[],
            language:"tr",
            selectedQuestion:null
        }

        this.handleLanguageChange=this.handleLanguageChange.bind(this);
        this.filterQuestionsByLanguage=this.filterQuestionsByLanguage.bind(this);
        this.fillQuestions=this.fillQuestions.bind(this);
        this.selectQuestion=this.selectQuestion.bind(this);
    }

    componentDidMount(){
        const data=this.filterQuestionsByLanguage(QuestionData,this.state.language);
        this.setState({
            visible:true,
            data,
            allQuestions:QuestionData,
            selectQuestion:data[0]
        });
    }

    handleLanguageChange(e,{value}){
        const data=this.filterQuestionsByLanguage(this.state.allQuestions,value);
        this.setState({language:value,data});
    }

    filterQuestionsByLanguage(allQuestions,language){
        return allQuestions.filter(x=>x.language===language);
    }

    selectQuestion(order){
        const selectedQuestion=this.state.data.find((q)=>q.order===order);
        this.setState({selectedQuestion:selectedQuestion});
    }

    fillQuestions(){
        let questions=[];
        for(let i=1;i<64;i++){
            const color = this.state.data.find((question)=>question.order===i)?"green":"red";
            questions.push(
                <Button onClick={()=>this.selectQuestion(i)} key={i} color={color}>{i}</Button>
            )
        }
        return questions;
    }

    render(){
        const question=this.state.selectedQuestion;
        return (
        <Transition visible={this.state.visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Sorular</Header>
                <LanguageSelector handleLanguageChange={this.handleLanguageChange} selected={this.state.language}/>
                <Segment>
                    <p>Aşağıdaki ekranda seçili dil için çevirisi olan sorular yeşil, olmayan sorular ise kırmızı ile işaretlenmiştir. İlgili sayıya tıklayarak soruyu düzenleyebilirsiniz.</p>
                    <p>Bir dildeki tüm soruları çevirirseniz, dil sistemde otomatik olarak aktifleşecektir.</p>
                    <Segment className="question-selector">
                        {this.fillQuestions()}
                    </Segment>
                    {question?<QuestionEditor selectedQuestion={question} existing={true} />:<QuestionEditor selectedQuestion={question} existing={false} />}
                </Segment>
            </div>
        </Transition>
        )
    }
}

export default QuestionManagement;