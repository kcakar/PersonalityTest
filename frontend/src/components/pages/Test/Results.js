import React from 'react';

import { Container,Transition,Segment,List,Header,Icon,Grid,Divider } from 'semantic-ui-react';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import {  toast } from "react-toastify";

import Loading from '../../common/Loading';
import PrintButton from '../../common/PrintButton';

import ApiHelper from '../../../helpers/ApiHelper';
let ResultData={};
class Results extends React.Component{
    state={
        visible:false,
        personality:null,
        graph:[
            { subject: '1', A: 0, fullMark: 100 },
            { subject: '2', A: 0,  fullMark: 100 },
            { subject: '3', A: 0,  fullMark: 100 },
            { subject: '4', A: 0,  fullMark: 100 },
            { subject: '5', A: 0,  fullMark: 100 },
            { subject: '6', A: 0,  fullMark: 100 },
            { subject: '7', A: 0,  fullMark: 100 },
            { subject: '8', A: 0,  fullMark: 100 },
            { subject: '9', A: 0,  fullMark: 100 },
        ],
        ResultData:{
            header:"",
            intro:{
                header:"",
                list:[]
            },
            description:{
                header:"",
                paragraphs:[],
                caption:{
                    quote:"",
                    owner:""
                }
            },
            sentences:{
                header:"",
                quotes:[]
            },
            wing:{
                header:"",
                w1:{
                    header:"",
                    list:[]
                },
                w2:{
                    header:"",
                    list:[]
                },
                caption:{
                    quote:"",
                    owner:""
                }
            }
        },
        session:{
            wingType:-1,
            altType:-1,
            personalityType:-1
        }
    }

    componentDidMount=()=>{
        ApiHelper.functions.test.getResults()
        .then(result=>{
            this.setState({session:result.result});
        })
        .catch((err)=>{
            toast.error(err.message,{position: toast.POSITION.TOP_CENTER});
        })
        const personality=Object.assign({},this.props.getResults());
        
        // this.fillGraphData(personality);
        this.setState({personality,visible:true});
    }

    // fillGraphData=(personality)=>{
    //     let graph=[];
    //     if(Object.keys(personality).length>0)
    //     {
    //         for(let i=1;i<=9;i++){
    //             let value=personality["type"+i];
    //             if(value<0){
    //                 value=0;
    //             }
    //             graph.push({subject:i,A:value,fullMark:100});
    //         }
    //         this.setState({graph});
    //     }
    // }

    render(){
        const {ResultData,session}=this.state;
        let content= !this.state.personality? <Loading/>:
            <section className="results-container centered">
                <PrintButton printElementId="print" label="PDF olarak kaydet"></PrintButton>
                <Transition visible={this.state.visible} animation='scale' duration={500}>
                    <section className="results" id="print">
                        <Container>
                            <Segment className="page" textAlign='left' size='large'>  
                                <p>
                                    Geçici yazı:
                                    Kişilik tipi:{session.personalityType}
                                    Kanat tipi:{session.wingType}
                                    Alt tip:{session.altType}

                                </p>
                                {/* <Header as='h2' icon textAlign='center'>
                                    <Icon name='users' circular />
                                    <Header.Content>{ResultData.header}</Header.Content>
                                </Header>

                                <div className="paragraph">
                                    <Segment.Group horizontal className="segment-group">
                                        <Segment>
                                            <div className="chart">
                                                <RadarChart className="centered" width={250} height={250} data={this.state.graph}>
                                                    <PolarGrid />
                                                    <PolarAngleAxis dataKey="subject" />
                                                    <PolarRadiusAxis angle={78} />
                                                    <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
                                                </RadarChart>
                                            </div>
                                        </Segment>
                                        <Segment padded>
                                            <Header as='h2'>
                                                <Icon name='id badge outline' />
                                                <Header.Content>{ResultData.intro.header}</Header.Content>
                                            </Header>
                                            <List as='ol'>
                                                {ResultData.intro.list.map((item,index)=>
                                                    <List.Item as='li' key={index}>{item}</List.Item>
                                                )}
                                            </List>
                                        </Segment>
                                    </Segment.Group>

                                    <Header as='h2'>
                                        <Icon name='smile outline' />
                                        <Header.Content>{ResultData.description.header}</Header.Content>
                                    </Header>
                                    {ResultData.description.paragraphs.map((paragraph,index)=>
                                        <p key={index}>{paragraph}</p>
                                    )}
                                    <figure>
                                        <blockquote><p>{ResultData.description.caption.quote}</p></blockquote>
                                        <figcaption>{ResultData.description.caption.owner}</figcaption>
                                        <hr/>
                                    </figure>
                                </div>    


                                <div className="paragraph sentences">
                                    <Header as='h2'>
                                        <Icon name='talk' />
                                        <Header.Content>{ResultData.sentences.header}</Header.Content>
                                    </Header>
                                    <figure>
                                        {ResultData.sentences.quotes.map((quote,index)=>{
                                            return (<blockquote key={index}><p>{quote}</p></blockquote>)
                                        })}
                                    </figure>
                                </div>  

                                <div className="paragraph wing">
                                    <Header as='h2' >
                                        <Icon name='dna' />
                                        <Header.Content>{ResultData.wing.header}</Header.Content>
                                    </Header>
                                    <Segment>
                                        <Grid columns={2} relaxed='very'>
                                            <Grid.Column>
                                                <Header as='h4' textAlign='center'>
                                                    <Header.Content>{ResultData.wing.w1.header}</Header.Content>
                                                </Header>
                                                <List as='ul'>
                                                    {ResultData.wing.w1.list.map((item,index)=>{
                                                        return <List.Item as='li' key={index}>{item}</List.Item>
                                                    })}
                                                </List>
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Header as='h4' textAlign='center' >
                                                    <Header.Content>{ResultData.wing.w2.header}</Header.Content>
                                                </Header>
                                                <List as='ul'>
                                                    {ResultData.wing.w2.list.map((item,index)=>{
                                                        return <List.Item as='li' key={index}>{item}</List.Item>
                                                    })}
                                                </List>
                                            </Grid.Column>
                                        </Grid>
                                        <Divider vertical>Veya</Divider>
                                    </Segment>

                                    <figure>
                                        <blockquote><p>{ResultData.wing.caption.quote}</p></blockquote>
                                        <figcaption>{ResultData.wing.caption.owner}</figcaption>
                                        <hr/>
                                    </figure>
                                </div> */}
                            </Segment>
                        </Container>
                    </section>
                </Transition>
            </section>


        return content;
    }
}

export default Results;