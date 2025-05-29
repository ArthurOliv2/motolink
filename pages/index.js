import { getCookie } from "cookies-next"
import { useEffect } from "react"
import { verifica } from "../services/user"
import Error from "next/error"
import { redirect } from "next/dist/server/api-utils"

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
        if (!token) throw new Error('Token Inválido')

        verifica(token)
        return {
            props: {}
        }
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: '/login'
            },
            props: {}
        }

    }

}
