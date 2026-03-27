import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// --- QUAN TRỌNG: Dán cấu hình Firebase của bạn vào đây ---
// Bạn có thể lấy thông tin này trong Firebase Console -> Project Settings
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Helper functions for Database
export const database = {
  // Products
  async getProducts() {
    const q = query(collection(db, "products"), orderBy("id", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
  },

  async addProduct(product) {
    return await addDoc(collection(db, "products"), product);
  },

  async updateProduct(id, updates) {
    const docRef = doc(db, "products", id);
    return await updateDoc(docRef, updates);
  },

  async deleteProduct(id) {
    const docRef = doc(db, "products", id);
    return await deleteDoc(docRef);
  },

  // Orders
  async getOrders() {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
  },

  async addOrder(order) {
    return await addDoc(collection(db, "orders"), {
      ...order,
      status: "pending",
      createdAt: new Date().toISOString()
    });
  },

  async updateOrderStatus(id, status) {
    const docRef = doc(db, "orders", id);
    return await updateDoc(docRef, { status });
  },

  // Contacts
  async getContacts() {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
  },

  async addContact(contact) {
    return await addDoc(collection(db, "contacts"), {
      ...contact,
      createdAt: new Date().toISOString()
    });
  }
};
