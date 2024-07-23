'use client'
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import style from '../styles/pages/forms.module.scss';
import { useTranslations } from "next-intl";
import { setUserLocale } from "@/services/locale";
import { Locale } from "@/config";
import { IoMailOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import { LuKeyRound } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

export default function Login(){

    //variables
    const t = useTranslations('Login')
    const initialValues = {
        email: '',
        password: ''
    }
    const [ submitting, setSubmitting ] = useState(false);
    const [ visible, setVisible ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    //useeffect
    useEffect(() => {
        document.title = 'Login | TecnoBurguer';
        setUserLocale(navigator.language.slice(0, 2) as Locale)
    }, [])

    //functions
    const handleSubmit = () => {}

    //return
    return(
        <div className={style.background}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({  }) => (
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
                        <button className={style.submit} type="submit" disabled={!submitting}>
                            <p>Login</p>
                            {loading ? <RiLoader2Line/> : null}
                        </button>
                        <div className={style.links}>
                            <Link href="##">{t('recover')}</Link>
                            <Link href="##">{t('register')}</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}