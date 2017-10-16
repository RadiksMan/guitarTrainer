import React, { Component } from 'react'

import guitarConfig from '../json/guitar.json'

const guitarType = 'standartGuitar';

class Guitar extends Component {
    constructor(props){
        super(props)
    }



    render(){
        console.log('guitarConfig',guitarConfig)
        return(
            <div>
                test Guitar
            </div>
        )
    }
}

export default Guitar;