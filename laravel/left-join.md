# Cara menggunakan left join di kolom yang sama antara dua table

```PHP
  $data = DB::table('table_1')
    ->leftJoin('table_2', 'table_1.column', '=', 'table_2.column'),
    ->select('table_1.*', 'table_2.(column_optional)') // or ->select('table_1.*', 'table_2.*') to fet all data from table_2
    ->get();
  
  return json_encode($data);
```