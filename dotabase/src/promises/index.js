import axios from "axios";

/* For local debugging set to 1 */
const DEBUG = 1;

/* Debug variables.*/
/* For local debugging, figure out your local ip address by running ipconfig or ifconfig, should be 192.168.XXXX
* then replace it below
* */
const PREFIX = DEBUG ? "http://192.168.0.23:3000" : "";

export const newUser = data => {
    console.log(JSON.stringify(data));
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