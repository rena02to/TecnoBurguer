'use client'
import Link from 'next/link'
import style from './styles/tophomepage.module.scss'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';

export default function ImageTop(){
    const [ existToken, setExistToken ] = useState(false);
    const t = useTranslations('HomePage');

    useEffect(() => {
        const token = Cookies.get('token');
        if(token){
            setExistToken(true);
        }
    }, [])

    return(
        <div className={style.top}>
            <div className={style.image}></div>
        </div>
    )
}