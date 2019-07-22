import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal,Popup,Table} from 'semantic-ui-react';
import { toast } from "react-toastify";

import ApiHelper from '../../../helpers/ApiHelper';

class AnswersModal extends Component {

    state = { 
        modalOpen: false,
        answerData:[],
        column: null,
        direction: null,
    }

    componentDidMount(){
        
    }

    handleOpen = () => {
        this.setState({ modalOpen: true })
        console.log(this.props)
        ApiHelper.functions.employee.getAnswers(this.props.user.id)
        .then(answerData=>{
            this.setState({
                answerData:this.normalize(answerData)
            });
        }).catch(err=>{
            toast.error(err.message,{position: toast.POSITION.TOP_CENTER});        
        });
    }

    normalize=(data)=>{
        return data.map((row)=>{
            return{
                order:row.question.order,
                text:row.question.text,
                selectedOption:this.getSelectedOption(row.selectedOption),
                personalityType:row.question.personalityType
            }
        })
    }

    getSelectedOption=(selectedOption)=>{

        // if(selectedOption!=="1" &&selectedOption!=="2" &&selectedOption!=="-1" &&selectedOption!=="-2" &&selectedOption!=="0"){
        //     selectedOption="En uzak şık";
        // }

        switch (selectedOption) {
            case "0":
                selectedOption="Kesinlikle katılmıyorum";
                break;
            case "1":
                selectedOption="Katılmıyorum";
                break;
            case "2":
                selectedOption="Kararsızım";
                break;
            case "3":
                selectedOption="Katılıyorum";
                break;
            case "4":
                selectedOption="Kesinlikle katılıyorum";
                break;
            default:
                selectedOption="En uzak şık"
                break;
        }

        return selectedOption;
    }

    handleClose = () => this.setState({ modalOpen: false ,isNewPass:false,newPass:""})
    
    handleSort = clickedColumn => () => {
        let { column, direction } = this.state;

        let sortedData=this.sortByColumn(this.state.answerData,clickedColumn,direction);


        this.setState({
            column,
            sortedData,
            direction:direction === 'ascending' ? 'descending': 'ascending',
        })
      }

      sortByColumn=(array,clickedColumn,direction)=>{
          if(direction==="ascending"){
            return array.sort(function(a, b) {
                    if(a[clickedColumn] < b[clickedColumn]) { return -1; }
                    if(a[clickedColumn] > b[clickedColumn]) { return 1; }
                    return 0;
            });
          }
          else{
            return array.sort(function(a, b) {
                if(a[clickedColumn] > b[clickedColumn]) { return -1; }
                if(a[clickedColumn] < b[clickedColumn]) { return 1; }
                return 0;
            });
          }

    }

    render() {
        const { column,  direction } = this.state
        const trigger=(
            <Popup style={{opacity:0.9}} basic inverted content="Cevapları gör" 
                trigger={
                    <Button icon onClick={this.handleOpen}> 
                        <Icon name='eye'/> 
                    </Button>
                    } 
            />);

        return (
        
        <Modal closeIcon
            trigger={trigger}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            className="answers-modal"
        >
            <Header icon='browser' content={`${this.props.user.name} isimli kullanıcının cevapları`} />
            <Modal.Content>
                <Table celled striped  sortable> 
                    <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell colSpan='1'
                                        sorted={column === 'order' ? direction : null}
                                        onClick={this.handleSort('order')}
                        >Sıra</Table.HeaderCell>
                        <Table.HeaderCell colSpan='1'
                                        sorted={column === 'text' ? direction : null}
                                        onClick={this.handleSort('text')}
                        >Soru</Table.HeaderCell>
                        <Table.HeaderCell colSpan='1'
                                        sorted={column === 'personalityType' ? direction : null}
                                        onClick={this.handleSort('personalityType')}
                                >Kişilik Tipi</Table.HeaderCell>
                        <Table.HeaderCell colSpan='1' 
                                    sorted={column === 'selectedOption' ? direction : null}
                                        onClick={this.handleSort('selectedOption')}>Cevap</Table.HeaderCell>
                                        
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {this.state.answerData.map((answer,index)=>(

                    <Table.Row key={index}>
                        <Table.Cell collapsing>
                            {answer.order}
                        </Table.Cell>
                        <Table.Cell >
                            {answer.text}
                        </Table.Cell>
                        <Table.Cell collapsing>Tip {answer.personalityType}</Table.Cell>
                        <Table.Cell collapsing textAlign='right'>
                            {answer.selectedOption}
                        </Table.Cell>
                    </Table.Row>
                    ))}
                    </Table.Body>
                </Table>
            </Modal.Content>
        </Modal>
        )
    }
}

AnswersModal.propTypes = {
    user:PropTypes.object.isRequired,
}

export default AnswersModal