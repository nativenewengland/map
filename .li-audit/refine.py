from a import *
import json
src=(root/'source.bmp').read_bytes();tgt=(root/'target.bmp').read_bytes()
def reader(raw):
 w,h=struct.unpack_from('<ii',raw,18);off=struct.unpack_from('<I',raw,10)[0];stride=(w*3+3)//4*4
 def get(x,y):
  if not (0<=x<w and 0<=y<h):return 0,0,0
  k=off+(h-1-int(y))*stride+int(x)*3;return raw[k:k+3]
 return get
sp=reader(src);tp=reader(tgt)
def source(x,y):
 b,g,r=sp(4*x,4*y)
 if b>g+6 and b>r+13 and b>65:return 1
 if g>r+5 and g>b+5 and g>66:return -1
 return 0
def water(x,y):
 b,g,r=tp(8*x,8*y);return int(b>r+5)
if __name__=='__main__':
 overrides=json.loads((root/'edits.json').read_text()) if (root/'edits.json').exists() else {}
 results=[]
 for idx,(x,y) in enumerate(pts,1):
  bx,by=warp(x,y);xx,xy=warp(x+.5,y);yx,yy=warp(x,y+.5)
  m,n,o,p=2*(xx-bx),2*(yx-bx),2*(xy-by),2*(yy-by)
  if not (.35<m<1.8 and .25<p<1.5 and abs(n)<.9 and abs(o)<.8 and m*p-n*o>.17):m,n,o,p=.97,-.06,-.05,.68
  sam=[]
  for rad,N,wt in [(2.5,14,4),(4,18,5),(6,22,5),(9,24,4),(13,28,3),(19,32,2),(27,36,1.5),(39,40,1),(55,48,.6)]:
   for j in range(N):
    a=2*math.pi*j/N;dx=rad*math.cos(a);dy=rad*math.sin(a);q=source(x+dx,y+dy)
    if q:sam.append((m*dx+n*dy,o*dx+p*dy,q==1,wt/N))
  def cost(cx,cy):
   if water(cx,cy):return 1000
   return .0025*((cx-bx)**2+(cy-by)**2)+sum(w for dx,dy,t,w in sam if water(cx+dx,cy+dy)!=t)
  search=[(bx+a,by+b) for a in range(-15,16,2) for b in range(-15,16,2)]
  cx,cy=min(search,key=lambda pt:cost(*pt))
  cx,cy=min(((cx+dx/4,cy+dy/4) for dx in range(-7,8) for dy in range(-7,8)),key=lambda pt:cost(*pt))
  if str(idx) in overrides:cx,cy=overrides[str(idx)]
  results.append([idx,x,y,cx,cy,round(cost(cx,cy),2)])
 (root/'results.json').write_text(json.dumps(results))
