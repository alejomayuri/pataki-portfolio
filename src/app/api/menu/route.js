import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

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

    const { uid } = usernameSnap.data();

    // Paso 2: Obtener datos reales desde /usuarios/{uid}
    const userRef = doc(db, "usuarios", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "User data not found" }, { status: 404 });
    }

    const userData = userSnap.data();
    const { portfolio = {} } = userData;
    const { profileImage, title, fixed, menuLinks } = portfolio;

    return NextResponse.json({ 
      username,
      profileImage,
      title,
      fixed,
      menuLinks
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
