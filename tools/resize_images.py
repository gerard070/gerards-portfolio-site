from PIL import Image, ImageOps
import os

print("🚀 Script started")
# === Configuration ===
input_folder = '../images'         # Adjust this if your images are elsewhere
output_folder = '../resized'       # Will be created inside your site directory
target_size = (1200, 900)       # Width x Height, 4:3 aspect ratio

# === Ensure output folder exists ===
os.makedirs(output_folder, exist_ok=True)

# === Process images ===
print("Looking in:", input_folder)
print("Found files:", os.listdir(input_folder))
for filename in os.listdir(input_folder):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        # Open image
        img = Image.open(input_path).convert("RGB")

        # Pad image to target aspect ratio with white background
        img_with_padding = ImageOps.pad(img, target_size, color=(255, 255, 255))

        # Save resized image
        img_with_padding.save(output_path)

        print(f"Resized and saved: {output_path}")