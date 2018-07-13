'use strict';

const CONFIG = {
    "SERVICE_BASE": "http://192.168.0.8:9020/api",
    "SERVICE_URL": {
        "BASE": "/",
        "REGISTRO": "/registrer",
        "LOGIN": "/login",
        "LOGOUT": "/logout",
        "FILLTIPOARTICULO": "/tipos-articulos/fill",
        "VERIFYARTICULO": "/tipos-articulos/verify",
        "ALLARTICULOS": "/articulos/all",
        "SERVEIMAGEARTICULOS": "/articulos/img",
        "TIPOSARTICULOSADD": "/tipos-articulos/add",
        "ADDARTICLE": "/articulos/add",
        "DELETEARTICLE": "/articulos/delete",
        "UPDATEARTICLE": "/articulos/update",
        "GENERATEBARCODE":"/articulos/barcode",
        "ALLARTICLESANDPRICE":"/articulos/precios",
        "GETCURRENCY": "/currency/all",
        "ADDCURRENCY": "/currency",
        "FILLCURRENCY": "/currency/fill",
        "FILLTIPODOCUMENTO": "/tipos-documentos/fill",
        "ADDCLIENT": "/cliente/add",
        "ALLCLIENT": "/cliente/all",
        "EDITCLIENT": "/cliente/edit",
        "SOFTDELETECLIENT": "/cliente/soft-delete",
        "ALLDISABLEDCLIENT": "/cliente/all/disable",
        "ENABLECLIENT": "/cliente/enable"
    }
};

export default CONFIG;