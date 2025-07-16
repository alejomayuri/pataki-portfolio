import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const section = searchParams.get("section");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  try {
    // Paso 1: Obtener UID desde /usernames/{username}
    const usernameRef = doc(db, "usernames", username);
    const usernameSnap = await getDoc(usernameRef);

    if (!usernameSnap.exists()) {
      return NextResponse.json({ error: "Username not found" }, { status: 404 });
    }

    const { uid } = usernameSnap.data()

    // Paso 2: Obtener datos reales desde /usuarios/{uid}
    const docRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = docSnap.data();

    if (section) {
      const sectionData = userData["portfolio"][section] || userData["portfolio"].pages?.find(page => page.slug === section);
      if (!sectionData) {
        return NextResponse.json({ error: "Section not found" }, { status: 404 });
      }
      return NextResponse.json(sectionData);
    }

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
