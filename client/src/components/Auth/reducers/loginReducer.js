
const reducer = (state, action)=>{
    switch(action.type){
        case "handleChange": return {...state, authPass: true, user:{...state.user, [action.name]: action.value }}
        case "handlePassVisibility": return {...state, passVisibility: !state.passVisibility }
        case "wrongPass": return {...state, user: {...initialState.user}, authPass: false}
        case "logging in": return {...state, logging: true}
        case "done logging": return {...state, logging: false}   
        default: return state
    }
}

const initialState = {user: {email: "", password: ""}, passVisibility: false, authPass: true, logging: false}

export {reducer, initialState};