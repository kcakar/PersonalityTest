import React from 'react';
import { Transition, Header, Grid } from 'semantic-ui-react';
import {withToastManager} from 'react-toast-notifications';

import PersonnelTable from './PersonnelTable';
import PersonnelByTypeGraph from './PersonnelByTypeGraph';
import ApiHelper from '../../../helpers/ApiHelper';
import Statistics from './Statistics';

class CustomerDasbhoard extends React.Component{
    state={
        visible:false,
        data:[],
        titles:[],
        stats:{
            credit:0,
            waiting:0,
            done:0,
        }
    }

    getPersonnelData=()=>{
        const {toastManager}=this.props;
        ApiHelper.functions.company.employees()
        .then(data=>{
            let titles=[];
            if(data.length>0)
            {
                titles=[...new Set(this.state.data.map(p=>p.title))];
            }
            this.setState({visible:true,data,titles});
        }).catch(err=>{
            toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
        });
    }

    getStatData=()=>{
        const {toastManager}=this.props;

        ApiHelper.functions.statistics.getCustomer(ApiHelper.user.id)
        .then(result=>{
            this.setState({
                stats:{...result}
            })
        })
        .catch(err=>{
            toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
        })
    }

    componentDidMount=()=>{
        this.refreshDashboard();
    }
    refreshDashboard=()=>{
        this.getPersonnelData();
        this.getStatData();
    }

    render(){
        return(
        <section className="customer-dashboard dashboard">
            <Transition visible={this.state.visible} animation='fade' duration={500}>
                <div className="dashboard-center">
                    <Statistics stats={this.state.stats}/>
                    <Grid divided className="statistics centered" centered>
                        <Grid.Row>
                            <Header textAlign="center" size="huge">Tiplere göre şirket profili</Header>
                            <PersonnelByTypeGraph personnelData={this.state.data} />
                        </Grid.Row>
                        <Grid.Row className="customer-table">
                            <PersonnelTable refreshDashboard={this.refreshDashboard} personnelData={this.state.data} personnelTitles={this.state.titles}/>
                        </Grid.Row>
                    </Grid>
                </div>
            </Transition>
        </section>
        )
    }
}

export default withToastManager(CustomerDasbhoard);