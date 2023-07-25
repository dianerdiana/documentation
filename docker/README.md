| Command                                           | Kegunaan                                                 | Keterangan                                          |
| :------------------------------------------------ | :------------------------------------------------------- | :-------------------------------------------------- |
| `docker build -t <nama_image> .`                  | Build Image baru pada docker                             | `-t`: adalah tag (membuat nama). `.`: path saat ini |
| `docker run -p <port> <nama_image>`               | Running Image                                            | `-p`: Mengatur port                                 |
| `docker stop <nama_container>`                    | Stop Container yang Run dari Image                       | `<nama_container>`: Bukan nama image, berbeda       |
| `docker run --rm -it <nama_image_or_id_image> sh` | Menjalankan image sementara, bisa mengecek isi image     | :-                                                  |
| `docker image prune`                              | Mengecek Image yang tidak digunakan                      |                                                     |
| `docker image prune -a`                           | Menghapus Image yang tidak dipakai, tanpa konfirmasi     |                                                     |
| `docker rmi <tag_image_or_id>`                    | Menghapus Image dengan tag atau id spesifik              |                                                     |
| `docker container prune`                          | Mengecek Container yang tidak digunakan                  |                                                     |
| `docker container prune -f`                       | Menghapus Container yang tidak dipakai, tanpa konfirmasi |                                                     |
| `docker rm <nama_container_or_id>`                | Menghapus Container dengan tag atau id spesifik          |                                                     |