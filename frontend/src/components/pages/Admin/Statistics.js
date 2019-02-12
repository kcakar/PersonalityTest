import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Statistic,Loader } from 'semantic-ui-react'

export default class Statistics extends Component {
    state = {
        visible:false,
        isLoading:true
    }

    componentDidMount(){
        this.setState({isLoading:false});
    }

  render() {
    const {stats}=this.props;
    const {isLoading}=this.state;
    return (

            <Grid columns={16} divided className="statistics centered" centered>
                    {isLoading?
                    <Loader active inline='centered' size="large" />
                    :
                    <Grid.Row>
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='green' >
                                <Statistic.Value>{stats.sold}</Statistic.Value>
                                <Statistic.Label>SATIŞ</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                        <Grid.Column  mobile={16} tablet={8} computer={4}>
                            <Statistic color='teal'>
                                <Statistic.Value>{stats.request}</Statistic.Value>
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
                                <Statistic.Value>{stats.done}</Statistic.Value>
                                <Statistic.Label>TAMAMLANAN TEST</Statistic.Label>
                            </Statistic>
                        </Grid.Column>
                    </Grid.Row>
                    }
            </Grid>
    )
  }
}

Statistics.propTypes = {
  stats:PropTypes.any.isRequired,
}
