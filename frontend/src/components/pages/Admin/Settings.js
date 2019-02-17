import React from 'react';
import { Segment,Header,Transition,Button,Form,Input} from 'semantic-ui-react'
import {withToastManager} from 'react-toast-notifications';

import LanguageSelector from '../../common/LanguageSelector';
import ApiHelper from '../../../helpers/ApiHelper';

class Settings extends React.Component{ 
    state={
        visible:false,
        referenceOptions:{
            language:"tr",
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            option5:"",
        },
        options:{
            language:"tr",
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            option5:"",
        }
    }

    handleLanguageChange=(e,{value})=>{
        this.getOptionsByLanguage(value);
    }

    componentDidMount=()=>
    {
        this.getOptionsByLanguage(this.state.options.language);
    }

    handleOptionChange=(e,{value,name})=>{
        let {options}=this.state;
        options[name]=value;
        this.setState({options});
    }

    getOptionsByLanguage=(language)=>{
        const { toastManager } = this.props;
        ApiHelper.functions.settings.getTestOptions(language)
            .then(options=>{
                if(options.length>0)
                {

                    this.setState({visible:true,options:options[0],referenceOptions:(language==="tr"?{...options[0]}:{...this.state.referenceOptions})});
                }
                else{
                    this.setState({visible:true,options:{ language, option1:"", option2:"", option3:"", option4:"", option5:"", },referenceOptions:(language==="tr"?{...options[0]}:{...this.state.referenceOptions})});
                }
            })
            .catch(err=>{
                toastManager.add(err.message, { appearance: 'error' ,autoDismiss: true,autoDismissTimeout:3000});
            })
    }

    saveOptions=()=>{
        const { toastManager } = this.props;
        ApiHelper.functions.settings.updateCreateTestOptions(this.state.options)
        .then(res=>{
            toastManager.add("Şıklar güncellendi", { appearance: 'error' ,autoDismiss: true,autoDismissTimeout:3000});
            this.getOptionsByLanguage(this.state.options.language);
        })
        .catch(err=>{
            toastManager.add(err.message, { appearance: 'error' ,autoDismiss: true,autoDismissTimeout:3000});
        })
    }


    render(){
        const {options,visible,referenceOptions}=this.state;
        return (
        <Transition visible={visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Şıklar</Header>
                <LanguageSelector handleLanguageChange={this.handleLanguageChange} selected={options.language}/>
                <Segment>
                    <Form>
                        {options.language!=="tr" &&     
                        <div>
                            <h4>Referans değerler</h4>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Şık değeri:-2</label>
                                    <p>{referenceOptions.option1}</p>
                                </Form.Field>
                                <Form.Field>
                                    <label>Şık değeri:-1</label>
                                    <p>{referenceOptions.option2}</p>
                                </Form.Field>
                                <Form.Field>
                                    <label>Şık değeri:0</label>
                                    <p>{referenceOptions.option3}</p>
                                </Form.Field>
                                <Form.Field>
                                    <label>Şık değeri:1</label>
                                    <p>{referenceOptions.option4}</p>
                                </Form.Field>
                                <Form.Field>
                                    <label>Şık değeri:2</label>
                                    <p>{referenceOptions.option5}</p>
                                </Form.Field>
                            </Form.Group>
                        </div>                   
                        }
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Şık değeri:-2</label>
                                <Input fluid onChange={this.handleOptionChange} name="option1" placeholder={options.option1} value={options.option1}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:-1</label>
                                <Input fluid onChange={this.handleOptionChange} name="option2" placeholder={options.option2} value={options.option2}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:0</label>
                                <Input fluid onChange={this.handleOptionChange} name="option3" placeholder={options.option3} value={options.option3}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:1</label>
                                <Input fluid onChange={this.handleOptionChange} name="option4" placeholder={options.option4} value={options.option4}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Şık değeri:2</label>
                                <Input fluid onChange={this.handleOptionChange} name="option5" placeholder={options.option5} value={options.option5}/>
                            </Form.Field>
                        </Form.Group>
                        <Button primary onClick={this.saveOptions}>Kaydet</Button>
                    </Form>
                </Segment>
            </div>
        </Transition>
        )
    }
}

export default withToastManager(Settings);