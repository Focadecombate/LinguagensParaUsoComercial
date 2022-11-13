const util = require('util')
const target = require('../targets/targets')

// Lógica de negócio para pesquisa em cada 
// farmagia em target.pharamacies
function searchDrugInPharmacies(res, drugname) {
    target.pharmacies.forEach(pharmacy => {
        url = util.format(pharmacy.endpoint, drugname)
    })
    res.send("resultado")
}

module.exports = {
    searchDrugInPharmacies: searchDrugInPharmacies,
}