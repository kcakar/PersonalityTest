import React from 'react';
import { Table,Pagination,Popup ,Input,Header,Transition} from 'semantic-ui-react';
import { toast } from "react-toastify";

import CreditModal from './CreditModal';
import ApiHelper from '../../../helpers/ApiHelper';

class RequestTable extends React.Component{ 
    constructor(props){
        super(props);

        this.state={
            visible:false,
            column: null,
            direction: null,
            data:[],
            totalPages:0,
            pageSize:10,
            currentPage:1,
            query:""
        }
        this.handlePageChange=this.handlePageChange.bind(this);
        this.handleTableFilter=this.handleTableFilter.bind(this);
        this.updatePage=this.updatePage.bind(this);
        this.getTableData=this.getTableData.bind(this);
    }

    componentDidMount(){
        this.getTableData();
    }

    getTableData(){
        ApiHelper.functions.creditRequest.get()
        .then(requestData=>{
            this.setState({
                visible:true,
                data:this.getTablePage(requestData),
                totalPages: this.getTotalPageNumber(requestData),
                AllData:requestData,
                currentPage:1,
                direction:'ascending'
            });
        })
        .catch(err=>{
            toast.error(err.message,{position: toast.POSITION.TOP_CENTER});
        })
    }

    handleSort(clickedColumn){
        const { column, direction } = this.state;

        let sortedData=this.sortByColumn(this.state.AllData,clickedColumn);

        if (column !== clickedColumn) {
            this.updatePage(sortedData,this.state.currentPage,'ascending',clickedColumn);
            return;
        }

        if(direction==="ascending"){
            sortedData.reverse();
        }
        this.updatePage(sortedData,this.state.currentPage,direction === 'ascending' ? 'descending': 'ascending',clickedColumn);
    }

    handlePageChange(e, { activePage }){
        this.updatePage(this.state.AllData,activePage)
    }

    updatePage(data,activePage,direction=this.state.direction,column=this.state.column,query=this.state.query){
        const {pageSize}=this.state;
        let filteredData=data.filter(company=>company.companyName.toLowerCase().indexOf(query.toLowerCase())!==-1)
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

    getTablePage(requestData){
        return requestData.slice(0, this.state.pageSize);
    }

    getTotalPageNumber(data){
        const {pageSize}=this.state;
        return Math.ceil(data.length/pageSize);
    }

    sortByColumn(array,clickedColumn){
        return array.sort(function(a, b) {
                if(a[clickedColumn] < b[clickedColumn]) { return -1; }
                if(a[clickedColumn] > b[clickedColumn]) { return 1; }
                return 0;
        });
    }

    handleTableFilter(e,{value})
    {
        this.updatePage(this.state.AllData,1,this.state.direction,this.state.column,value)
    }
 
    render(){
        const { column, direction,data } = this.state;

        return (
        <Transition visible={this.state.visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Bekleyen Test Talepleri</Header>
                <Table singleLine sortable celled fixed selectable color="orange">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className="no-hover" colSpan='5' singleLine>
                                <Input placeholder="Arama..." onChange={this.handleTableFilter} />
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'companyName' ? direction : null}
                                onClick={()=>this.handleSort('companyName')}
                                >
                                Şirket
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'mail' ? direction : null}
                                onClick={()=>this.handleSort('mail')}
                                >
                                E-mail
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'phone' ? direction : null}
                                onClick={()=>this.handleSort('phone')}
                                >
                                Telefon
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'amount' ? direction : null}
                                onClick={()=>this.handleSort('amount')}
                                >
                                Talep edilen miktar
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                İşlemler
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {data.map(({ id,companyName,amount,phone,mail},index) => 
                        {
                            return <Table.Row key={id}>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{companyName}</span>} content={companyName} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{mail}</span>} content={mail} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{phone}</span>} content={phone} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{amount}</span>} content={amount} /></Table.Cell>
                                <Table.Cell collapsing>
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<CreditModal type="confirm" requestData={data[index]} getTableData={this.getTableData}/>} content="Onayla" />
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<CreditModal type="reject"  requestData={data[index]} getTableData={this.getTableData}/>} content="Reddet" />
                                </Table.Cell>
                            </Table.Row>
                            }
                        )}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan="5">
                                <Pagination prevItem={null} nextItem={null} onPageChange={this.handlePageChange} totalPages={this.state.totalPages} activePage={this.state.currentPage} />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        </Transition>
        )
    }
}

export default RequestTable;