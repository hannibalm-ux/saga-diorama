SC.forEach(s=>s.init());
/* ================= COMPOSITOR / TRANSITIONS / MAIN ================= */
const N=SC.length,SD=24,TR=3.4,P=N*SD;
const BA=new Uint32Array(W*H),BBf=new Uint32Array(W*H);
const TT=['wipe','dissolve','pan','turn','bloom','melt','wipe','pan','bloom'];
const wrapD=d=>mod(d+P/2,P)-P/2;
function drawScene(i,u,buf){setT(buf,W,H);SC[i].draw(u)}
const ACC=i=>RGB(SC[i].acc);
function tWipe(e,acc,rev){setT(OUT32,W,H);const X=(rev?1-e:e)*(W+90)-45,ac=C(SC[acc].acc),acR=RGB(SC[acc].acc);
 for(let y=0;y<H;y++){const xs=X+(y-H/2)*.32,o=y*W;for(let x=0;x<W;x++){const showB=rev?x>xs:x<xs;let v=showB?BBf[o+x]:BA[o+x];const dd=rev?x-xs:xs-x;if(showB&&dd<16){v=mixc(v,C('#7fe8ff'),.18*(1-dd/16));if(y&1)v=mixc(v,0xff000000,.35)}OUT32[o+x]=v}
  const xe=fl(xs);for(let k=-1;k<=1;k++)px(xe+k,y,k===0?C('#ffffff'):ac);for(let k=-14;k<=14;k++){const a=(1-abs(k)/14);add(xe+k,y,acR[0],acR[1],acR[2],a*a*.55)}}}
const DISS=new Float32Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++)DISS[y*W+x]=hsh(x>>1,y>>1,3)*.7+hsh(x>>3,y>>2,5)*.3;
function tDissolve(e,acc){const ac=C(SC[acc].acc),ee=e*1.12-.06,edge=mixc(C('#9ff4ff'),ac,.4),cy=C('#5fd8ff');
 for(let y=0;y<H;y++){const o=y*W;for(let x=0;x<W;x++){const r=DISS[o+x];let v=r<ee?BBf[o+x]:BA[o+x];const d=r-ee;if(d<.022&&d>-.022)v=edge;else if(d<0&&d>-.08&&(y&1))v=mixc(v,cy,.22);OUT32[o+x]=v}}}
function tPan(e){const o=round(sm(e)*W);for(let y=0;y<H;y++){const r=y*W;for(let x=0;x<W;x++){const sx=x+o;OUT32[r+x]=sx<W?BA[r+sx]:BBf[r+sx-W]}}
 setT(OUT32,W,H);const bx=W-o;if(bx>0&&bx<W){for(let y=0;y<H;y++){px(bx,y,C('#ffe9a8'));px(bx-1,y,C('#7a5a20'));for(let k=1;k<8;k++)mul(bx-1-k,y,1-.35*(1-k/8));for(let k=1;k<8;k++)mul(bx+k,y,1-.35*(1-k/8))}}}
function tTurn(e){setT(OUT32,W,H);for(let y=0;y<H;y++)for(let x=0;x<W;x++)OUT32[y*W+x]=gcol(S('#04050b','#0a0d1a','#141a30'),y/H,x,y);
 const th=e*PI,c=cos(th),sx=max(abs(c),.001),s=sin(th),fromA=e<.5,src=fromA?BA:BBf;
 // platform
 for(let k=0;k<3;k++){dell(W/2,H-22+k,150-k*4,10-k,C(k===0?'#3a2c12':k===1?'#1a1c2c':'#0a0b14'),1)}
 for(let x=0;x<W;x++){const a=x/W*TAU+th*3;if(sin(a*10)>.4){const ex=W/2+cos(a)*150,ey=H-22+sin(a)*10;if(sin(a)>0)px(ex,ey,C('#e8b84a'))}}
 glow(W/2,H-22,170,[255,200,90],.25,2,26);
 for(let x=0;x<W;x++){const xo=(x-W/2)/(W/2*sx);if(xo<-1||xo>1)continue;const sxs=min(W-1,fl((xo*.5+.5)*W)),vs=1+.16*s*xo*(fromA?1:-1),shade=.55+.45*sx;
  for(let y=0;y<H;y++){const ys=fl((y-H/2)/vs+H/2);if(ys<0||ys>=H)continue;let v=src[ys*W+sxs];if(sx<.9&&((y+x)&1)){const k=1-(1-shade)*.9;v=rgb(fl((v&255)*k),fl(((v>>8)&255)*k),fl(((v>>16)&255)*k))}OUT32[y*W+x]=v}}
 const xl=fl(W/2-W/2*sx),xr=fl(W/2+W/2*sx);for(let y=0;y<H;y+=1){px(xl,y,C('#c8e8ff'));px(xr,y,C('#c8e8ff'))}}
function tBloom(e,acc){const a=pow(sin(PI*e),1.5),ar=SC[acc].bl||RGB(SC[acc].acc),col=[min(255,ar[0]*.85+60),min(255,ar[1]*.85+60),min(255,ar[2]*.85+60)],mx=clamp((e-.42)/.16);
 for(let y=0;y<H;y++){const o=y*W,dy=(y-H/2)/H*2;for(let x=0;x<W;x++){const dx=(x-W/2)/W*2,d=sqrt(dx*dx+dy*dy*.6),bb=bay(x,y),k=fl(clamp(a*(1.4-.45*d))*7+bb)/7,v=mx>bb?BBf[o+x]:BA[o+x];if(k<=0){OUT32[o+x]=v;continue}const R=(v&255)+col[0]*k,G=((v>>8)&255)+col[1]*k,B=((v>>16)&255)+col[2]*k;OUT32[o+x]=(0xff000000|((B>255?255:B)<<16)|((G>255?255:G)<<8)|(R>255?255:R))>>>0}}}
