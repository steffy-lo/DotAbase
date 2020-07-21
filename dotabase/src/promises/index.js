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

const PREFIX = DEBUG ? "http://" + ip_addr.A13 + ":3000":"";

export const newUser = data => {
    return new Promise((resolve, reject) => {
        axios
            .post(
                PREFIX + "/user",
                JSON.stringify(data),
                { headers: { "Content-Type": "application/json" } }
            )
            .then(res => {
                if (!res || !res.data)
                    reject({ stat: 500, msg: "Something went wrong" });
                resolve(res.data);
            })
            .catch(err => {
                reject({
                    stat: err,
                    msg: "There was an error processing your request. Please, try again later."
                });
            });
    });
};

export const getUser = userId => {
    console.log(userId);
    return new Promise((resolve, reject) => {
        axios
            .get(PREFIX + "/user?id=" + userId)
            .then(res => {
                if (!res || !res.data)
                    reject({ stat: 500, msg: "Something went wrong" });
                resolve(res.data);
            })
            .catch(err => {
                reject({
                    stat: err,
                    msg: "There was an error processing your request. Please, try again later."
                });
            });
    });
};