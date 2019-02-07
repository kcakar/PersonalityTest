import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Statistic,Transition } from 'semantic-ui-react'

export default class Statistics extends Component {
  state = {
    visible:false,
    }

    componentDidMount(){
        this.setState({visible:true});
    }

  render() {
    const {stats}=this.props;
    return (
        <Transition visible={this.state.visible} animation='scale' duration={500}>
            <Grid columns={16} divided className="statistics centered" centered>
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
            </Grid>
        </Transition>
    )
  }
}

Statistics.propTypes = {
  stats:PropTypes.any.isRequired,
}