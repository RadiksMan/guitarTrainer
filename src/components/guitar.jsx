import React, { Component } from 'react'

import guitarConfig from '../json/guitar.json'

const guitarType = 'standartGuitar';

class Guitar extends Component {
    constructor(props){
        super(props);
        this.state = {
            guitarType:'standartGuitar',
        }
    }

    renderGuitar(){
        const guitar = guitarConfig[this.state.guitarType];
        const guitarFrets = guitar.fret;
        console.log('guitarFrets', guitarFrets)

        return (
            <div className={guitar.guitarNeck}>
                {
                    guitarFrets.map((index,fret)=>{

                        //console.log('fret',fret);
                        <div key={index} >
                            {index}
                        </div>
                    })
                }
            </div>
        )
    }
    

    render(){
        console.log('guitarConfig',guitarConfig)
        return (
            <div>
                test Guitar
                {this.renderGuitar()}
            </div>
        )
    }
}

export default Guitar;