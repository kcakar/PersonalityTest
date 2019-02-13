import React from 'react';
import PropTypes from 'prop-types';
import { Table,Pagination,Popup ,Input,Header,Transition,Button,Icon} from 'semantic-ui-react';
import {withToastManager } from 'react-toast-notifications';
import {Link } from 'react-router-dom';

import AddCompanyModal from './AddCompanyModal';
import ApiHelper from '../../../helpers/ApiHelper';
import urls from '../../../helpers/URLs';

class CompanyManagement extends React.Component{ 
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
            query:"",
            companyData:[]
        }
        this.handlePageChange=this.handlePageChange.bind(this);
        this.handleTableFilter=this.handleTableFilter.bind(this);
        this.updatePage=this.updatePage.bind(this);
        this.getTableData=this.getTableData.bind(this);
        this.refreshCompanyTable=this.refreshCompanyTable.bind(this);
    }

    componentDidMount(){
        this.getTableData();
    }

    getTableData(){
        ApiHelper.functions.companies.get()
        .then(result=>result.json())
        .then(companyData=>{
            this.setState({
                companyData,
                visible:true,
                data:this.getTablePage(companyData),
                totalPages: this.getTotalPageNumber(companyData),
                currentPage:1,
                direction:'ascending'
            });
        })
        .catch(err=>{
            this.setState({
                visible:true,
            });
        });
    }

    handleSort(clickedColumn){
        const { column, direction } = this.state;

        let sortedData=this.sortByColumn(this.state.companyData,clickedColumn);

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
        this.updatePage(this.state.companyData,activePage)
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

    getTablePage(companyData){
        return companyData.slice(0, this.state.pageSize);
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
        this.updatePage(this.state.companyData,1,this.state.direction,this.state.column,value)
    }

    refreshCompanyTable(){
        this.getTableData();
    }

    companyStatusChange(id,currentStatus){
        currentStatus=currentStatus==="active"?"passive":"active";
        ApiHelper.functions.company.changeStatus(id,currentStatus)
        .then(response=>{
            if(response.ok){
                this.getTableData();
                return {message:"Şirket durumu değiştirildi",isErr:false};
            }
            else{
                return {message:"Şirket durumu değiştirilemedi.",isErr:true};
            }
        }).then(data=>{
            const { toastManager } = this.props;
            toastManager.add(data.message, { appearance: data.isErr?"error":"success",autoDismiss: true,autoDismissTimeout:3000});
        });
    }
 
    render(){
        const { column, direction,data } = this.state;

        return (
        <Transition visible={this.state.visible} animation='fade' duration={500}>
            <div className="request-table">
                <Header>Sistemdeki şirketler</Header>
                <Table singleLine sortable celled fixed selectable color="orange">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className="no-hover" colSpan='6' singleLine>
                                <Input placeholder="Arama..." onChange={this.handleTableFilter} />
                                <AddCompanyModal refreshCompanyTable={this.refreshCompanyTable}></AddCompanyModal>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={column === 'name' ? direction : null}
                                onClick={()=>this.handleSort('name')}
                                >
                                Şirket
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'login' ? direction : null}
                                onClick={()=>this.handleSort('login')}
                                >
                                Kullanıcı Adı
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
                                sorted={column === 'currentCredit' ? direction : null}
                                onClick={()=>this.handleSort('currentCredit')}
                                >
                                Test hakkı
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                İşlemler
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {data.map(({ id,name,credit,phone,mail,status}) => 
                        {
                            console.log(id)
                            return <Table.Row key={id}>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{name}</span>} content={name} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{mail}</span>} content={mail} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{mail}</span>} content={mail} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{phone}</span>} content={phone} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{credit}</span>} content={credit} /></Table.Cell>
                                <Table.Cell collapsing>
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<Link to={urls.customerPanel(id)}><Button icon> <Icon name='globe' /> </Button></Link>} content="Şirket paneline git" />
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<Button icon> <Icon name='edit' /> </Button>} content="Düzenle" />
                                    {status==="active"?
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<Button icon onClick={()=>this.companyStatusChange(id,status)}> <Icon name='check circle outline' color="green" /> </Button>} content="Şirketi pasif duruma getir" />
                                    :
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<Button icon onClick={()=>this.companyStatusChange(id,status)}> <Icon name='remove circle' color="red" /> </Button>} content="Şirketi aktif duruma getir" />
                                    }
                                    
                                </Table.Cell>
                            </Table.Row>
                            }
                        )}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan="6">
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

CompanyManagement.propTypes = {
    companyData:PropTypes.any.isRequired,
}

export default withToastManager(CompanyManagement);