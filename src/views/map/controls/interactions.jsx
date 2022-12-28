import { Style, Fill, Stroke } from 'ol/style'
import Select from "ol/interaction/Select"

const selected = new Style({
  fill: new Fill({
    color: '#ffeeee'
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 0.7)',
    width: 2
  })
})

export const selectFeatureClick = new Select({
  filter: function(feature) {
    const type = feature.getGeometry().getType()
    return type === 'MultiPolygon' || type === 'Polygon';
  },
  style: (feature) => {
    const color = '#eeeeee'
    selected.getFill().setColor(color)
    selected.getStroke().setColor(color)
    selected.getStroke().setWidth(0)
    return selected
  }
})

export const selectLineClick = new Select({
  filter: function(feature) {
    const type = feature.getGeometry().getType()
    return type === 'MultiLineString' || type === 'LineString';
  },
  style: (feature) => {
    const jarak = feature.get('jarak')
    // document.getElementById('namaRuas').innerHTML = feature.get('nama')
    // document.getElementById('jarakRuas').innerHTML = 'Jarak ' + (jarak > 0 ? jarak / 1000 : 0) + ' km'
    const color = 'green'
    selected.getFill().setColor('magenta')
    selected.getStroke().setColor(color)
    selected.getStroke().setWidth(4)
    return selected
  }
})
