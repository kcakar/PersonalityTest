import React from 'react';
// import PropTypes from 'prop-types';
import { Transition, Header, Grid } from 'semantic-ui-react';
import PersonnelTable from './PersonnelTable';

import PersonnelByTypeGraph from './PersonnelByTypeGraph';
import ApiHelper from '../../../helpers/ApiHelper';
import Statistics from './Statistics';

class CustomerDasbhoard extends React.Component{
    state={
        visible:false,
        data:[]
    }

    getPersonnelData=()=>{
        console.log(ApiHelper.user)
        const {toastManager}=this.props;
        ApiHelper.functions.company.employees()
        .then(data=>{
            this.setState({visible:true,data});
        }).catch(err=>{
            toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
        });
    }

    componentDidMount=()=>{
        this.getPersonnelData();
    }

    getTitles=()=>{
        console.log(this.state)
        if(this.state.data.length>0)
        {
            return [...new Set(this.state.data.map(p=>p.title))];
        }
        else{
            return [];
        }
    }

    render(){
        return(
        <section className="customer-dashboard dashboard">
            <Transition visible={this.state.visible} animation='fade' duration={500}>
                <div className="dashboard-center">
                    <Statistics/>
                    <Grid columns={3} divided className="statistics centered" centered>
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