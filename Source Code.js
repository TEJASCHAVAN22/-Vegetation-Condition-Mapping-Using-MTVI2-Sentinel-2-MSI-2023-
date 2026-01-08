// ===============================================
// Modified Triangular Vegetation Index 2 (MTVI2)
// Sentinel-2 MSI + Legend
// ===============================================

// Area of Interest
var aoi = ee.FeatureCollection('projects/gee-trial2/assets/Shapfile/WMH_Distric')
                                             .filter(ee.Filter.eq('dt_code', 521));
Map.centerObject(aoi);

// Sentinel-2 SR (SELECT BANDS FIRST)
var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(aoi)
  .filterDate('2023-01-01', '2023-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .select(['B3', 'B4', 'B8'])   // 🔥 FIX
  .median()
  .clip(aoi);

// Select bands
var green = s2.select('B3');
var red   = s2.select('B4');
var nir   = s2.select('B8');

// MTVI2 Calculation
var mtvi2 = nir.expression(
  '(1.5 * (1.2 * (NIR - G) - 2.5 * (R - G))) / sqrt((2 * NIR + 1) ** 2 - (6 * NIR - 5 * sqrt(R)) - 0.5)', 
  {
    'NIR': nir,
    'R': red,
    'G': green
}).rename('MTVI2');

// Visualization
var mtvi2Vis = {
  min: 0,
  max: 1,
  palette: ['brown', 'yellow', 'blue', 'darkgreen']
};

Map.addLayer(mtvi2, mtvi2Vis, 'MTVI2');

// ==================================================
// LEGEND PANEL
// ==================================================

var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

// Legend Title
legend.add(ui.Label({
  value: 'MTVI2 Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 6px 0'
  }
}));

// Legend entries
var makeRow = function(color, label) {
  return ui.Panel({
    widgets: [
      ui.Label({
        style: {
          backgroundColor: color,
          padding: '8px',
          margin: '0 8px 4px 0'
        }
      }),
      ui.Label({
        value: label,
        style: {margin: '0 0 4px 0'}
      })
    ],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};

// Add legend rows
legend.add(makeRow('brown', 'Low vegetation / Bare soil'));
legend.add(makeRow('yellow', 'Sparse vegetation'));
legend.add(makeRow('blue', 'Moderate vegetation'));
legend.add(makeRow('darkgreen', 'Dense vegetation'));

// Add legend to map
Map.add(legend);
