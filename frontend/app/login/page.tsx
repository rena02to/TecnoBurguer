'use client'
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import style from '../styles/pages/forms.module.scss';
import { useTranslations } from "next-intl";
import { setUserLocale } from "@/services/locale";
import { Locale } from "@/config";
import { IoMailOutline } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";

export default function Login(){

    //variables
    const t = useTranslations('Login')
    const initialValues = {}
    const [ submitting, setSubmitting ] = useState(false);

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
                        <div className="inputbox">
                            <label htmlFor="email">E-mail</label>
                            <Field type="email" id="email" name="email" placeholder={t('email')} />
                            <IoMailOutline/>
                        </div>
                        <div className="inputbox">
                            <label htmlFor="password">{t('password.label')}</label>
                            <MdLockOutline/>
                            <Field type="password" id="password" name="password" placeholder={t('password.placeholder')} />
                            <FaRegEye/>
                            <FaRegEyeSlash/>
                        </div>
                        <button type="submit" disabled={!submitting}>{t('Submit')}</button>
                        <RiLoader2Line/>
                    </Form>
                )}
            </Formik>
        </div>
    );
}