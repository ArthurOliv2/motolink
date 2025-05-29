import jwt from 'jsonwebtoken'

if (!globalThis.users) globalThis.users = []
const users = globalThis.users

const SECRET = process.env.JWT_SECRET || 'segredo123'

function createToken(user) {
    return jwt.sign({ email: user.email, name: user.name }, SECRET)
}

function readToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (err) {
        throw new Error('Token inválido')
    }
}

export function verifica(token) {
    return readToken(token)
}

export function cadastro(body) {
    const user = users.find(({ email }) => email === body.email)
    if (user) throw new Error('Usuário já cadastrado')

    users.push(body)

    console.log('Usuários salvos:', users)
    
    const token = createToken(body)
    return token
}

export function login(body) {
    console.log('Entrando na função login')
    console.log('dados recebidos no login:', body)
    console.log('lista atual de usuarios:', users)

    const user = users.find(({ email }) => email === body.email)
    console.log('resultado do find (user):', user)

    if (!user) {
        console.log('usuario nao encontrado!')
        throw new Error('Usuário não encontrado')
    }

    if (user.password !== body.password) {
        console.log('senha incorreta')
        throw new Error('Senha incorreta')
    }

    const token = createToken(user)
    console.log('token criado com sucesso', token)
    return token
}