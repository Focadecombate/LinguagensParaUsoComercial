const express = require('express')
const controllers = require('../controllers/controllers')

const router = express.Router()

// Rota inincial para apresentação da API
router.get("/", (req, res) => {
    res.send('API Home')
})

// Rota para pesquisa de preço mais baixo. 
// Recebe como parâmetro :drug que corresponde 
// ao nome do remédio que será pesquisado
router.get("/search/:drug", (req, res) => {
    const drug = req.params.drug
    controllers.searchDrugInPharmacies(res, drug)
})

module.exports = router