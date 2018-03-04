import React, { PureComponent } from 'react';
import './style/FingerboardButtons';

class FingerboardButtons extends PureComponent {
    render() {
        return (
            <div className="FingerboardButtons">
                <h2>Choose Note:</h2>
                <ul>
                    <li>A</li>
                    <li>A#</li>
                    <li>B</li>
                    <li>C</li>
                    <li>C#</li>
                    <li>D</li>
                    <li>D#</li>
                    <li>E</li>
                    <li>F</li>
                    <li>F#</li>
                    <li>G</li>
                    <li>G#</li>
                </ul>
            </div>
        );
    }
}

export default FingerboardButtons;
