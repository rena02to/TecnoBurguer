'use client'
import Link from 'next/link'
import style from './styles/tophomepage.module.scss'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';

export default function TopHomePage(){
    const [ existToken, setExistToken ] = useState(false);
    const t = useTranslations('HomePage');

    useEffect(() => {
        const token = Cookies.get('token')
        if(token){
            setExistToken(true);
        }
    }, [existToken])

    return(
        <div className={style.top}>
            <div className={style.image}></div>
            {!existToken ?
                <div className={style.links}>
                    <Link href="/login" className={style.signin}>{t('signin')}</Link>
                    <Link href="/register/user" className={style.signingup}>{t('signingup')}</Link>
                </div>
                : null
            }
        </div>
    )
}