function tMelt(e,acc){const ac=C(SC[acc].acc);for(let x=0;x<W;x++){const rx=clamp(e*1.75-(vnoise(x*.045,3.3,4)*.72+hsh(x>>1,7)*.12))*(H+10);for(let y=0;y<H;y++){let v=y<rx?BBf[y*W+x]:BA[y*W+x];if(y>=rx-5&&y<rx+1)v=mixc(v,ac,.75);else if(y>=rx+1&&y<rx+4)v=mixc(v,C('#ffffff'),.12);OUT32[y*W+x]=v}}}
/* plaque, glint, vignette */
const VIGI=[],VIGK=[];(function(){for(let y=0;y<H;y++)for(let x=0;x<W;x++){const dx=(x-W/2)/250,dy=(y-H/2)/150,d=dx*dx+dy*dy,dk=clamp((d-.5)*.85);const lv=fl(dk*8+bay(x,y));if(lv>0){VIGI.push(y*W+x);VIGK.push(1-lv/8*.85)}}})();
function textA(s,x,y,c,sc,a){for(const ch of s){const g=FONT[ch]||FONT[' '];for(let r=0;r<5;r++)for(let q=0;q<3;q++)if(g[r]&(4>>q)){for(let j=0;j<sc;j++)for(let i=0;i<sc;i++)dpx(x+q*sc+i,y+r*sc+j,c,a)}x+=4*sc}}
function post(t,idx,u){setT(OUT32,W,H);
 const a=sm((u-.9)/1.6)*(1-sm((u-(SD-2.9))/1.6));
 if(a>0){const s=SC[idx],px0=16,py0=H-40;for(let y=H-60;y<H;y++)for(let x=0;x<300;x++){const k=pow(1-(x/300),.7)*clamp((y-(H-60))/34);mul(x,y,1-.84*k*a)}
  textA('EPISODE '+s.num,px0,py0,C('#e8b84a'),2,a);rect(px0,py0+12,round(24*a),1,C('#e8b84a'));textA(s.title,px0,py0+16,C('#e9eef8'),1,a);textA(s.place,px0,py0+24,C('#8fa0b8'),1,a)}
 const pos=mod(t*28,W+H*.8+160)-80;for(let y=0;y<H;y++){const xc=fl(pos-y*.8);for(let k=-6;k<=6;k++){add(xc+k,y,150,170,200,(1-abs(k)/6)*.09)}}
 for(let i=0;i<VIGI.length;i++){const j=VIGI[i],v=OUT32[j],k=VIGK[i];OUT32[j]=(0xff000000|((((v>>16)&255)*k)<<16)|((((v>>8)&255)*k)<<8)|((v&255)*k))>>>0}}
let ONLY=-1;
function render(t){t=mod(t,P);let idx,u;
 if(ONLY>=0){u=mod(t,SD);drawScene(ONLY,u,BA);OUT32.set(BA);idx=ONLY}
 else{const k=fl(t/SD),q=t-k*SD;
  if(q>SD-TR/2||q<TR/2){const i=q<TR/2?mod(k-1,N):k,j=(i+1)%N,e=q<TR/2?(q+TR/2)/TR:(q-(SD-TR/2))/TR,ui=wrapD(t-i*SD),uj=wrapD(t-j*SD);
   drawScene(i,ui,BA);drawScene(j,uj,BBf);const ty=TT[i%TT.length];
   if(ty==='wipe')tWipe(e,j,i===6);else if(ty==='dissolve')tDissolve(e,j);else if(ty==='pan')tPan(e);else if(ty==='turn')tTurn(e);else if(ty==='bloom')tBloom(e,j);else tMelt(e,j);
   idx=e<.5?i:j;u=e<.5?ui:uj}
  else{idx=k;u=q;drawScene(k,u,BA);OUT32.set(BA)}}
 post(t,idx,u)}
window.__render=t=>{render(t);ctx.putImageData(OUT,0,0)};window.__P=P;window.__N=N;window.__SD=SD;window.__TR=TR;
/* layout / controls */
function fit(){const d=devicePixelRatio||1,s=max(1,min(fl(innerWidth*d/W),fl(innerHeight*d/H)))/d;cvs.style.width=W*s+'px';cvs.style.height=H*s+'px'}
addEventListener('resize',fit);fit();
const doFS=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()};
addEventListener('keydown',e=>{if(e.key==='f'||e.key==='F')doFS();if(e.key===' '){paused=!paused;if(!paused){t0=performance.now();off=tNow}}});
addEventListener('dblclick',doFS);
let idleT;addEventListener('mousemove',()=>{document.body.style.cursor='default';clearTimeout(idleT);idleT=setTimeout(()=>document.body.style.cursor='none',2500)});
let t0=performance.now(),off=0,paused=false,tNow=0;
(function(){const h=location.hash;let m=h.match(/t=([\d.]+)/);if(m)off=parseFloat(m[1]);m=h.match(/s=(\d+)/);if(m)ONLY=parseInt(m[1])-1;if(/pause/.test(h))paused=true})();
tNow=off;
let dirty=true;function loop(now){if(!paused){tNow=off+(now-t0)/1000;render(tNow);ctx.putImageData(OUT,0,0)}else if(dirty){render(tNow);ctx.putImageData(OUT,0,0);dirty=false}requestAnimationFrame(loop)}
window.__ready=true;requestAnimationFrame(loop);
