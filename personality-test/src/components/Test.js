import React from 'react';
import { Route } from 'react-router';

import Intro from './pages/Intro';

class Test extends React.Component
{
    constructor(props){
        super(props);
        this.startTest=this.startTest.bind(this);
    }

    startTest(){
    }

    render(){
        return(
        <main>
            <Intro handleNextStep={this.startTest}/>
        </main>)
    }
}
export default Test
