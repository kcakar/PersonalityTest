import React from 'react';
// import PropTypes from 'prop-types';
import { Statistic,Transition, Header, Grid } from 'semantic-ui-react';
import PersonnelTable from './PersonnelTable';
import PersonnelByTypeGraph from './PersonnelByTypeGraph';

class CustomerDasbhoard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
            data:[],
            stats:{
                done:0,
                waiting:0,
                credit:15
            }
        }
        this.getTitles=this.getTitles.bind(this);
    }

    generateTableData(count){
        let data=[];
        const names=["Edwin Carr","George Rhodes","Janice Doyle","Dora Young","Myron Campbell","Brett Mendoza","Eric Massey","Jody Burke","Monique Wood","Ebony Bowman","Beverly Goodwin","Gerard Curtis","Francis Baldwin","Elias Johnson","Mandy Barnes","Mitchell Norman","Alicia Newman","Rolando Saunders","Norman Singleton","Dixie Morales","Omar Craig","Josh Hammond","Merle Butler","Antonia Potter","Bert Ball","Pete Black","Theresa Walsh","Toni Pierce","Gilberto Gregory","Andre Webb","Alison Pope","Belinda Barton","Carlos Lindsey","Mathew Cox","Myra Bowers","Lucia Guerrero","Ron Larson","Linda Stanley","Gayle Marshall","Marion Copeland","Karen Hudson","Lester Ross","Carroll Montgomery","Salvatore Wallace","Jeanette Higgins","Bill Stone","Terrance Hernandez","Tim Pratt","Lawrence Flores","Matthew Mcbride"];
        const positions=["Aktif Pazarlama Elemanı","Aktif Satış Sorumlusu","Almanca Öğretmeni","Ambalaj Elemanı","Anaokulu Öğretmeni","Anestezi Teknikeri","Anestezi Teknisyeni","Anketör","Arama Motoru Optimizasyonu (SEO) Uzmanı","Asistan","Aşçı","Aşçı Yardımcısı","Avukat","Bahçe Bakım Elemanı","Bahçıvan","Bakıcı","Bakım Onarım Elemanı","Banka Personeli","Bar Garsonu","Barista","Barmen/Barmaid","Bebek Bakıcısı","Beden Eğitimi Öğretmeni","Bekçi","Bellboy","Bilgisayar İşletmeni","Bilgisayar Öğretmeni","Bilgisayar Programcısı","Bilgisayar Teknikeri","Biyolog","Biyoloji Öğretmeni","Boya Ustası","Bölge Satış Sorumlusu","Bölge Sorumlusu","Branş Öğretmeni","Bulaşıkçı","Bulaşıkhane Elemanı","Büro Elemanı","Büro Memuru","Cankurtaran","CNC Operatörü","Coğrafya Öğretmeni","Çağrı Merkezi Elemanı","Çağrı Merkezi Müşteri Temsilcisi","Çağrı Merkezi Operatörü"];
        for(let i=0;i<count;i++){
            const characterType=(Math.floor(Math.random() * 9) + 1);
            let wingType= (Math.random()*100) > 50? characterType-1:characterType+1;
            if(wingType===0){
                wingType=9;
            }
            if(wingType===10){
                wingType=1;
            }
            data.push(  { 
                id:i.toString(),
                name: names[Math.floor(Math.random() * names.length)], 
                title: positions[Math.floor(Math.random() * positions.length)], 
                dateCompleted: new Date()- (Math.floor(Math.random() * 123456789)),
                characterType:characterType,
                wingType:wingType,
                isTestDone:true
                }
            )
        }
        //beklemede data;
        const waitingCount=Math.floor(Math.random() * 15) ;      
        for(let i=0;i<waitingCount;i++){
            data.push(  { 
                id:(count+i).toString(),
                name: names[Math.floor(Math.random() * names.length)], 
                title: positions[Math.floor(Math.random() * positions.length)], 
                dateCompleted: null,
                characterType:null,
                wingType:null,
                isTestDone:false
                }
            )
        }
        
        return {data,done:count,waiting:waitingCount};
    }

    componentDidMount(){
        let {data,done,waiting}=this.generateTableData(250);
        this.setState({visible:true,data,stats:{credit:15,done,waiting}});
    }

    getTitles(){
        return [...new Set(this.state.data.map(p=>p.title))];
    }

    render(){
        return(
        <section className="customer-dashboard dashboard">
            <Transition visible={this.state.visible} animation='fade' duration={500}>
                <div className="dashboard-center">
                    <Grid columns={3} divided className="statistics centered" centered>
                        <Grid.Row>
                            <Grid.Column>
                                <Statistic color='violet' >
                                    <Statistic.Value>{this.state.stats.credit}</Statistic.Value>
                                    <Statistic.Label>TEST HAKKI</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column>
                                <Statistic color='orange'>
                                    <Statistic.Value>{this.state.stats.waiting}</Statistic.Value>
                                    <Statistic.Label>BEKLEYEN TEST SAYISI</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column>
                                <Statistic color='green'>
                                    <Statistic.Value>{this.state.stats.done}</Statistic.Value>
                                    <Statistic.Label>SONUÇLANAN TEST SAYISI</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Header textAlign="center" size="huge">Tiplere göre şirket profili</Header>
                            <PersonnelByTypeGraph personnelData={this.state.data} />
                        </Grid.Row>
                        <Grid.Row className="customer-table">
                            <PersonnelTable personnelData={this.state.data} personnelTitles={this.getTitles()}/>
                        </Grid.Row>
                    </Grid>
                </div>
            </Transition>
        </section>
        )
    }
}

export default CustomerDasbhoard;