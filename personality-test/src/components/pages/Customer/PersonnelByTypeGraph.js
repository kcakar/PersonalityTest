import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import {ResponsiveContainer,BarChart,CartesianGrid,XAxis,YAxis,Tooltip,Bar } from 'recharts';

class PersonnelByTypeGraph extends React.Component{
    constructor(props){
        super(props);

        this.state={
            visible:false,
            graphData:[],
            dropDownOptions:[]
        }

        this.handleDropDownSelect=this.handleDropDownSelect.bind(this);
    }

    componentDidMount(){
        this.setState({
            visible:true,
            graphData:this.normalizeData(this.props.personnelData),
            dropDownOptions:this.getDropDownOptions()
        });
    }

    normalizeData(personnelData){
        let graphData=[
            {name:"Tip 1",wing2:0,wing9:0},
            {name:"Tip 2",wing3:0,wing1:0},
            {name:"Tip 3",wing4:0,wing2:0},
            {name:"Tip 4",wing5:0,wing3:0},
            {name:"Tip 5",wing6:0,wing4:0},
            {name:"Tip 6",wing7:0,wing5:0},
            {name:"Tip 7",wing8:0,wing6:0},
            {name:"Tip 8",wing9:0,wing7:0},
            {name:"Tip 9",wing1:0,wing8:0},
        ]

        for(let i=0;i<personnelData.length;i++){
            let {characterType,wingType}=personnelData[i];
            if(characterType && wingType)
            {
                this.increaseType(graphData,characterType,wingType)
            }
        }
        return graphData;
    }

    filterDataByTitle(personnelData,titleArray){
        return personnelData.filter(personnel=>titleArray.indexOf(personnel.title)>-1);
    }

    getDropDownOptions(){
        let {personnelData} =this.props;
        let options= [...new Set(personnelData.map(p=>p.title))];
        options=this.sortArray(options);
        return options.map(o=>{return {text:o,value:o}});
    }

    sortArray(array){
        return array.sort(function(a, b) {
                if(a<b) { return -1; }
                if(a > b) { return 1; }
                return 0;
        });
    }

    handleDropDownSelect(e,dropdown){
        let filteredPersonnel=this.props.personnelData;
        if(dropdown.value.length>0)
        {
            filteredPersonnel=this.filterDataByTitle(this.props.personnelData,dropdown.value);
        }
        let graphData= this.normalizeData(filteredPersonnel);
        this.setState({graphData});
    }

    increaseType(graphData,typeNumber,wingNumber)
    {  
        let type=graphData.find((item)=>{return item.name===`Tip ${typeNumber}`});
        type[`wing${wingNumber}`]++;
    }
    render(){
        return (
            <div className="personnel-graph">
                <Dropdown options={this.state.dropDownOptions} onChange={this.handleDropDownSelect} icon='search' labeled placeholder='Ünvana göre filtreleme' fluid multiple search selection />
                <ResponsiveContainer height={300}>
                    <BarChart  width={700} height={300} data={this.state.graphData} margin={{top: 20, right: 0, left: -30, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip cursor={{fill:"#f0f8ff"}}/>
                        <Bar dataKey="wing1" name="kanat 1" unit=" kişi" stackId="a" fill="#78909c" />
                        <Bar dataKey="wing2" name="kanat 2" unit=" kişi" stackId="a" fill="#8d6e63" />
                        <Bar dataKey="wing3" name="kanat 3" unit=" kişi" stackId="a" fill="#ef5350" />
                        <Bar dataKey="wing4" name="kanat 4" unit=" kişi" stackId="a" fill="#a5d6a7" />
                        <Bar dataKey="wing5" name="kanat 5" unit=" kişi" stackId="a" fill="#ba68c8" />
                        <Bar dataKey="wing6" name="kanat 6" unit=" kişi" stackId="a" fill="#ffcc80" />
                        <Bar dataKey="wing7" name="kanat 7" unit=" kişi" stackId="a" fill="#b2ca9d" />
                        <Bar dataKey="wing8" name="kanat 8" unit=" kişi" stackId="a" fill="#4dd0e1" />
                        <Bar dataKey="wing9" name="kanat 9" unit=" kişi" stackId="a" fill="#26a69a" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        )
    }
}

PersonnelByTypeGraph.propTypes = {
    personnelData:PropTypes.any.isRequired,
}

export default PersonnelByTypeGraph;