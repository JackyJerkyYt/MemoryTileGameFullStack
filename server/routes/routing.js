const router = require('express').Router();
let user = require('../models/users.model')



router.route('/user').get((req, res) => {
    user.find()
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      res.status(400).json('Erro' + err)
    })
})

router.route('/createUser').post((req, res) => {
    const username = req.body.username
    const cityOrCountry = req.body.cityOrCountry
    const score = req.body.score
    const temp = new user({
        username,
        score,
        cityOrCountry
    })
    temp.save()
        .then(() => {
          res.json("Yay you just created a new one!")
        })
        .catch((err) => {
          res.status(400).json("Error" + err)
        })
})

router.route('/delete/:id').delete((req, res) => {
  user.findByIdAndDelete(req.params.id)
    .then((exercise)=>{
      res.json(exercise)
    })
    .catch((err) => {
      res.status(400).json(err)
    })
})

module.exports = router