import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment,TextArea,Form,Header,Dropdown,Button} from 'semantic-ui-react';

const personalityTypes=[
    {key:1,value:1,text:"1"},
    {key:2,value:2,text:"2"},
    {key:3,value:3,text:"3"},
    {key:4,value:4,text:"4"},
    {key:5,value:5,text:"5"},
    {key:6,value:6,text:"6"},
    {key:7,value:7,text:"7"},
    {key:8,value:8,text:"8"},
    {key:9,value:9,text:"9"}
]

class QuestionEditor extends Component {
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            selectedQuestion:props.selectedQuestion,
            existing:props.existing
        }
    }


    render() {
        let {selectedQuestion,existing}=this.state;
        console.log(existing)
        if(!existing){
            selectedQuestion={
                text:"",
                personalityType:1
            }
        }
        return (  
        <Segment className="question-editor">
            <Form>
                <Header as='h5'>Soru metni:</Header>
                <TextArea autoHeight placeholder='Soru metni' value={selectedQuestion.questionText}/>
                <Header as='h5'>Puanlanacak kişilik tipi:</Header>
                <Dropdown placeholder='Tip seçiniz' search selection options={personalityTypes} value={selectedQuestion.personalityType}/>
                <Button floated="right" primary>Kaydet</Button>
            </Form>
        </Segment>)
    }
}
 
QuestionEditor.propTypes = {
    selectedQuestion:PropTypes.object.isRequired,
    existing:PropTypes.bool.isRequired
  }

export default QuestionEditor;