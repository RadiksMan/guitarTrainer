import React from 'react';
import {connect} from 'react-redux';
import './style/FingerboardHeader.css';

const FingerboardHeader = props => {
    const {all,correct,wrong} = props.user.userStatistic.answers;

    return(
        <div className="FingerboardHeader">
            <div className="user-score">
                <h3>Score</h3>
                <div className="user-score-item correct">
                    Correctly - <span>{correct}</span>
                </div>
                <div className="user-score-item wrong">
                    Wrong - <span>{wrong}</span>
                </div>
                <div className="user-score-item all">
                    Total - {all}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(FingerboardHeader);