import React from 'react';
import './style/StandartButton.scss';

export default StandartButton = props => {

    const { onClick,text,} = props;

    return(
        <div className="btn btn-wide" onClick={this.props.toggleShowAllNotes}>
            <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <span>
                <span>Show all notes</span>
            </span>
            <i className="keyboardKey">backspace</i>
        </div>
    )
}