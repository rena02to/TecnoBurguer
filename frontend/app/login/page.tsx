'use client'
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import '@/i18n/i18n';

export default function Login(){

    //variables
    const initialValues = {}
    const { t } = useTranslation();


    //useeffect
    useEffect(() => {
        document.title = `${t('login.title')} | TecnoBurguer`;
    }, [ t ])


    //functions
    const handleSubmit = () => {}

    //return
    return(
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({  }) => (
                    <Form>
                    </Form>
                )}
            </Formik>
        </>
    );
}