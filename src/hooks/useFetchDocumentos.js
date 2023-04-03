import { useState, useEffect } from "react";
import { db } from '../firebase/config'
import { doc, getDoc } from "firebase/firestore";



export const useFetchDocumentos = (docCollection, id) => {
    const [documentos, setDocumentos] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // DEAL WITH MEMORY LEAK
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadDocumentos() {
            if (cancelled) return
            setLoading(true)

            
            
            try {
                
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)

                setDocumentos(docSnap.data())

                setLoading(false)

            } catch (error) {
                console.log(error)
                setError(error.message)

                setLoading(true)
            }

        }

        loadDocumentos()


    }, [docCollection, id, cancelled])

    useEffect(() => {
      return () =>  setCancelled(true)
    }, [])

    return {documentos, loading, error}
}