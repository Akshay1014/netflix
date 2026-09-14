import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    getDoc,
    doc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where,
    serverTimestamp 
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBMvXUcZLUonQAYqIlp3Ubp84ClX5BkWMw",
    authDomain: "netflix-5a8fb.firebaseapp.com",
    projectId: "netflix-5a8fb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ===== INSERT DATA =====
export const insertData = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log("Document added with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document:", error);
        throw error;
    }
};

// ===== FETCH ALL DATA FROM COLLECTION =====
export const fetchAllData = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// ===== FETCH SINGLE DOCUMENT BY ID =====
export const fetchDataById = async (collectionName, documentId) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            console.log("Document not found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
    }
};

// ===== FETCH DATA WITH QUERY (FILTER) =====
export const fetchDataWithFilter = async (collectionName, fieldName, value) => {
    try {
        const q = query(collection(db, collectionName), where(fieldName, "==", value));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return data;
    } catch (error) {
        console.error("Error fetching filtered data:", error);
        throw error;
    }
};

// ===== UPDATE DATA =====
export const updateData = async (collectionName, documentId, updatedData) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        await updateDoc(docRef, {
            ...updatedData,
            updatedAt: serverTimestamp()
        });
        console.log("Document updated successfully!");
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
};

// ===== DELETE DATA =====
export const deleteData = async (collectionName, documentId) => {
    try {
        await deleteDoc(doc(db, collectionName, documentId));
        console.log("Document deleted successfully!");
    } catch (error) {
        console.error("Error deleting document:", error);
        throw error;
    }
};