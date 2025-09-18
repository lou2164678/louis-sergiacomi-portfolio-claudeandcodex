declare module 'pdf-parse' {
  const pdfParse: (b: Buffer) => Promise<{ text: string }>
  export default pdfParse
}

