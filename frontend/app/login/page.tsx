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

export default function Login(){

    //variables
    const t = useTranslations('Login')
    const initialValues = {}
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
                        <h1>Login</h1>
                        <div className={style.inputbox}>
                            <label htmlFor="email">E-mail</label>
                            <div className={style.input}>
                                <IoMailOutline className={style.icon}/>
                                <Field type="email" id="email" name="email" placeholder={t('email')} />
                            </div>
                        </div>
                        <div className={style.inputbox}>
                            <label htmlFor="password">{t('password.label')}</label>
                            <div className={style.inputPassword}>
                                <LuKeyRound className={style.icon}/>
                                <Field type={visible ? "text" : "password"} id="password" name="password" placeholder={t('password.placeholder')} />
                                <button type="button" onClick={() => {setVisible(!visible)}}>
                                    {visible ? <FaRegEye/> : <FaRegEyeSlash/>}
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={!submitting}>
                            <p>{t('Submit')}</p>
                            {loading ? <RiLoader2Line/> : null}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}