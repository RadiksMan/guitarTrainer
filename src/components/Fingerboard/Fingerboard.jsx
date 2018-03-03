import React, { Component } from 'react';

import guitarConfig from '../../json/guitar.json';
import './Fingerboard.css';

const GUITAR_TYPE = 'standartGuitar';

class Fingerboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guitarType: GUITAR_TYPE,
        }
    }

    renderGuitar() {
        const { strings, guitarNeck, frets } = guitarConfig[this.state.guitarType];
        const dotsOne = [5, 7, 9, 15, 17];
        const dotsTwo = [12];
        return (
            <div className={guitarNeck}>
                {
                    frets.map((fret, index) => {

                        const classFretName = `fret f${index}`;
                        var notesForEach = [];
                        
                        Object.keys(fret).forEach(function (key) {

                            const {note} = fret[key];
                            const classNotesName = `note n${key} ${note.toLowerCase()}`;

                            notesForEach.push(
                                <div key={key} className={classNotesName}>
                                    {note}
                                </div>
                            );
                        })

                        return (
                            <div 
                                className={classFretName} 
                                key={index} 
                            >
                                {notesForEach}
                            </div>
                        )
                    })
                }


                {
                    frets.map((_, index) => {

                        const dot = dotsOne.includes(index) ? 'dot' : dotsTwo.includes(index) ? 'two-dots' : '';

                        return (
                            <div className={`fret-line f${index} ${dot}`} key={index}/>
                        )
                    })
                }


                {
                    strings.map((_, index) => {
                        const bass = index > 2 ? 'bass' : '';
                        const classBassAdd = `string s${index + 1} ${bass}`;

                        return <div className={classBassAdd} key={index} />
                    })
                }
            </div>
        )
    }


    render() {
        console.log('guitarConfig', guitarConfig)
        return (
            <div>
                {this.renderGuitar()}
            </div>
        )
    }
}

export default Fingerboard;