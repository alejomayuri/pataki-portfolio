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
    const docRef = doc(db, "usuarios", username);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { image, title, fixed, menuLinks } = docSnap.data();

    return NextResponse.json({ image, title, fixed, menuLinks });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
