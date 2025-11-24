// /app/api/add/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

export const runtime = "nodejs";


export async function POST(req: NextRequest) {
  try {
    const newQuestion = await req.json();

    if (!newQuestion?.Question || !newQuestion?.options) {
      return NextResponse.json({ error: "Invalid question data" }, { status: 400 });
    }

    // Save question to Firestore
    const docRef = doc(collection(db, "questions"), String(newQuestion.id));
    await setDoc(docRef, newQuestion);


    return NextResponse.json({ message: "Question added successfully!" });
  } catch (err: any) {
    console.error("Firestore error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to add question" },
      { status: 569 }
    );
  }
}
