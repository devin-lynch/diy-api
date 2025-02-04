let express = require('express')
const db = require('../models')
let router = express.Router()


//  GET show all mixed martial artists
router.get('/', async (req, res) => {
    try {
        const martialArtists = await db.mixedmartialartist.findAll({})
        // res.json(mixedMartialArtists)
        res.render('index', { martialArtists: martialArtists })
    } catch(err){
        console.warn(err)
        res.send(`server error!`)
    }
})

// GET form to create a new mixed martial artist
router.get('/new', (req, res) => {
    res.render('new')
})

// GET a specific mixed martial artist 
router.get('/:name', async (req, res) => {
    try {
        const martialArtist = await db.mixedmartialartist.findOne({
            where: { name: req.params.name }
        })
        res.render('show', { martialArtist: martialArtist })
    } catch(err) {
        console.warn(err)
        res.send(`server error!`)
    }
})


// POST new mixed martial artist 
router.post('/', async (req, res) => {
    console.log(req.body)
    const martialArtists = await db.mixedmartialartist.create({
        name: req.body.name,
        wins: req.body.wins,
        losses: req.body.losses,
         weight_class: req.body.weight_class
    })
    res.redirect('/mixedmartialartists')
    // res.send(`test`)
})


router.get('/:name/edit', async (req, res) => {
    try {
        const martialArtist = await db.mixedmartialartist.findOne({
            where: { name: req.params.name }
        })
        console.log("HIIIIIIII", martialArtist)
        res.render('edit', { martialArtist: martialArtist })
    } catch(err) {
        console.warn(err)
        res.send(`server error!`)
    }
})


//PUT update a mixed martial artist
router.put('/:name/edit', async (req, res) => {
    try {
        await db.mixedmartialartist.update({
            name: req.body.name,
            wins: req.body.wins,
            losses: req.body.losses,
            weight_class: req.body.weight_class
        },{
            where: { name: req.params.name }
        })
        res.redirect(`/mixedmartialartists/${req.params.name}`)
    } catch(err) {
        console.warn(err)
        res.send(`server error!`)
    }
})


// DELETE a mixed martial artist
router.delete('/:name', async (req, res) => {
    try {
        console.log(req.body)
        await db.mixedmartialartist.destroy({
            where: { name: req.params.name }
        })
        res.redirect('/mixedmartialartists')
    } catch(err) {
        console.warn(err)
        res.send(`server error!`)
    }
})






module.exports = router