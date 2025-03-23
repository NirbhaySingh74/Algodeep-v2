import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import Papa from "papaparse";

// Define the params interface explicitly
interface Params {
  company: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { company } = await params;

  if (!company) {
    return NextResponse.json(
      { error: "Invalid or missing company parameter" },
      { status: 400 }
    );
  }

  console.log("Fetching data for company:", company);

  try {
    const response = await axios.get<string>(
      `https://raw.githubusercontent.com/krishnadey30/LeetCode-Questions-CompanyWise/master/${company}_alltime.csv`
    );

    const csvData: string = response.data;

    const parsedData = await new Promise<Record<string, string>[]>(
      (resolve, reject) => {
        Papa.parse<Record<string, string>>(csvData, {
          header: true,
          complete: (results) => {
            const filteredResults = results.data
              .filter((row) => row.ID && row.ID.trim() !== "")
              .slice(0, 200);
            resolve(filteredResults);
          },
          error: (error: Error, file: Papa.LocalFile | string | null) =>
            reject(error), // Updated signature
        });
      }
    );

    return NextResponse.json(parsedData, { status: 200 });
  } catch (error) {
    console.error("Error fetching or parsing CSV data:", error);

    return NextResponse.json(
      {
        error: "Error fetching or parsing CSV data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}