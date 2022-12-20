# Cara Mendapatkan Hari Pertama dan Hari Terakhir dari Bulan

```javascript
const now = new Date();

const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
console.log(firstDay); // 👉️ Sat Oct 01 2022 ...

const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
console.log(lastDay); // 👉️ Mon Oct 31 2022 ...
```

### Format New Date()

Jadi, dalam parameter yang dimasukkan New Date() adalah:

`New Date(Tahun, Bulan, Hari)`

## Penjelasannya
- Di firstDay, harinya jadi `1` karena untuk mendapatkan hari pertama dari bulan.
- Di lastDay, bulannya ditambah satu untuk masuk ke bulan selanjutnya, dan harinya di set 0, untuk masuk ke tanggal 0 dari bulan tersebut. Dengan kata lain hari terakhir dari bulan sebelumnya.
