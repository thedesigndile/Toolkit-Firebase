from fastapi import FastAPI, UploadFile, HTTPException, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import fitz  # PyMuPDF
from docx import Document
from docx2pdf import convert
from fpdf import FPDF
from PIL import Image, ImageFilter, ImageEnhance, ImageOps
import pandas as pd
import zipfile
import os
import tempfile
import shutil
import json
import base64
import io
from pathlib import Path
from typing import Optional, List
import asyncio

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

@app.post("/compress-image")
async def compress_image(file: UploadFile = File(...), quality: int = Form(80)):
    """Compress an image file"""
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_output:
            output_path = temp_output.name

        # Compress image
        img = Image.open(file.file)
        
        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            img = img.convert('RGB')
        
        # Save with compression
        img.save(output_path, 'JPEG', quality=quality, optimize=True)

        return FileResponse(
            output_path,
            media_type='image/jpeg',
            filename=file.filename.rsplit('.', 1)[0] + '_compressed.jpg'
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compression failed: {str(e)}")

@app.post("/resize-image")
async def resize_image(file: UploadFile = File(...), width: int = Form(...), height: int = Form(...)):
    """Resize an image"""
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_output:
            output_path = temp_output.name

        img = Image.open(file.file)
        resized_img = img.resize((width, height), Image.Resampling.LANCZOS)
        resized_img.save(output_path, 'PNG')

        return FileResponse(
            output_path,
            media_type='image/png',
            filename=file.filename.rsplit('.', 1)[0] + '_resized.png'
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resize failed: {str(e)}")

@app.post("/convert-image")
async def convert_image(file: UploadFile = File(...), format: str = Form(...)):
    """Convert image format"""
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif')):
        raise HTTPException(status_code=400, detail="File must be an image")

    if format.lower() not in ['png', 'jpg', 'jpeg', 'webp']:
        raise HTTPException(status_code=400, detail="Unsupported output format")

    try:
        format_lower = format.lower()
        if format_lower == 'jpg':
            format_lower = 'jpeg'
            
        extension = 'jpg' if format_lower == 'jpeg' else format_lower
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=f'.{extension}') as temp_output:
            output_path = temp_output.name

        img = Image.open(file.file)
        
        # Handle transparency for JPEG
        if format_lower == 'jpeg' and img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background

        img.save(output_path, format_lower.upper())

        media_type = f'image/{extension}'
        return FileResponse(
            output_path,
            media_type=media_type,
            filename=file.filename.rsplit('.', 1)[0] + f'.{extension}'
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

@app.post("/crop-image")
async def crop_image(file: UploadFile = File(...), x: int = Form(...), y: int = Form(...),
                    width: int = Form(...), height: int = Form(...)):
    """Crop an image"""
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_output:
            output_path = temp_output.name

        img = Image.open(file.file)
        cropped_img = img.crop((x, y, x + width, y + height))
        cropped_img.save(output_path, 'PNG')

        return FileResponse(
            output_path,
            media_type='image/png',
            filename=file.filename.rsplit('.', 1)[0] + '_cropped.png'
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Crop failed: {str(e)}")

@app.post("/rotate-image")
async def rotate_image(file: UploadFile = File(...), angle: int = Form(...)):
    """Rotate an image"""
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_output:
            output_path = temp_output.name

        img = Image.open(file.file)
        rotated_img = img.rotate(angle, expand=True, fillcolor='white')
        rotated_img.save(output_path, 'PNG')

        return FileResponse(
            output_path,
            media_type='image/png',
            filename=file.filename.rsplit('.', 1)[0] + '_rotated.png'
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Rotation failed: {str(e)}")

@app.post("/pdf-to-excel")
async def pdf_to_excel(file: UploadFile = File(...)):
    """Convert PDF to Excel (basic table extraction)"""
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="File must be a PDF")

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_pdf:
            temp_pdf_path = temp_pdf.name
            shutil.copyfileobj(file.file, temp_pdf)

        output_path = temp_pdf_path.replace('.pdf', '.xlsx')

        # Extract text and attempt to structure as table
        pdf_document = fitz.open(temp_pdf_path)
        all_text = []
        
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text = page.get_text()
            lines = text.strip().split('\n')
            all_text.extend(lines)

        pdf_document.close()
        
        # Create a simple DataFrame
        df = pd.DataFrame({'Extracted_Text': all_text})
        df.to_excel(output_path, index=False)

        # Clean up temp PDF
        os.unlink(temp_pdf_path)

        return FileResponse(
            output_path,
            media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            filename=file.filename.replace('.pdf', '.xlsx')
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")

@app.post("/create-zip")
async def create_zip(files: List[UploadFile] = File(...)):
    """Create a ZIP archive from multiple files"""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.zip') as temp_zip:
            output_path = temp_zip.name

        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            for file in files:
                # Add file to zip
                file_content = await file.read()
                zip_file.writestr(file.filename, file_content)

        return FileResponse(
            output_path,
            media_type='application/zip',
            filename='archive.zip'
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ZIP creation failed: {str(e)}")

@app.post("/qr-generate")
async def generate_qr_code(text: str = Form(...), size: int = Form(200)):
    """Generate QR code from text"""
    try:
        import qrcode
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_output:
            output_path = temp_output.name

        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(text)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")
        img = img.resize((size, size))
        img.save(output_path, 'PNG')

        return FileResponse(
            output_path,
            media_type='image/png',
            filename='qrcode.png'
        )

    except ImportError:
        raise HTTPException(status_code=500, detail="QR code library not installed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"QR generation failed: {str(e)}")