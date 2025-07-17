// lib/firebaseService.ts
import { firebaseConfig } from "@/config/constants";
import { getApp, getApps, initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";


class FirebaseService {
    private app;
    private db;

    constructor() {
        this.app = getApps().length ? getApp() : initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
    }

    async saveUser(uid: string, data: any) {
        const userRef = doc(this.db, "e-ai", "users", uid);
        await setDoc(userRef, data);
    }
}

export const firebaseService = new FirebaseService();
