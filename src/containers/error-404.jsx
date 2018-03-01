import React from 'react';

export default function NoMatch({ location }){
    return (
        <div style={{textAlign:'center'}}>
            <h2>No match for <code>{location.pathname}</code></h2>
        </div>
    )
}