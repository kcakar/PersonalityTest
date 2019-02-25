import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { TextArea,Form,Header,Dropdown,Button} from 'semantic-ui-react';

const personalityTypes=[
    {key:1,value:"1",text:"1"},
    {key:2,value:"2",text:"2"},
    {key:3,value:"3",text:"3"},
    {key:4,value:"4",text:"4"},
    {key:5,value:"5",text:"5"},
    {key:6,value:"6",text:"6"},
    {key:7,value:"7",text:"7"},
    {key:8,value:"8",text:"8"},
    {key:9,value:"9",text:"9"}
]

const wingTypes=[
    {key:1,value:"1",text:"1"},
    {key:2,value:"2",text:"2"},
    {key:3,value:"3",text:"3"},
    {key:4,value:"4",text:"4"},
    {key:5,value:"5",text:"5"},
    {key:6,value:"6",text:"6"},
    {key:7,value:"7",text:"7"},
    {key:8,value:"8",text:"8"},
    {key:9,value:"9",text:"9"}
]

const altTypes=[
    {key:1,value:"SP",text:"SP"},
    {key:2,value:"SX",text:"SX"},
    {key:3,value:"SOC",text:"SOC"},
]

class QuestionEditor extends Component {
    personalityChange=(e,{value})=>{
        let {selectedQuestion}=this.props;
        selectedQuestion.personalityType=value;
        this.props.handleQuestionChange(selectedQuestion);
    }

    wingChange=(e,{value})=>{
        let {selectedQuestion}=this.props;
        selectedQuestion.wingType=value;
        this.props.handleQuestionChange(selectedQuestion);
    }

    altChange=(e,{value})=>{
        let {selectedQuestion}=this.props;
        selectedQuestion.altType=value;
        this.props.handleQuestionChange(selectedQuestion);
    }

    questionTextChange=(e,{value})=>{
        let {selectedQuestion}=this.props;
        selectedQuestion.text=value;
        this.props.handleQuestionChange(selectedQuestion);
    }

    render() {
        const {selectedQuestion,referenceQuestion,language}=this.props;
        let content=(<p>Lütfen bir soru seçiniz</p>);

        let isDisabled=true;
        if(selectedQuestion){
            content=
            <Form>
                {
                    language!=="tr" && (
                    <Form.Field>
                        <Header as='h5'>Referans metin:</Header>
                        <p>{referenceQuestion.text}</p>
                    </Form.Field>
                    )
                }

                <Form.Field>
                    <Header as='h5'>Soru metni:</Header>
                    <TextArea autoHeight placeholder='Soru metni' value={selectedQuestion.text} onChange={this.questionTextChange}/>
                </Form.Field>

                <Form.Field>
                    <Header as='h5'>Puanlanacak kişilik tipi:</Header>
                    <Dropdown placeholder='Tip seçiniz' disabled={isDisabled} search selection options={personalityTypes} value={selectedQuestion.personalityType} onChange={this.personalityChange}/>
                </Form.Field>

                {
                    (selectedQuestion.stage==="3" && 
                        <Form.Field>
                            <Header as='h5'>Puanlanacak kanat tipi:</Header>
                            <Dropdown placeholder='Tip seçiniz' disabled={isDisabled} search selection options={wingTypes} value={selectedQuestion.wingType} onChange={this.wingChange}/>
                        </Form.Field>
                    )
                }

                {
                    ((selectedQuestion.stage==="4-1" ||selectedQuestion.stage==="4-2") && 
                    <Form.Field>
                        <Header as='h5'>Puanlanacak alt tip:</Header>
                        <Dropdown placeholder='Tip seçiniz' disabled={isDisabled} search selection options={altTypes} value={selectedQuestion.altType} onChange={this.altChange}/>
                    </Form.Field>
                    )
                }


                <Form.Field>
                    <Button primary onClick={this.props.saveQuestion}>Kaydet</Button>
                </Form.Field>
            </Form>;
        }
        return (
        <div className="question-editor">
            {content}
        </div>)
    }
}

QuestionEditor.propTypes = {
    handleQuestionChange:PropTypes.func.isRequired,
    saveQuestion:PropTypes.func.isRequired,
    language:PropTypes.any.isRequired
}


export default QuestionEditor;