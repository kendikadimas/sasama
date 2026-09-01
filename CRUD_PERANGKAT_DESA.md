# CRUD Perangkat Desa

Sistem manajemen data perangkat desa yang menggantikan data statis dengan data dinamis dari database.

## Fitur

✅ **CRUD Lengkap** - Tambah, Edit, Hapus data perangkat desa
✅ **Upload Foto** - Upload foto profil perangkat desa
✅ **Kepala Desa** - Tandai satu perangkat sebagai kepala desa dengan pesan sambutan
✅ **Status Aktif/Nonaktif** - Kelola status keaktifan perangkat
✅ **Urutan Tampilan** - Atur urutan tampilan perangkat
✅ **Periode Jabatan** - Catat periode mulai dan akhir jabatan
✅ **Data Lengkap** - NIP, telepon, alamat, pendidikan

## Instalasi

### 1. Jalankan Migration

```bash
php artisan migrate
```

### 2. (Opsional) Jalankan Seeder untuk Data Contoh

```bash
php artisan db:seed --class=VillageOfficialSeeder
```

## Cara Penggunaan

### Akses Halaman Admin

1. Login ke dashboard admin
2. Navigasi ke menu **Perangkat Desa** (route: `/dashboard/village-officials`)

### Menambah Perangkat Desa

1. Klik tombol **"Tambah Perangkat"**
2. Isi formulir:
   - **Nama Lengkap** (wajib)
   - **Jabatan** (wajib) - Contoh: Kepala Desa, Sekretaris Desa, Kaur Keuangan
   - **NIP** (opsional)
   - **No. Telepon** (opsional)
   - **Pendidikan Terakhir** (opsional)
   - **Alamat** (opsional)
   - **Foto** (opsional) - JPG/PNG, maks 2MB
   - **Periode Jabatan** (opsional) - Mulai dan akhir jabatan
   - **Urutan Tampilan** - Semakin kecil angka, semakin atas urutannya
   - **Status Aktif** - Centang jika perangkat masih aktif
   - **Tandai sebagai Kepala Desa** - Centang untuk kepala desa (hanya 1 yang bisa ditandai)
   - **Pesan Sambutan** - Muncul jika ditandai sebagai kepala desa
3. Klik **"Simpan Data"**

### Mengedit Perangkat Desa

1. Klik icon **Edit (pensil)** pada baris perangkat yang ingin diedit
2. Ubah data yang diperlukan
3. Klik **"Perbarui Data"**

### Menghapus Perangkat Desa

1. Klik icon **Hapus (tempat sampah)** pada baris perangkat
2. Konfirmasi penghapusan
3. Data akan terhapus beserta fotonya (jika ada)

## Tampilan di Halaman Publik

Data kepala desa yang ditandai dengan `is_head = true` akan otomatis muncul di:

- **Halaman Beranda** - Bagian "Sambutan Kepala Desa"
  - Foto kepala desa
  - Nama dan jabatan
  - Pesan sambutan (jika ada)
  - Periode jabatan

Jika belum ada data kepala desa, akan muncul pesan untuk menambahkan data melalui halaman admin.

## Struktur Database

**Tabel:** `village_officials`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| id | bigint | Primary key |
| name | string | Nama lengkap |
| position | string | Jabatan |
| nip | string | Nomor Induk Pegawai |
| photo | string | Path foto |
| phone | string | No. telepon |
| address | text | Alamat |
| education | string | Pendidikan terakhir |
| periode_start | date | Awal masa jabatan |
| periode_end | date | Akhir masa jabatan |
| order | integer | Urutan tampilan |
| is_active | boolean | Status aktif |
| is_head | boolean | Kepala desa |
| welcome_message | text | Pesan sambutan |

## Routes

| Method | URI | Name | Controller@Action |
|--------|-----|------|-------------------|
| GET | /dashboard/village-officials | village-officials.index | VillageOfficialController@index |
| GET | /dashboard/village-officials/create | village-officials.create | VillageOfficialController@create |
| POST | /dashboard/village-officials | village-officials.store | VillageOfficialController@store |
| GET | /dashboard/village-officials/{id}/edit | village-officials.edit | VillageOfficialController@edit |
| PUT | /dashboard/village-officials/{id} | village-officials.update | VillageOfficialController@update |
| DELETE | /dashboard/village-officials/{id} | village-officials.destroy | VillageOfficialController@destroy |

## Tips

- **Hanya satu kepala desa**: Sistem otomatis akan menghapus status `is_head` dari perangkat lain jika Anda menandai perangkat baru sebagai kepala desa
- **Foto otomatis terhapus**: Saat menghapus perangkat atau mengubah foto, foto lama akan otomatis terhapus dari storage
- **Foto opsional**: Jika tidak upload foto, akan tampil avatar dengan inisial nama
- **Urutan tampilan**: Gunakan angka untuk mengatur urutan (1, 2, 3, dst)

## File yang Dibuat/Diubah

### Backend (Laravel)
- `database/migrations/2026_01_22_000000_create_village_officials_table.php` - Migration
- `app/Models/VillageOfficial.php` - Model
- `app/Http/Controllers/Admin/VillageOfficialController.php` - Controller
- `app/Http/Controllers/PublicController.php` - Update untuk data dinamis
- `routes/web.php` - Route baru
- `database/seeders/VillageOfficialSeeder.php` - Data contoh

### Frontend (React/TypeScript)
- `resources/js/pages/Admin/VillageOfficials/Index.tsx` - Halaman daftar
- `resources/js/pages/Admin/VillageOfficials/Create.tsx` - Halaman tambah
- `resources/js/pages/Admin/VillageOfficials/Edit.tsx` - Halaman edit
- `resources/js/pages/Public/Home.tsx` - Update untuk data dinamis

## Troubleshooting

**Foto tidak muncul?**
- Pastikan symbolic link storage sudah dibuat: `php artisan storage:link`
- Periksa permission folder `storage/app/public`

**Route tidak ditemukan?**
- Jalankan: `php artisan route:clear`
- Jalankan: `php artisan optimize:clear`

**Gambar rusak setelah upload?**
- Periksa ukuran file (maks 2MB)
- Pastikan format JPG/PNG
