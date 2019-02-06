import React from 'react';
import { Segment,Header,Transition,Button,Form,Input} from 'semantic-ui-react'
import LanguageSelector from '../../presentation/LanguageSelector';

class Settings extends React.Component{ 
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

    }

    componentDidMount(){
        this.setState({visible:true})
    }


    render(){
        const {data,selectedQuestion,selectedOrder}=this.state;
        return (
        <Transition visible={this.state.visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Şıklar</Header>
                <LanguageSelector handleLanguageChange={this.handleLanguageChange} selected={this.state.language}/>
                <Segment>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Şık değeri:-2</label>
                                <Input fluid placeholder='Kesinlikle katılmıyorum' value="Kesinlikle katılmıyorum"/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:-1</label>
                                <Input fluid placeholder='Katılmıyorum' value="Katılmıyorum"/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:0</label>
                                <Input fluid placeholder='Kararsızım' value="Kararsızım"/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:1</label>
                                <Input fluid placeholder='Katılıyorum' value="Katılıyorum"/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:2</label>
                                <Input fluid placeholder='Kesinlikle katılıyorum' value="Kesinlikle katılıyorum"/>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Segment>
            </div>
        </Transition>
        )
    }
}

export default Settings;