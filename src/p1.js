'use strict';
/* ================= CORE PIXEL ENGINE ================= */
const W=480,H=270,LM=32;
const {floor:fl,sin,cos,PI,abs,sqrt,min,max,atan2,pow,ceil,round}=Math;
const TAU=PI*2;
const cvs=document.getElementById('c'),ctx=cvs.getContext('2d',{alpha:false});
const OUT=ctx.createImageData(W,H),OUT32=new Uint32Array(OUT.data.buffer);
let T=null,TW=W,TH=H,OX=0,X0=0,X1=W;
const clamp=(v,a=0,b=1)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,sm=t=>{t=clamp(t);return t*t*(3-2*t)};
const mod=(a,n)=>((a%n)+n)%n;
function setT(b,w,h,ox=0){T=b;TW=w;TH=h;OX=ox;X0=-ox;X1=w-ox}
const CC=new Map();
function C(hex){let v=CC.get(hex);if(v===undefined){const n=parseInt(hex.slice(1),16);v=(0xff000000|((n&255)<<16)|(n&0xff00)|(n>>16))>>>0;CC.set(hex,v)}return v}
const S=(...a)=>a.map(C);
const rgb=(r,g,b)=>(0xff000000|((b>255?255:b<0?0:b)<<16)|((g>255?255:g<0?0:g)<<8)|(r>255?255:r<0?0:r))>>>0;
const unp=c=>[c&255,(c>>8)&255,(c>>16)&255];
const RGB=h=>unp(C(h));
function mixc(a,b,t){return rgb(fl((a&255)*(1-t)+(b&255)*t),fl(((a>>8)&255)*(1-t)+((b>>8)&255)*t),fl(((a>>16)&255)*(1-t)+((b>>16)&255)*t))}
const BY=new Float32Array(16);[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].forEach((v,i)=>BY[i]=(v+.5)/16);
const bay=(x,y)=>BY[((y&3)<<2)|(x&3)];
function px(x,y,c){x=fl(x)+OX;y=fl(y);if(x>=0&&x<TW&&y>=0&&y<TH)T[y*TW+x]=c}
function gp(x,y){x=fl(x)+OX;y=fl(y);return(x>=0&&x<TW&&y>=0&&y<TH)?T[y*TW+x]:0}
function rect(x,y,w,h,c){x=fl(x)+OX;y=fl(y);w=fl(w);h=fl(h);const xe=min(x+w,TW),ye=min(y+h,TH);if(x<0)x=0;if(y<0)y=0;for(let j=y;j<ye;j++){const o=j*TW;for(let i=x;i<xe;i++)T[o+i]=c}}
function dpx(x,y,c,a){if(a>bay(fl(x),fl(y)))px(x,y,c)}
function add(x,y,r,g,b,k){x=fl(x)+OX;y=fl(y);if(x<0||y<0||x>=TW||y>=TH)return;k=fl(k*6+bay(x,y))/6;if(k<=0)return;const i=y*TW+x,v=T[i];const R=(v&255)+r*k,G=((v>>8)&255)+g*k,B=((v>>16)&255)+b*k;T[i]=(0xff000000|((B>255?255:B)<<16)|((G>255?255:G)<<8)|(R>255?255:R))>>>0}
function mul(x,y,k){x=fl(x)+OX;y=fl(y);if(x<0||y<0||x>=TW||y>=TH)return;k=1-fl((1-k)*8+bay(x,y))/8;if(k>=1)return;const i=y*TW+x,v=T[i];T[i]=(0xff000000|((((v>>16)&255)*k)<<16)|((((v>>8)&255)*k)<<8)|((v&255)*k))>>>0}
function tint(x,y,r,g,b,a){x=fl(x)+OX;y=fl(y);if(x<0||y<0||x>=TW||y>=TH)return;a=fl(a*6+bay(x,y))/6;if(a<=0)return;if(a>1)a=1;const i=y*TW+x,v=T[i];T[i]=(0xff000000|((((v>>16)&255)*(1-a)+b*a)<<16)|((((v>>8)&255)*(1-a)+g*a)<<8)|((v&255)*(1-a)+r*a))>>>0}
function glow(cx,cy,rad,col,inten,pw=2,ry){ry=ry||rad;const xa=max(fl(cx-rad),X0),xb=min(fl(cx+rad),X1-1),ya=max(fl(cy-ry),0),yb=min(fl(cy+ry),TH-1);const r=col[0],g=col[1],b=col[2];for(let y=ya;y<=yb;y++){const dy=(y+.5-cy)/ry;for(let x=xa;x<=xb;x++){const dx=(x+.5-cx)/rad,d=dx*dx+dy*dy;if(d>=1)continue;const t=1-sqrt(d);const k=inten*(pw===2?t*t:pow(t,pw));if(k<.03)continue;add(x,y,r,g,b,k)}}}
function fillbuf(c){T.fill(c)}
function line(x0,y0,x1,y1,c){x0=fl(x0);y0=fl(y0);x1=fl(x1);y1=fl(y1);const dx=abs(x1-x0),dy=-abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy,n=0;for(;;){px(x0,y0,c);if((x0===x1&&y0===y1)||++n>2000)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx}if(e2<=dx){e+=dx;y0+=sy}}}
function dline(x0,y0,x1,y1,c,a){x0=fl(x0);y0=fl(y0);x1=fl(x1);y1=fl(y1);const dx=abs(x1-x0),dy=-abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy,n=0;for(;;){dpx(x0,y0,c,a);if((x0===x1&&y0===y1)||++n>2000)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx}if(e2<=dx){e+=dx;y0+=sy}}}
function tline(x0,y0,x1,y1,c,w=3){const dx=x1-x0,dy=y1-y0,L=sqrt(dx*dx+dy*dy)||1,nx=-dy/L,ny=dx/L;for(let k=0;k<w;k++){const o=k-(w-1)/2;line(x0+nx*o,y0+ny*o,x1+nx*o,y1+ny*o,c)}}
function spans(pts,cb){let y0=1e9,y1=-1e9;for(const p of pts){if(p[1]<y0)y0=p[1];if(p[1]>y1)y1=p[1]}y0=max(fl(y0),0);y1=min(fl(y1),TH-1);const n=pts.length,xs=[];for(let y=y0;y<=y1;y++){const yy=y+.5;xs.length=0;for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n];if((a[1]<=yy&&b[1]>yy)||(b[1]<=yy&&a[1]>yy))xs.push(a[0]+(yy-a[1])/(b[1]-a[1])*(b[0]-a[0]))}xs.sort((p,q)=>p-q);for(let i=0;i+1<xs.length;i+=2){const xa=fl(xs[i]+.5),xb=fl(xs[i+1]+.5);if(xb>xa)cb(y,xa,xb)}}}
const poly=(pts,c)=>spans(pts,(y,a,b)=>rect(a,y,b-a,1,c));
const dpoly=(pts,c,al)=>spans(pts,(y,a,b)=>{for(let x=a;x<b;x++)dpx(x,y,c,al)});
const apoly=(pts,col,k)=>spans(pts,(y,a,b)=>{for(let x=a;x<b;x++)add(x,y,col[0],col[1],col[2],k)});
function ell(cx,cy,rx,ry,c){for(let y=fl(cy-ry);y<=ceil(cy+ry);y++){const dy=(y+.5-cy)/ry;if(dy<-1||dy>1)continue;const w=rx*sqrt(1-dy*dy),a=fl(cx-w+.5),b=fl(cx+w+.5);if(b>a)rect(a,y,b-a,1,c)}}
function dell(cx,cy,rx,ry,c,al){for(let y=fl(cy-ry);y<=ceil(cy+ry);y++){const dy=(y+.5-cy)/ry;if(dy<-1||dy>1)continue;const w=rx*sqrt(1-dy*dy),a=fl(cx-w+.5),b=fl(cx+w+.5);for(let x=a;x<b;x++)dpx(x,y,c,al)}}
const disc=(x,y,r,c)=>ell(x,y,r,r,c);
/* noise */
function hsh(x,y,s=0){let h=Math.imul(x|0,374761393)+Math.imul(y|0,668265263)+Math.imul(s|0,2246822519);h=Math.imul(h^(h>>>13),1274126177);h^=h>>>16;return(h>>>0)/4294967296}
function vnoise(x,y,s=0,pxn=0,pyn=0){const xi=fl(x),yi=fl(y),xf=x-xi,yf=y-yi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);const g=(i,j)=>hsh(pxn?mod(i,pxn):i,pyn?mod(j,pyn):j,s);return lerp(lerp(g(xi,yi),g(xi+1,yi),u),lerp(g(xi,yi+1),g(xi+1,yi+1),u),v)}
function fbm(x,y,o,s,pxn,pyn){let a=.5,f=1,t=0,n=0;for(let i=0;i<o;i++){t+=a*vnoise(x*f,y*f,s+i*7,pxn?pxn*f:0,pyn?pyn*f:0);n+=a;a*=.5;f*=2}return t/n}
function rng(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function gcol(st,t,x,y){t=clamp(t)*(st.length-1);const i=min(fl(t),st.length-2);return(t-i)>bay(fl(x),fl(y))?st[i+1]:st[i]}
/* layers (prerendered, with parallax margin) */
function mkLayer(fn){const w=W+2*LM,b=new Uint32Array(w*H),ps=[T,TW,TH,OX,X0,X1];setT(b,w,H,LM);fn();T=ps[0];TW=ps[1];TH=ps[2];OX=ps[3];X0=ps[4];X1=ps[5];return{b,w}}
function blit(Ly,ox,oy=0){const b=Ly.b,lw=Ly.w;for(let y=0;y<H;y++){const sy=y-oy;if(sy<0||sy>=H)continue;const d=y*TW,so=sy*lw;for(let x=0;x<W;x++){const sx=x+LM-ox;if(sx<0||sx>=lw)continue;const v=b[so+sx];if(v!==0)T[d+x]=v}}}
function fillGrad(y0,y1,st){for(let y=y0;y<y1;y++){const t=(y-y0)/max(1,y1-y0-1);for(let x=X0;x<X1;x++)px(x,y,gcol(st,t,x,y))}}
function ridge(base,amp,seed,cols,o={}){const fx=o.fx||.012,oc=o.oct||4,hs=[];for(let x=X0-1;x<=X1;x++){const n=fbm(x*fx+seed,seed*3.1,oc,seed);hs[x-X0+1]=fl(base-n*amp+(o.tilt||0)*(x-X0)/(X1-X0))}for(let x=X0;x<X1;x++){const i=x-X0+1,top=hs[i],s=hs[i-1]-hs[i+1];for(let y=max(top,0);y<H;y++){const d=y-top;let c;if(d<2&&s>0)c=cols[1];else if(d<2&&s<0&&cols[2])c=cols[2];else c=gcol([cols[0],cols[3]||cols[0]],d/(o.fade||90),x,y);px(x,y,c)}}}
function pine(x,y,h,w,cB,cS){const n=max(3,fl(h/9));for(let i=0;i<n;i++){const t0=i/n,ty=y-h+t0*h,tw=w*(.25+.75*(i+1)/n),th=h/n*1.6;poly([[x,ty],[x+tw/2,ty+th],[x-tw/2,ty+th]],cB);if(cS){line(x,ty,x-tw/2+1,ty+th-1,cS);dpx(x+1,ty+1,cS,.5)}}rect(x-1,y-2,3,3,cB)}
/* pixel font 3x5 */
const FONT={};
['A25755', 'B65656', 'C34443', 'D65556', 'E74647', 'F74644', 'G34553', 'H55755', 'I72227', 'J11152', 'K55655', 'L44447', 'M57755', 'N65555', 'O25552', 'P65644', 'Q25563', 'R65655', 'S34216', 'T72222', 'U55557', 'V55552', 'W55775', 'X55255', 'Y55222', 'Z71247'].forEach(s=>{FONT[s[0]]=s.slice(1).split('').map(Number)});
Object.assign(FONT,{'0':[7,5,5,5,7],'1':[2,6,2,2,7],'2':[6,1,2,4,7],'3':[6,1,2,1,6],'4':[5,5,7,1,1],'5':[7,4,6,1,6],'6':[3,4,7,5,7],'7':[7,1,2,2,2],'8':[7,5,7,5,7],'9':[7,5,7,1,6],'-':[0,0,7,0,0],'.':[0,0,0,0,2],' ':[0,0,0,0,0],':':[0,2,0,2,0],"'":[2,2,0,0,0],'/':[1,1,2,4,4]});
function text(s,x,y,c,sc=1){for(const ch of s){const g=FONT[ch]||FONT[' '];for(let r=0;r<5;r++)for(let q=0;q<3;q++)if(g[r]&(4>>q))rect(x+q*sc,y+r*sc,sc,sc,c);x+=4*sc}return x}
const tw=(s,sc=1)=>s.length*4*sc-sc;
/* ambient helpers */
const _mn=new Float32Array(W/2+2);
function mist(y0,h,col,a,u,speed,scale,seed,fade=true){for(let y=y0;y<y0+h;y++){const e=fade?sin((y-y0)/h*PI):1;if((y&1)===0){for(let x=0;x<W;x+=2)_mn[x>>1]=vnoise(x*scale+u*speed,y*scale*2.4,seed)}for(let x=0;x<W;x++){const k=(_mn[x>>1]-.38)*1.9*a*e;if(k>.03)tint(x,y,col[0],col[1],col[2],k)}}}
function mkStars(n,seed,y0,y1){const r=rng(seed),a=[];for(let i=0;i<n;i++)a.push([fl(r()*W),fl(y0+r()*(y1-y0)),r(),r()]);return a}
function twStars(a,u,ox,f,tone=[0,0,20]){for(const s of a){const v=.3+.7*(.5+.5*sin(u*(.7+s[2]*2.2)+s[3]*50));const g=fl((90+165*s[2])*v);px(s[0]+ox*f,s[1],rgb(g+tone[0],g+tone[1],g+tone[2]))}}
const camx=(u,A,per,ph=0)=>A*sin(u*TAU/per+ph);
const spark=(cx,cy,age,seed,n,c1,c2,sp=1)=>{if(age<0||age>.95)return;for(let i=0;i<n;i++){const a=hsh(i,seed,1)*TAU,v=(22+hsh(i,seed,2)*78)*sp,life=.22+hsh(i,seed,3)*.62;if(age>life)continue;const x=cx+cos(a)*v*age,y=cy+sin(a)*v*age+95*age*age,k=1-age/life;px(x,y,k>.45?c1:c2);if(k>.7&&(i&1)){px(x-cos(a),y-sin(a),c2)}}if(age<.14)glow(cx,cy,18,[255,225,160],(1-age/.14)*.85,2)};
function refl(y0,d,a,dark,amp,fr,u){for(let k=0;k<d;k++){const y=y0+k,sy=y0-1-k;if(y>=TH||sy<0)break;const fade=a*(1-k/d),wob=amp?fl(amp*sin(k*fr+u*2)):0;for(let x=0;x<W;x++){if(fade<=bay(x,y))continue;const sx=x+wob;if(sx<0||sx>=W)continue;const v=T[sy*TW+sx];T[y*TW+x]=(0xff000000|((((v>>16)&255)*dark)<<16)|((((v>>8)&255)*dark)<<8)|((v&255)*dark))>>>0}}}
