"use client"
import { Form, Formik } from "formik";
import { useEffect } from "react";

export default function Login(){
    useEffect(() => {
        document.title = "Registro | TecnoBurguer"
    }, [])

    const initialValues = {}

    const handleSubmit = () => {}

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