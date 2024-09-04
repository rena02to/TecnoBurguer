'use client';
import { useEffect, useState } from 'react';
import style from './styles/navbar.module.scss';
import Image from 'next/image';
import { IoMenu } from 'react-icons/io5';
import { FaHome } from 'react-icons/fa';
import { useContexts } from '@/context/context';
import { useTranslations } from 'use-intl';

type Link = {
    key: number;
    title: string;
    link: string;
    icon: JSX.Element | null;
};

type Links = {
    client: Link[];
    admin: Link[];
    loggedout: Link[];
};

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [typeUser, setTypeUser] = useState<keyof Links>("loggedout");
    const { type } = useContexts();
    const t = useTranslations('Navbar');

    const links: Links = {
        client: [
            { key: 1, title: 'Home', link: '/', icon: <FaHome /> },
            { key: 2, title: 'Pedidos', link: '/', icon: <FaHome /> },
            { key: 3, title: 'Cupons', link: '/', icon: <FaHome /> },
            { key: 4, title: 'Perfil', link: '/', icon: <FaHome /> },
        ],
        admin: [
            { key: 1, title: 'Home', link: '/', icon: <FaHome /> },
            { key: 2, title: 'Pedidos', link: '/', icon: <FaHome /> },
            { key: 3, title: 'Cupons', link: '/', icon: <FaHome /> },
            { key: 4, title: 'Perfil', link: '/', icon: <FaHome /> },
        ],
        loggedout: [
            { key: 1, title: 'Login', link: '/login', icon: null },
            { key: 2, title: t('signup'), link: '/', icon: null },
        ],
    };

    useEffect(() => {
        if(type === 'admin' || type === 'client' || type === 'loggedout'){
            setTypeUser(type);
        }
    }, [ type ]);

    return (
        <nav className={menuOpen ? style.openNavbar : style.closeNavbar}>
            <div className={style.top}>
                <button className={style.buttonMenu} onClick={() => setMenuOpen(!menuOpen)}>
                    <IoMenu />
                </button>
                <a href='/'><Image src='/Images/icon.svg' height={35} width={75} alt='TecnoBurguer Image' /></a>
            </div>
            <div className={style.menu}>
                {links[typeUser].map((link) => (
                    <a href={link.link} className={style.link} key={link.key}>
                        {link.icon}
                        <p>{link.title}</p>
                    </a>
                ))}
            </div>
        </nav>
    );
}