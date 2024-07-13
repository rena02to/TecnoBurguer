'use client'
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import '@/i18n/i18n';

export default function Custom404() {
    
    //variables
    const { t } = useTranslation();


    //useeffect
    useEffect(() => {
        document.title = `${t('404.title')} | TecnoBurguer`;
    }, [ t ])


    //return
    return(
        <></>
    )
}