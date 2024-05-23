// import React from "react";
// import AccountContext from "../Context/AccountContext";
// import UserPool from "./UserPool";

// const AccountState = (props) => {


//     const signup = async (email, name, password) => {
//         return await new Promise((resolve, reject) => {
//             var attributeList = []
//              var userName = {
//                 Name : "name",
//                 Value : name,
//              }
//              attributeList.push(userName);

//              UserPool.signup(email, password, attributeList, null, (err, data) => {
//                 if(err) {
//                     console.log("Failed to register", err.message)
//                     reject()
//                 } else {
//                     console.log("Account created successfully", data)
//                     resolve()
//                 }
//              })

//         })
//     }
    


//     return (
//         <AccountContext.Provider value={{signup}}>
//             {props.childern}
//         </AccountContext.Provider>
//     )
// }
// export default AccountState