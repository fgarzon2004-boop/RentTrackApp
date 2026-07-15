import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const messagesCollection = collection(db, "messages");

function docToMessage(docSnap) {
  return { id: docSnap.id, ...docSnap.data() };
}

export async function sendMessage({ apartmentId, tenantId, senderId, senderRole, text }) {
  const newMessage = {
    apartmentId,
    tenantId,
    senderId,
    senderRole,
    text,
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(messagesCollection, newMessage);
  return { id: docRef.id, ...newMessage };
}

export async function getThreadMessages(apartmentId, tenantId) {
  const q = query(
    messagesCollection,
    where("apartmentId", "==", apartmentId),
    where("tenantId", "==", tenantId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map(docToMessage)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

export async function getConversationsForTenant(tenantId) {
  const q = query(messagesCollection, where("tenantId", "==", tenantId));
  const snapshot = await getDocs(q);
  return groupIntoThreads(snapshot.docs.map(docToMessage));
}

export async function getConversationsForApartments(apartmentIds) {
  if (!apartmentIds || apartmentIds.length === 0) return [];

  const chunks = [];
  for (let i = 0; i < apartmentIds.length; i += 10) {
    chunks.push(apartmentIds.slice(i, i + 10));
  }

  const allMessages = [];
  for (const chunk of chunks) {
    const q = query(messagesCollection, where("apartmentId", "in", chunk));
    const snapshot = await getDocs(q);
    allMessages.push(...snapshot.docs.map(docToMessage));
  }

  return groupIntoThreads(allMessages);
}

function groupIntoThreads(messages) {
  const threadsMap = new Map();

  messages.forEach((m) => {
    const key = `${m.apartmentId}__${m.tenantId}`;
    const existing = threadsMap.get(key);
    if (!existing || new Date(m.createdAt) > new Date(existing.lastMessage.createdAt)) {
      threadsMap.set(key, {
        apartmentId: m.apartmentId,
        tenantId: m.tenantId,
        lastMessage: m,
      });
    }
  });

  return Array.from(threadsMap.values()).sort(
    (a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
  );
}
