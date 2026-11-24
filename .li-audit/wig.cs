using System;using System.IO;using System.Collections.Generic;
public class Wig{
 public static void Run(string dir){
 byte[] raw=File.ReadAllBytes(dir+"/source.bmp");int w=BitConverter.ToInt32(raw,18),h=BitConverter.ToInt32(raw,22),off=BitConverter.ToInt32(raw,10);byte[] g=new byte[w*h];for(int y=0;y<h;y++)for(int x=0;x<w;x++)g[y*w+x]=raw[off+(h-1-y)*((w*3+3)/4*4)+x*3+1];
 var pts=new List<Tuple<double,int,int>>();
 var ts=new List<int[]>();var weights=new List<double[]>();
 foreach(var xy in new int[][]{new int[]{464,1544},new int[]{513,1557},new int[]{586,1576},new int[]{665,1588}}){
 double[] t=new double[81];double sum=0,norm=0;for(int j=-4;j<=4;j++)for(int i=-4;i<=4;i++){int k=(j+4)*9+i+4;t[k]=g[(xy[1]+j*2)*w+xy[0]+i*2];sum+=t[k];}
 for(int k=0;k<81;k++){t[k]-=sum/81;norm+=t[k]*t[k];}for(int k=0;k<81;k++)t[k]/=Math.Sqrt(norm);
 foreach(double sx in new double[]{.79,1,1.18})foreach(double sy in new double[]{.82,1.08}){int[] offsets=new int[81];for(int j=-4;j<=4;j++)for(int i=-4;i<=4;i++)offsets[(j+4)*9+i+4]=(int)Math.Round(j*2*sy)*w+(int)Math.Round(i*2*sx);ts.Add(offsets);weights.Add(t);}
 }
 for(int y=160;y<2375;y++)for(int x=45;x<4010;x++){int p=y*w+x;
 if(g[p]>135 || Math.Max(g[p-3],g[p-4])<145 || Math.Max(g[p+3],g[p+4])<145)continue;
 double best=0;for(int n=0;n<ts.Count;n++){int[] o=ts[n];double[] t=weights[n];double sum=0,sq=0,ip=0;for(int k=0;k<81;k++){int v=g[p+o[k]];sum+=v;sq+=v*v;ip+=t[k]*v;}double corr=ip/Math.Sqrt(Math.Max(1,sq-sum*sum/81));if(corr>best)best=corr;}
 if(best>.42)pts.Add(Tuple.Create(best,x,y));}
 pts.Sort((a,b)=>b.Item1.CompareTo(a.Item1));bool[] used=new bool[w*h];var rows=new List<string>();foreach(var q in pts){int x=q.Item2,y=q.Item3;if(used[y*w+x])continue;rows.Add(x+","+y+","+q.Item1.ToString("F4"));for(int j=-9;j<=9;j++)for(int i=-9;i<=9;i++)used[(y+j)*w+x+i]=true;}File.WriteAllLines(dir+"/candidates.csv",rows);}
}
