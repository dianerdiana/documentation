# Cara Sendiri

```php
Route::group(['prefix' => 'article', 'namespace' => 'App\Http\Controllers\Admin'], function() {
    Route::controller(DashboardController::class)
    ->group(function() {
        Route::get('/', 'index');
    });
})
```

# Mengumpulkan Controller

```php
Route::group(['prefix' => 'article', 'namespace' => 'App\Http\Controllers\Admin'], function() {
    Route::get('/', 'ArticleController@getIndex')->name('admin.article');
    Route::get('edit/{articleId}', 'ArticleController@getEdit');
});
```

# Cara lain

```php
Route::prefix('admin')
    ->namespace('App\Http\Controllers\Admin')
    ->group(function() {
        // Route::controller(DashboardController::class)
        // ->group(function() {
        //     Route::get('/', 'index');
        // });
        Route::get('/', 'DashboardController@index')
            ->name('dashboard');
    });
```