const sharp=require('sharp'),fs=require('fs');
(async()=>{
const W=2800,H=3512;const svg=fs.readFileSync('1/terrain.svg','utf8');
const image=await sharp('1/terrain.png').extract({left:100,top:90,width:W,height:H}).removeAlpha().raw().toBuffer();
const render=await sharp(Buffer.from(svg.replace('0 0 2994 3688','100 90 2800 3512')),{unlimited:true}).removeAlpha().raw().toBuffer();
console.log(image.length,render.length);
const hist=new Map();for(let i=0;i<image.length;i+=3){let key=image.readUIntBE(i,3);hist.set(key,(hist.get(key)||0)+1)}console.log([...hist].sort((a,b)=>b[1]-a[1]).slice(0,18).map(([k,n])=>[k.toString(16),n]));
fs.writeFileSync('ref.tmp',image);fs.writeFileSync('render.tmp',render);
})()
