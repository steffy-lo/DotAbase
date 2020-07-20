import axios from "axios";

/* For local debugging set to 1 */
const DEBUG = 1;

/* Debug variables.*/
/* For local debugging, figure out your local ip address by running ipconfig or ifconfig, should be 192.168.XXXX
* then replace it below
* */
const ip_addr = {
    A13: '192.168.0.23',
    X13: '192.168.0.25'
};

const PREFIX = DEBUG ? "http://"+ ip_addr.X13 + ":3000" : "";

export const userLogin = ({ email, provider }) => {
    return {
        type: 'USER_LOGIN',
        email: email,
        provider: provider
    }
};

export const loadUserData = data => {
    return (dispatch) => {
        fetch(PREFIX + '/user?email=' + data.email +'&provider=' + data.provider)
            .then(res => {
                return res.json()
            })
            .then (data => {
                dispatch({type: 'USER_DATA', payload: data})
            })
            .catch(err => {
                console.log(err)
            })
    }
};