import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/login.module.css'

import LoginCard from "../src/components/loginCard/loginCard"
import Input from '../src/components/input/input'
import Button from '../src/components/button/button'

export default function LoginPage(){
    return (
        <div className={styles.background}> 
            
            <LoginCard title="Entre sua conta">
                <Image src="/motorbike-removebg-preview.png" width={80} height={80} style={{ filter: 'invert(1)' }}/>
                <form className={styles.form}>
                    <Input type="email" placeholder="Seu e-mail" />
                    <Input type="password" placeholder="Sua Senha" />
                    <Button>Entrar</Button>
                    <Link href="/cadastro">Ainda não possui conta ?</Link>
                </form>
            </LoginCard>
        </div>
    )
}