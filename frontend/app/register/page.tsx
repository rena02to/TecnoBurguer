'use client'
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import '@/i18n/i18n';
import style from '../styles/pages/forms.module.scss';

export default function Register(){

    //variables
    const initialValues = {}
    const { t } = useTranslation();


    //useeffect
    useEffect(() => {
        document.title = `${t('register.title-page')} | TecnoBurguer`;
    }, [ t ])


    //functions
    const handleSubmit = () => {}

    //return
    return(
        <div className={style.background}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({  }) => (
                    <Form>
                    </Form>
                )}
            </Formik>
        </div>
    );
}