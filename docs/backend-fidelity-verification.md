# Backend-Powered Fidelity Verification Guide

This guide validates the Python FastAPI backend for higher-fidelity processing (PDF↔Office, ZIP extraction, server-side image ops) and confirms the frontend switches to backend-powered paths where implemented.

Key backend source: [FastAPI app](backend/main.py:21)
Frontend integrations: [API_BASE_URL + callBackendAPI()](src/lib/tool-functions.ts:39), [PDF/Image/ZIP integrations](src/lib/tool-functions.ts:485), [ToolPageClient switchboard](src/app/tools/[slug]/client-component.tsx:205), [Tools catalog](src/lib/tools.ts:42)

Important note about Word→PDF (docx2pdf)
- The Word→PDF endpoint in [FastAPI app](backend/main.py:82) uses docx2pdf. On Linux servers without Microsoft Word (macOS or Windows required for docx2pdf), conversion may fail.
- If Linux-only: either skip “Word→PDF” for backend fidelity or replace docx2pdf with LibreOffice (unoconv/soffice) in a future update.

Prerequisites
- Python 3.10+ (recommended), venv, pip
- Port 8000 available for backend
- Test inputs (small/sample and larger “stress” files)
  - PDFs (text-based; 10–50+ pages for stress)
  - Images (JPG, PNG, WebP; include large dimensions e.g. 4000×3000)
  - Excel (.xlsx)
  - Word (.docx) — only if environment supports docx2pdf
  - A .zip archive with 2–5 small files

1) Create and activate a virtual environment
- macOS/Linux:
  - python3 -m venv .venv
  - source .venv/bin/activate
- Windows (PowerShell):
  - py -3 -m venv .venv
  - .\.venv\Scripts\Activate.ps1

2) Install backend dependencies
- pip install --upgrade pip
- pip install -r [requirements.txt](backend/requirements.txt:1)

3) Run the FastAPI server
- uvicorn backend.main:app --host 0.0.0.0 --port 8000

4) Health check
- curl http://localhost:8000/health
- Expected: {"status":"healthy"}

5) Endpoint-by-endpoint verification

Image operations (Pillow)
- Compress Image: [compress-image](backend/main.py:218)
  - curl -X POST http://localhost:8000/compress-image \
    -F "file=@./testdata/image.jpg" \
    -F "quality=70" \
    -o image_compressed.jpg
  - Accept: image_compressed.jpg exists, opens, visibly smaller than original at moderate quality (70), format JPEG output.

- Resize Image: [resize-image](backend/main.py:248)
  - curl -X POST http://localhost:8000/resize-image \
    -F "file=@./testdata/image.png" \
    -F "width=800" -F "height=600" \
    -o image_resized.png
  - Accept: image_resized.png dimension is 800×600; content intact.

- Convert Image: [convert-image](backend/main.py:271)
  - curl -X POST http://localhost:8000/convert-image \
    -F "file=@./testdata/image.png" \
    -F "format=jpg" \
    -o image_converted.jpg
  - Accept: result in requested format (jpg/jpeg/png/webp); opens.

- Crop Image: [crop-image](backend/main.py:310)
  - curl -X POST http://localhost:8000/crop-image \
    -F "file=@./testdata/image.png" \
    -F "x=100" -F "y=80" -F "width=400" -F "height=300" \
    -o image_cropped.png
  - Accept: output dimensions ~400×300; crop corresponds to (x,y) origin.

- Rotate Image: [rotate-image](backend/main.py:334)
  - curl -X POST http://localhost:8000/rotate-image \
    -F "file=@./testdata/image.png" \
    -F "angle=90" \
    -o image_rotated.png
  - Accept: orientation rotated accordingly; no clipping.

PDF ↔ Office and conversions (PyMuPDF, pandas, docx)
- PDF→Word: [pdf-to-word](backend/main.py:40)
  - curl -X POST http://localhost:8000/pdf-to-word \
    -F "file=@./testdata/sample.pdf" \
    -o sample.docx
  - Accept: sample.docx contains text extracted per page (text-based PDFs only). Note: This creates a text-focused DOCX (basic fidelity).

- Word→PDF: [word-to-pdf](backend/main.py:82)
  - curl -X POST http://localhost:8000/word-to-pdf \
    -F "file=@./testdata/sample.docx" \
    -o sample.pdf
  - Accept: sample.pdf created and opens. Limitation: docx2pdf requires Word (macOS/Windows). On Linux without MS Word, expect failure unless replaced with LibreOffice in code.

- Image→PDF: [image-to-pdf](backend/main.py:111)
  - curl -X POST http://localhost:8000/image-to-pdf \
    -F "file=@./testdata/image.jpg" \
    -o image.pdf
  - Accept: image.pdf produced; image centered on page.

- Excel→CSV: [excel-to-csv](backend/main.py:144)
  - curl -X POST http://localhost:8000/excel-to-csv \
    -F "file=@./testdata/sample.xlsx" \
    -o sample.csv
  - Accept: CSV rows correspond to the first sheet’s data; opens in a text editor/spreadsheet.

- PDF→Excel (basic extraction): [pdf-to-excel](backend/main.py:357)
  - curl -X POST http://localhost:8000/pdf-to-excel \
    -F "file=@./testdata/sample.pdf" \
    -o sample.xlsx
  - Accept: sample.xlsx created with one column (Extracted_Text) representing lines of text per page.

