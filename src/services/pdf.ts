import puppeteer, { PDFOptions } from "puppeteer";
import { DEFAULT_PDF_OPTIONS } from "../constants/pdf";

interface CustomOpts {
  width?: number;
  height?: number;
}

export async function generatePDF(
  url: string,
  options?: CustomOpts,
): Promise<Buffer> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  const pdfOptions: PDFOptions = {
    ...DEFAULT_PDF_OPTIONS,
    width: options?.width || DEFAULT_PDF_OPTIONS.width,
    height: options?.height || DEFAULT_PDF_OPTIONS.height,
  };

  const pdfContent = await page.pdf(pdfOptions);
  await browser.close();
  // send as a buffer
  return Buffer.from(pdfContent);
}
