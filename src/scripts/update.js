const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const { firebaseConfig } = require("../lib/firebase-config"); // ajustá si tu config está en otro archivo

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Datos a subir
const data = {
    "image": "/demo/persona1.jpg",
    "title": "Alejo Mayurí",
    "social": {
        "facebook": "https://www.facebook.com/juanperezfotografia",
        "twitter": "https://twitter.com/juanperez_foto",
        "instagram": "https://www.instagram.com/juanperezfotografia",
        "linkedin": "https://www.linkedin.com/in/juanperezfotografia"
    },
    "linkGroup": [
        {
            "title": "Contacto",
            "links": [
                {
                    "title": "Descargar CV",
                    "link": "/cv.pdf"
                },
                {
                    "title": "WhatsApp",
                    "link": "https://wa.me/1234567890"
                },
                {
                    "title": "Twitter",
                    "link": "https://twitter.com/juanperez_foto",
                    "image": "/demo/image2.jpg"
                },
                {
                    "title": "Instagram",
                    "link": "https://www.instagram.com/juanperezfotografia"
                },
                {
                    "title": "Linkedin",
                    "link": "https://www.linkedin.com/in/juanperezfotografia",
                    "image": "/demo/image3.jpg"
                }
            ]
        },
        {
            "title": "Colaboraciones",
            "links": [
                {
                    "title": "Our Place x Alejo Mayuri",
                    "link": "https://www.ourplace.com/collections/alejo-mayuri"
                },
                {
                    "title": "Twitter",
                    "link": "https://twitter.com/juanperez_foto",
                    "image": "/demo/image2.jpg"
                },
                {
                    "title": "Serendipity x Alejo Mayuri",
                    "link": "https://www.linkedin.com/in/juanperezfotografia",
                    "image": "/demo/image3.jpg"
                }
            ]
        },
        {
            "title": "Ver",
            "links": [
                {
                    "title": "Stream Now Our Place x Alejo Mayuri",
                    "link": "https://www.ourplace.com/collections/alejo-mayuri"
                },
                {
                    "title": "Mirar Chef",
                    "link": "https://twitter.com/juanperez_foto",
                    "image": "/demo/image2.jpg"
                },
                {
                    "title": "Otras cosas",
                    "link": "https://www.linkedin.com/in/juanperezfotografia",
                    "image": "/demo/image3.jpg"
                }
            ]
        }
    ]
};

async function uploadData() {
  try {
    const userRef = doc(db, "usuarios", "alejomayuri");
    await setDoc(userRef, { "contacto": data }, { merge: true });
    console.log("Datos subidos correctamente.");
  } catch (error) {
    console.error("Error al subir los datos:", error);
  }
}

uploadData();
