const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

let alunos = []
let cursos = []


// • Post – Adicionar um aluno na lista 
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


// • Post – Adicionar um curso para o aluno 

app.post('/curso/:ra', (req, res) => {
    const ra = req.params.ra;
    const index = buscaRa(ra);
    console.log("Index encontrado:", index);

    if (index !== -1) {
        const novoCurso = req.body.cursos;
        alunos[index].cursos.push(novoCurso);
        res.json(alunos[index]);


    } else {
        res.status(404).send('Aluno não encontrado');
    }
})

// • Put – Alterar os dados de um aluno através do RA 

app.put('/aluno/:ra', (req, res) => {
    const ra = req.params.ra;
    const index = buscaRa(ra);

    if (index !== -1) {
        const alunoAtualizado = req.body.aluno;
        alunos[index] = {
            ...alunos[index],
            ...alunoAtualizado
        };
        res.json(alunos[index]);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});


// • Put – Alterar o curso do aluno 
// Função para buscar e alterar o nome do curso na lista de cursos do aluno
function alterarCurso(aluno, cursoAntigo, novoCurso) {
    const cursoIndex = aluno.cursos.indexOf(cursoAntigo);
    if (cursoIndex !== -1) {
        aluno.cursos[cursoIndex] = novoCurso;
        return true;
    }
    return false;
}

app.put('/curso/:ra/:cursoAntigo', (req, res) => {
    const ra = req.params.ra;
    const cursoAntigo = req.params.cursoAntigo;
    const novoCurso = req.body.cursos;

    const index = buscaRa(ra);

    if (index !== -1) {
        const aluno = alunos[index];

        const cursoAlterado = alterarCurso(aluno, cursoAntigo, novoCurso);

        if (cursoAlterado) {
            res.json(aluno);
        } else {
            res.status(404).send('Curso não encontrado para o aluno');
        }
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

// • Delete – Remover um aluno da lista 

app.delete('/aluno/:ra', (req, res) => {
    const ra = req.params.ra;
    const index = buscaRa(ra);

    if (index !== -1) {
        alunos.splice(index, 1);
        res.send(`Aluno com RA ${ra} removido com sucesso.`);
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

// • Delete – Remover o curso do aluno

app.delete('/curso/:ra/:curso', (req, res) => {
    const ra = req.params.ra;
    const curso = req.params.curso;

    const index = buscaRa(ra);

    if (index !== -1) {
        const aluno = alunos[index];
        
        // Verifica se o aluno possui o curso a ser removido
        const cursoIndex = aluno.cursos.indexOf(curso);
        if (cursoIndex !== -1) {
            // Remove o curso da lista de cursos do aluno
            aluno.cursos.splice(cursoIndex, 1);
            res.send(`Curso "${curso}" removido do aluno com RA ${ra} com sucesso.`);
        } else {
            res.status(404).send(`Curso "${curso}" não encontrado para o aluno com RA ${ra}.`);
        }
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

// • Get – Listar todos os alunos (RA, Nome, Turma) 

app.get('/', (req, res) => {
    res.json(alunos)
});

// • Get – Listar um aluno através do RA informado (Nome, Turma, Cursos) 

app.get('/aluno/:ra', (req, res) => {
    const ra = req.params.ra;
    const index = buscaRa(ra);

    if (index !== -1) {
        res.json(alunos[index]); // Envie o aluno encontrado como resposta
    } else {
        res.status(404).send('Aluno não encontrado');
    }
});

function buscaRa(ra) {
    const index = alunos.findIndex(aluno => aluno.ra === parseInt(ra));
    return index;
}

app.listen(port, () => {
    console.log(`💻 Servidor rodando na porta ${port}`)
})

