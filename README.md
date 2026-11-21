# ☕ kopken-clone2-0

Landing page satu halaman untuk **Kopi Kenangan Margasatwa**, gerai kopi di kawasan dekat Pasar Labu.
Halaman ini bercerita tentang gerai: siapa kami, visi & misi, nilai yang dijaga, dan lokasi.
Suasananya dibuat hangat, tenang, dan sedikit "premium", seperti secangkir kopi susu yang diseduh pelan-pelan.

> Project ini adalah *clone* / konsep ulang untuk keperluan belajar dan portofolio, bukan situs resmi Kopi Kenangan.

---

## ✨ Fitur Utama

- **Hero sinematik**: headline serif besar, foto dalam bingkai lengkung (*arch*), stempel berputar, dan efek tilt 3D yang mengikuti kursor di desktop.
- **Hujan biji kopi** (`CoffeeBeanRain`): animasi canvas 3 lapis kedalaman dengan parallax saat scroll dan saat kursor bergerak.
- **Gelombang kopi** (`PatternWaves` dari [React Bits](https://reactbits.dev/backgrounds/pattern-waves)): latar WebGL halftone bergaya *silk* yang bereaksi terhadap kursor.
- **Efek cipratan cairan kopi** (`CoffeeSplash`): klik/tap memunculkan cincin mahkota, tetesan kopi & krema yang jatuh kena gravitasi, lalu noda kecil saat mendarat.
- **Smooth scroll** pakai Lenis, plus animasi *reveal* dan parallax pakai GSAP ScrollTrigger.
- **Mode terang / gelap**: tombol di navbar, tersimpan di `localStorage`, dan mengikuti preferensi sistem.
- **Navbar kapsul ringkas** dengan indikator section aktif, progress bar scroll, dan menu mobile.
- **Ramah aksesibilitas**: link *skip to content*, `aria-*` di navigasi, dan semua animasi berat mati otomatis saat `prefers-reduced-motion` aktif.
- **Ringan di HP**: jumlah partikel dikurangi, DPR dibatasi, dan animasi berhenti saat di luar layar.

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + CSS variables |
| Animasi | GSAP 3 (ScrollTrigger), Canvas 2D |
| WebGL | OGL (dipakai oleh PatternWaves) |
| Smooth scroll | Lenis |
| Font | Bodoni Moda Variable, Jost Variable (`@fontsource-variable`) |

---

## 🎨 Konsep Desain

**Tema: "Secangkir suasana"**, yaitu kafe lingkungan yang sederhana tapi dirawat dengan detail.

1. **Warna diambil dari foto produk.** Palet diturunkan langsung dari foto es kopi susu: busa susu, karamel, krema, dan biji sangrai. Hasilnya seluruh halaman terasa "satu gelas".
2. **Kontras editorial.** Headline pakai serif Didone (*Bodoni Moda*) yang elegan, sering dicampur *italic* berwarna karamel. Teks isi pakai sans geometris (*Jost*) yang bersih dan mudah dibaca.
3. **Motif lengkung (arch).** Bingkai foto, garis dekoratif di hero, dan bentuk kartu memakai lengkung seperti pintu/jendela kafe, sehingga terasa ramah dan "mengundang masuk".
4. **Gerak yang pelan.** Semua animasi memakai easing `cubic-bezier(0.22, 1, 0.36, 1)` (*ease-lux*): masuk cepat lalu melambat halus, tidak ada yang memantul atau norak.
5. **Detail kecil bertema kopi.** Biji kopi berjatuhan, ikon biji di samping eyebrow, stempel "Sederhana • Konsisten • Dekat Warga", gelombang *silk*, dan cipratan cairan kopi.
6. **Ritme gelap–terang.** Section bergantian antara permukaan espresso gelap (Hero, Gelombang, CTA/footer) dan latar busa susu terang (Tentang, Visi Misi, Nilai, Lokasi). Ini membuat scroll terasa punya "tegukan".

---

## 🎨 Color Palette

Semua warna didefinisikan di `src/style/variables.css`.

### Palet dasar

| Swatch | Nama | Hex | Dipakai untuk |
| --- | --- | --- | --- |
| ![#F5EEE4](https://placehold.co/24x24/F5EEE4/F5EEE4.png) | Milk Foam | `#F5EEE4` | Latar utama (mode terang), teks di atas permukaan gelap |
| ![#EADFCF](https://placehold.co/24x24/EADFCF/EADFCF.png) | Oat | `#EADFCF` | Latar alternatif / kartu |
| ![#D9C3A5](https://placehold.co/24x24/D9C3A5/D9C3A5.png) | Crema | `#D9C3A5` | Aksen lembut, garis |
| ![#B87A3D](https://placehold.co/24x24/B87A3D/B87A3D.png) | Caramel | `#B87A3D` | **Warna aksen utama**: tombol, logo, highlight |
| ![#D6A66B](https://placehold.co/24x24/D6A66B/D6A66B.png) | Caramel Soft | `#D6A66B` | Teks italic aksen, garis aktif navbar |
| ![#2A1C16](https://placehold.co/24x24/2A1C16/2A1C16.png) | Roasted Bean | `#2A1C16` | Warna teks isi |
| ![#1D130E](https://placehold.co/24x24/1D130E/1D130E.png) | Espresso | `#1D130E` | Permukaan gelap (Hero, CTA), heading |
| ![#150D0A](https://placehold.co/24x24/150D0A/150D0A.png) | Espresso Deep | `#150D0A` | Permukaan gelap di mode gelap |

### Token semantik

Komponen tidak memakai hex langsung, tapi token semantik yang otomatis berganti saat mode gelap:

| Token | Mode terang | Mode gelap |
| --- | --- | --- |
| `--color-bg-base` | Milk Foam `#F5EEE4` | `#1A120E` |
| `--color-bg-alt` | Oat `#EADFCF` | `#241812` |
| `--color-text-body` | Roasted Bean `#2A1C16` | `#E9DDCC` |
| `--color-text-heading` | Espresso `#1D130E` | `#F5EEE4` |
| `--color-accent` | Caramel `#B87A3D` | Caramel Soft `#D6A66B` |
| `--color-accent-soft` | Caramel Soft `#D6A66B` | `#E3BC8A` |
| `--color-surface-strong` | Espresso `#1D130E` | Espresso Deep `#150D0A` |

Token ini juga didaftarkan ke Tailwind lewat `@theme inline` di `globals.css`, jadi bisa dipakai sebagai class, misalnya `bg-bg-base`, `text-accent-soft`, atau `bg-surface-strong`.

### Warna efek

- **Cipratan kopi (tone `latte`, untuk latar gelap):** `#7D4A2A` `#8F5530` `#A4663A` `#B87A3D` + krema `#C08A5C` `#D6A66B` `#E8CFAE`
- **Cipratan kopi (tone `espresso`, untuk latar terang):** `#2E180C` → `#7D4A2A`
- **PatternWaves:** titik putih `#FFFFFF` di atas hitam `#000000`

### Tipografi

| Peran | Font | Catatan |
| --- | --- | --- |
| Heading / display | **Bodoni Moda Variable** | Ukuran besar memakai `clamp()`, tracking rapat (`-0.035em`), sering italic |
| Body / UI | **Jost Variable** | Weight light–medium, line-height `1.65` |

---

## 📐 Layout

Halaman berbentuk *single page* dengan urutan section berikut:

```
┌──────────────────────────────────────────────┐
│ Navbar (fixed, kapsul)                        │  logo · menu · tema · Kontak
├──────────────────────────────────────────────┤
│ 1. Hero            #beranda   (gelap)         │  teks kiri  |  foto arch kanan
│ 2. Gelombang Kopi             (hitam, 600px)  │  PatternWaves + splash + headline tengah
│ 3. Tentang         #tentang   (terang)        │  grid 0.85fr / 1.15fr
│ 4. Visi & Misi     #visi-misi (terang)        │  grid 1.35fr / 1fr, daftar misi bernomor
│ 5. Nilai Kami      #nilai     (terang)        │  bento grid 12 kolom: Konsisten, Sederhana, Dekat dengan Warga
│ 6. Lokasi          #lokasi    (terang)        │  grid 2 kolom: info | peta (lazy-load)
│ 7. Mitra           #mitra     (opsional)      │  tampil hanya jika isVisible = true
│ 8. CTA + Footer    #kontak    (gelap)         │  ajakan mampir, chip kontak, © & "kembali ke atas"
└──────────────────────────────────────────────┘
```

### Aturan layout

- **Container:** `MainResponsiveLayout` dengan lebar `max-w-6xl` (default), `max-w-3xl` (narrow), atau full. Padding samping `px-5` di mobile dan `md:px-10` di desktop.
- **Jarak antar section:** 64–112px di mobile dan 88–168px di desktop (`--space-section-*`).
- **Sudut:** permukaan gelap dibulatkan besar (`rounded-[2rem]` → `md:rounded-[3rem]`) dan diberi jarak dari tepi layar, sehingga tampak seperti kartu yang "mengambang".
- **Breakpoint:** mobile-first. `md` (768px) menjadi 2 kolom di beberapa section, dan `lg` (1024px) menampilkan menu navbar lengkap, Hero 2 kolom, serta efek tilt.
- **Navbar:** `fixed`, transparan di atas Hero, lalu berubah jadi kapsul gelap blur saat discroll. Di bawah `lg` menu pindah ke tombol hamburger.

---

## 📁 Struktur Folder

```
kopkenClone2.0/
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── App.tsx                  # urutan section
    ├── main.tsx
    ├── assets/                  # foto hero
    ├── components/
    │   ├── Navbar/
    │   ├── Hero/
    │   ├── CoffeeWaves/         # section PatternWaves + splash
    │   ├── PatternWaves/        # komponen React Bits (JSX + CSS + d.ts)
    │   ├── About/
    │   ├── VisionMission/
    │   ├── Values/
    │   ├── LocationMap/
    │   ├── Partners/
    │   ├── CTA/
    │   └── common/              # CoffeeBeanRain, CoffeeSplash, ikon, blob
    ├── hooks/                   # useLenis, useScrollTrigger, useActiveSection
    ├── layout/                  # MainLayout, MainResponsiveLayout
    ├── lib/                     # setup GSAP & Lenis
    ├── style/                   # globals.css, variables.css (palet & token)
    ├── types/
    └── utils/
```

---

## 🚀 Cara Menjalankan

### Prasyarat

- [Node.js](https://nodejs.org/) **v18 atau lebih baru** (disarankan v20 LTS)
- npm (ikut terpasang bersama Node.js)
- [Git](https://git-scm.com/)

### 1. Clone repository

```bash
git clone https://github.com/<username>/kopkenClone2.0.git
```

> ```bash
> https://github.com/jojohyperbackend-hub/kopken-clone2-0.git
> ```

### 2. Masuk ke folder project

```bash
cd kopken-clone2-0
```

### 3. Install dependencies

```bash
npm install
```

### 4. Jalankan mode development

```bash
npm run dev
```

Buka alamat yang muncul di terminal (biasanya **http://localhost:5173**).

### 5. Build untuk production

```bash
npm run build     
npm run preview   
```

### Troubleshooting

| Masalah | Solusi |
| --- | --- |
| `vite: Permission denied` | `node_modules` rusak atau tercopy dari OS lain. Hapus folder `node_modules`, lalu jalankan `npm install` lagi. |
| Gelombang (PatternWaves) tidak muncul | Browser harus mendukung **WebGL2**. Coba Chrome/Edge/Firefox versi terbaru dan aktifkan *hardware acceleration*. |
| Animasi tidak jalan | Cek apakah "Reduce motion" aktif di pengaturan OS. Animasi sengaja dimatikan dalam kondisi itu. |

---

## 🧩 Kustomisasi Cepat

- **Ganti warna:** ubah nilai `--palette-*` di `src/style/variables.css`.
- **Ganti teks:** setiap section punya objek `default...Content` di file komponennya, misalnya `defaultHeroContent` di `Hero.tsx`.
- **Tampilkan section Mitra:** set `isVisible: true` di `Partners.tsx`, dan `SHOW_MITRA_LINK = true` di `App.tsx` supaya muncul di navbar.
- **Atur cipratan kopi:** prop `CoffeeSplash`, yaitu `intensity` (besar cipratan), `ambientInterval` (ms, `0` = mati), dan `tone` (`'latte'` | `'espresso'`).
- **Atur gelombang:** prop `PatternWaves` di `CoffeeWaves.tsx` (`preset`, `color`, `backgroundColor`, `fade`, `cursorSize`, dll.).

---

## 🙏 Kredit

- Komponen latar **PatternWaves** dari [React Bits](https://reactbits.dev) oleh David Haz.
- Font **Bodoni Moda** & **Jost** via [Fontsource](https://fontsource.org).
- Merek "Kopi Kenangan" adalah milik pemiliknya masing-masing. Project ini dibuat untuk keperluan belajar.