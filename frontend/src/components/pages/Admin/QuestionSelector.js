import React from 'react';
import {Segment,Button,Tab} from 'semantic-ui-react'


class QuestionSelector extends React.Component{ 

    getQuestionsByStage=(questions,stage)=>{
        return questions.filter(q=>q.stage===stage);
    }

    getClassText(question)
    {
        const {selectedQuestion}=this.props;
        if(!selectedQuestion)
        {
            return "";
        }
        return (selectedQuestion.order===question.order && selectedQuestion.stage===question.stage && selectedQuestion.altType===question.altType && selectedQuestion.personalityType===question.personalityType && selectedQuestion.wingType===question.wingType) ? "selected-question" : "";
    }

    getTabs=()=>{
        let tabStage1=(
            <Segment className="question-selector">
                {
                    this.getQuestionsByStage(this.props.questionData,"1").map((question,index)=>
                    {
                        const order=index+1;
                        const color = question.text ?"green":"red";
                        return <Button className={this.getClassText(question)} onClick={()=>this.props.selectQuestion(question)} key={index} color={color}>{order}</Button>
                    }
                )}
            </Segment>
        );
        let tabStage2=(
            <Segment className="question-selector stage">
                {
                    this.getQuestionsByStage(this.props.questionData,"2-1").map((question,index)=>
                    {
                        let text=`Tip:${question.personalityType} Sıra:${question.stage}`;
                        const color = question.text ?"green":"red";
                        return <Button className={this.getClassText(question)} onClick={()=>this.props.selectQuestion(question)} key={index} color={color}>{text}</Button>
                    })
                }
                {
                    this.getQuestionsByStage(this.props.questionData,"2-2").map((question,index)=>
                    {
                        let text=`Tip:${question.personalityType} Sıra:${question.stage}`;
                        const color = question.text ?"green":"red";
                        return <Button className={this.getClassText(question)} onClick={()=>this.props.selectQuestion(question)} key={index} color={color}>{text}</Button>
                    })
                }
                {
                    this.getQuestionsByStage(this.props.questionData,"2-3").map((question,index)=>
                    {
                        let text=`Tip:${question.personalityType} Sıra:${question.stage}`;
                        const color = question.text ?"green":"red";
                        return <Button className={this.getClassText(question)} onClick={()=>this.props.selectQuestion(question)} key={index} color={color}>{text}</Button>
                    })
                }
            </Segment>
        )
        let tabStage3=(
            <Segment className="question-selector stage">
                {
                    this.getQuestionsByStage(this.props.questionData,"3").map((question,index)=>
                    {
                        console.table(question)
                        let text=`Tip:${question.personalityType} Kanat:${question.wingType}`;
                        const color = question.text ?"green":"red";
                        return <Button className={this.getClassText(question)} onClick={()=>this.props.selectQuestion(question)} key={index} color={color}>{text}</Button>
                    }
                )}
            </Segment>
        );
        let tabStage4=(
            <Segment className="question-selector stage">
                {
                    this.getQuestionsByStage(this.props.questionData,"4-1").map((question,index)=>
                    {
                        let text=`Tip:${question.personalityType} Alt:${question.altType}-1`;
                        const color = question.text ?"green":"red";
                        return <Button className={this.getClassText(question)} onClick={()=>this.props.selectQuestion(question)} key={index} color={color}>{text}</Button>
                    }
                )}
                {
                    this.getQuestionsByStage(this.props.questionData,"4-2").map((question,index)=>
                    {
                        let text=`Tip:${question.personalityType} Alt:${question.altType}-2`;
                        const color = question.text ?"green":"red";
                        return <Button className={this.getClassText(question)} onClick={()=>this.props.selectQuestion(question)} key={text} color={color}>{text}</Button>
                    }
                )}
            </Segment>
        );

        return [
                {menuItem:"Aşama 1",render:()=>tabStage1},
                {menuItem:"Aşama 2",render:()=>tabStage2},
                {menuItem:"Kanat tipi",render:()=>tabStage3},
                {menuItem:"Alt tip",render:()=>tabStage4}
            ];
    }

    render(){
        return(
            <section className="question-selector-tabs">
                <Tab panes={this.getTabs()} />
            </section>
        )
    }
}

export default QuestionSelector;