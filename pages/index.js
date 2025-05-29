import { getCookie } from "cookies-next"

import { verifica } from "../services/user"
import Error from "next/error"

export default function Home() {
  return (
    <div>
        Página do usuario 
    </div>
  )
}

export const getServerSideProps = async ({ req, res }) => {
    try {
        const token = getCookie('authorization', { req, res })
        console.log('token recebido no index:', token)

        if (!token) throw new Error('Token Inválido')

        verifica(token)
        return {
            props: {}
        }
    } catch (err) {
        console.log('redirecionamento por erro no token:', err.message)
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            },
            props: {}
        }

    }

}
