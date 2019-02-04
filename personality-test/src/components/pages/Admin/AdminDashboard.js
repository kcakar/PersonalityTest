import React from 'react';
// import PropTypes from 'prop-types';
import { Statistic,Transition, Header, Grid } from 'semantic-ui-react';
import RequestTable from './RequestTable';

class AdminDashboard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
            data:[],
            stats:{
                sold:0,
                request:0,
                companies:0,
                done:0
            }
        }
    }

    generateRequestTableData(){
        let data=[];
        const names=["Apple","Amazon.com","Alphabet","Microsoft","Facebook","Alibaba","Berkshire Hathaway","Tencent Holdings","JPMorgan Chase","ExxonMobil","Johnson & Johnson","Samsung Electronics","Bank of America","Royal Dutch Shell","Visa","Wells Fargo","China Construction Bank","Intel","Chevron","Walmart","Nestle","UnitedHealth Gro","Cisco Systems","PetroChina","Home Depot","Pfizer","Taiwan Semiconduct","Novart","Mastercard","Verizon Communications","Toyota Motor","HSBC Holdings","Boeing","AT&T","China Mobile","Oracle","Roche Holding","Citigroup","Procter & Gamble","Anheuser-Busch InBev","Agricultural Bank of China","Ping An Insurance Group","Coca-Cola","Tot","AbbVie","Merck & Co.","Bank of China","Unilever","DowDuPont","NVIDIA","BP","Walt Disney","Comcast","Kweichow Moutai","Netflix","SAP","Sinopec","PepsiCo","L'Oréal Group","BHP Billiton","IBM","McDonald's","General Electric","Philip Morris International","3M","British American Tobac","Adobe Systems","Novo Nordisk","Medtron","Amgen","Royal Bank of Canada","Naspers","Siemens","China Merchants Bank","AIA Group","Nike","Honeywell International","Union Pacific","TD Bank Group","Abbott Laboratories","Texas Instruments","Banco Santander","Bayer","Altria Group","China Life Insurance","Volkswagen Group","Accentu","Allianz","Broadc","Booking Holding","United Parcel Servic","United Technologie","Indite","Rio Tint","GlaxoSmithKlin","Schlumberge","Tata Consultancy Service","Morgan Stanle"]
        for(let i=0;i<names.length;i++){
            let bought=Math.floor(Math.random() * 10)
            data.push(  
                { 
                    id:i.toString(),
                    name: names[i], 
                    dateAdded: new Date()- (Math.floor(Math.random() * 123456789)),
                    boughtTest:bought,
                    usedTest:bought-Math.floor(Math.random() * bought),
                    requestedTest:Math.floor(Math.random() * 10),
                }
            )
        }
        const done=data.reduce((total,company)=>total+company.usedTest,0);
        const sold=data.reduce((total,company)=>total+company.boughtTest,0);
        const request=data.reduce((total,company)=>total+company.requestedTest,0);
        return {data,companies:names.length,sold,done,request};
    }

    componentDidMount(){
        const {sold,done,request,data,companies}=this.generateRequestTableData();
        this.setState({visible:true,data,stats:{sold,request,companies,done}});
    }
    render(){
        return(
        <section className="customer-dashboard">
            <Transition visible={this.state.visible} animation='scale' duration={500}>
                <Grid columns={16} divided className="statistics centered" centered>
                    <Grid.Row>
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='green' >
                                <Statistic.Value>{this.state.stats.sold}</Statistic.Value>
                                <Statistic.Label>SATIŞ</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='teal'>
                                <Statistic.Value>{this.state.stats.request}</Statistic.Value>
                                <Statistic.Label>TEST HAKKI TALEBİ</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='red'>
                                <Statistic.Value>{this.state.stats.companies}</Statistic.Value>
                                <Statistic.Label>ŞİRKET</Statistic.Label>
                            </Statistic>
                        </Grid.Column>  
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='violet'>
                                <Statistic.Value>{this.state.stats.done}</Statistic.Value>
                                <Statistic.Label>TAMAMLANAN TEST</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Transition>
            <Transition visible={this.state.visible} animation='scale' duration={500}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column  mobile={16} tablet={16} computer={8}>
                            <RequestTable requestData={this.state.data.filter((company)=>company.requestedTest>0)}/>
                        </Grid.Column>
                        <Grid.Column  mobile={12} tablet={16} computer={8}>
                            <RequestTable requestData={this.state.data.filter((company)=>company.requestedTest>0)}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Transition>
        </section>
        )
    }
}

export default AdminDashboard;