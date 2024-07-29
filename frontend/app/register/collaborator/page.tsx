'use client'
import { Form, Formik } from "formik";
import { useEffect } from "react";
import style from '@/app/styles/forms.module.scss';
import { useTranslations } from "next-intl";
import { setUserLocale } from "@/services/locale";
import { Locale } from "@/config";

export default function Register(){

    //variables
    const t = useTranslations('Register')
    const initialValues = {}

    //useeffect
    useEffect(() => {
        document.title = `${t(`form.title`)} | TecnoBurguer`;
        setUserLocale(navigator.language.slice(0, 2) as Locale)
    }, [ t ])

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