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
            data:[]
        }
    }

    generateTableData(count){
        let data=[];
        const names=["Edwin Carr","George Rhodes","Janice Doyle","Dora Young","Myron Campbell","Brett Mendoza","Eric	Massey","Jody Burke","Monique Wood","Ebony Bowman","Beverly Goodwin","Gerard Curtis","Francis Baldwin","Elias Johnson","Mandy Barnes","Mitchell	Norman","Alicia	Newman","Rolando	Saunders","Norman	Singleton","Dixie	Morales","Omar	Craig","Josh	Hammond","Merle	Butler","Antonia	Potter","Bert	Ball","Pete	Black","Theresa	Walsh","Toni	Pierce","Gilberto	Gregory","Andre	Webb","Alison	Pope","Belinda	Barton","Carlos	Lindsey","Mathew	Cox","Myra	Bowers","Lucia	Guerrero","Ron	Larson","Linda	Stanley","Gayle	Marshall","Marion	Copeland","Karen	Hudson","Lester	Ross","Carroll	Montgomery","Salvatore	Wallace","Jeanette	Higgins","Bill	Stone","Terrance	Hernandez","Tim	Pratt","Lawrence	Flores","Matthew	Mcbride"];
        const positions=["Aktif Pazarlama Elemanı","Aktif Satış Sorumlusu","Almanca Öğretmeni","Ambalaj Elemanı","Anaokulu Öğretmeni","Anestezi Teknikeri","Anestezi Teknisyeni","Anketör","Arama Motoru Optimizasyonu (SEO) Uzmanı","Asistan","Aşçı","Aşçı Yardımcısı","Avukat","Bahçe Bakım Elemanı","Bahçıvan","Bakıcı","Bakım Onarım Elemanı","Banka Personeli","Bar Garsonu","Barista","Barmen/Barmaid","Bebek Bakıcısı","Beden Eğitimi Öğretmeni","Bekçi","Bellboy","Bilgisayar İşletmeni","Bilgisayar Öğretmeni","Bilgisayar Programcısı","Bilgisayar Teknikeri","Biyolog","Biyoloji Öğretmeni","Boya Ustası","Bölge Satış Sorumlusu","Bölge Sorumlusu","Branş Öğretmeni","Bulaşıkçı","Bulaşıkhane Elemanı","Büro Elemanı","Büro Memuru","Cankurtaran","CNC Operatörü","Coğrafya Öğretmeni","Çağrı Merkezi Elemanı","Çağrı Merkezi Müşteri Temsilcisi","Çağrı Merkezi Operatörü"];
        for(var i=0;i<count;i++){
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
                wingType:wingType
                }
            )
        }
        return data;
    }

    componentDidMount(){
        this.setState({
            visible:true,
            data:this.generateTableData(250)}
        );
    }

    render(){
        return(
        <section className="customer-dashboard">
            <Transition visible={this.state.visible} animation='scale' duration={500}>
                <Grid columns={3} divided className="statistics centered" centered>
                    <Grid.Row>
                        <Grid.Column>
                            <Statistic color='violet' >
                                <Statistic.Value>14</Statistic.Value>
                                <Statistic.Label>TEST HAKKI</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column>
                            <Statistic color='orange'>
                                <Statistic.Value>0</Statistic.Value>
                                <Statistic.Label>BEKLEYEN TEST SAYISI</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column>
                            <Statistic color='green'>
                                <Statistic.Value>{this.state.data.length}</Statistic.Value>
                                <Statistic.Label>SONUÇLANAN TEST SAYISI</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Header textAlign="center" size="huge">Tiplere göre şirket profili</Header>
                        <PersonnelByTypeGraph personnelData={this.state.data}/>
                    </Grid.Row>
                    <Grid.Row className="customer-table">
                        <PersonnelTable personnelData={this.state.data} />
                    </Grid.Row>
                </Grid>
            </Transition>
        </section>
        )
    }
}

export default CustomerDasbhoard;