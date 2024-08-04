'use client'
import { useEffect, useState } from 'react';
import style from './styles/navbar.module.scss';
import { useContexts } from '@/context/context';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { IoHome, IoHomeOutline } from 'react-icons/io5';
import { RiFilePaper2Fill, RiFilePaper2Line } from 'react-icons/ri';
import { BiSolidUserPin, BiUserPin } from 'react-icons/bi';

interface NavLink {
    key: number,
    value: string,
    link: string,
    icon: React.ReactNode,
    selected: React.ReactNode
}

export default function NavBar() {
    const t = useTranslations('HomePage.Navbar');
    const { type } = useContexts();
    const [ linksNavbar, setLinksNavbar ] = useState<NavLink[]>([]);
    const [ pathName, setPathName ] = useState('/');

    const navItems: { [key: string]: NavLink[] } = {
        loggedout: [
            { key: 1, value: 'Login', link: '/login', icon: 'button', selected: '' },
            { key: 2, value: t('signup'), link: '/register/user', icon: 'button', selected: '' }
        ],
        client: [
            { key: 1, value: 'Início', link: '/', icon: <IoHomeOutline/>, selected: <IoHome/> },
            { key: 2, value: 'Pedidos', link: '/orders', icon: <RiFilePaper2Line />, selected: <RiFilePaper2Fill/> },
            { key: 3, value: 'Perfil', link: '/profile', icon: <BiUserPin/>, selected: <BiSolidUserPin/> }
        ],
        admin: [
            { key: 1, value: 'Início', link: '/', icon: <IoHomeOutline/>, selected: <IoHome/> },
            { key: 2, value: 'Estatisticas', link: '/statistics', icon: <RiFilePaper2Line />, selected: <RiFilePaper2Fill/> },
            { key: 3, value: 'Perfil', link: '/profile', icon: <BiUserPin/>, selected: <BiSolidUserPin/> }
        ],
        attendant: [
            { key: 1, value: 'Início', link: '/', icon: <IoHomeOutline/>, selected: <IoHome/> },
            { key: 2, value: 'Cardápio', link: '/orders', icon: <RiFilePaper2Line />, selected: <RiFilePaper2Fill/> },
            { key: 3, value: 'Perfil', link: '/profile', icon: <BiUserPin/>, selected: <BiSolidUserPin/> }
        ],
        cashier: [
            { key: 1, value: 'Início', link: '/', icon: <IoHomeOutline/>, selected: <IoHome/> },
            { key: 2, value: 'Pedidos', link: '/orders', icon: <RiFilePaper2Line />, selected: <RiFilePaper2Fill/> },
            { key: 3, value: 'Perfil', link: '/profile', icon: <BiUserPin/>, selected: <BiSolidUserPin/> }
        ],
    };

    useEffect(() => {
        setLinksNavbar(navItems[type] || navItems.loggedout);
        setPathName(window.location.pathname);
    }, [type]);

    return (
        <nav className={style.navbar}>
            {linksNavbar.map(link => (
                link.icon === 'button' ? (
                    <Link href={link.link} className={style.button} key={link.key}>
                        {link.value}
                    </Link>
                ) : (
                    <Link href={link.link} className={link.link ===  pathName ? style.linkSelected : style.link} key={link.key}>
                        {link.link === pathName ? link.selected : link.icon}
                        <p>{link.value}</p>
                    </Link>
                )
            ))}
        </nav>
    );
}