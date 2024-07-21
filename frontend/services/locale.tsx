'use server'
import {cookies} from 'next/headers';
import {Locale, defaultLocale} from '@/config';

const COOKIE_NAME = 'locale';

export async function getUserLocale() {
    return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
    const expirationDate = 24 * 60 * 60;
    cookies().set(COOKIE_NAME, locale, { expires: expirationDate, httpOnly: true, secure: true, sameSite: 'strict' });
}