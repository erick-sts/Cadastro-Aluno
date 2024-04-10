const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let alunos = []
let cursos = []

//lista todos os alunos
app.get('/', (req, res) => {
    res.json(alunos)
});

//Busca aluno pelo rac
app.get('/alunos', (req, res) => {
    const ra = req.params.ra;
    const aluno = alunos.findIndex(aluno => aluno.ra === ra);

    if (aluno) {
        res.send(aluno);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});


app.post('/', (req, res) => {
    const novoAluno = {
        ra: req.body.aluno.ra,
        name: req.body.aluno.name,
        turma: req.body.aluno.turma,
        cursos: req.body.aluno.cursos
    };
    alunos.push(novoAluno);
    res.send(`Aluno ${novoAluno.name} cadastrado com sucesso!`);
})

app.post('/curso', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})