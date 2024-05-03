const express = require('express')
const app = express()
const port = process.env.PORT || 3003
const { check, validationResult } = require('express-validator');

app.use(express.json())

var coches = [
    {id:0, company: 'BMW', model: 'X3', year: '2021'},
    {id:1, company: 'Audi', model: 'A1', year: '2022'},
    {id:2, company: 'Marcedes', model: 'Clase A', year: '2023'}
]

app.get('/', function (req, res) {
    res.send('Richard')
})

app.get('/api/cars/list',(req, res)=>{
    res.send(['BMW X1', 'AUDI A3', 'Mercedes Clase A'])
})

app.get('/api/cars/id/:id',(req, res)=>{
    res.send(req.params.id)
})

app.get('/api/cars/:company/:model',(req, res)=>{
    res.send(req.params.company)
})

app.get('/api/cars/',(req, res)=>{
    res.send(coches)
})

app.get('/api/cars/:company',(req, res)=>{
    const coche = coches.find(coche => coche.company === req.params.company)

    if(!coche){
        res.status(400).send('No tenemos ningun coche de esa marca')
    }else{
        res.send(coche)
    }
    
})

app.post('/api/cars', (req, res)=>{
    var carId = coches.length;
    var coche ={
        id: carId,
        company: req.body.company,
        model: req.body.model,
        year: req.body.year
    }
    coches.push(coche)
    res.status(201).send(coche)
})

app.post('/api/cars2', (req, res)=>{

    if(!req.body.company || req.body.company.length < 7){
        res.status(400).send('Introduce la empresa de manera correcta')
        return
    }
        var carId = coches.length;
        var coche ={
            id: carId,
            company: req.body.company,
            model: req.body.model,
            year: req.body.year
        }
    
        coches.push(coche)
        res.status(201).send(coche)
})

app.post('/api/cars3', [ 
    check('company').isLength({min: 3}),
    check('model').isLength({min: 3})  
    ],(req, res)=>{    
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({ erros: errors.array() })
        }

        var carId = coches.length;
        var coche ={
            id: carId,
            company: req.body.company,
            model: req.body.model,
            year: req.body.year
        }
    
        coches.push(coche)
        res.status(201).send(coche)
})


app.put('/api/cars/:id', [ 
    check('company').isLength({min: 3}),
    check('model').isLength({min: 3})  
    ],(req, res)=>{    
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({ erros: errors.array() })
        }

        const coche = coches.find(coche=> coche.id === parseInt(req.params.id))

        if(!coche){
            return res.status(404).send('El coche no ewsta en Base de Datos')
        }
        
        coche.company = req.body.company
        coche.model = req.body.model
        coche.year = req.body.year

        res.status(204).send()
})

app.delete('/api/cars/:id', (req, res)=>{
    const coche = coches.find(coche=> coche.id === parseInt(req.params.id))

    if(!coche){
        return res.status(404).send('El coche no esta en Base de Datos, por lo cual, no se puede borrar')
    }
        
    const index = coches.indexOf(coche)
    coches.splice(index,1)
    res.status(200).send('El coche se ha borrado con exito!')
})

app.listen(port, ()=> console.log('Escuchando puerto: ' + port))