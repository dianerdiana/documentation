# General Command

| Command                      | Note                                          |
| ---------------------------- | --------------------------------------------- |
| php artisan migrate          | Untuk migrasi database                        |
| php artisan migrate:rollback | Untuk mengemablikan migrasi database terakhir |
| php artisan config:cache     | Untuk membersihkan                            |
| php artisan config: clear    | Untuk membersihkan                            |


# Make Command

| command                                                   | Note                                               |
| --------------------------------------------------------- | -------------------------------------------------- |
| php artisan make:migration create_`nama_table`_table      | Untuk membuat table migrations                     |
| php artisan make:controller `nama_controller`             | Untuk membuat controller baru                      |
| php artisan make:controller `nama_folder\nama_controller` | Untuk membuat folder dengan controller di dalamnya |
| ** create_`nama_table`_table --create=`nama_table`        | Supaya tidak keliru membuat namanya                |
| php artisan make:middleware `nama_middleware`             | Untuk membuat middleware                           |

# Composer Command

| Command          | Note                                               |
| ---------------- | -------------------------------------------------- |
| composer install | Untuk menginstall semua package di `composer.json` |
| composer update  | Untuk mengupdate semua package di `composer.json`  |