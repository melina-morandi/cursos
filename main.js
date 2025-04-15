const express = require("express");
const _ = require('lodash');
const cursos = require('./data/cursos.json');
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/cursos', (req, res) =>{
    res.status(200).json(cursos);
});

app.get('/cursos/:cursoId',(req, res) =>{
    const idCurso = req.params.cursoId;
    const curso = cursos.find((c) => c.id==idCurso);
    if (curso) res.status(200).json(curso);
    else 
        res.status(404).json({
            message: `El curso ${idCurso} no se encuentra`,
        });
});

app.post('/cursos', (req, res) =>{
    const datosCurso = req.body;
    const ids = cursos.map( c=> c.id);
    const idMax = _.max(ids) + 1;
    const curso = {id: idMax, ...datosCurso, habilitado: true };
    cursos.push(curso);
    res.status(201).json(curso);
});

app.delete("/cursos/:cursoId", (req, res) =>{
    const idCurso = req.params.cursoId;
    const cursoIdx = cursos.findIndex((c) => c.id==idCurso);
    if (cursoIdx >= 0){
        cursos.splice(cursoIdx, 1);
        res.status(200).json({
            message: `El curso ${idCurso} se borro correctamente`, 
        })
    }
    else 
        res.status(404).json({
            message: `El curso ${idCurso} no se encuentra`,
        });
});

app.listen(PORT, ()=>{
    console.log(`La aplicacion inicio en el puerto ${PORT}`);
});