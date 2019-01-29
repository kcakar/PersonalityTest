import React from 'react';
import PropTypes from 'prop-types';
import { Container,Transition,Segment,List,Header,Icon,Grid,Divider } from 'semantic-ui-react';
import Loading from './../presentation/Loading';
import PrintButton from './../presentation/PrintButton';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';

const data = [
    { subject: '1', A: 10, fullMark: 100 },
    { subject: '2', A: 15,  fullMark: 100 },
    { subject: '3', A: 12,  fullMark: 100 },
    { subject: '4', A: 17,  fullMark: 100 },
    { subject: '5', A: 70,  fullMark: 100 },
    { subject: '6', A: 95,  fullMark: 100 },
    { subject: '7', A: 70,  fullMark: 100 },
    { subject: '8', A: 23,  fullMark: 100 },
    { subject: '9', A: 25,  fullMark: 100 },
];

class Results extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
            personality:null
        }
    }

    componentDidMount(){
        const personality=Object.assign({},this.props.getResults());
        this.setState({personality,visible:true});
    }

    render(){
        let content= !this.state.personality? <Loading/>:
            <section className="results-container centered">
                <PrintButton id={"printable"} label={"Print single page"}/>
                <div id="printable">
                    <Transition visible={this.state.visible} animation='scale' duration={500}>
                        <section className="results">
                            <Container>
                                <Segment textAlign='left' size='large'>  
                                    <Header as='h2' icon textAlign='center'>
                                        <Icon name='users' circular />
                                        <Header.Content>TİP 6</Header.Content>
                                    </Header>

                                    <div className="paragraph">
                                        <Segment.Group horizontal className="segment-group">
                                            <Segment>
                                                <div className="chart">
                                                    <RadarChart className="centered" width={250} height={250} data={data}>
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
                                                    <Header.Content>En doğal ve en iyi halinde</Header.Content>
                                                </Header>
                                                <List as='ol'>
                                                    <List.Item as='li'>Nullam nec nisl ultricies, cursus risus vel, rhoncus est.</List.Item>
                                                    <List.Item as='li'>Donec a felis metus. Maecenas varius felis at velit finibus, at tempor turpis dignissim. </List.Item>
                                                    <List.Item as='li'>Nam id libero elementum, rutrum est malesuada, volutpat mauris.</List.Item>
                                                    <List.Item as='li'>Mauris in mauris volutpat, eleifend lacus nec, hendrerit metus.</List.Item>
                                                    <List.Item as='li'>In placerat tellus vitae eros lacinia, eget efficitur dolor mattis.</List.Item>
                                                    <List.Item as='li'>Morbi et neque sit amet ligula volutpat pellentesque.</List.Item>
                                                    <List.Item as='li'>Fusce tincidunt ipsum sed nulla bibendum bibendum.</List.Item>
                                                </List>
                                            </Segment>
                                        </Segment.Group>

                                        <Header as='h2'>
                                            <Icon name='smile outline' />
                                            <Header.Content>Tip 6 Kendini Nasıl Tanımlar?</Header.Content>
                                        </Header>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget luctus purus, eget scelerisque libero. Mauris dignissim placerat diam, nec tristique urna tempor nec. Integer a cursus leo. Nunc nunc leo, consequat eget finibus eu, malesuada nec lacus. Maecenas ultricies massa magna, sit amet sodales libero semper nec. In hac habitasse platea dictumst. Mauris ut feugiat mi. In hac habitasse platea dictumst.</p>
                                        <p>Nam vehicula feugiat dui. Donec augue diam, consectetur a sagittis non, efficitur sit amet dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam ut massa in turpis mattis mattis. Vestibulum finibus augue eget mauris aliquet posuere. Sed ac accumsan tortor. Donec ac dolor commodo libero commodo posuere. Sed egestas consectetur nisl, non volutpat justo dapibus non. Duis eget velit pellentesque, eleifend ante et, tempus est. Aenean non purus at justo porta varius faucibus ut sapien. Sed justo enim, pulvinar nec orci sed, fringilla varius lectus.</p>
                                        <p>Curabitur tristique, dolor eu faucibus tempus, sapien massa ornare velit, nec rhoncus justo ipsum quis arcu. Phasellus ex sem, tempus dignissim scelerisque in, dictum pulvinar metus. In nunc magna, mattis vel rutrum nec, porttitor at sapien. Maecenas efficitur tempus ante, at auctor ligula. Nam ac euismod est. Curabitur euismod semper velit, at consectetur neque scelerisque vitae. Morbi non tempus nibh. Duis congue augue non erat hendrerit lobortis. Maecenas sed enim sed nibh commodo venenatis.</p>

                                        <figure>
                                            <blockquote><p>Tepkisellikten kurtulup yanıt verir hale gelmek gerek.</p></blockquote>
                                            <figcaption>Mert Güler</figcaption>
                                            <hr/>
                                        </figure>
                                    </div>    


                                    <div className="paragraph sentences">
                                        <Header as='h2'>
                                            <Icon name='talk' />
                                            <Header.Content>Tip 6'nın Sık Kullandığı Cümleler</Header.Content>
                                        </Header>
                                        <figure>
                                            <blockquote><p>Çok güçlü ve otoriter göründüğüm zamanlarda bile içten içe bir emniyetsizlik hissederim.</p></blockquote>
                                            <blockquote><p>Endişe etmemekten endişe ederim.</p></blockquote>
                                            <blockquote><p>İyi haber nasıl olsa alınır, önemli olan kötü haberi yakalamak.</p></blockquote>
                                            <blockquote><p>Bir şeye inanmak için kuşkuyla başlamalıyız.</p></blockquote>
                                            <blockquote><p>En küçük bir olumsuz işaret veya ima hissettiğimde insanlrı nasıl niyetleri konusunda şüpheci davranırım ve geri çekilerek kendimi korumaya alırım.</p></blockquote>
                                            <blockquote><p>Hayatta yalnzı ve desteksiz kalmaktan korkarım. Zihnim gelecek konusunda oldukça kaygılı ve düşüncelidir.</p></blockquote>
                                        </figure>
                                    </div>  

                                    <div className="paragraph wing">
                                        <Header as='h2' >
                                            <Icon name='dna' />
                                            <Header.Content>Kanat Etkisi</Header.Content>
                                        </Header>
                                        <Segment>
                                            <Grid columns={2} relaxed='very'>
                                                <Grid.Column>
                                                    <Header as='h4' textAlign='center'>
                                                        <Header.Content>Tip 7'den etkilenen Tip 6</Header.Content>
                                                    </Header>
                                                    <List as='ul'>
                                                        <List.Item as='li'>Arkadaş canlısı, konuşkan, iyi ve eğlenceli zaman geçirmekten hoşlanan, canlı ve enerjik olmayı seven, içinde bulunduğu grup tarafından kabul edilmek isteyen, dışa dönük ve hareketli bir yanı olan kişidir. Korkularnın üzerine gitmeye çalışır ve zaman zaman dürtüsel davranır.</List.Item>
                                                        <List.Item as='li'>Donec a felis metus. Maecenas varius felis at velit finibus, at tempor turpis dignissim. </List.Item>
                                                        <List.Item as='li'>Nam id libero elementum, rutrum est malesuada, volutpat mauris.</List.Item>
                                                        <List.Item as='li'>Mauris in mauris volutpat, eleifend lacus nec, hendrerit metus.</List.Item>
                                                        <List.Item as='li'>In placerat tellus vitae eros lacinia, eget efficitur dolor mattis.</List.Item>
                                                        <List.Item as='li'>Morbi et neque sit amet ligula volutpat pellentesque.</List.Item>
                                                        <List.Item as='li'>Fusce tincidunt ipsum sed nulla bibendum bibendum.</List.Item>
                                                    </List>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Header as='h4' textAlign='center' >
                                                        <Header.Content>Tip 5'ten etkilenen Tip 6</Header.Content>
                                                    </Header>
                                                    <List as='ul'>
                                                        <List.Item as='li'>Nullam nec nisl ultricies, cursus risus vel, rhoncus est.</List.Item>
                                                        <List.Item as='li'>Donec a felis metus. Maecenas varius felis at velit finibus, at tempor turpis dignissim. </List.Item>
                                                        <List.Item as='li'>Nam id libero elementum, rutrum est malesuada, volutpat mauris.</List.Item>
                                                        <List.Item as='li'>Mauris in mauris volutpat, eleifend lacus nec, hendrerit metus.</List.Item>
                                                        <List.Item as='li'>In placerat tellus vitae eros lacinia, eget efficitur dolor mattis.</List.Item>
                                                        <List.Item as='li'>Morbi et neque sit amet ligula volutpat pellentesque.</List.Item>
                                                        <List.Item as='li'>Fusce tincidunt ipsum sed nulla bibendum bibendum.</List.Item>
                                                    </List>
                                                </Grid.Column>
                                            </Grid>
                                            <Divider vertical>Veya</Divider>
                                        </Segment>

                                        <figure>
                                            <blockquote><p>Hiçbir şeyi riske atmamak, aslında her şeyi riske atmaktır. Problemlerinizi onu yaratan bakış açısıyla çözmeye çalışmanız deliliktir.</p></blockquote>
                                            <figcaption>Einstein</figcaption>
                                            <hr/>
                                        </figure>
                                    </div>
                                </Segment>
                            </Container>
                        </section>
                    </Transition>
                </div>
            </section>


        return content;
    }
}

Results.propTypes = {
    getResults:PropTypes.func.isRequired,
}

export default Results;