# Apa itu `react-select`


Biasanya saya menggunakan ini ketika membuat form yang di dalamnya membutuhkan `input select`. Cara pemakaiannya yang simpel, dan cara penulisannya yang simpel juga. Cocok banget buat kombinasi antara `react-select` dengan `react-use-form` karena lebih memudahkan saya dalam validasi dan controlled inputnya.

### Dokumentasi bisa dilihat di [react-select](https://react-select.com/)

Setelah package terinstal, saya biasanya membagi jadi beberapa step:


# Instalasi `React Select`

Karena saya lebih sering menggunakan npm, jadi tinggal:

`npm install react-select`

# Cara Pemakaiannya / Pemanggilannya di component yang diperlukan

```javascript
import Select from 'react-select'

const FormInput = () => {
  const options = [
    {
      label: 'Select Options',
      value: ''
    },
    {
      label: 'Option 1',
      value: 1
    }
  ]

  return(
    <form>
      <Select 
        options=[options] // The options are an array that contain object with two or more property, label & value
      /> 
    </form>
  )
}
```

Dengan konfigurasi di atas sebenarnya saya sudah bisa menampilkan `input-select` di form

# Cara Mengambil Value dari `React Select`

```javascript
import React, { useState } from 'react'
import Select from 'react-select'

const FormInput = () => {
  const options = [
    {
      label: 'Select Options',
      value: ''
    },
    {
      label: 'Option 1',
      value: 1
    }
  ]

  const [selectedOption, setSelectedOption] = useState({})
  // Expected value:
    // {
    //   label: 'Select Options',
    //   value: ''
    // }

  return(
    <form>
      <Select 
        // The options are an array that contain object with two or more property, label & value
        options=[options] 

        // Use onChange then return value (an object) that contain property was i set 
        onChange={value => setSelectedOption(value)}

      />
      <button type='submit'>Submit</button>
    </form>
  )
}
```