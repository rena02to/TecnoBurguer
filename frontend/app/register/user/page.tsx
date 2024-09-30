'use client'
import { Form, Formik, Field } from "formik";
import { useEffect, useState } from "react";
import style from '@/app/styles/forms.module.scss';
import { useTranslations } from "next-intl";
import { setUserLocale } from "@/services/locale";
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
import { SlUser } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";

interface FormValues {
    name: string,
    email: string,
    password: string,
    telephone: string,
    confirmPassword: string,
}

export default function Register(){

    //variables
    const t = useTranslations('Register.User');
    const initialValues : FormValues = {
        name: '',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: ''
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(t('errors.required')),
        email: Yup.string().matches(/.*@.*\..*/, t('errors.email.format')).required(t('errors.required')),
        telephone: Yup.string().max(15, '').min(15, t('errors.telephone')).required(t('errors.required')),
        password: Yup.string().required(t('errors.required')).matches(/[a-z]/, t('errors.password.lower')).matches(/[A-Z]/, t('errors.password.upper')).matches(/\d/, t('errors.password.number')).matches(/[!@#$%^&*(),.?":{}|<>]/, t('errors.password.special')),
        confirmPassword: Yup.string().required(t('errors.required')).oneOf([Yup.ref('password')], t('errors.confirmPassword')),
    });
    const [ visible, setVisible ] = useState(false);
    const [ visibleRepeat, setVisibleRepeat ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ language, setLanguage ] = useState('pt');
    const [ darkMode, setDarkMode ] = useState('No');

    //useeffect
    useEffect(() => {
        const token = Cookies.get('token');
        if(token){
            window.location.href = document.referrer || '/'
        }
        document.title = `${t('title')} | TecnoBurguer`;
        const locale = navigator.language.slice(0, 2) as Locale; 
        setUserLocale(locale);
        setLanguage(locale);

        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            setDarkMode('Yes')
        }else{
            setDarkMode('No')
        }
    }, [])

    const formataNome = ( value : string ) : string => {
        return value.replace(/\b\w/g, char => char.toUpperCase());
    }

    const formataTel = ( value : string ) : string => {
        const number = value.replace(/[^\d]/g, '').slice(0, 11);
        let formatado = '';
        for(let i = 0; i < number.length; i++){
            if(i === 0){
                formatado += '(';
            }else if(i === 2){
                formatado += ') ';
            }else if(i === 7){
                formatado += '-';
            }
            formatado += number[i];
        }
        return formatado;
    }

    //functions
    const handleSubmit = async ( values: FormValues ) => {
        setLoading(true);
        try{
            const response = await fetch('https://tecnoburguer.onrender.com/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    telephone: values.telephone,
                    language: language,
                    darkmode: darkMode,
                    type: 'client',
                    password: values.password
                })
            })

            if(response.ok){
                toast.success(t('success'));
                window.location.href = '/login';
            }else{
                const data = await response.json();
                if(data.error.telephone){
                    toast.error(t('errors.telephoneExist'))
                }else if(data.error.email){
                    toast.error(t('errors.emailExist'))
                }else{
                    toast.error(t('errors.create'))
                }
            }
        }catch{
            toast.error(t('errors.connect'));
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
                {({ isValid, dirty, errors, touched }) => (
                    <Form>
                        <Image src='/Images/Icon.svg' alt='Logo' width={200} height={120}/>
                        <h1>{t('title-form')}</h1>
                        <div className={style.inputbox}>
                            <Field type="text" id="name" name="name" maxLength={50} onInput={(e: React.ChangeEvent<HTMLInputElement>) => {e.target.value = formataNome(e.target.value);}} required/>
                            <label htmlFor="name">{t('name')}</label>
                            <span></span>
                            <SlUser className={style.icon}/>
                        </div>
                        {errors.name && touched.name ? (
                            <p className={style.error}>{errors.name}</p>
                        ) : null}
                        <div className={style.inputbox}>
                            <Field type="text" id="email" name="email" required/>
                            <label htmlFor="email">E-mail</label>
                            <span></span>
                            <IoMailOutline className={style.icon}/>
                        </div>
                        {errors.email && touched.email ? (
                            <p className={style.error}>{errors.email}</p>
                        ) : null}
                        <div className={style.inputbox}>
                            <Field type="text" id="telephone" name="telephone" onInput={(e: React.ChangeEvent<HTMLInputElement>) => {e.target.value = formataTel(e.target.value);}} maxLength={15} required/>
                            <label htmlFor="telephone">{t('telephone')}</label>
                            <span></span>
                            <BsTelephone className={style.icon}/>
                        </div>
                        {errors.telephone && touched.telephone ? (
                            <p className={style.error}>{errors.telephone}</p>
                        ) : null}
                        <div className={style.inputboxPassword}>
                            <Field type={visible ? "text" : "password"} id="password" name="password" required/>
                            <label htmlFor="password">{t('password')}</label>
                            <span></span>
                            <LuKeyRound className={style.icon}/>
                            <button type="button" onClick={() => {setVisible(!visible)}}>
                                {visible ? <FaRegEye/> : <FaRegEyeSlash/>}
                            </button>
                        </div>
                        {errors.password && touched.password ? (
                            <p className={style.error}>{errors.password}</p>
                        ) : null}
                        <div className={style.inputboxPassword}>
                            <Field type={visibleRepeat ? "text" : "password"} id="confirmPassword" name="confirmPassword" required/>
                            <label htmlFor="confirmPassword">{t('confirm-password')}</label>
                            <span></span>
                            <LuKeyRound className={style.icon}/>
                            <button type="button" onClick={() => {setVisibleRepeat(!visibleRepeat)}}>
                                {visibleRepeat ? <FaRegEye/> : <FaRegEyeSlash/>}
                            </button>
                        </div>
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <p className={style.error}>{errors.confirmPassword}</p>
                        ) : null}
                        <button className={style.submit} type="submit" disabled={!isValid || !dirty || loading}>
                            {loading?
                                <>
                                    <RiLoader2Line/>
                                    <p>{t('signingup')}</p>
                                </>
                                :
                                <>
                                    <p>{t('signup')}</p>
                                </>
                            }
                        </button>
                        <div className={style.links}>
                            <Link href="/recover">{t('recover')}</Link>
                            <Link href="/login">{t('login')}</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}