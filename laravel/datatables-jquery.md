# Cara menggunakan jQuery DataTable Server Side di Laravel


```PHP
use Illuminate\Http\Request;
use App\Models;

// Datatable
  public function datatable(Request $request) {
    $draw = $request->get('draw');  // options: draw
    $start = $request->get('start'); // options: start
    $rowsPerPage = $request->get('length'); // options: length

    $columnIndex_arr = $request->get('order'); // options: order 
    $columnName_arr = $request->get('columns'); // options: columns
    $order_arr = $request->get('order'); // options: order
    $search_arr = $request->get('search'); // options: search

    $columnIndex = $columnIndex_arr[0]['column']; // Column index
    $columnName = $columnName_arr[$columnIndex]['data']; // Column name
    $columnSortOrder = $order_arr[0]['dir']; // asc or desc
    $searchValue = $search_arr['value']; // Search value

    // Total records
    $totalRecords = Models::select('count(*) as allcount')->count();
    $totalRecordswithFilter = Models::select('count(*) as allcount')
      ->where('column', 'ilike', '%' .$searchValue . '%')->count();

    // Fetch records
    $records = Models::orderBy($columnName,$columnSortOrder)
      ->where('users.*', 'ilike', '%' .$searchValue . '%')
      ->leftJoin('profiles', 'users.id', '=', 'profiles.user_id')
      ->select('users.*', 'profiles.address')
      ->skip($start)
      ->take($rowsPerPage)
      ->get();

    $data_arr = array();
  
    foreach($records as $record){
      $id = $record->id;
      $fullname = $record->fullname;
      $username = $record->username;
      $email = $record->email;
      $address = $record->address;

      $data_arr[] = array(
        "id" => $id,
        "fullname" => $fullname,
        "username" => $username,
        "email" => $email,
        "address" => $address,
      );
    }

    $response = array(
      "draw" => intval($draw),
      "iTotalRecords" => $totalRecords,
      "iTotalDisplayRecords" => $totalRecordswithFilter,
      "data" => $data_arr
    );

    // echo();
    return json_encode($response);
  }
```