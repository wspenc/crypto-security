const users = []
const bcrypt = require('bcrypt')


// module.exports = {
//   login: (req, res) => {
//     console.log('Logging In User')
//     console.log(req.body)
//     const {username, password} = req.body
//     let userData
//     //look for user with username
//     for(let i = 0; i < users.length; i++){
//       if(users[i].username === username) {
//         userData = users[i]
//       }
//     }
  
//     if (userData === undefined) {
//       res.status(200).send({success: false, message: 'bad username or password'})
//     } else {
//       //compares ciphered password to user password
//       bcrypt.compare(password, userData.password, (error, success) => {
//         if  (!error) {
//           if (success) {
//             res.status(200).send({userData})
//           } else {
//             res.status(200).send({success: false, message: "bad password"})
//           }
//         } else {
//           console.log('bcrypt had an error comparing passwords: ')
//           console.log(error)
//           res.status(500).send({success: false, message: "backend error"})
//         }
//       })
//     }
//   },
//   register: (req, res) => {
//     const {username, password, email, firstName, lastName} = req.body
//     const saltRounds = 10

//     bcrypt.hash(password, saltRounds, (error, hashPass) => {
//           let newDatabaseEntry = {...req.body}
//           newDatabaseEntry.firstName = firstName
//           newDatabaseEntry.lastName = lastName
//           newDatabaseEntry.email = email
//           newDatabaseEntry.username = username
//           newDatabaseEntry.password = hashPass
//           console.log(newDatabaseEntry)
//           users.push(newDatabaseEntry)
//           res.status(200).send(req.body)
//     }) 
//     }
//   }
module.exports = {
  login: (req, res) => {
    console.log('Logging In User')
    const { username, password } = req.body

    let userFound = false

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        userFound = true
        //we found a user with that username, now let's check the password
        bcrypt.compare(password, users[i].password, (e, match) => {
          if (match) {
            res.status(200).send(users[i])
          } else {
            res.status(400).send('bad password')
          }
        })
      }
    }

    if (!userFound) {
      res.status(400).send('user not found')
    }
  },
  register: (req, res) => {
      console.log('Registering User')

      bcrypt.hash(req.body.password, 10, (e, hash) => {
        let newUser = {...req.body}
        newUser.password = hash
        users.push(newUser)
        res.status(200).send(req.body)
        console.log(users)
      })
  }
}