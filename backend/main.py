from fastapi import FastAPI, UploadFile, HTTPException, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import fitz  # PyMuPDF
from docx import Document
from docx2pdf import convert
from fpdf import FPDF
from PIL import Image
import pandas as pd
import zipfile
import os
import tempfile
import shutil
from pathlib import Path

app = FastAPI(title="File Conversion Toolkit API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "File Conversion Toolkit API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/pdf-to-word")
async def pdf_to_word(file: UploadFile = File(...)):
    """Convert PDF to Word document"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
            temp_pdf_path = temp_pdf.name
            shutil.copyfileobj(file.file, temp_pdf)

        output_path = temp_pdf_path.replace('.pdf', '.docx')

        # Convert PDF to Word
        doc = Document()
        pdf_document = fitz.open(temp_pdf_path)

        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text = page.get_text()

            # Add page content to document
            if page_num > 0:
                doc.add_page_break()
            doc.add_paragraph(text)

        doc.save(output_path)
        pdf_document.close()

        # Clean up temp PDF
        os.unlink(temp_pdf_path)

        return FileResponse(
            output_path,
            media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            filename=file.filename.replace('.pdf', '.docx')
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

@app.post("/word-to-pdf")
async def word_to_pdf(file: UploadFile = File(...)):
    """Convert Word document to PDF"""
    if not file.filename.lower().endswith(('.docx', '.doc')):
        raise HTTPException(status_code=400, detail="File must be a Word document")

    try:
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix='.docx') as temp_docx:
            temp_docx_path = temp_docx.name
            shutil.copyfileobj(file.file, temp_docx)

        output_path = temp_docx_path.replace('.docx', '.pdf')

        # Convert Word to PDF
        convert(temp_docx_path, output_path)

        # Clean up temp Word file
        os.unlink(temp_docx_path)

        return FileResponse(
            output_path,
            media_type='application/pdf',
            filename=file.filename.replace('.docx', '.pdf').replace('.doc', '.pdf')
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

@app.post("/image-to-pdf")
async def image_to_pdf(file: UploadFile = File(...)):
    """Convert image to PDF"""
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
            output_path = temp_pdf.name

        # Convert image to PDF
        img = Image.open(file.file)
        pdf = FPDF()
        pdf.add_page()

        # Convert PIL image to temporary file for FPDF
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_img:
            img.save(temp_img.name, 'PNG')
            pdf.image(temp_img.name, 10, 10, 180, 0)
            os.unlink(temp_img.name)

        pdf.output(output_path)

        return FileResponse(
            output_path,
            media_type='application/pdf',
            filename=file.filename.rsplit('.', 1)[0] + '.pdf'
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

@app.post("/excel-to-csv")
async def excel_to_csv(file: UploadFile = File(...)):
    """Convert Excel file to CSV"""
    if not file.filename.lower().endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be an Excel file")

    try:
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix='.csv') as temp_csv:
            output_path = temp_csv.name

        # Convert Excel to CSV
        df = pd.read_excel(file.file)
        df.to_csv(output_path, index=False)

        return FileResponse(
            output_path,
            media_type='text/csv',
            filename=file.filename.rsplit('.', 1)[0] + '.csv'
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

@app.post("/zip-extract")
async def zip_extract(file: UploadFile = File(...)):
    """Extract ZIP file and return first file"""
    if not file.filename.lower().endswith('.zip'):
        raise HTTPException(status_code=400, detail="File must be a ZIP archive")

    try:
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix='.zip') as temp_zip:
            temp_zip_path = temp_zip.name
            shutil.copyfileobj(file.file, temp_zip)

        extract_dir = tempfile.mkdtemp()

        # Extract ZIP
        with zipfile.ZipFile(temp_zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_dir)
            file_list = zip_ref.namelist()

        # Clean up temp ZIP
        os.unlink(temp_zip_path)

        if not file_list:
            shutil.rmtree(extract_dir)
            raise HTTPException(status_code=400, detail="ZIP file is empty")

        # Return first extracted file
        first_file = file_list[0]
        first_file_path = os.path.join(extract_dir, first_file)

        return FileResponse(
            first_file_path,
            filename=first_file
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")

# Cleanup function to remove temporary files periodically
@app.on_event("shutdown")
async def cleanup_temp_files():
    """Clean up any remaining temporary files on shutdown"""
    temp_dir = tempfile.gettempdir()
    for filename in os.listdir(temp_dir):
        if filename.startswith('tmp') and filename.endswith(('.pdf', '.docx', '.csv', '.png')):
            try:
                os.unlink(os.path.join(temp_dir, filename))
            except:
                pass