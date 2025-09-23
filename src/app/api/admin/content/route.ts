import { NextRequest } from "next/server";
import { VI_FILE_PATH, EN_FILE_PATH } from "@/config/paths";
import { HttpStatus } from "@/config/httpStatus";
import { ErrorMessage } from "@/config/errorMessage";
import { jsonResponse } from "@/config/response";
import { readJsonFile, writeJsonFile } from "@/utils/fileHelpers";

export async function GET() {
  try {
    const [viData, enData] = await Promise.all([
      readJsonFile(VI_FILE_PATH),
      readJsonFile(EN_FILE_PATH),
    ]);
    return jsonResponse({ vi: viData, en: enData });
  } catch (error) {
    console.error("Error reading data files:", error);
    return jsonResponse(
      { error: ErrorMessage.FILE_READ_ERROR, errorCode: "FILE_READ_ERROR" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { vi, en } = await request.json();
    if (!vi || !en) {
      return jsonResponse(
        { error: ErrorMessage.INVALID_DATA, errorCode: "INVALID_DATA" },
        HttpStatus.BAD_REQUEST
      );
    }

    await Promise.all([
      writeJsonFile(VI_FILE_PATH, vi),
      writeJsonFile(EN_FILE_PATH, en),
    ]);
    return jsonResponse({ success: true }, HttpStatus.CREATED);
  } catch (error) {
    console.error("Error writing data files:", error);
    return jsonResponse(
      { error: ErrorMessage.FILE_WRITE_ERROR, errorCode: "FILE_WRITE_ERROR" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { vi, en, language } = await request.json();

    if (language === "vi" && vi) {
      const currentViData = await readJsonFile(VI_FILE_PATH);
      await writeJsonFile(VI_FILE_PATH, { ...currentViData, ...vi });
    }

    if (language === "en" && en) {
      const currentEnData = await readJsonFile(EN_FILE_PATH);
      await writeJsonFile(EN_FILE_PATH, { ...currentEnData, ...en });
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Error updating data files:", error);
    return jsonResponse(
      { error: ErrorMessage.UPDATE_ERROR, errorCode: "UPDATE_ERROR" },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
