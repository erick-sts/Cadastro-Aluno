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

//Busca aluno pelo ra
app.get('/aluno/:ra', (req, res) => {
    const ra = req.params.ra;
    console.log("RA recebido:", ra);
    console.log(alunos)
    const index = buscaRa(ra);
    console.log("Index encontrado:", index);

    if (index !== -1) {
        res.json(alunos[index]); // Envie o aluno encontrado como resposta
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

function buscaRa(ra){
    const index = alunos.findIndex(aluno => aluno.ra === parseInt(ra));
    return index;
}

//cadastra aluno
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

