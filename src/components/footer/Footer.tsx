import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"


function Footer() {
    
    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)
    let component: ReactNode

    // O rodapé só é exibido se o usuário estiver logado
    
    if (usuario.token !== "") {
         component = (
            <div className="flex justify-center bg-indigo-900 text-white w-full">
                <div className="container flex flex-col items-center py-4">
                     <p className='text-xl font-bold'>
                         Desafio 2 FrontEnd | Copyright: {data}
                     </p>
                     <p className='text-lg'>Desenvolvido por: [OxenteC0de]</p>
                    <div className='flex gap-2 mt-2'>
                       
                         <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                         <LinkedinLogoIcon size={48} weight='bold' />
                         </a>
                         <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <InstagramLogoIcon size={48} weight='bold' />
                         </a>
                         <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                         <FacebookLogoIcon size={48} weight='bold' />
                         </a>
                        </div>
                     </div>
             </div>
         )
     }

    return (
         <>
         {usuario.token !== "" && component}
        </>
     )
 }

export default Footer