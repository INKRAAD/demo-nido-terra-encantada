import numpy as np, subprocess, re
from PIL import Image
from scipy import ndimage
lab=np.load('lab.npy')
names=['white','blue','ring','orange','yellow','purple','green','lgreen','red','pink','fblue','fgreen','peach']
idx={n:i for i,n in enumerate(names)}
H,W=lab.shape; S=4
# peach only allowed in flower (x 140-185,y 265-300) & butterfly (x 478-520, y 250-292) regions (orig coords)
yy,xx=np.mgrid[0:H,0:W]
def region(x0,y0,x1,y1): return (xx>=x0*S)&(xx<x1*S)&(yy>=y0*S)&(yy<y1*S)
flower=region(140,262,190,302); bfly=region(475,248,525,295); house=region(355,118,420,165)
for n in ['peach','pink','fblue','fgreen']:
    m=(lab==idx[n])&~(flower|bfly)
    tgt = 'orange' if n=='peach' else ('purple' if n=='fblue' else ('green' if n=='fgreen' else 'orange'))
    lab[m]=idx[tgt]
m=(lab==idx['red'])&~(house|flower|bfly); lab[m]=idx['orange']
# in butterfly region, orange/red -> peach-ish keep; in house region non-white -> red
lab[house&(lab!=idx['white'])&(lab!=idx['blue'])&(lab!=idx['ring'])]=idx['red']
# halo cleanup
R2=((xx/S-279)**2+(yy/S-219)**2)
inner=R2<104**2; disk=R2<121**2
lab[(lab==idx['ring'])&inner]=idx['blue']
lab[(lab==idx['ring'])&~disk]=idx['white']
lab[(lab==idx['lgreen'])&inner]=idx['blue']
lg=(lab==idx['lgreen']); keep=ndimage.binary_opening(lg,iterations=5)
lab[lg&~keep]=idx['white']
rg=(lab==idx['ring']); keep=ndimage.binary_opening(rg,iterations=4)
lab[rg&~keep]=idx['white']
# remove auto flower/house/butterfly (redrawn by hand)
for r in (flower,bfly,house):
    sel=r&np.isin(lab,[idx[n] for n in ['peach','pink','fblue','fgreen','red','orange','yellow','purple']])
    lab[sel]=idx['white']
# mode filter
lab=ndimage.median_filter(lab,size=5)
order=['ring','blue','lgreen','green','purple','orange','yellow']
hexes={'ring':'#7C99E6','blue':'#2D5EC4','lgreen':'#D0E9B1','green':'#96DB6A','purple':'#6A479E','orange':'#E59D2A','yellow':'#F0E31D','red':'#C4472E','peach':'#F2994A','fgreen':'#4DC526','fblue':'#2D5EC4','pink':'#E61C56'}
# crop box (orig coords)
cx0,cy0,cx1,cy1=88,52,532,376
paths=[]
for k,n in enumerate(order):
    above=set(order[k:])
    mask=np.isin(lab,[idx[a] for a in above])
    mask=ndimage.binary_opening(mask,iterations=1)
    img=Image.fromarray((~mask*255).astype(np.uint8)).convert('1')
    img.save(f'm_{n}.pbm')
    subprocess.run(['potrace',f'm_{n}.pbm','-s','-o',f'm_{n}.svg','-t','40','-a','1.1','-O','0.6','--flat'],check=True)
    s=open(f'm_{n}.svg').read()
    tr=re.search(r'<g transform="([^"]+)"',s)
    ds=re.findall(r'<path d="([^"]+)"',s,re.S)
    paths.append((n,hexes[n],tr.group(1) if tr else '',ds))
# potrace output viewBox is in pt with same pixel dims when -r default 72 -> pt=px
out=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{cx0} {cy0} {cx1-cx0} {cy1-cy0}" role="img" aria-labelledby="t">',
     '<title id="t">Terra Encantada — Centro de Apoyo en el Desarrollo del Niño</title>']
for n,c,tr,ds in paths:
    d=' '.join(x.replace('\n',' ') for x in ds)
    out.append(f'<g id="{n}" transform="scale({1/S}) {tr}" fill="{c}"><path d="{d}"/></g>')
out.append(open('hand.svgfrag').read())
out.append('</svg>')
open('logo.svg','w').write('\n'.join(out))
print(open('m_ring.svg').read()[:600])
