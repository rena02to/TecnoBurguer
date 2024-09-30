import Image from 'next/image';
import style from './styles/footer.module.scss';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { useTranslations } from 'next-intl';
import { useContexts } from '@/context/context';

export default function Footer(){
    const t = useTranslations('');

    return(
        <footer className={style.footer}>
            <div className={style.tecnoburguer}>
                <Image src='/Images/icon-simplified.svg' width={50} height={50} alt='Simbol TecnoBurguer'/>
                <div className={style.text}>
                    <p>&copy; Copyright 2024 - TecnoBurguer</p>
                    <p>{t('Footer')}</p>
                </div>
            </div>
            <div className={style.links}>
                <a href="https://github.com/rena02to"><FaGithub/>Github</a>
                <a href="https://linkedin.com/in/renatosalves"><FaLinkedin/>Linkedin</a>
            </div>
        </footer>
    )
}