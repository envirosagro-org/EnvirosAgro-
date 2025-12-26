import requests

image_urls = {
    "great-green-wall.jpg": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&auto=format&fit=crop&q=80",
    "guardians-of-the-soil.jpg": "https://images.unsplash.com/photo-1625246333195-551e51245128?w=800&auto=format&fit=crop&q=60",
    "beneath-the-canopy.jpg": "https://images.unsplash.com/photo-1448375240586-dfd8f37933ff?w=800&auto=format&fit=crop&q=60",
    "water-wars-and-peace.jpg": "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=80",
    "the-urban-harvest.jpg": "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop&q=80"
}

for filename, url in image_urls.items():
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'})
    if response.status_code == 200:
        with open(f"public/images/greenlens/{filename}", 'wb') as f:
            f.write(response.content)
