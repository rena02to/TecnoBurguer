'use client'
import Cookies from 'js-cookie';
import { useEffect, useState } from "react"
import HomeClient from './HomeClient';

export default function HomeSelector(){
    const [ page, setPage ] = useState(<HomeClient/>);

    useEffect(() => {
        const token = Cookies.get('token');
        if(token){
            //
        }
    }, [ page ])

    return(
        <>
            {page}
        </>
    )
}