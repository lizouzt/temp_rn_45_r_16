import React from 'react'

export default class Loading extends React.Component{
    render(){

        return (
            <div id="J_loading" className="loading active">
                <span>加载中</span><sup>......</sup>
            </div>
        )
    }
}
