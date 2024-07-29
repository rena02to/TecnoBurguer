'use client'
import Image from 'next/image';
import style from './styles/navbar.module.scss';
import { IoRestaurantOutline } from 'react-icons/io5';
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
            <Image src='/images/TecnoBurguer.svg' width={115} height={45} alt='TecNoburguer Simbol'/>
            <a href="##" className={style.actived}>
                <IoRestaurantOutline/>
                <p>Cardápio</p>
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