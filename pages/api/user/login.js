import { login } from "../../../services/user";

export default function handler(req, res) {
    try {
        console.log(' requisicao recebida em /api/user/login')

        const body = JSON.parse(req.body)
        console.log('body parseado com sucesso', body)
        
        const token = login(body)
        console.log('token gerado com sucesso', token)
        
        res.status(200).json({token})
    } catch (err) {
        console.error('Erro no login API:', err)
        res.status(400).json({ message: err.message })
    }
}
