import React from 'react';
import PropTypes from 'prop-types';
import { Table,Pagination,Popup ,Input} from 'semantic-ui-react'
import moment from 'moment';
import SendTest from './SendTest';
import AskCredit from './AskCredit';

class PersonnelTable extends React.Component{ 
    state={
        visible:false,
        column: null,
        direction: null,
        data:[],
        totalPages:0,
        pageSize:15,
        currentPage:1,
        query:""
    }

    componentDidMount(){
        this.setTableData();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.personnelData!==prevProps.personnelData)
        {
            this.setTableData();
        }
        
    }

    setTableData=()=>{
        const {personnelData}=this.props;
        this.setState({
                visible:true,
                data:this.getTablePage(personnelData),
                totalPages: this.getTotalPageNumber(personnelData),
                currentPage:1,
                direction:'ascending'
            });
    }

    handleSort=(clickedColumn)=>{
        const { column, direction } = this.state;

        let sortedData=this.sortByColumn(this.props.personnelData,clickedColumn);

        if (column !== clickedColumn) {
            this.updatePage(sortedData,this.state.currentPage,'ascending',clickedColumn);
            return;
        }

        if(direction==="ascending"){
            sortedData.reverse();
        }
        this.updatePage(sortedData,this.state.currentPage,direction === 'ascending' ? 'descending': 'ascending',clickedColumn);
    }

    handlePageChange=(e, { activePage })=>{
        this.updatePage(this.props.personnelData,activePage)
    }

    updatePage=(data,activePage,direction=this.state.direction,column=this.state.column,query=this.state.query)=>{
        const {pageSize}=this.state;
        let filteredData=data.filter(personnel=>personnel.name.toLowerCase().indexOf(query.toLowerCase())!==-1)
        const startIndex=(activePage-1)*pageSize;
        const endIndex=startIndex+pageSize;
        this.setState({
            column: column,
            currentPage:activePage,
            data:filteredData.slice(startIndex, endIndex),
            direction: direction,
            query,
            totalPages:this.getTotalPageNumber(filteredData)
        })
    }

    getTablePage=()=>{
        return this.props.personnelData.slice(0, this.state.pageSize);
    }

    getTotalPageNumber=(data)=>{
        const {pageSize}=this.state;
        return Math.ceil(data.length/pageSize);
    }

    sortByColumn=(array,clickedColumn)=>{
        return array.sort(function(a, b) {
                if(a[clickedColumn] < b[clickedColumn]) { return -1; }
                if(a[clickedColumn] > b[clickedColumn]) { return 1; }
                return 0;
        });
    }

    getCharacterColor=(type)=>{
        switch (type) {
            case "1":
                return "#78909c75";
            case "2":
                return "#8d6e63";
            case "3":
                return "#ef5350";
            case "4":
                return "#a5d6a7";
            case "5":
                return "#ba68c8";
            case "6":
                return "#ffcc80";
            case "7":
                return "#b2ca9d";
            case "8":
                return "#4dd0e1";
            case "9":
                return "#26a69a";
            default:
                return "#fff";
        }
    }

    handleTableFilter=(e,{value})=>{
        this.updatePage(this.props.personnelData,1,this.state.direction,this.state.column,value)
    }
 
    render(){
        let { column, direction,data } = this.state;

        if(this.props.titleFilter){
            data=data.filter(row=>{return this.props.titleFilter.indexOf(row.title)!==-1})
        }

        return (
        <Table singleLine sortable celled fixed selectable color="orange">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell className="no-hover" colSpan='4' singleLine>
                        <Input placeholder="Arama..." onChange={this.handleTableFilter} />
                    </Table.HeaderCell>
                    <Table.HeaderCell className="no-hover" colSpan='1' singleLine>
                        <SendTest refreshDashboard={this.props.refreshDashboard} personnelTitles={this.props.personnelTitles}/>
                    </Table.HeaderCell>
                    <Table.HeaderCell className="no-hover" colSpan='2' singleLine>
                        <AskCredit/>
                    </Table.HeaderCell>
                </Table.Row>
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
                        sorted={column === 'personalityType' ? direction : null}
                        onClick={()=>this.handleSort('personalityType')}
                        >
                        Karakter Tipi
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'wingType' ? direction : null}
                        onClick={()=>this.handleSort('wingType')}
                        >
                        Kanat Tipi
                    </Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={column === 'altType' ? direction : null}
                        onClick={()=>this.handleSort('altType')}
                        >
                        Kanat Tipi
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        İşlemler
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {data.map(({ id,name,title,testSession, dateCompleted}) => 
                {
                    console.log(testSession)
                    let {wingType,altType,stage,personalityType}=testSession;
                    console.log(testSession)
                    let dateText= stage==="finished"?moment(dateCompleted).format('DD/MM/YYYY, kk:mm'):<span className="red">Test Beklemede</span>
                    let typetext= stage==="finished"?`Tip ${personalityType}`:`-`;
                    let wingtext= stage==="finished"?`Kanat ${wingType}`:`-`;

                    return <Table.Row key={id}>
                        <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{name}</span>} content={name} /></Table.Cell>
                        <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{title}</span>} content={title} /></Table.Cell>
                        <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{dateText}</span>} content={dateText} /></Table.Cell>
                        <Table.Cell style={{backgroundColor:this.getCharacterColor(personalityType)}}>{typetext}</Table.Cell>
                        <Table.Cell>{wingtext}</Table.Cell>
                        <Table.Cell>{altType}</Table.Cell>
                        <Table.Cell>
                            {/* {
                                stage==="finished" && <Popup style={{opacity:0.9}} basic inverted trigger={<Button compact basic size="tiny"><Icon name='address card' /></Button>} content="Raporu Görüntüle" />
                            } */}
                        </Table.Cell>
                    </Table.Row>
                    }
                )}
            </Table.Body>
            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell colSpan="7">
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
    personnelTitles:PropTypes.any.isRequired,
    refreshDashboard:PropTypes.func.isRequired
}

export default PersonnelTable;