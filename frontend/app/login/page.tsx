'use client'
import { Form, Formik } from "formik";
import { useEffect } from "react";
import style from '../styles/pages/forms.module.scss';
import { useTranslations } from "next-intl";
import { setUserLocale } from "@/services/locale";
import { Locale } from "@/config";

export default function Login(){

    //variables
    const t = useTranslations('HomePage')
    const initialValues = {}

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
                        <h1></h1>
                    </Form>
                )}
            </Formik>
        </div>
    );
}