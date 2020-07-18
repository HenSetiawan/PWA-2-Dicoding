if(("serviceWorker" in navigator)){

    navigator.serviceWorker.register('./sw.js')
    .then(registration=>{
       console.log('service worker diregistrasi')
    })
    .catch(error=>{
        console.log("Service Worker gagal iregistrasi");
    })
}else{
    console.log("Service tidak tersedia di browser ini");
}

if('Notification' in window){
    Notification.requestPermission()
    .then(result=>{
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diizinkan.");
            return;
          } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan izin.");
            return;
          }else{
            console.log("Fitur notifikasi diizinkan.");
          }
          
          
    })
}


if (('PushManager' in window)) {
    navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BDVhCwxmmYNkuU44DhR69VZYzx8Y0aBuTkPfk2wSi9jRHaVWefB-Mb9vJFpefr_OhIl81rDt66dkOQzVjWAl314")
        }).then(function(subscribe) {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(function(e) {
            console.error('Tidak dapat melakukan subscribe ', e.message);
        });
    });
}





function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}