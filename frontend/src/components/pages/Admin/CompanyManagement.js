import React from 'react';
import PropTypes from 'prop-types';
import { Table,Pagination,Popup ,Input,Header,Transition,Button,Icon} from 'semantic-ui-react';
import AddCompanyModal from './AddCompanyModal';


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
            query:""
        }
        this.handlePageChange=this.handlePageChange.bind(this);
        this.handleTableFilter=this.handleTableFilter.bind(this);
        this.updatePage=this.updatePage.bind(this);
    }

    componentDidMount(){
        let {companyData}=this.props;
        this.setState({
                visible:true,
                data:this.getTablePage(companyData),
                totalPages: this.getTotalPageNumber(companyData),
                currentPage:1,
                direction:'ascending'
            });
    }

    handleSort(clickedColumn){
        const { column, direction } = this.state;

        let sortedData=this.sortByColumn(this.props.companyData,clickedColumn);

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
        this.updatePage(this.props.companyData,activePage)
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

    getTablePage(){
        return this.props.companyData.slice(0, this.state.pageSize);
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
        this.updatePage(this.props.companyData,1,this.state.direction,this.state.column,value)
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
                                <AddCompanyModal user={this.props.user}></AddCompanyModal>
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
                    {data.map(({ id,name,requestedTest,phone,mail,login}) => 
                        {
                            return <Table.Row key={id}>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{name}</span>} content={name} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{login}</span>} content={login} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{mail}</span>} content={mail} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{phone}</span>} content={phone} /></Table.Cell>
                                <Table.Cell><Popup style={{opacity:0.9}} basic inverted trigger={<span>{requestedTest}</span>} content={requestedTest} /></Table.Cell>
                                <Table.Cell collapsing>
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<Button icon> <Icon name='globe' /> </Button>} content="Şirket panel linkini kopyala" />
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<Button icon> <Icon name='edit' /> </Button>} content="Düzenle" />
                                    <Popup style={{opacity:0.9}} basic inverted trigger={<Button icon> <Icon name='remove circle' /> </Button>} content="Sil" />
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

CompanyManagement.propTypes = {
    companyData:PropTypes.any.isRequired,
    user:PropTypes.any.isRequired
}

export default CompanyManagement;