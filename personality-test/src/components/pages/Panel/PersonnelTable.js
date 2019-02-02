import React from 'react';
import PropTypes from 'prop-types';
import { Table,Pagination,Popup } from 'semantic-ui-react'
import moment from 'moment';

class PersonnelTable extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
            column: null,
            direction: null,
            data:[],
            totalPages:0,
            pageSize:15,
            currentPage:1
        }
        this.handlePageChange=this.handlePageChange.bind(this);
    }

    componentDidMount(){
        this.setState({
                visible:true,
                data:this.getTablePage(this.props.personnelData),
                totalPages: this.getTotalPageNumber()
            });
    }

    handleSort(clickedColumn){
        const { column, direction } = this.state;

        let sortedData=this.sortByColumn(this.props.personnelData,clickedColumn);

        if (column !== clickedColumn) {
            this.updatePage(sortedData,this.state.currentPage,'ascending',clickedColumn);
            return;
        }

        if(direction==="ascending"){
            sortedData=sortedData.reverse();
        }
        this.updatePage(sortedData,this.state.currentPage,direction === 'ascending' ? 'descending': 'ascending',clickedColumn);
    }

    handlePageChange(e, { activePage }){
        this.updatePage(this.props.personnelData,activePage)
    }

    updatePage(data,activePage,direction=this.state.direction,column=this.state.column){
        const {pageSize}=this.state;
        const startIndex=(activePage-1)*pageSize;
        const endIndex=startIndex+pageSize;
        this.setState({
            column: column,
            currentPage:activePage,
            data:data.slice(startIndex, endIndex),
            direction: direction,
        })
    }

    getTablePage(){
        return this.props.personnelData.slice(0, this.state.pageSize);
    }

    getTotalPageNumber(){
        const {pageSize}=this.state;
        return Math.ceil(this.props.personnelData.length/pageSize);
    }

    sortByColumn(array,clickedColumn){
        return array.sort(function(a, b) {
                if(a[clickedColumn] < b[clickedColumn]) { return -1; }
                if(a[clickedColumn] > b[clickedColumn]) { return 1; }
                return 0;
        });
    }

    getCharacterColor(type){
        switch (type) {
            case 1:
                return "#78909c75";
            case 2:
                return "#8d6e63";
            case 3:
                return "#ef5350";
            case 4:
                return "#a5d6a7";
            case 5:
                return "#ba68c8";
            case 6:
                return "#ffcc80";
            case 7:
                return "#b2ca9d";
            case 8:
                return "#4dd0e1";
            case 9:
                return "#26a69a";
            default:
                return "#78909c75";
        }
    }

    render(){
        const { column, direction,data } = this.state;

        return (
        <Table singleLine sortable celled fixed selectable color="orange">
            <Table.Header>
            
                <Table.Row>
                    <Table.HeaderCell
                        sorted={column === 'name' ? direction : null}
                        onClick={()=>this.handleSort('name')}
                        >
                        İsim
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'title' ? direction : null}
                        onClick={()=>this.handleSort('title')}
                        >
                        Ünvan
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'dateCompleted' ? direction : null}
                        onClick={()=>this.handleSort('dateCompleted')}
                        >
                        Test Tarihi
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'characterType' ? direction : null}
                        onClick={()=>this.handleSort('characterType')}
                        >
                        Karakter Tipi
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'wingType' ? direction : null}
                        onClick={()=>this.handleSort('wingType')}
                        >
                        Kanat Tipi
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        İşlemler
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {data.map(({ id,name,title, characterType,wingType, dateCompleted, }) => (
                <Table.Row key={id}>
                    <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{name}</span>} content={name} /></Table.Cell>
                    <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{title}</span>} content={title} /></Table.Cell>
                    <Table.Cell>{moment(dateCompleted).format('DD/MM/YYYY, kk:mm')}</Table.Cell>
                    <Table.Cell style={{backgroundColor:this.getCharacterColor(characterType)}}>Tip {characterType}</Table.Cell>
                    <Table.Cell>Kanat {wingType}</Table.Cell>
                    <Table.Cell data-id={id}>raporu gör</Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan="6">
                        <Pagination prevItem={null} nextItem={null} onPageChange={this.handlePageChange} totalPages={this.state.totalPages} activePage={this.state.currentPage} />
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
        )
    }
}

PersonnelTable.propTypes = {
    personnelData:PropTypes.any.isRequired,
}

export default PersonnelTable;