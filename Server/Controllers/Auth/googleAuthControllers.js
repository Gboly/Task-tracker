
const callback = (req, res)=>{    
    res.redirect(`http://localhost:3000/main/${req.user.displayName}`)
}

export default callback