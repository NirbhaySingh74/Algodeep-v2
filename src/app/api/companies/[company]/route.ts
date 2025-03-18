import { NextResponse } from "next/server";
import axios from "axios";
import Papa from "papaparse";

export async function GET(request: Request, { params }: { params: { company: string } }) {
  const { company } = await params;

  if (!company) {
    return NextResponse.json({ error: "Invalid or missing company parameter" }, { status: 400 });
  }

  console.log("Fetching data for company:", company);

  try {
    const response = await axios.get<string>(
      `https://raw.githubusercontent.com/krishnadey30/LeetCode-Questions-CompanyWise/master/${company}_alltime.csv`
    );
    const csvData: string = response.data;

    // Wrap Papa.parse in a Promise to await its completion
    const parsedData = await new Promise<any[]>((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        complete: (results) => {
          const filteredResults = results.data
            .filter((row: any) => row.ID && row.ID.trim() !== "")
            .slice(0, 200); // Limit to 200 results
          resolve(filteredResults);
        },
        error: (error: Error) => reject(error),
      });
    });

    return NextResponse.json(parsedData, { status: 200 });
  } catch (error) {
    console.error("Error fetching or parsing CSV data:", error);
    return NextResponse.json(
      { error: "Error fetching or parsing CSV data", details: (error as Error).message },
      { status: 500 }
    );
  }
}