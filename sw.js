/**
 * Service Worker
 * @author Saulo Gomes do Carmo
 * 
 */

// Instalação do service Worker
self.addEventListener('install', (event) => {
    console.log("Instalando o ServiceWorker...", event)
    // Pré carregamento em cache
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
                console.log("Pré-carregamento dos arquivos do app")
                cache.add('/etagas')
                cache.add('/etagas/index.html')
                cache.add('/etagas/style.css')
                cache.add('/etagas/app.js')
                cache.add('/etgas/img/flex.png')
                cache.add('/etagas/img/calcflex.png')
                cache.add('/etagas/img/etanol.png')
                cache.add('/etagas/img/gasolina.png')

            })
    )
})

// Ativação do Service Worker 
self.addEventListener('activate', (event) => {
    console.log("Ativando o ServiceWorker...", event)
    return self.clients.claim() // Garantir o serviço em todos os documentos do app.
})

// Escutando requisições e "buscando algo"
self.addEventListener('fetch', (event) => {
    // console.log("Buscando algo...",event)
    //  armazenar em cache (arquivos estáticos pré-carregados)todas as requisições 
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    )
})