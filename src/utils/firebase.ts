import * as admin from 'firebase-admin';

// Configuração do Firebase Admin SDK para acesso ao Storage
import serviceAccount from '../keys/rastreamento-keys.json';
import { getDataAtualBrasil } from './dataProcessing';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'rastreamento-barcos.appspot.com'
});

// Função que converte um array de strings em um arquivo txt e salva no Storage
export async function saveFileToStorage(stringsArray: string[]) {
    const bucket = admin.storage().bucket();

    // Convert the string array to a single string
    const text = stringsArray.join("\n");

    // Create a reference to the file in Firebase Storage
    const file = bucket.file(`logs/${getDataAtualBrasil().format('DD-MM-YYYY HH:mm:ss')}.txt`);
  
    // Upload the file to Firebase Storage
    file.save(text, {
      metadata: {
        contentType: "text/plain"
      }
    }, function(error) {
      if (error) {
        console.error("Error uploading file:", error);
      } else {
        console.log("File uploaded successfully.");
      }
    });
}