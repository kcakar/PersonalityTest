import React from 'react';
import { Table,Pagination,Popup ,Dropdown,Header,Transition} from 'semantic-ui-react';
import { toast } from "react-toastify";

import ApiHelper from '../../../helpers/ApiHelper';
import AnswersModal from './AnswersModal';

class UserTable extends React.Component{ 
    constructor(props){
        super(props);

        this.state={
            visible:false,
            column: null,
            direction: null,
            dropDownOptions:[],
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
        this.getSelectData();
    }

    getSelectData=()=>{
        ApiHelper.functions.companies.get()
        .then(companyData=>{
            this.fillSelect(companyData);
        })
        .catch(err=>{
            this.setState({
                visible:true,
            });
        });
    }

    fillSelect=(data)=>{
        let options= [...new Set(data.map(p=>{return {text:p.name,value:p.id}}))];
        let selectData=this.sortArray(options);

        this.setState({
            visible:true,
            selectData,
        });
    }

    sortArray=(array)=>{
        return array.sort(function(a, b) {
                if(a.name<b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
        });
    }

    handleDropDownSelect=(e,{value})=>{
        ApiHelper.functions.company.employeesAdmin(value)
        .then(personnelData=>{
            this.setState({
                visible:true,
                data:this.getTablePage(personnelData),
                totalPages: this.getTotalPageNumber(personnelData),
                currentPage:1,
                direction:'ascending'
            });
        }).catch(err=>{
            toast.error(err.message,{position: toast.POSITION.TOP_CENTER});        
        });
    }

    getTableData(){
        ApiHelper.functions.creditRequest.get()
        .then(requestData=>{
            this.setState({
                visible:true,
                data:this.getTablePage(requestData),
                totalPages: this.getTotalPageNumber(requestData),
                data:requestData,
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

        let sortedData=this.sortByColumn(this.state.data,clickedColumn);

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
        this.updatePage(this.state.data,activePage)
    }

    updatePage(data,activePage,direction=this.state.direction,column=this.state.column,query=this.state.query){
        const {pageSize}=this.state;
        let filteredData=data.filter(company=>company.name.toLowerCase().indexOf(query.toLowerCase())!==-1)
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
        this.updatePage(this.state.data,1,this.state.direction,this.state.column,value)
    }
 
    render(){
        const { column, direction,data } = this.state;

        return (
        <Transition visible={this.state.visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Şirkete göre kullanıcılar</Header>
                <Dropdown options={this.state.selectData} onChange={this.handleDropDownSelect} icon='search' labeled placeholder='Şirket seçiniz...' fluid search selection />
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
                                sorted={column === 'personalityType' ? direction : null}
                                onClick={()=>this.handleSort('personalityType')}
                                >
                                Kişilik tipi
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'wingType' ? direction : null}
                                onClick={()=>this.handleSort('wingType')}
                                >
                                Kanat tipi
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'altType' ? direction : null}
                                onClick={()=>this.handleSort('altType')}
                                >
                                Alt tip
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                İşlemler
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {data.map(({ id,name,title,testSession},index) => 
                        {
                            let {personalityType,altType,wingType}=testSession;
                            return <Table.Row key={id}>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{name}</span>} content={name} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{title}</span>} content={title} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{personalityType}</span>} content={title} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{wingType}</span>} content={title} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{altType}</span>} content={title} /></Table.Cell>
                                <Table.Cell collapsing>
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<AnswersModal user={data[index]}></AnswersModal>} content="Cevapları gör" />
                                </Table.Cell>
                            </Table.Row>
                            }
                        )}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan="6 ">
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

export default UserTable;