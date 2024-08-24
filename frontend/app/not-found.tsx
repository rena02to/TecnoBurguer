import Footer from '@/components/Footer';
import style from './styles/not-found.module.scss';
import Image from 'next/image';

export const metadata = {
    title: '404 Error | TecnoBurguer'
};

export default function Custom404() {
    return(
        <div className={style.notFound}>
            <main>
                <h1><span>OOPS...</span> Parece que esta página não existe!</h1>
                <p>Confira se você não digitou algo errado</p>
                <p>Talvez o endereço não exista mais na web</p>
                <Image src='/Images/404.png' width={468} height={275} alt='404 Image'/>
            </main>
            <Footer/>
        </div>
    )
}