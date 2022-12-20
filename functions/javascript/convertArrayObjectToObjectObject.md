Karena kebutuhan, saya ingin mengubah array ke dalam object object,

contoh

```javascript
const data = [
  {
    id: 1,
    name: 'option1',
  },
  {
    id: 2,
    name: 'option2',
  }
]
```

Ingin saya ubah menjadi:

```javascript
const result = {
  {
    label: 'option1',
  },
  {
    label: 'option2',
  }
}
```

Maka caranya adalah:

```javascript
const mappedArray = data.map(i => {
  const obj {
    label : i.name
  }

  return obj
})

const result = Object.assign({}, ...mappedArray)

// expect:
// {
//   {
//     label: 'option1',
//   },
//   {
//     label: 'option2',
//   }
// }

// if
const result2 = Object.assign({}, mappedArray)
// will be
// {
//   1: {
//     label: 'option1',
//   },
//   2: {
//     label: 'option2',
//   }
// }
```