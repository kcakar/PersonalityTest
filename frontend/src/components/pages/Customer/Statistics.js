import React, { Component } from 'react'
import { Grid, Statistic,Loader } from 'semantic-ui-react'
import {withToastManager} from 'react-toast-notifications';

import ApiHelper from '../../../helpers/ApiHelper';

class Statistics extends Component {
    state = {
        visible:false,
        isLoading:true,
        stats:{
            credit:0,
            waiting:0,
            done:0,
        }
    }

    componentDidMount(){
        const {toastManager}=this.props;

        ApiHelper.functions.statistics.getCustomer(ApiHelper.user.id)
        .then(result=>{
            this.setState({
                stats:{...result,credit:ApiHelper.user.credit}
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

            <Grid columns={3} divided className="statistics centered" centered>
                    {isLoading?
                    <Loader active inline='centered' size="large" />
                    :
                    <Grid.Row>
                        <Grid.Column>
                            <Statistic color='violet' >
                                <Statistic.Value>{stats.credit}</Statistic.Value>
                                <Statistic.Label>TEST HAKKI</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column>
                            <Statistic color='orange'>
                                <Statistic.Value>{stats.waiting}</Statistic.Value>
                                <Statistic.Label>BEKLEYEN TEST SAYISI</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column>
                            <Statistic color='green'>
                                <Statistic.Value>{stats.done}</Statistic.Value>
                                <Statistic.Label>SONUÇLANAN TEST SAYISI</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                    </Grid.Row>
                    }
            </Grid>
    )
  }
}

export default withToastManager(Statistics)