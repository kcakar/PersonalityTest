import React, { Component } from 'react'
import { Grid, Statistic,Loader } from 'semantic-ui-react'
import {withToastManager} from 'react-toast-notifications';

import ApiHelper from '../../../helpers/ApiHelper';

class Statistics extends Component {
    state = {
        visible:false,
        isLoading:true,
        stats:{
            waitingCredit:0,
            sales:0,
            companies:0,
            completedTests:0,
        }
    }

    componentDidMount(){
        const {toastManager}=this.props;

        ApiHelper.functions.statistics.getAdmin()
        .then(result=>{
            this.setState({
                stats:result
            })
        })
        .catch(err=>{
            toastManager.add(err.message, { appearance: "error",autoDismiss: true,autoDismissTimeout:3000});
        })
        .finally(()=>{
            this.setState({isLoading:false});
        })
    }

  render() {
    const {stats,isLoading}=this.state;
    return (

            <Grid columns={16} divided className="statistics centered" centered>
                    {isLoading?
                    <Loader active inline='centered' size="large" />
                    :
                    <Grid.Row>
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='green' >
                                <Statistic.Value>{stats.sales}</Statistic.Value>
                                <Statistic.Label>SATIŞ</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='teal'>
                                <Statistic.Value>{stats.waitingCredit}</Statistic.Value>
                                <Statistic.Label>TEST HAKKI TALEBİ</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='red'>
                                <Statistic.Value>{stats.companies}</Statistic.Value>
                                <Statistic.Label>ŞİRKET</Statistic.Label>
                            </Statistic>
                        </Grid.Column>  
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='violet'>
                                <Statistic.Value>{stats.completedTests}</Statistic.Value>
                                <Statistic.Label>TAMAMLANAN TEST</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                    </Grid.Row>
                    }
            </Grid>
    )
  }
}

export default withToastManager(Statistics)