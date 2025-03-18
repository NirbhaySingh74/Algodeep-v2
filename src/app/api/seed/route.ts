// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { problems } from "@/data/problems";

export async function GET() {
  try {
    // Check existing problems to avoid duplicates
    const { data: existingProblems, error: fetchError } = await supabase
      .from("problems")
      .select("id");

    if (fetchError) throw fetchError;

    const existingIds = new Set(existingProblems?.map((p) => p.id));
    const problemsToInsert = problems.filter((p) => !existingIds.has(p.id.toString()));

    if (problemsToInsert.length === 0) {
      return NextResponse.json({ message: "All problems already seeded" });
    }

    const { error } = await supabase.from("problems").insert(
      problemsToInsert.map((problem) => ({
        id: problem.id.toString(),
        title: problem.title,
        difficulty: problem.difficulty,
        category: problem.category,
        link: problem.link,
      }))
    );

    if (error) throw error;

    return NextResponse.json({ message: "Problems seeded successfully", count: problemsToInsert.length });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed problems", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}