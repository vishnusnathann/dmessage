import React from 'react';
import './Loading.css';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
    return (
        <div className="loading">
            <CircularProgress />
        </div>
    )
}

export default Loading
