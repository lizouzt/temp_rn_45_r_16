var React = require('react');
var ReactDOM = require('react-dom');
var NotFound = require('../components/NotFound');

module.exports = {
    ruOK: function  (obj) {
        if (obj.status.state == 0 || obj.status.state == "0")
            return true;
        else
            return false;
    },

    rendErr: function  (obj, text) {
        !!obj && console.warn(obj);
        ReactDOM.render(
            <div className="content">
                <NotFound
                    text={text}
                />
            </div>,
            document.getElementById('J_content')
        );
    }
}
