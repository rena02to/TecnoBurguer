'use client'
import style from './styles/navbar.module.scss';
import { RiFilePaper2Line } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function NavBar(){
    const [ router, setRouter ] = useState('/');

    useEffect(() => {
        setRouter(window.location.pathname);
    }, [router])

    return(
        <nav className={style.navbar}>
            <a href="##" className={style.actived}>
                <p>Início</p>
            </a>
            <a href="##">
                <RiFilePaper2Line/>
                <p>Pedidos</p>
            </a>
            <a href="##">
                <FaRegUser/>
                <p>Perfil</p>
            </a>
        </nav>
    )
}