import Link from 'next/link'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/login.module.css'

import LoginCard from "../src/components/loginCard/loginCard"
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'

export default function LoginPage(){
    const [formData, setFormData] = useState({
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

            const response = await fetch(`/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify(formData)
            })

            const json = await response.json()
            console.log('Resposta da API de login:', json)
            if (response.status !== 200) throw new Error(json.message || 'Erro ao fazer login')

            setCookie('authorization', json.token)
            console.log('cookie setado com sucesso')

            router.push('/')
            console.log('redirecionando para /')
            
        } catch (err) {
            console.error('erro ao logar:', err.message)
            setError(err.message)          
        }
    }

    return (
        <div className={styles.background}> 
            
            <LoginCard title="Entre sua conta">
                <Image src="/motorbike.png" width={80} height={80} style={{ filter: 'invert(1)' }}/>
                <form className={styles.form} onSubmit={handleForm}>
                    <Input type="email" placeholder="Seu e-mail" value={formData.email} required onChange={(e) => {handleFormEdit(e, 'email')}}/>
                    <Input type="password" placeholder="Sua Senha" value={formData.password} required onChange={(e) => {handleFormEdit(e, 'password')}}/>
                    <Button>Entrar</Button>
                    <Link href="/cadastro">Ainda não possui conta ?</Link>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </LoginCard>
        </div>
    )
}