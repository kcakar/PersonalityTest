import React from 'react';
import RequestTable from './RequestTable';
import Statistics from './Statistics';
import AdminNavigation from './AdminNavigation';
import QuestionManagement from './QuestionManagement';

const tabs={
    requests:"Bekleyen Talepler",
    questions:"Soru Yönetimi",
    companies:"Şirket yönetimi",
    settings:"Site ayarları",
}

class AdminDashboard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            requestData:[],
            stats:{
                sold:0,
                request:0,
                companies:0,
                done:0
            },
            activeTab:null
        }

        this.setTab=this.setTab.bind(this);
    }

    generateAdminData(){
        let requestData=[];
        const names=["Apple","Amazon.com","Alphabet","Microsoft","Facebook","Alibaba","Berkshire Hathaway","Tencent Holdings","JPMorgan Chase","ExxonMobil","Johnson & Johnson","Samsung Electronics","Bank of America","Royal Dutch Shell","Visa","Wells Fargo","China Construction Bank","Intel","Chevron","Walmart","Nestle","UnitedHealth Gro","Cisco Systems","PetroChina","Home Depot","Pfizer","Taiwan Semiconduct","Novart","Mastercard","Verizon Communications","Toyota Motor","HSBC Holdings","Boeing","AT&T","China Mobile","Oracle","Roche Holding","Citigroup","Procter & Gamble","Anheuser-Busch InBev","Agricultural Bank of China","Ping An Insurance Group","Coca-Cola","Tot","AbbVie","Merck & Co.","Bank of China","Unilever","DowDuPont","NVIDIA","BP","Walt Disney","Comcast","Kweichow Moutai","Netflix","SAP","Sinopec","PepsiCo","L'Oréal Group","BHP Billiton","IBM","McDonald's","General Electric","Philip Morris International","3M","British American Tobac","Adobe Systems","Novo Nordisk","Medtron","Amgen","Royal Bank of Canada","Naspers","Siemens","China Merchants Bank","AIA Group","Nike","Honeywell International","Union Pacific","TD Bank Group","Abbott Laboratories","Texas Instruments","Banco Santander","Bayer","Altria Group","China Life Insurance","Volkswagen Group","Accentu","Allianz","Broadc","Booking Holding","United Parcel Servic","United Technologie","Indite","Rio Tint","GlaxoSmithKlin","Schlumberge","Tata Consultancy Service","Morgan Stanle"]
        for(let i=0;i<names.length;i++){
            let bought=Math.floor(Math.random() * 10)
            requestData.push(  
                { 
                    id:i.toString(),
                    name: names[i], 
                    dateAdded: new Date()- (Math.floor(Math.random() * 123456789)),
                    boughtTest:bought,
                    mail:`${names[i]}@mail.com`,
                    phone:`0555 555 55 55`,
                    usedTest:bought-Math.floor(Math.random() * bought),
                    requestedTest:Math.floor(Math.random() * 10),
                }
            )
        }
        const done=requestData.reduce((total,company)=>total+company.usedTest,0);
        const sold=requestData.reduce((total,company)=>total+company.boughtTest,0);
        const request=requestData.reduce((total,company)=>total+company.requestedTest,0);
        return {requestData,companies:names.length,sold,done,request};
    }

    componentDidMount(){
        const {sold,done,request,requestData,companies}=this.generateAdminData();
        this.setState({
            visible:true,
            requestData,
            activeTab:tabs.requests,
            stats:{sold,request,companies,done}
        });
    }

    setTab(tab){
        this.setState({activeTab:tab});
    }

    render(){
        let content=(<p></p>);

        switch (this.state.activeTab) {
            case tabs.requests:
                content=(<RequestTable visible={this.state.activeTab===tabs.requests} requestData={this.state.requestData.filter((company)=>company.requestedTest>0)}/>)
                break;
            case tabs.questions:
                content=(<QuestionManagement />)
                break;
            case tabs.companies:
                // content=(<CompanyManagement />)
                break;
            default:
                content=(<p></p>)
                break;
        }


        return(
        <section className="admin-dashboard dashboard">
            <div className="dashboard-center">
                <Statistics stats={this.state.stats}/>
                <AdminNavigation tabs={tabs} setTab={this.setTab}/>
                {content}
            </div>
        </section>
        )
    }
}

export default AdminDashboard;