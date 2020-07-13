export const loadUserData = () => {
    return (dispatch) => {
        fetch('http://192.168.0.26:3000/contact')
            .then( res => {
                return res.json()
            })
            .then (data => {
                dispatch({type: 'INITIAL_FETCH', payload: data})
            })
            .catch( err => {
                console.log(err)
            })
    }
};