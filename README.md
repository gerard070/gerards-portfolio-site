# gerards-portfolio-site

## 🖼 Image Resizer Tool

This project includes a Python script to automatically resize images and output them to the `resized/` directory for use in the portfolio.

### 📁 Folder Structure

/images/         ← Source images (original size)
/resized/        ← Output directory for resized images
/tools/resize_images.py

### ✅ How to Use

1. **Navigate to the project root**:

```bash
cd /Users/gerardconnolly/gitfast/gerards-portfolio-site

source venv/bin/activate

python3 tools/resize_images.py

	•	The script expects images/ to exist in the root.
	•	If resized/ doesn’t exist, it will be created automatically.
	•	Reference resized images in your HTML like so:

    <img src="resized/your-image.png" alt="Descriptive alt text" />

2. **Start a local server to preview your portfolio**:

After resizing your images, you can start a lightweight local web server to preview the portfolio site in your browser.

Make sure you're in the project root:

```bash
cd /Users/gerardconnolly/gitfast/gerards-portfolio-site
```

Then run:

```bash
python3 -m http.server 8080
```

This will serve your site on http://localhost:8080. Open that address in your browser to view your portfolio.