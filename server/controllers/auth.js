const users = []
const bcrypt = require('bcrypt')


module.exports = {
  login: (req, res) => {
    console.log('Logging In User')
    console.log(req.body)
    const {username, password} = req.body
    let userData
    //look for user with the username passed in
    for(let i = 0; i < users.length; i++){
      if(users[i].username === username) {
        userData = users[i]
      }
    }
  
    if (userData === undefined) {
      res.status(200).send({success: false, message: 'bad username or password'})
    } else {
      bcrypt.compare(password, userData.password, (error, success) => {
        if  (!error) {
          if (success) {
            
            res.status(200).send({success: true,})
          } else {
            res.status(200).send({success: false, message: "bad password"})
          }
        } else {
          console.log('bcrypt had an error comparing passwords: ')
          console.log(error)
          res.status(500).send({success: false, message: "backend error"})
        }
      })
    }
  },
  register: (req, res) => {
    const {username, password, email, firstName, lastName} = req.body
    const saltRounds = 10

    bcrypt.hash(password, saltRounds, (error, hashPass) => {
          let newDatabaseEntry = {}
          newDatabaseEntry.firstName = firstName
          newDatabaseEntry.lastName = lastName
          newDatabaseEntry.email = email
          newDatabaseEntry.username = username
          newDatabaseEntry.password = hashPass
          console.log(newDatabaseEntry)
          users.push(newDatabaseEntry)
          res.status(200).send(req.body)
    }) 
    }
  }


    // module.exports = {
//     login: (req, res) => {
//       console.log('Logging In User')
//       console.log(req.body)
//       const { username, password } = req.body
//       let userData
//       for (let i = 0; i < users.length; i++) {
//         if (users[i].username === username){
//           userData = users[i]
//         } 
//       }

//       if(userData === undefined){
//         res.status(200).send({succes: false, message: 'Invalid username or password'})
//       } else {
//         bcrypt.compare(password, userData.password, (error, success) => {
//          if(!error){
//           if(success){
//             res.status(200).send({success: true})
//           } else {
//             res.status(200).send({success: false, message: 'invalid password'})
//          } 
//         } else {
//           console.log('bcrypt had an error while comparing passwords: ')
//           console.log(error)
//           res.status(500).send({success: false, message: 'backend error'})
//         }
//         })
//       }
//       res.status(400).send("User not found.")
//     },

    
//     register: (req, res) => {
//       const {username, password} = req.body
//       const saltRounds = 10
  
//       bcrypt.hash(password, saltRounds, (error, hashPass) =>  {
//         let newDatabaseEntry= {}
//         newDatabaseEntry.username = username
//         newDatabaseEntry.password = hashPass
//         console.log(newDatabaseEntry)
//         users.push(newDatabaseEntry)
//         res.status(200).send(req.body)
//       })
//     }
// }
