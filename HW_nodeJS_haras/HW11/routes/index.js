const { Route } = require("./routerBuilder");
const homeController = require('../controlles/homeController')
const aboutController = require('../controlles/aboutController')

module.exports=[
    Route('GET', '/', homeController.home),
    Route('GET', '/about', aboutController.about)
]