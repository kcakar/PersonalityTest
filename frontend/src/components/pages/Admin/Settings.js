import React from 'react';
import { Segment,Header,Transition,Button,Form,Input} from 'semantic-ui-react'
import LanguageSelector from '../../common/LanguageSelector';

const OptionData=[
    {
        language:"tr",
        option1:"Kesinlikle katılmıyorum",
        option2:"Katılmıyorum",
        option3:"Kararsızım",
        option4:"Katılıyorum",
        option5:"Kesinlikle katılıyorum",
    }
]

class Settings extends React.Component{ 
    constructor(props){
        super(props);

        this.state={
            visible:false,
            language:"tr",
            allOptions:[],
            options:{}
        }
        this.handleLanguageChange=this.handleLanguageChange.bind(this);
    }

    handleLanguageChange(e,{value}){
        const options=this.filterOptionsByLanguage(this.state.allOptions,value);
        this.setState({language:value,options});
    }

    filterOptionsByLanguage(allOptions,language){
        const options=allOptions.find(x=>x.language===language);
        let selectedData=options||{language,option1:"", option2:"", option3:"", option4:"", option5:""}
        return selectedData;
    }

    componentDidMount(){
        let options=this.filterOptionsByLanguage(OptionData,"tr");
        this.setState({visible:true,options,allOptions:OptionData});
    }


    render(){
        const {options,visible,language}=this.state;
        return (
        <Transition visible={visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Şıklar</Header>
                <LanguageSelector handleLanguageChange={this.handleLanguageChange} selected={language}/>
                <Segment>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Şık değeri:-2</label>
                                <Input fluid placeholder={options.option1} value={options.option1}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:-1</label>
                                <Input fluid placeholder={options.option2} value={options.option2}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:0</label>
                                <Input fluid placeholder={options.option3} value={options.option3}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:1</label>
                                <Input fluid placeholder={options.option4} value={options.option4}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:2</label>
                                <Input fluid placeholder={options.option5} value={options.option5}/>
                            </Form.Field>
                        </Form.Group>
                        <Button primary onClick={this.props.saveQuestion}>Kaydet</Button>
                    </Form>
                </Segment>
            </div>
        </Transition>
        )
    }
}

export default Settings;