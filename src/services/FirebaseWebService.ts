import * as fBase from 'src/boot/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import firebase from 'firebase/compat';
import DocumentReference = firebase.firestore.DocumentReference;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import FieldValue = firebase.firestore.FieldValue;
import DocumentData = firebase.firestore.DocumentData;

export class FirebaseWebService {
  public path: string;

  constructor(path: string) {
    this.path = path;
  }

  GET(orderByField: string): Promise<QuerySnapshot<DocumentData>> {
    const q = query(collection(fBase.fbDb, this.path), orderBy(orderByField));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return getDocs(q);
  }

  POST(payload: FieldValue): Promise<DocumentReference<DocumentData>> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return addDoc(collection(fBase.fbDb, this.path), payload);
  }

  PUT(document: DocumentReference, payload: FieldValue): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return updateDoc(document, payload);
  }

  DELETE(document: DocumentReference): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return deleteDoc(document);
  }
}
