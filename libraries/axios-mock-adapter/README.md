# Cara simulasi API menggunakan `axios-mock-adapter`

## **Live Demo bisa dilihat** [**disini**](https://codesandbox.io/s/axios-mock-adapter-reactjs-4x6px2?file=/src/App.js)

Simulasi API ini seperti ketika meng-*consume* api tanpa harus menggunakan back-end. Jadi, datanya saya buat sendiri, routes api nya juga saya buat sendiri full dari *front-end* react. Tapi, saat saya memanggil routes tersebut benar-benar menggunakan `fetch` atau saya lebih sering menggunakan `axios`.

Menggunakan `fakeData`, sebuah array atau object mungkin akan lebih mudah. Tapi, saat integrasi nanti prosesnya pasti akan lebih lama. Karena, saya harus setting api dan menyesuaikan data yang saya terima dari api tersebut. Maksudnya, ketika menggunakan `fakeData` kita tidak bisa mendapatkan nilai kembalian yang mungkin bisa digunakan untuk validasi, apakah request tersebut berhasil atau gagal. Tapi ini bisa di atasi dengan cara membuat promise, cuman effort yang harus dibayar tentu akan lebih lama dibandingkan menggunakan `axios-mock-adapter`. BTW, saya juga pernah mencoba fetch menggunakan **Promise** dan ternyata itu sangat melelahkan.

Maka dari itu, menggunakan `axios-mock-adapter` ini sangat memudahkan saya ketika ingin melakukan simulasi fetching menggunakan axios dan akan memberikan sebuah gambaran yang jelas serta akan lebih mengefektifkan waktu saya pada saat integrasi dengan *back-end* nantinya.

Di sini saya akan membagi dokumentasi menjadi beberapa part.

Baca di folder [**parts**](./parts/)
