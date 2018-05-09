import React from 'react';
import {connect} from 'react-redux';
import './style/FingerboardHeader.css';

const FingerboardHeader = props => {
    const {
        user: {
            userStatistic: {
                answers
            }
        },
        guitarType
    } = props;
    console.log('answers', answers)
    console.log('guitarType', guitarType)
    return(
        <div className="FingerboardHeader">
            <div className="user-score">
                <h3>Score</h3>
                <div className="user-score-item correct">
                    Correctly - <span>{answers[guitarType].correct}</span>
                </div>
                <div className="user-score-item wrong">
                    Wrong - <span>{answers[guitarType].wrong}</span>
                </div>
                <div className="user-score-item all">
                    Total - {answers[guitarType].all}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        guitarType: state.guitar.guitarType,
    }
}

export default connect(mapStateToProps)(FingerboardHeader);