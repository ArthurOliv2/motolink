import { cadastro } from "../../../services/user";

export default function handler(req, res) {
    try {
        const body = JSON.parse(req.body)
        const token = cadastro(body)
        res.status(201).json(token)
    } catch (err) {
        res.status(400).json(err.message)
    }
}


