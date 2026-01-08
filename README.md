# Modified Triangular Vegetation Index‑2 (MTVI2)

## Google Earth Engine (GEE) Implementation – Sentinel‑2 MSI

---

## 📌 Overview

This script computes the **Modified Triangular Vegetation Index‑2 (MTVI2)** using **Sentinel‑2 Surface Reflectance (S2_SR)** data in **Google Earth Engine**. MTVI2 is an advanced vegetation index designed to reduce soil background effects and improve sensitivity to canopy structure and biomass compared to NDVI.

The script:

* Filters Sentinel‑2 imagery for a defined district
* Computes a median composite for 2023
* Calculates MTVI2 using Green, Red, and NIR bands
* Visualizes results with a color palette
* Adds a clear map legend for interpretation

---

## 📍 Area of Interest (AOI)

* **Source**: User asset
* **Asset path**: `projects/gee-trial2/assets/Shapfile/WMH_Distric`
* **Filter field**: `dt_code = 521`

---

## 📅 Temporal Coverage

* **Start date**: 01 January 2023
* **End date**: 31 December 2023

---

## 🛰️ Satellite Data

**Dataset**: `COPERNICUS/S2_SR`

### Selected Bands

| Band | Wavelength (nm) | Description         |
| ---- | --------------- | ------------------- |
| B3   | ~550 nm         | Green               |
| B4   | ~670 nm         | Red                 |
| B8   | ~800 nm         | Near Infrared (NIR) |

⚠️ Only required bands are selected **before applying the reducer** to avoid band‑homogeneity errors.

---

## 📐 MTVI2 Formula

[
MTVI2 = \frac{1.5,[1.2,(NIR - Green) - 2.5,(Red - Green)]}
{\sqrt{(2,NIR + 1)^2 - (6,NIR - 5\sqrt{Red}) - 0.5}}
]

---

## 🎨 Visualization Parameters

| Parameter | Value                              |
| --------- | ---------------------------------- |
| Min       | 0                                  |
| Max       | 1                                  |
| Palette   | Brown → Yellow → Blue → Dark Green |

---

## 🗺️ Legend Description

| Color      | Interpretation             |
| ---------- | -------------------------- |
| Brown      | Low vegetation / Bare soil |
| Yellow     | Sparse vegetation          |
| Blue       | Moderate vegetation        |
| Dark Green | Dense & healthy vegetation |

The legend is displayed using a **UI panel** positioned at the bottom‑left of the map.

---

## ✅ Key Advantages of MTVI2

* Reduced soil background influence
* Better biomass sensitivity than NDVI
* Suitable for crop condition and stress assessment
* Effective in semi‑arid and heterogeneous landscapes

---

## 🧪 Recommended Applications

* Crop health and vigor monitoring
* Biomass estimation support
* Agricultural drought assessment
* Vegetation condition mapping in monsoon‑affected regions

---

## 🛠️ Notes & Best Practices

* Always use `.select()` before reducers (`median`, `mean`, `mosaic`)
* MTVI2 values may exceed 1 in dense vegetation; visualization limits can be adjusted
* For crop‑specific analysis, apply a crop mask before index calculation

---

## 📤 Optional Extensions

* MTVI2 time‑series analysis
* Comparison with NDVI / EVI
* Export MTVI2 as GeoTIFF
* Zonal statistics at district or taluka level

---

**Author**: Tejas Chavan
**Platform**: Google Earth Engine
**Index**: MTVI2 (Modified Triangular Vegetation Index‑2)