ZIP operations
- Create ZIP: [create-zip](backend/main.py:398)
  - curl -X POST http://localhost:8000/create-zip \
    -F "files=@./testdata/doc1.txt" \
    -F "files=@./testdata/doc2.txt" \
    -o archive.zip
  - Accept: archive.zip contains doc1.txt and doc2.txt; compressed; opens in standard ZIP utilities.

- Extract ZIP: [zip-extract](backend/main.py:168)
  - curl -X POST http://localhost:8000/zip-extract \
    -F "file=@./testdata/sample.zip" \
    -o first_extracted.bin
  - Accept: Endpoint returns first extracted file (by name) due to simplified API contract; confirm content matches original.

QR generation
- QR Code: [qr-generate](backend/main.py:420)
  - curl -X POST http://localhost:8000/qr-generate \
    -F "text=hello world" \
    -F "size=256" \
    -o qrcode.png
  - Accept: PNG exists and renders a QR code image; opens without errors.

6) Frontend integration checks with backend up
- Ensure backend is running at http://localhost:8000.
- Frontend dev: npx next dev -p 9003 --turbopack
- Browse http://localhost:9003/tools and validate these tools now prefer backend where implemented:
  - PDF→Word and PDF→Excel in [ToolPageClient](src/app/tools/[slug]/client-component.tsx:240) and [tool-functions.ts](src/lib/tool-functions.ts:485) — callBackendAPI() is used first, falling back to client-only if backend fails.
  - Zip Extract in [client-component.tsx](src/app/tools/[slug]/client-component.tsx:301) + [tool-functions.ts](src/lib/tool-functions.ts:573) — backend first, client ZIP fallback if backend unavailable.
  - Image operations in [tool-functions.ts](src/lib/tool-functions.ts:253) will use backend for certain cases (e.g., compress) when client compression is ineffective.

To verify frontend→backend wiring
- Temporarily stop backend; trigger operations to confirm fallbacks activate with clear error-to-fallback messaging.
- Start backend again; re-run the same operations; confirm success, correct output naming, and improved fidelity/performance (especially for PDF↔Office + ZIP extract).

7) Acceptance criteria checklist (backend fidelity)
- API endpoints:
  - Return correct content types; non-200 responses include informative JSON error messages via [callBackendAPI()](src/lib/tool-functions.ts:44) error parsing.
  - Consistent output naming and expected formats (see below).
- Frontend with backend available:
  - PDF→Word: DOCX contains page text, minimal structure.
  - PDF→Excel: XLSX with Extracted_Text column rows; no crashes.
  - Word→PDF: If environment supports docx2pdf, PDF generated; otherwise document limitation.
  - ZIP Extract: Retrieves first file; no server crash on malformed zips (in that case returns 400 with detail).
  - Image ops (compress/resize/convert/crop/rotate): return corresponding formats/dimensions, with clear suffixes.
- Output naming conventions (representative):
  - PDF compress: base-compressed.pdf
  - Split: range_1-2.pdf inside zip
  - Convert Image: base.jpg/.png/.webp
  - Resize: base-resized.png
  - Crop: base-cropped.png
  - Rotate: base-rotated.png
  - Image→PDF: images.pdf
  - QR: qrcode.png
  - Create Zip: archive.zip
- UI/UX:
  - Progress steps and toasts reflect server–client path accurately; clear fallbacks on server errors.

8) Troubleshooting
- 422/400 errors:
  - Ensure using correct form fields (“file”, “files”, “quality”, “width”, “height”, “format”, “x”, “y”, “angle”, “size”, “text”).
- Word→PDF fails on Linux:
  - Confirm OS constraints for docx2pdf. For Linux, consider switching implementation to LibreOffice (unoconv/soffice) in [FastAPI app](backend/main.py:82) or skip this test.
- Large files time out:
  - Increase client timeout (reverse proxy) or test with moderately large inputs; server logic itself is synchronous for most tasks.
- CORS:
  - By default CORS allows all origins in dev; adjust allowedOrigins in [FastAPI app](backend/main.py:23) for production.

9) Optional: Dockerized backend (for consistent environment)
- Create a Dockerfile that installs system deps + backend/requirements.txt, then run uvicorn.
- Pros: consistent Python, Pillow, PyMuPDF, qrcode versions; reproducible fidelity outcomes.
- Note: docx2pdf still constrained; consider LibreOffice-based route inside container if Linux-only.

10) Summary
- Backend fidelity improves: PDF→Word/Excel quality vs client-only fallbacks, ZIP extraction reliability, and certain image operations.
- Frontend integrates seamlessly via [callBackendAPI()](src/lib/tool-functions.ts:44) with robust fallback paths.
- Complete this verification to sign off “Backend-powered fidelity verification”.

Appendix: Quick-start commands (Unix-like)
- cd /path/to/repo
- python3 -m venv .venv && source .venv/bin/activate
- pip install --upgrade pip
- pip install -r [backend/requirements.txt](backend/requirements.txt:1)
- uvicorn backend.main:app --host 0.0.0.0 --port 8000
- curl http://localhost:8000/health
- In a separate terminal:
  - npx next dev -p 9003 --turbopack
  - Open http://localhost:9003/tools
- Execute curl commands above for each endpoint and confirm frontend behavior.

References
- Backend routing and handlers: [FastAPI app](backend/main.py:21)
- Frontend API configuration: [API_BASE_URL + callBackendAPI()](src/lib/tool-functions.ts:39)
- Tool orchestration: [ToolPageClient switchboard](src/app/tools/[slug]/client-component.tsx:205)
- Tools registry (names/categories/icons): [tools.ts](src/lib/tools.ts:42)