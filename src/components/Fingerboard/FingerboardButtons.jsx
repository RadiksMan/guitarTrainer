import React, { PureComponent } from 'react';
import './style/FingerboardButtons.css';

class FingerboardButtons extends PureComponent {
    render() {
        return (
            <div className="FingerboardButtons">
                <div className="start-button">
                    START
                </div>
                <ul className="notes-list">
                    <li data-note="a">A</li>
                    <li data-note="a#">A#</li>
                    <li data-note="b">B</li>
                    <li data-note="c">C</li>
                    <li data-note="c#">C#</li>
                    <li data-note="d">D</li>
                    <li data-note="d#">D#</li>
                    <li data-note="e">E</li>
                    <li data-note="f">F</li>
                    <li data-note="f#">F#</li>
                    <li data-note="g">G</li>
                    <li data-note="g#">G#</li>
                </ul>
            </div>
        );
    }
}

export default FingerboardButtons;
