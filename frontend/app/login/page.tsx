'use client'
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import style from '../styles/forms.module.scss';
import { useTranslations } from "next-intl";
import { getUserLocale, setUserLocale } from "@/services/locale";
import { Locale } from "@/config";
import { IoMailOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import { LuKeyRound } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import * as Yup from 'yup';
import { TiArrowBackOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

interface FormValues {
    email: string,
    password: string,
}

export default function Login(){

    //variables
    const t = useTranslations('Login');
    const initialValues : FormValues = {
        email: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().matches(/.*@.*\..*/).required(),
        password: Yup.string().required()
    });
    const [ visible, setVisible ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    //useeffect
    useEffect(() => {
        document.title = 'Login | TecnoBurguer';
        setUserLocale(navigator.language.slice(0, 2) as Locale);

        const token = Cookies.get('token');
        if(token){
            window.location.href =  document.referrer || '/';
        }
    }, [])

    //functions
    const handleSubmit = async ( values: FormValues ) => {
        setLoading(true);
        try{
            const response = await fetch('https://tecnoburguer.onrender.com/api/user/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            })

            if(response.ok){
                const data = await response.json();
                Cookies.set('token', data.access, {expires: 1, secure: true});
                try{
                    const response2 = await fetch('https://tecnoburguer.onrender.com/api/user/get_user_from_token', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${data.access}`
                        }
                    })
                    const data2 = await response2.json();
                    setUserLocale(data2.language || 'pt');
                }catch(error){
                    console.log(error);
                }
                if(document.referrer && document.referrer !== '/login'){
                    window.location.href = document.referrer;
                }else{
                    window.location.href = '/';
                }
            }else{
                toast.error(t('credentialsError'))
            }
        }catch{
            toast.error(t('error'))
        }finally{
            setLoading(false);
        }
    }

    //return
    return(
        <div className={style.background}>
            <Link className={style.menu} href="/">
                <TiArrowBackOutline/>
                <p>{t('menu')}</p>
            </Link>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isValid, dirty }) => (
                    <Form>
                        <Image src='/Images/Icon.svg' alt='Logo' width={200} height={120}/>
                        <h1>{t('title')}</h1>
                        <div className={style.inputbox}>
                            <Field type="text" id="email" name="email" required/>
                            <label htmlFor="email">E-mail</label>
                            <span></span>
                            <IoMailOutline className={style.icon}/>
                        </div>
                        <div className={style.inputboxPassword}>
                            <Field type={visible ? "text" : "password"} id="password" name="password" required/>
                            <label htmlFor="password">{t('password')}</label>
                            <span></span>
                            <LuKeyRound className={style.icon}/>
                            <button type="button" onClick={() => {setVisible(!visible)}}>
                                {visible ? <FaRegEye/> : <FaRegEyeSlash/>}
                            </button>
                        </div>
                        <button className={style.submit} type="submit" disabled={!isValid || !dirty || loading}>
                            {loading?
                                <>
                                    <RiLoader2Line/>
                                    <p>{t('logging')}</p>
                                </>
                                :
                                <>
                                    <p>Login</p>
                                </>
                            }
                        </button>
                        <div className={style.links}>
                            <Link href="/recover">{t('recover')}</Link>
                            <Link href="/register/user">{t('register')}</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}