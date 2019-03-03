import React from 'react';

import RequestTable from './RequestTable';
import Statistics from './Statistics';
import AdminNavigation from './AdminNavigation';
import QuestionManagement from './QuestionManagement';
import CompanyManagement from './CompanyManagement';
import Settings from './Settings';
import UserTable from './UserTable';

const tabs={
    users:"Kullanıcılar",
    requests:"Bekleyen Talepler",
    questions:"Soru Yönetimi",
    companies:"Şirket yönetimi",
    settings:"Site ayarları",
}

class AdminDashboard extends React.Component{
    constructor(props){
        super(props);

        this.state={
            activeTab:null
        }

        this.setTab=this.setTab.bind(this);
    }

    componentDidMount(){
        this.setState({
            visible:true,
            activeTab:tabs.users,
        });
    }

    setTab(tab){
        this.setState({activeTab:tab});
    }

    render(){
        let content=(<p></p>);
        switch (this.state.activeTab) {
            case tabs.users:
            content=(<UserTable/>)
            break;
            case tabs.requests:
                content=(<RequestTable/>)
                break;
            case tabs.questions:
                content=(<QuestionManagement />)
                break;
            case tabs.companies:
                content=(<CompanyManagement/>)
                break;
            case tabs.settings:
                content=(<Settings/>)
                break;
            default:
                content=(<p></p>)
                break;
        }


        return(
        <section className="admin-dashboard dashboard">
            <div className="dashboard-center">
                <Statistics/>
                <AdminNavigation tabs={tabs} setTab={this.setTab}/>
                {content}
            </div>
        </section>
        )
    }
}

export default AdminDashboard;