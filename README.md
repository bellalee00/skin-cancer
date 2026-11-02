# 🔬 Skin Cancer Detection Web API

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Hapi.js](https://img.shields.io/badge/Framework-Hapi.js-orange?logo=hapijs&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/Machine%20Learning-TensorFlow.js-FF6F00?logo=tensorflow&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Cloud-Google%20Cloud%20Platform-4285F4?logo=googlecloud&logoColor=white)
![Firestore](https://img.shields.io/badge/Database-Cloud%20Firestore-FFCA28?logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-ISC-blue)

A web-based skin cancer prediction application and RESTful API powered by **TensorFlow.js** and **Hapi.js**. The application processes uploaded dermatological skin lesion images to predict potential cancer risks, loads trained deep learning models directly from **Google Cloud Storage**, and automatically records all prediction results into **Google Cloud Firestore**.


---

## 📖 Overview

Aplikasi ini dikembangkan untuk mengidentifikasi indikasi risiko kanker kulit secara otomatis melalui citra digital. Menggunakan model klasifikasi berbasis Convolutional Neural Network (CNN) yang diekspor ke format TensorFlow.js Graph Model, API ini menerima gambar kulit pasien, melakukan prapemrosesan gambar (resizing ke 224x224 piksel), lalu menghasilkan prediksi apakah lesi kulit tergolong **Cancer** atau **Non-cancer** disertai anjuran medis dan tingkat keyakinan (confidence score).

---

## 🖼 Preview & Architecture

![Skin Cancer Detection Preview](/project-2-skin-cancer.png)


## 🚀 Tech Stack & Cloud Infrastructure

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Backend Framework** | [Hapi.js](https://hapi.dev/) `^21.3.12` | Framework server HTTP modular dan aman |
| **Machine Learning Engine** | [TensorFlow.js Node](https://www.tensorflow.org/js) `^4.22.0` | Server-side deep learning inference |
| **Model Hosting** | **Google Cloud Storage (GCS)** | Menyimpan dan melayani model graph TensorFlow.js |
| **Database** | **Google Cloud Firestore** | NoSQL database untuk menyimpan riwayat hasil prediksi |
| **Deployment / Compute** | **Compute Engine / App Engine** | Server hosting VM atau PaaS pada Google Cloud Platform |
| **Environment Config** | `dotenv` `^16.4.5` | Manajemen environment variable lokal dan produksi |

---

## ✨ Key Features

1. **Automated Image Classification**: Memprediksi gambar lesi kulit ke dalam kategori `Cancer` atau `Non-cancer`.
2. **Confidence Scoring & Medical Advice**: Memberikan saran medis lanjutan berdasarkan hasil inferensi model (*"Segera periksa ke dokter!"* atau *"Penyakit kanker tidak terdeteksi."*).
3. **Cloud Model Fetching**: Model dimuat secara dinamis saat inisialisasi server melalui URL Cloud Storage publik/terproteksi.
4. **Persistent Firestore Logging**: Setiap hasil prediksi disimpan dengan identitas unik UUID dan timestamp ISO secara otomatis ke Firestore.
5. **Strict Input Validation**: Validasi ukuran payload maksimum 1MB (`1.000.000 bytes`) serta penanganan error terpusat (`400 Bad Request`, `413 Payload Too Large`).

---

## 📁 Project Structure

```
ml-web-server-main/
├── assets/
│   ├── README.md                  # Panduan penempatan aset visual
│   └── preview.png                # Tangkapan layar arsitektur / hasil pengujian
├── src/
│   ├── exceptions/
│   │   ├── ClientError.js         # Base custom error class
│   │   └── InputError.js          # Error untuk input atau inferensi tidak valid (400)
│   ├── server/
│   │   ├── handler.js             # Controller pemrosesan prediksi & penyimpanan
│   │   ├── routes.js              # Definisi endpoint POST /predict & batasan payload
│   │   └── server.js              # Inisialisasi Hapi server, CORS, & error handling
│   └── services/
│       ├── inferenceService.js    # Preprocessing gambar (224x224) & inferensi TensorFlow.js
│       ├── loadModel.js           # Pengambilan model graph dari Google Cloud Storage
│       └── storeData.js           # Service penyimpanan data ke Google Cloud Firestore
├── .env.example                   # Template konfigurasi environment
├── .gitignore                     # Filter file sensitif, kredensial, & dependensi
├── package.json                   # Dependensi proyek & npm scripts
└── README.md                      # Dokumentasi utama proyek
```

---


## 🛠 Getting Started

### Prerequisites

Pastikan perangkat Anda sudah terinstal:
- [Node.js](https://nodejs.org/) versi `18.x` atau `20.x`
- `npm` (Node Package Manager)
- Akun Google Cloud Platform dengan API **Firestore** dan **Cloud Storage** aktif

### Installation

1. **Clone repositori**:
   ```bash
   git clone https://github.com/bellalee00/skin-cancer.git
   cd skin-cancer
   ```

2. **Instal dependensi proyek**:
   ```bash
   npm install
   ```

### Environment Variables

Salin berkas konfigurasi template `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Sesuaikan nilai di dalam `.env`:
```env
PORT=3000
MODEL_URL=https://storage.googleapis.com/<nama-bucket-anda>/model.json
PROJECT_ID=<gcp-project-id-anda>
```

> [!IMPORTANT]
> Jangan pernah mengunggah file `.env` asli atau file `serviceAccountKey.json` ke repositori publik GitHub!

### Running the Server

- **Mode Pengembangan (Hot Reload)**:
  ```bash
  npm run start:dev
  ```
- **Mode Produksi**:
  ```bash
  npm start
  ```
Server akan berjalan di `http://0.0.0.0:3000` (atau port sesuai variabel `PORT`).

---



---

## 👤 Author

- **Bella Azka Oktavia**
- Machine Learning & Cloud Computing Enthusiast
