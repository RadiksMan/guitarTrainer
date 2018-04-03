import React, { Component } from 'react';
import {connect} from 'react-redux';

import guitarConfig from '../../json/guitar.json';
import './style/Fingerboard.css';

const GUITAR_TYPE = 'standartGuitar';

class Fingerboard extends Component {
    
    state = {
        guitarType: GUITAR_TYPE,
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.questionNote !== this.props.questionNote){
            this.showQuestionArrow(nextProps.questionNote)
        }
    }

    showQuestionArrow = (questionNote) => {
 console.log("questionNote ", questionNote);

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
                        
                        Object.keys(fret).forEach((key) => {

                            const {note} = fret[key];
                            const classNotesName = `note n${key} ${note.toLowerCase()}`;

                            notesForEach.push(
                                <div key={key} className={classNotesName}>
                                    <span>{note}</span>
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
        const {trainingStart,questionNote} = this.props;
        return (
            <div style={{position:'relative'}} className="guitar">
                <div className="arrow active">
                    <div className="arrowBody"></div>
                </div>
                {this.renderGuitar()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        trainingStart:state.guitar.trainingStart,
        questionNote:state.guitar.questionNote,
    }
}

export default connect(
    mapStateToProps,
    null
)(Fingerboard);