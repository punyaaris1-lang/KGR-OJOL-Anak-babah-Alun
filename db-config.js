// Menggunakan versi 12.14.0 sesuai konfigurasi Bapak
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnXJ-6G7Is-MibPmbhEe21Yk4PQtU6yrg",
  authDomain: "kgr-babah-alun.firebaseapp.com",
  projectId: "kgr-babah-alun",
  storageBucket: "kgr-babah-alun.firebasestorage.app",
  messagingSenderId: "781368176556",
  appId: "1:781368176556:web:aec1b948dec88994359409",
  measurementId: "G-D81MB9W35D"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export db dan auth agar bisa dipanggil dari halaman HTML lain
export const db = getFirestore(app);
export const auth = getAuth(app);
