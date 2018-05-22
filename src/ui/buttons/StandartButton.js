import React from 'react';
import './style/StandartButton.css'

const StandartButton = props => {

    const { onClick,text,keycupsName,wide} = props;

    return(
        <div
            className={`btn ${wide ? 'btn-wide' : ''} `}
            onClick={onClick}
        >
            <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <span>
                <span>{text}</span>
            </span>
            {
                keycupsName && <i className="keyboardKey">{keycupsName}</i>
            }
        </div>
    )
}
export default StandartButton;