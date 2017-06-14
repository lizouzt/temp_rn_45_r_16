import React from 'react';
import NotFound from '../components/NotFound';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

module.exports = {
    extend: function (object) {
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0, source; source = args[i]; i++) {
            if (!source) continue;
            for (var property in source) {
                object[property] = source[property];
            }
        }

        return object;
    },

    extendDeep: function(a, b){
        if ("_" in window) {
            for (var k in b) {
                if ( _.isObj(b[k]) )
                    a[k] ? arguments.callee(a[k], b[k]) : a[k] = b[k];
                else
                    (a[k] = b[k]);
            }
            return a
        }
    },

    ruOK: function  (obj) {
        if (obj.status.state == 0 || obj.status.state == "0")
            return true;
        else
            return false;
    },

    rendErr: function  (obj, text) {
        !!obj && console.warn(obj);
        (
            <View style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                backgroundColor: '#f5f5f5',
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 5
            }}>
                <NotFound
                    text={text}
                />
            </View>,
            document.getElementById('J_content')
        )
    }
}
