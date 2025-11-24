import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const docRef = doc(db, "questions", String(id));
    const questionSnap = await getDoc(docRef);

    if (!questionSnap.exists()) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }
    // Question
    // questionSnap.data()

    return NextResponse.json({"message":"Succesful",
        "Question":questionSnap.data()
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to get question" }, { status: 500 });
  }
}
