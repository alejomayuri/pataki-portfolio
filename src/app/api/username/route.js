import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ error: "Missing uid" }, { status: 400 });
  }

  try {
    const q = query(collection(db, "usernames"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ error: "Username not found" }, { status: 404 });
    }

    const username = querySnapshot.docs[0].id;

    return NextResponse.json({ username });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}