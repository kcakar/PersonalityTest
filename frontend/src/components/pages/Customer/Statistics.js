import React, { Component } from 'react'
import { Grid, Statistic,Loader } from 'semantic-ui-react'

class Statistics extends Component {
    state = {
        visible:false,
        isLoading:true
    }

    componentDidMount=()=>{
        this.setState({visible:true,isLoading:false})
    }

    render() {
        const {stats}=this.props;
        const{isLoading}=this.state;
        return (

                <Grid divided className="statistics centered" centered>
                        {isLoading?
                        <Loader active inline='centered' size="large" />
                        :
                        <Grid.Row>
                            <Grid.Column mobile={8} tablet={4} computer={4}>
                                <Statistic color='violet' >
                                    <Statistic.Value>{stats.credit}</Statistic.Value>
                                    <Statistic.Label>TEST HAKKI</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column mobile={8} tablet={4} computer={4}>
                                <Statistic color='orange'>
                                    <Statistic.Value>{stats.waiting}</Statistic.Value>
                                    <Statistic.Label>BEKLEYEN TEST SAYISI</Statistic.Label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={4} computer={4}>
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

export default Statistics