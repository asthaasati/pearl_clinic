import urllib.request
import os

os.makedirs('public/clinic', exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

photos = [
    {
        'file': 'public/clinic/reception.jpg',
        'url': 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
        'title': 'Modern Clinic Reception & Waiting Lounge'
    },
    {
        'file': 'public/clinic/pediatric_opd.jpg',
        'url': 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1200&auto=format&fit=crop',
        'title': 'Pediatric OPD & Child Examination Desk'
    },
    {
        'file': 'public/clinic/pulmonology_pft.jpg',
        'url': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop',
        'title': 'Spirometry (PFT) & Respiratory Diagnostic Suite'
    },
    {
        'file': 'public/clinic/nebulization.jpg',
        'url': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
        'title': 'Nebulization & Inhalation Therapy Station'
    },
    {
        'file': 'public/clinic/picu_triage.jpg',
        'url': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop',
        'title': 'Emergency PICU / NICU Critical Care Triage'
    },
    {
        'file': 'public/clinic/building_facade.jpg',
        'url': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
        'title': 'Pearl Clinic Vijay Nagar Entrance & Suite'
    }
]

for item in photos:
    try:
        req = urllib.request.Request(item['url'], headers=headers)
        data = urllib.request.urlopen(req, timeout=10).read()
        with open(item['file'], 'wb') as f:
            f.write(data)
        print(f"Downloaded {item['file']} ({len(data)} bytes)")
    except Exception as e:
        print(f"Failed {item['file']}: {e}")

print("Done downloading clinic photos!")
