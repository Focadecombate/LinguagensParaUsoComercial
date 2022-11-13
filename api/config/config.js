require('dotenv').config()

const PORT = process.env.PORT

if(PORT == null) {
    console.log("you have to define the required env vars")
    process.exit()
}

module.exports = {
    PORT: PORT
}