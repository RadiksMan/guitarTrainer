import React, { PureComponent } from 'react';
import Joyride from "react-joyride";
import { connect } from 'react-redux';
import {
    trainStart,
    trainEnd
} from "../../store/actions/guitar";

class Instruction extends PureComponent {

    state = {
        stepIndex: 0,
        steps: [
            {
                content: "Let's start the tour!",
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
                content: "I'ts main button which start/end train",
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
                content: "Choose a correct note",
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
                content: "Choose a correct note",
                placement: "auto",
                disableBeacon: true,
                styles: {
                    options: {
                        zIndex: 10000
                    }
                },
                target: ".guitar-neck .note.question",
                title: "Arrow"
            },
            // {
            //     content: (
            //         <div>
            //             <h3>Or event a SVG icon</h3>
            //             <svg
            //                 width="96px"
            //                 height="96px"
            //                 viewBox="0 0 96 96"
            //                 version="1.1"
            //                 xmlns="http://www.w3.org/2000/svg"
            //                 preserveAspectRatio="xMidYMid"
            //             >
            //                 <g>
            //                     <path
            //                         d="M83.2922435,72.3864207 C69.5357835,69.2103145 56.7313553,66.4262214 62.9315626,54.7138297 C81.812194,19.0646376 67.93573,0 48.0030634,0 C27.6743835,0 14.1459311,19.796662 33.0745641,54.7138297 C39.4627778,66.4942237 26.1743334,69.2783168 12.7138832,72.3864207 C0.421472164,75.2265157 -0.0385432192,81.3307198 0.0014581185,92.0030767 L0.0174586536,96.0032105 L95.9806678,96.0032105 L95.9966684,92.1270809 C96.04467,81.3747213 95.628656,75.2385161 83.2922435,72.3864207 Z"
            //                         fill="#000000"
            //                     />
            //                 </g>
            //             </svg>
            //         </div>
            //     ),
            //     placement: "left",
            //     target: ".demo__about h1"
            // }
        ]
    };


    handleJoyrideCallback = data => {
        console.log('data', data)
        const { joyride } = this.props;
        const { type } = data;
        //fires when user click on button
        if(data.action === 'start'){
            this.props.trainStart();
            document.querySelectorAll('.btn,.notes-list,.toggle,.select').forEach(item =>
                item.classList.add('disabled-click')
            );
        }

        if (data.action === 'close' || data.status === 'finished' || data.action === 'skip') {
            this.props.trainEnd();
            document.querySelectorAll('.btn,.notes-list,.toggle,.select').forEach(item =>
                item.classList.remove('disabled-click')
            );
        }
    };

    render(){

        let { steps } = this.state;

        return(
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
                scrollToFirstStep
                showProgress
                showSkipButton
                run={this.props.run}
                steps={steps}
                callback={this.handleJoyrideCallback}
            />
        )
    }
}

export default connect(null, {
    trainStart,
    trainEnd,
})(Instruction);