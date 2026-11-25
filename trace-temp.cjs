const fs=require('fs'), W=2800,H=3512,N=W*H,src=fs.readFileSync('ref.tmp');
const f=new Float32Array(N);
for(let p=0;p<N;p++){
  let i=p*3;
  f[p]=Math.min(src[i+2]-src[i+1],src[i+2]-src[i],src[i+2]-100);
}
// Follow faint ink between two stronger samples on the same short reach.
const g=f.slice();
for(let y=3;y<H-3;y++)for(let x=3;x<W-3;x++){
  const p=y*W+x;if(f[p]<-24||f[p]>4)continue;
  for(const step of [1,W,W+1,W-1]){
    let sides=Math.min(Math.max(f[p-step],f[p-2*step]),Math.max(f[p+step],f[p+2*step]));
    if(sides>10)g[p]=Math.max(g[p],Math.min(16,sides*.65));
  }
}
const adj=new Map(), xy=new Map();
function link(a,b){if(!adj.has(a))adj.set(a,[]);adj.get(a).push(b)}
for(let y=0;y<H-1;y++)for(let x=0;x<W-1;x++){
  const p=y*W+x, vals=[g[p],g[p+1],g[p+W+1],g[p+W]], ids=[2*p,2*(p+1)+1,2*(p+W),2*p+1],edges=[];
  for(let k=0;k<4;k++){const a=vals[k],b=vals[(k+1)%4];if((a>2)===(b>2))continue;
    const t=(2-a)/(b-a), id=ids[k];edges.push(id);
    if(!xy.has(id))xy.set(id,[x+.5+[t,1,1-t,0][k],y+.5+[0,t,1,1-t][k]]);
  }
  if(edges.length===4 && (vals.reduce((a,b)=>a+b)/4>2)===(vals[0]>2))edges.push(edges.shift());
  for(let k=0;k<edges.length;k+=2){link(edges[k],edges[k+1]);link(edges[k+1],edges[k]);}
}
const seen=new Set(), paths=[]; const fmt=n=>+n.toFixed(2);
for(const start of adj.keys()){if(seen.has(start))continue;
  let last=-1,id=start,points=[];
  while(id!==undefined&&!seen.has(id)){seen.add(id);points.push(xy.get(id));const next=adj.get(id).find(v=>v!==last);last=id;id=next;}
  if(points.length<4)continue;
  if(id!==start){continue}
  paths.push('M'+points.map(([x,y])=>fmt(x)+','+fmt(y)).join(' ')+'Z');
}
let s=fs.readFileSync('1/terrain.svg','utf8');
s=s.replace(/<path id="streams0"[^>]*\/>\s*<path id="streams1"[^>]*\/>\s*<path id="streams2"[^>]*\/>/,'<path id="streams" d="'+paths.join('')+'" fill="#999bc2" fill-rule="evenodd"/>');
if(!s.includes('id="streams"'))throw Error('missing streams');
fs.writeFileSync('1/terrain.svg',s);console.log(paths.length);
