/* ================= SCENES I - III ================= */
const SC=[];
/* ---------- EPISODE I : THEED ---------- */
SC.push((()=>{
 let L0,L1,L2;
 const cfg={cx:345,y:218,g0:74,g1:46,roam:14,T:1.8,hop:7,spk:'#ffb040',seed:1};
 const GA=S('#050c26','#0a2a5a','#1a7ab0');
 function gate(x,c,u){const top=64,bot=210,ext=top+(bot-top)*c;
  rect(x-6,top-9,13,9,C('#161624'));rect(x-4,top-6,9,2,C('#ff4040'));rect(x-6,bot,13,7,C('#161624'));rect(x-4,bot+3,9,2,C('#ff4040'));
  if(c<=0)return;
  for(let y=top;y<ext;y++){const on=((y+fl(u*44))%8)<5,cc=on?C('#ff5a5a'):C('#c81818');px(x,y,C('#fff0f0'));px(x-1,y,cc);px(x+1,y,cc);dpx(x-2,y,C('#ff3030'),.55);dpx(x+2,y,C('#ff3030'),.55)}
  glow(x,(top+ext)/2,22,[255,40,40],.75*c,2,(ext-top)/2+12);glow(x,bot+6,34,[255,50,50],.6*c,2,10)}
 return{num:'I',title:'THE PHANTOM MENACE',place:'THEED GENERATOR COMPLEX',acc:'#ff3040',bl:[110,170,255],
 init(){
  L0=mkLayer(()=>{
   fillGrad(0,H,S('#03051a','#0a1140','#16307a','#0b1c48'));
   for(let x=-48;x<W+48;x+=72){
    rect(x,20,18,196,C('#0a1030'));rect(x+17,20,1,196,C('#3346a0'));rect(x+1,20,1,196,C('#05081c'));
    for(let y=30;y<210;y+=22)rect(x,y,18,2,C('#141d52'));
    const ax=x+18;for(let y=64;y<214;y++){const t=(y-64)/150;for(let xx=ax;xx<ax+54;xx++)px(xx,y,gcol(GA,t,xx,y))}
    for(let y=70;y<206;y+=6)rect(ax+26,y,2,3,C('#7fdfff'));rect(ax-1,60,56,4,C('#0d1440'))}
   rect(X0,0,X1-X0,22,C('#070a22'));for(let x=X0;x<X1;x+=24)rect(x,18,12,3,C('#1a2a70'))});
  L1=mkLayer(()=>{
   fillGrad(238,H,S('#050a1e','#08204a','#0d5a9a','#3ab8ff'));
   for(let x=-120;x<W+120;x+=40)tline(x,H+4,240+(x-240)*.75,238,C('#050914'),3);
   rect(X0,250,X1-X0,3,C('#070c22'));rect(X0,262,X1-X0,4,C('#070c22'));
   rect(X0,202,X1-X0,36,C('#131c40'));rect(X0,202,X1-X0,1,C('#3a4c9a'));
   for(let x=-260;x<W+260;x+=46)line(240+(x-240)*.3,203,x,232,C('#0b1236'));
   rect(X0,232,X1-X0,3,C('#5a78d0'));rect(X0,235,X1-X0,3,C('#0a0f2a'));
   for(let x=X0;x<X1;x+=20){px(x,233,C('#bfeeff'));px(x+10,233,C('#ff5a5a'))}});
  L2=mkLayer(()=>{for(const x of[-24,W-20]){rect(x,0,44,H,C('#04050f'));rect(x+43,0,1,H,C('#26348a'));rect(x,0,1,H,C('#26348a'));for(let y=20;y<H;y+=34){rect(x,y,44,3,C('#0a1030'));px(x+8,y+1,C('#5fd8ff'))}}})},
 draw(u){
  const cm=camx(u,7,44),bo=-round(cm*.8),cxr=262-round(cm*.4);
  blit(L0,-round(cm*.25));
  for(let y=22;y<206;y++){const v=.5+.5*sin(y*.21-u*5);for(let x=-11;x<=11;x++){const ax=abs(x);px(cxr+x,y,C(ax<3?(v>.55?'#f0fdff':'#9fe8ff'):ax<7?(v>.5?'#4fc8ff':'#1f7ad8'):(v>.6?'#1a5ab0':'#0c2a70')))}}
  for(let k=0;k<5;k++){const y=mod(u*36+k*37,182)+22;rect(cxr-13,y,27,2,C('#bfeeff'));rect(cxr-13,y+2,27,1,C('#2a5ac0'))}
  glow(cxr,118,80,[50,160,255],.55+.1*sin(u*2.3),2,150);
  blit(L1,-round(cm*.8));
  glow(240,272,240,[40,150,255],.42+.08*sin(u*1.7),2,60);
  gate(150+bo,1,u);const tt=mod(u,16),c2=tt<2?sm(tt/2):tt<12?1:tt<14?1-sm((tt-12)/2):0;gate(206+bo,c2,u);
  fig(CH.obiY,110+bo,218,1,{u,crouch:9,lean:2,stride:5,hy:6});
  cfg.cx=345+bo;drawDuel(u,cfg,CH.qui,CH.maul);
  refl(218,14,.4,.6,0,0,u);
  mist(214,44,[70,130,255],.4,u,8,.02,3);
  for(let i=0;i<46;i++){const x=hsh(i,1,9)*W+sin(u+i)*3,y=H-mod(u*(10+hsh(i,2,9)*14)+hsh(i,3,9)*300,210);dpx(x,y,C(hsh(i,4,9)>.5?'#7fe8ff':'#bfeeff'),.7)}
  blit(L2,-round(cm*1.5))}}
})());
/* ---------- EPISODE II : GEONOSIS ---------- */
SC.push((()=>{
 let L0,L1,L2,L3;const lamps=[];
 const cfg={cx:255,y:226,g0:66,g1:34,roam:14,T:1.6,hop:6,seed:2,spk:'#ffa040'};
 const OPEN=(x,y)=>x>=196&&x<=464&&(y>=118||((x-330)*(x-330))/(134*134)+((y-118)*(y-118))/(72*72)<1);
 return{num:'II',title:'ATTACK OF THE CLONES',place:'GEONOSIS HANGAR',acc:'#ff9a3a',
 init(){
  L0=mkLayer(()=>{fillGrad(0,206,S('#26102c','#6a2438','#c85a2c','#f0a050','#ffd890'));rect(X0,206,X1-X0,H-206,C('#a05a30'));
   ridge(158,64,2.3,[C('#5a2028'),C('#b05a40'),C('#3a1420'),C('#2a0e18')],{fx:.02,oct:5,fade:60});
   ridge(186,34,7.7,[C('#3a1420'),C('#8a3a30'),C('#22090f'),C('#1a060c')],{fx:.03,fade:40})});
  L1=mkLayer(()=>{for(let y=0;y<H;y++)for(let x=X0;x<X1;x++){if(OPEN(x,y))continue;let c=gcol(S('#121c22','#1f2f36','#2a3d44'),y/H,x,y);if(mod(x,32)<2)c=C('#3a5058');else if(mod(y,44)<2)c=C('#0c1418');
    if(OPEN(x-3,y)||OPEN(x+3,y)||OPEN(x,y-3))c=C('#f0a058');else if(OPEN(x-6,y)||OPEN(x+6,y)||OPEN(x,y-6))c=mixc(c,C('#c86a34'),.5);px(x,y,c)}
   for(let x=-10;x<190;x+=46){rect(x,112,30,88,C('#0a1014'));rect(x,112,30,2,C('#3a5058'));rect(x+1,114,1,86,C('#22343a'));rect(x+12,90,6,10,C('#2a1a10'));rect(x+13,91,4,8,C('#ffb050'));lamps.push(x+15)}});
  L2=mkLayer(()=>{fillGrad(200,H,S('#7a5a3c','#4a3626','#2a1e18'));rect(X0,200,X1-X0,1,C('#2a1a10'));
   for(let x=-300;x<W+300;x+=60)line(240+(x-240)*.25,201,x,H,C('#3a2a1e'));for(let k=1;k<8;k++)rect(X0,200+fl(70*pow(k/8,1.7)),X1-X0,1,C('#3a2a1e'))});
  L3=mkLayer(()=>{rect(-26,0,44,H,C('#0a0808'));rect(17,0,1,H,C('#e08a4a'));for(let y=16;y<H;y+=40){rect(-26,y,44,3,C('#1a1210'))}
   rect(414,240,90,40,C('#0a0808'));rect(414,240,90,1,C('#c86a34'));for(let x=422;x<500;x+=14)rect(x,246,8,3,C('#3a2a20'))})},
 draw(u){
  const cm=camx(u,8,50,1),bo=-round(cm);
  blit(L0,-round(cm*.18));
  for(let k=0;k<3;k++){const x=mod(u*20+k*170,W+90)-45,y=118+k*26+sin(u*.7+k)*4;poly([[x-5,y],[x+4,y-2],[x+1,y+3]],C('#1a0a0e'));px(x-5,y,C('#ff8a30'))}
  glow(340-round(cm*.18),150,74,[255,190,110],.6,2,60);
  blit(L1,-round(cm*.5));
  for(const lx of lamps)glow(lx-round(cm*.5),95,18,[255,170,70],.5+.1*sin(u*5+lx),2);
  blit(L2,-round(cm));
  for(let i=0;i<3;i++){const o=i*46,k=.075+.025*sin(u*.8+i*2);apoly([[236+o,112],[276+o,112],[120+o*.6-i*20,226],[24+o*.6-i*20,226]],[255,175,90],k)}
  for(let i=0;i<64;i++){const x=40+hsh(i,1,4)*260+sin(u*.6+i)*6-round(cm*.9),y=112+mod(hsh(i,2,4)*120+u*(2+hsh(i,3,4)*3),114);dpx(x,y,C('#ffd9a0'),.55+.4*sin(u*2+i))}
  cfg.cx=255+bo;drawDuel(u,cfg,CH.yoda,CH.dooku);
  refl(226,18,.16,.7,0,0,u);
  mist(196,50,[210,150,90],.22,u,5,.016,4);
  blit(L3,-round(cm*1.6))}}
})());
/* ---------- EPISODE III : MUSTAFAR ---------- */
SC.push((()=>{
 let L0,L1,PL,BK;const LW=128,LH=80,lv1=new Float32Array(LW*LH),lv2=new Float32Array(LW*LH);
 const LST=S('#1a0300','#5a0e04','#b82a06','#ff6a10','#ffd060');
 const dy_=u=>round(2*sin(u*.6)),dx_=u=>round(6*sin(u*.35));
 const cfg={cx:250,yfn:u=>226+dy_(u),g0:70,g1:44,roam:12,T:1.7,hop:7,seed:3,spk:'#ffd060'};
 const CHUNKS=[[3.2,392,64,-40],[9.6,120,58,30],[16.4,330,70,10],[21.0,200,60,-20]];
 return{num:'III',title:'REVENGE OF THE SITH',place:'MUSTAFAR',acc:'#ff6a10',
 init(){
  for(let y=0;y<LH;y++)for(let x=0;x<LW;x++){lv1[y*LW+x]=fbm(x/16,y/12,4,5,8,0);lv2[y*LW+x]=fbm(x/16,y/10,4,11,8,0)}
  L0=mkLayer(()=>{fillGrad(0,190,S('#0b0304','#2c0806','#6a1a08','#c4400c','#f09030'));rect(X0,190,X1-X0,H-190,C('#f09030'));
   ridge(150,74,4.1,[C('#160607'),C('#7a2a10'),0,C('#0c0304')],{fx:.016,oct:5,fade:50})});
  L1=mkLayer(()=>{const tw_=[[30,14,96],[62,10,60],[104,18,120],[160,12,74],[214,10,50],[300,16,104],[352,12,66],[400,20,128],[452,12,84]];
   for(const [x,w,h] of tw_){rect(x,192-h,w,h,C('#0c0506'));rect(x+w-1,192-h,1,h,C('#7a2a10'));rect(x+w/2-1,192-h-14,2,14,C('#0c0506'));
    for(let y=192-h+6;y<190;y+=8)for(let xx=x+2;xx<x+w-2;xx+=4)if(hsh(xx,y,3)>.6)px(xx,y,C('#ff8a30'));
    for(let y=192-h;y<190;y+=14)line(x,y,x+w,y+14,C('#1a0a0a'))}
   for(let i=0;i<tw_.length-1;i++){const a=tw_[i],b=tw_[i+1],x0=a[0]+a[1]/2,x1=b[0]+b[1]/2,y0=192-a[2]*.7,y1=192-b[2]*.7;for(let t=0;t<=1;t+=.02){const x=lerp(x0,x1,t),y=lerp(y0,y1,t)+10*4*t*(1-t);rect(x,y,2,2,C('#140909'))}}});
  PL=mkLayer(()=>{poly([[128,220],[372,220],[392,232],[108,232]],C('#2c2226'));rect(128,220,244,1,C('#7a5a5c'));
   for(let x=100;x<410;x+=10)line(250+(x-250)*.9,221,x,231,C('#1a1216'));
   rect(108,232,284,12,C('#170f11'));rect(108,244,284,1,C('#ff7a20'));for(let x=112;x<390;x+=14)poly([[x,234],[x+6,234],[x+4,241],[x-2,241]],C('#8a6a18'));
   for(const x of[140,190,250,310,360])tline(x,245,250+(x-250)*.55,266,C('#0a0607'),3);rect(160,266,180,3,C('#0a0607'))});
  BK=mkLayer(()=>{ridge(230,30,9.9,[C('#0a0405'),C('#c8480e'),0,C('#050203')],{fx:.03,fade:30});for(let y=0;y<H;y++)for(let x=80;x<410;x++)px(x,y,0)})},
 draw(u){
  const cm=camx(u,6,46,.5);
  blit(L0,-round(cm*.15));
  mist(60,70,[50,16,12],.95,u,5,.012,3);mist(150,44,[140,44,14],.6,u,9,.02,8);
  blit(L1,-round(cm*.4));glow(240,192,320,[255,100,30],.38+.05*sin(u*4),2,60);
  for(let y=188;y<H;y++){const dd=(y-188)/(H-188),k=.5+.5*dd,ty=mod(fl((y-188)*k*.9),LH),ty2=mod(ty-fl(u*4),LH);for(let x=0;x<W;x++){const tx=mod(fl((x-240)*k+240+u*13),LW),tx2=mod(fl((x-240)*k+240-u*9),LW);let v=lv1[ty*LW+tx]*.6+lv2[ty2*LW+tx2]*.4;v=clamp((v-.3)*1.9)*(.78+.22*dd);px(x,y,gcol(LST,v*.95+.05*sin(u*2+x*.05),x,y))}}
  for(let i=0;i<14;i++){const per=3+hsh(i,1,6)*3,ph=mod(u/per+hsh(i,2,6),1),x=30+hsh(i,3,6)*420,y=204+hsh(i,4,6)*56;if(ph<.5){const r=fl(1+3*sin(ph*2*PI));if(r>0){for(let a=0;a<8;a++)px(x+cos(a*.785)*r,y+sin(a*.785)*r*.5,C('#ffe070'))}else px(x,y,C('#fff0a0'))}}
  for(const [t0,x0,y0,dx] of CHUNKS){const a=(u-t0)/2.4;if(a>=0&&a<1){const x=x0+dx*a,y=y0+(196-y0)*a*a,an=a*4,c=cos(an),s=sin(an);const pts=[[-9,-2.5],[9,-2.5],[9,2.5],[-9,2.5]].map(p=>[x+p[0]*c-p[1]*s,y+p[0]*s+p[1]*c]);poly(pts,C('#2a1c1c'));line(pts[2][0],pts[2][1],pts[3][0],pts[3][1],C('#ff7a20'));for(let i=1;i<7;i++)dpx(x-dx*.05*i+(hsh(i,fl(u*20),1)-.5)*3,y-i*3,C('#ff9a30'),1-i/7);glow(x,y,16,[255,120,30],.4,2)}
   const b=u-t0-2.4;if(b>=0&&b<1.6){const ix=x0+dx;for(let i=0;i<16;i++){const ag=-PI/2+(hsh(i,1,8)-.5)*1.7,v=30+hsh(i,2,8)*50;px(ix+cos(ag)*v*b,196+sin(ag)*v*b+60*b*b,C(i&1?'#ffe070':'#ff7a1a'))}glow(ix,196,44,[255,130,30],.8*(1-b/1.6),2,20)}}
  blit(BK,-round(cm*1.2));
  const dx=dx_(u),dy=dy_(u);blit(PL,dx,dy);
  glow(250+dx,234+dy,130,[255,110,25],.34+.06*sin(u*7),2,46);
  cfg.cx=250+dx;drawDuel(u,cfg,CH.obi3,CH.anak);
  for(let i=0;i<70;i++){const sp=14+hsh(i,1,3)*24,y=H-mod(u*sp+hsh(i,2,3)*400,300),x=mod(hsh(i,3,3)*W+sin(u*.8+i*1.7)*9+u*4,W);dpx(x,y,C(hsh(i,4,3)>.6?'#ffe070':'#ff7a1a'),.55+.45*sin(u*9+i))}
  mist(196,60,[255,110,30],.16,u,7,.03,12)}}
})());
