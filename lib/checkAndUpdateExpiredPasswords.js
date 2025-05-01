import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "../api/firebase"; // Import your Firebase database instance
import { useEffect } from 'react'; // Import useEffect

;

const checkAndUpdateExpiredPasswords = async () => {
  try {
    const passwordsCollection = collection(db, "passwords");
    const now = new Date();

    // Fetch all assigned passwords
    const q = query(
      passwordsCollection,
      where("status", "==", "assigned"),
    );
    const querySnapshot = await getDocs(q);

    for (const snap of querySnapshot.docs) { // Change to use a for...of loop
      const passwordData = snap.data();
      // Check if expiryDate is less than or equal to now
      if (passwordData.expiryDate && new Date(passwordData.expiryDate) <= now) {
        // For each expired password, update its status to "expired"
        const passwordRef = doc(db, "passwords", snap.id); // Use snap.id to get the document ID
        await updateDoc(passwordRef, {
          status: "expired",
        });
        console.log(`Password ${snap.id} status updated to expired.`);
      }
    }

    console.log("Expired password check completed.");
  } catch (error) {
    console.error("Error checking and updating expired passwords:", error);
    // Consider throwing the error or handling it in a way that's appropriate for your application
  }
};


export default checkAndUpdateExpiredPasswords;

