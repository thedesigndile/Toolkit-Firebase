# File Conversion Toolkit Backend

A FastAPI backend service for file conversion operations including PDF to Word, Word to PDF, Image to PDF, Excel to CSV, and ZIP extraction.

## Features

- **PDF to Word**: Convert PDF documents to Word format
- **Word to PDF**: Convert Word documents to PDF format
- **Image to PDF**: Convert images (PNG, JPG, JPEG, GIF, BMP) to PDF
- **Excel to CSV**: Convert Excel files to CSV format
- **ZIP Extract**: Extract files from ZIP archives

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

### Development
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Production
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### Health Check
- `GET /` - API information
- `GET /health` - Health check endpoint

### Conversion Endpoints
- `POST /pdf-to-word` - Convert PDF to Word
- `POST /word-to-pdf` - Convert Word to PDF
- `POST /image-to-pdf` - Convert Image to PDF
- `POST /excel-to-csv` - Convert Excel to CSV
- `POST /zip-extract` - Extract ZIP file

### Usage Example

```python
import requests

# Convert PDF to Word
files = {'file': open('document.pdf', 'rb')}
response = requests.post('http://localhost:8000/pdf-to-word', files=files)
with open('document.docx', 'wb') as f:
    f.write(response.content)
```

## Deployment

### Docker
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Google Cloud Run
```bash
gcloud run deploy toolkit-service \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## CORS Configuration

The API includes CORS middleware configured to allow all origins. For production, update the CORS settings in `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Replace with your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Error Handling

The API includes comprehensive error handling:
- File type validation
- Conversion process error handling
- Temporary file cleanup
- Proper HTTP status codes and error messages

## File Size Limits

For production deployment, consider adding file size limits and implementing proper file validation based on your requirements.