import React, { PureComponent } from 'react';
import Joyride from "react-joyride";
import { ACTIONS, EVENTS } from 'react-joyride/es/constants';
import { connect } from 'react-redux';
import {
    trainStart,
    trainEnd
} from "../../store/actions/guitar";

import StandartButton from '../../ui/buttons/StandartButton';

class Instruction extends PureComponent {

    state = {
        showInstructionButton:true,
        stepIndex: 0,
        run: false,
        steps: [
            {
                content: "Let's start the guide!",
                placement: "center",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: "body"
            },
            {
                content: "I'ts main button which start/end training",
                placement: "auto",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: ".FingerboardButtons .btn",
                title: "Button Start/End"
            },
            {
                content: "On the guitar fretboard there is an arrow with a question - what note on this place ?",
                placement: "auto",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: ".Fingerboard .note.question",
                title: "Arrow question"
            },
            {
                content: "Select the correct answer by clicking on the buttons with notes",
                placement: "auto",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: ".FingerboardButtons .notes-list",
                title: "Note name buttons"
            },
            {
                placement: "auto",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: ".user-score",
                title: "Showing your stats"
            },
            {
                content: "Show all notes on the guitar fretboard (the training will stop)",
                placement: "auto",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: ".btn-show-all-notes",
                title: 'Button "Show all notes"'
            },
            {
                content: "Change the time for displaying the correct answer (standard - 2 seconds)",
                placement: "auto",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: ".select-answer-timing",
                title: 'Button "Answer time"'
            },
            {
                content: (
                    <div>
                        Change the type of guitar fretboard<br />
                        Currently available:
                        <br />
                        <ul style={{margin:0,textAlign:'left'}}>
                            <li>Six-stringed guitar</li>
                            <li>Four-string bass</li>
                            <li>Guitar-ukulele</li>
                        </ul>
                    </div>
                ),
                placement: "auto",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: ".select-guitar-type-change",
                title: 'Button "Guitar fretboard type"'
            },
            {
                content: 'Turn on/off displaying "hight" notes (sharps)',
                placement: "auto",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: ".checkbox-sharp-toggle",
                title: 'Button "Without sharps"'
            },
        ]
    };

    startInstructionTour = () => {
        this.toggleInstructionTour(true);
        document.addEventListener("keydown", this.hendleKeydown, false);
    }

    endInstructionTour = () => {
        this.setState({ run: false, stepIndex: 0 });
        this.toggleInstructionTour(false);
        document.removeEventListener("keydown", this.hendleKeydown, false);
    }

    hendleKeydown = () => {
        this.setState({ run: false, stepIndex: 0 });
        this.toggleInstructionTour(false);
        document.removeEventListener("keydown", this.hendleKeydown, false);
    }

    toggleInstructionTour = (start) => {

        start ? this.props.trainStart() : this.props.trainEnd();

        document.querySelectorAll('.btn,.notes-list,.toggle,.select').forEach(item =>
            start ? item.classList.add('disabled-click') : item.classList.remove('disabled-click')
        );
    }


    handleJoyrideCallback = tour => {

        const { action, index, type } = tour;

        if (type === EVENTS.TOUR_START) {
            this.startInstructionTour();
        } else if (type === EVENTS.TOUR_END) {
            this.endInstructionTour();
            this.setState({ showInstructionButton:false})
        } else if ([EVENTS.STEP_AFTER, EVENTS.CLOSE, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            if (!this.props.trainingStart){
                //check if tour is continuend end train is not start - start the train
                this.startInstructionTour();
            }
            //control the stepindex in tour
            this.setState({ stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) });
        }
    };

    render() {

        let { steps, run, stepIndex, showInstructionButton } = this.state;

        if (!showInstructionButton){
            return '';
        }

        return (
            <div style={{position:'fixed',right:'2em',bottom:'1em',}}>
                <Joyride
                    continuous
                    floaterProps={{
                        styles: {
                            floater: {
                                transform: "scale(0.1)"
                            },
                            floaterOpening: {
                                transform: "perspective(1px) scale(1)"
                            },
                            floaterWithAnimation: {
                                transform: "perspective(1px) scale(1)"
                            },
                            floaterCentered: {
                                transform: "perspective(1px) scale(1) translate(-50%, -50%)"
                            }
                        }
                    }}
                    styles={{
                        options: {
                            arrowColor: '#fff',
                            backgroundColor: '#fff',
                            primaryColor: '#ffa409',
                            textColor: 'black',
                        }
                    }}
                    scrollToFirstStep
                    showProgress
                    showSkipButton={true}
                    stepIndex={stepIndex}
                    run={run}
                    steps={steps}
                    callback={this.handleJoyrideCallback}
                />

                <StandartButton
                    style={{marginLeft:'0px'}}
                    onClick={() => this.setState({ run: true })}
                    text="See instruction"
                    wide
                />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        trainingStart: state.guitar.trainingStart
    })
    ,{
    trainStart,
    trainEnd,
})(Instruction);