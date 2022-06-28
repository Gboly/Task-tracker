

const initialState = {
    user: {username: "", email: "", password: "", cPassword: "" }, 
    passMatch: true, 
    passVisibility: {pv: false, cpv: false},
    userExistsError: false,
    logging: false
}

const reducer = (state, {type, name, value})=>{
    switch(type){
        case "handleChange": return {...state, passMatch: true, user: {...state.user, [name]: value}, userExistsError: false}
        case "userExistsError": return {...state, userExistsError: true, user: {...state.user, email: ""}}
        case "passMatch": return {...state, passMatch: false}
        case "passVisibility": return {
            ...state, 
            passVisibility: name==="pv" 
            ? {pv:!state.passVisibility.pv, cpv:state.passVisibility.cpv} 
            : {pv:state.passVisibility.pv, cpv:!state.passVisibility.cpv}
        }
        case "logging in": return {...state, logging: true}
        case "done logging": return {...state, logging: false}
        default: return state
    }
}

export {reducer, initialState}