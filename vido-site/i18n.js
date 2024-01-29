import i18n from "i18next";
import {initReactI18next } from "react-i18next";


const resources ={
    tr:{
        translation:{
            "welcome": "React'e hoşgeldiniz",
            "QR Kod Oluşturucu": "QR Kod Oluşturucu",
            "İçerik (Web sitesi, sosyal medya vb.)": "İçerik (Web sitesi, sosyal medya vb.)",
            "Arka plan rengi": "Arka plan rengi",
            "Ön plan rengi": "Ön plan rengi",
        }

    },
    en:{
        translation:{
            "welcome": "Welcome to React and react-i18next",
            "QR Kod Oluşturucu": "QR Code Generator",
            "İçerik (Web sitesi, sosyal medya vb.)": "Content (Website, social media, etc.)",
            "Arka plan rengi": "Background color",
            "Ön plan rengi": "Foreground color",
            "QR Kod Boyutu" : "QR Code Size",
            "Linki Yapıştırın": "Paste the link",
            "Üret":"Generate",

        }

    }

}

i18n
    .use(initReactI18next)
    .init({
        lng: "tr",
        resources
    })

export default i18n;