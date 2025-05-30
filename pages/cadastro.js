import { useState} from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import styles from "../styles/login.module.css"

import LoginCard from "../src/components/loginCard/loginCard"
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'

export default function CadastroPage(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const router = useRouter()

    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
            
        })
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault()
            const response = await fetch(`/api/user/cadastro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify(formData)
            })

            const json = await response.json()
            if (response.status !== 201) throw new Error(json.message || 'Erro ao cadastrar')

            setCookie('authorization', json)
            router.push('/')
        } catch (err) {
            setError(err.message)          
        }
    }

    return (
        <div className={styles.background}> 
            <LoginCard title="Crie sua conta">
                <Image src="/motorbike.png" 
                width={80} 
                height={80} 
                style={{ filter: 'invert(1)' }}/>
                
                <form onSubmit={handleForm} className={styles.form}>
                    <Input type="text" placeholder="Seu nome" required value={formData.name} onChange={(e) => {handleFormEdit(e, 'name')}}/>
                    <Input type="email" placeholder="Seu e-mail" required value={formData.email} onChange={(e) => {handleFormEdit(e, 'email')}}/>
                    <Input type="password" placeholder="Sua Senha" required value={formData.password} onChange={(e) => {handleFormEdit(e, 'password')}}/>
                    <Button>Cadastrar</Button>
                    {error && <p className={styles.error}>{error}</p>}
                    <Link href="/login">Ainda não possui conta ?</Link>
                </form>
            </LoginCard>
        </div>
    )
}