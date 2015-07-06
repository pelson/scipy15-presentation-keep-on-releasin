fname = 'versioning.svg'

import xml.etree.ElementTree

# Open original file
et = xml.etree.ElementTree.parse(fname)

# Append new tag: <a x='1' y='abc'>body text</a>
print et
root = et.getroot()
print root

ns = {'svg': 'http://www.w3.org/2000/svg',
      }

layer = 0
for layer in range(9, 0, -1):
    for country in et.iter():
        mode = country.attrib.get('{http://www.inkscape.org/namespaces/inkscape}groupmode', '')
        if mode.strip() == 'layer':
            layer_name = country.attrib.get('{http://www.inkscape.org/namespaces/inkscape}label', None)
            if layer_name.isdigit():
                if layer <= int(layer_name):
                    country.set('style', 'display: none;')

    # Write back to file
    et.write('versioning.{}.svg'.format(layer))
