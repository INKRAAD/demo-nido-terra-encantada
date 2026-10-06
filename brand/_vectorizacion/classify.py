from PIL import Image, ImageFilter
import numpy as np
im=Image.open('/workspace/demos/nido-terra-encantada/brand/logo-facebook.jpg').convert('RGB')
S=4
big=im.resize((im.width*S,im.height*S),Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.5))
a=np.asarray(big).astype(float)
cols={
 'white':(255,255,255),
 'blue':(0x2d,0x5e,0xc4),
 'ring':(0x7c,0x99,0xe6),
 'orange':(0xe9,0xa1,0x1b),
 'yellow':(0xf0,0xe3,0x1d),
 'purple':(0x5c,0x44,0xa8),
 'green':(0x8f,0xd8,0x61),
 'lgreen':(0xcd,0xe8,0xad),
 'red':(0xc0,0x40,0x30),
 'pink':(0xe6,0x1c,0x56),
 'fblue':(0x1a,0x30,0xd0),
 'fgreen':(0x3c,0xc0,0x20),
 'peach':(0xf2,0x9a,0x60),
}
names=list(cols)
C=np.array([cols[n] for n in names],float)
# perceptual-ish weights
w=np.array([0.3,0.59,0.11])*3
d=((a[:,:,None,:]-C[None,None,:,:])**2*np.array([2,4,3])).sum(-1)
lab=d.argmin(-1)
np.save('lab.npy',lab)
out=C[lab].astype(np.uint8)
Image.fromarray(out).resize((im.width,im.height),Image.NEAREST).save('class.png')
for i,n in enumerate(names): print(n,(lab==i).sum())
