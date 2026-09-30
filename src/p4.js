/* ================= SCENES IV - VI ================= */
/* ---------- EPISODE IV : DEATH STAR CORRIDOR ---------- */
SC.push((()=>{
 let L0;const bars=[];const VX=240,VY=118,F=150,YF=.56,YC=.95,ZE=7;
 const cfg={cx:250,y:224,g0:84,g1:52,roam:12,T:1.8,hop:7,seed:4,spk:'#ffd8a0'};
 return{num:'IV',title:'A NEW HOPE',place:'DEATH STAR CORRIDOR',acc:'#4aa8ff',
 init(){
  L0=mkLayer(()=>{const HAZE=C('#9fbadb'),GE=S('#f4fbff','#bcd8f5','#6c8fb8');
   for(let y=0;y<H;y++)for(let x=X0;x<X1;x++){
    const dx=x-VX+.5,dy=y-VY+.5,zw=abs(dx)>.01?F/abs(dx):1e9,zf=dy>.01?F*YF/dy:1e9,zc=dy<-.01?F*YC/-dy:1e9,z=min(zw,zf,zc);
    if(z>ZE){px(x,y,gcol(GE,sqrt(dx*dx+dy*dy)/60,x,y));continue}
    const pi_=fl(z*3),seam=z*3-pi_<.06;let c;
    if(z===zw){const Y=dy*z/F,zm=mod(z,2.4);c=(pi_&1)?C('#56637a'):C('#4a566b');
     if(seam)c=C('#2a3344');else if(Y>.34)c=C('#2c3546');
     else if(Y>-.42&&Y<-.33){c=C('#d8f2ff');bars.push([x,y,z,1])}
     else if(zm>.3&&zm<1.3&&Y>-.5&&Y<.34){c=(zm<.4||zm>1.2)?C('#7a88a4'):C('#333c4f')}
     else if(Y<-.48&&Y>-.56&&(pi_%4===1)){c=C('#6a1a1a');bars.push([x,y,z,2])}}
    else if(z===zf){const X=dx*z/F;c=(pi_&1)?C('#1d2532'):C('#161d29');if(seam)c=C('#0c1118');if(abs(X)<.05)c=C('#3a4a62');if(abs(X)>.78&&abs(X)<.9)c=C('#3c5a80')}
    else{const X=dx*z/F;c=(pi_&1)?C('#4c576c'):C('#434e62');if(seam)c=C('#222a38');if(abs(X)<.09){c=C("#e8f6ff");bars.push([x,y,z,1])}}
    px(x,y,mixc(c,HAZE,clamp(pow(z/ZE,1.3))*.8))}})},
 draw(u){
  const cm=camx(u,4,40),ox=-round(cm*.2),bo=-round(cm);
  blit(L0,ox);
  for(let i=0;i<bars.length;i++){const b=bars[i];if(b[3]===1){const k=(.5+.5*sin(b[2]*2.6-u*3.2))*.5*(1-b[2]/ZE*.6);add(b[0]+ox,b[1],150,225,255,k)}else{const k=sin(u*4)>0?.85:.1;add(b[0]+ox,b[1],255,50,40,k)}}
  glow(240+ox,118,120,[170,210,255],.5,2);
  cfg.cx=250+bo;const s=drawDuel(u,cfg,CH.obiOld,CH.vader);
  refl(224,40,.45,.6,0,0,u);
  mist(196,74,[170,200,235],.22,u,6,.018,5);
  for(let i=0;i<40;i++){const x=hsh(i,1,5)*W,y=mod(hsh(i,2,5)*270+u*(3+hsh(i,3,5)*4),270);dpx(x+sin(u*.5+i)*4,y,C('#cfe6ff'),.35)}}}
})());
/* ---------- EPISODE V : CLOUD CITY ---------- */
SC.push((()=>{
 let L0,L1,L2,L3;const VENTS=[[52,0],[150,2.1],[338,4.0],[428,1.2]];
 const cfg={cx:250,y:222,g0:84,g1:52,roam:12,T:1.8,hop:7,seed:5,spk:'#ffc070'};
 return{num:'V',title:'THE EMPIRE STRIKES BACK',place:'CLOUD CITY REACTOR SHAFT',acc:'#ff8a30',
 init(){
  L0=mkLayer(()=>{fillGrad(0,H,S('#06080c','#0e131a','#241a14','#5a2a12','#b85a1a'));
   for(let x=-70;x<W+70;x+=90){rect(x,0,34,H,C('#0c1016'));rect(x+33,0,1,H,C('#2f3b4b'));rect(x+1,0,1,H,C('#06080c'));for(let y=10;y<H;y+=26){rect(x,y,34,3,C('#1a222c'));px(x+17,y+12,C('#c86a2a'));px(x+9,y+12,C('#8a4a1e'));px(x+25,y+12,C('#8a4a1e'))}}
   rect(X0,60,X1-X0,4,C('#0a0d12'));rect(X0,118,X1-X0,3,C('#0a0d12'))});
  L1=mkLayer(()=>{for(let x=-60;x<W+60;x+=70){tline(x,70,x+70,150,C('#0b0f14'),2);tline(x+70,70,x,150,C('#0b0f14'),2)}
   rect(X0,148,X1-X0,11,C('#141b23'));rect(X0,148,X1-X0,1,C('#4a586a'));rect(X0,158,X1-X0,1,C('#a8501c'));
   for(let x=-20;x<W+40;x+=110){rect(x,120,26,28,C('#10161d'));rect(x+3,126,20,3,C('#ff8a30'));rect(x+3,133,20,2,C('#c85a1c'))}});
  L2=mkLayer(()=>{rect(X0,220,X1-X0,10,C('#252e3a'));rect(X0,220,X1-X0,1,C('#5a6a80'));for(let x=X0;x<X1;x+=6)rect(x,230,2,8,C('#151b24'));
   for(let x=X0;x<X1;x+=30){line(x,238,x+15,258,C('#10151c'));line(x+15,258,x+30,238,C('#10151c'))}rect(X0,238,X1-X0,3,C('#1a222c'));
   for(let x=X0;x<X1;x+=60)rect(x,194,2,26,C('#3a4656'));rect(X0,194,X1-X0,2,C('#4a586a'));rect(X0,207,X1-X0,1,C('#2a3442'))});
  L3=mkLayer(()=>{rect(-34,0,40,H,C('#05070a'));rect(5,0,1,H,C('#c86a2a'));rect(W-8,0,44,H,C('#05070a'));rect(W-8,0,1,H,C('#c86a2a'));for(let y=30;y<H;y+=50){rect(-34,y,40,4,C('#0c1016'));rect(W-8,y,44,4,C('#0c1016'))}})},
 draw(u){
  const cm=camx(u,6,48,2),bo=-round(cm);
  blit(L0,-round(cm*.15));glow(240,275,330,[255,110,30],.55+.08*sin(u*3),2,115);
  mist(140,110,[200,90,30],.32,u,6,.014,3);
  blit(L1,-round(cm*.5));
  blit(L2,-round(cm));
  for(const[vx,ph]of VENTS){const t=mod(u/6+ph/6,1);if(t<.55){const it=sin(t/.55*PI);for(let j=0;j<20;j++){const a=(j/20)*it,x=vx+bo+sin(j*1.3+u*3)*(2+a*7),y=252-a*150,r=3+a*11;dell(x,y,r,r*.85,C('#ffd9b0'),.62*(1-a)+.1)}}}
  const s1=mod(u*17,W+240)-120,s2=W-mod(u*11+130,W+240)+120;for(const[sx_,w]of[[s1,44],[s2,30]]){spans([[sx_,0],[sx_+w,0],[sx_+w-100,H],[sx_-100,H]],(y,a,b)=>{for(let x=a;x<b;x++)mul(x,y,.7)})}
  glow(250+bo,238,130,[255,120,40],.3+.05*sin(u*5),2,44);
  cfg.cx=250+bo;drawDuel(u,cfg,CH.luke,CH.vader);
  mist(200,60,[255,120,40],.16,u,7,.03,9);
  blit(L3,-round(cm*1.6))}}
})());
/* ---------- EPISODE VI : THRONE ROOM ---------- */
SC.push((()=>{
 let L0,L1,L2,L3;const SPACE=mkStars(230,61,10,150);
 const PANE=(x,y)=>{const i=fl((x-60)/70);if(i<0||i>4)return false;const lx=(x-60)-i*70;return lx>=6&&lx<=66&&y>=(32+abs(i-2)*7)&&y<=150};
 const cfg={cx:290,y:216,g0:84,g1:52,roam:12,T:1.9,hop:7,seed:6,spk:'#ffb090'};
 const BOLTS=[[3,5.6],[11,13.6],[19,21.4]];
 return{num:'VI',title:'RETURN OF THE JEDI',place:'DEATH STAR II THRONE ROOM',acc:'#e0203a',bl:[255,60,75],
 init(){
  L0=mkLayer(()=>{fillbuf(C('#020206'));const LG=S('#010405','#0a2a24','#1e6a52','#5aa88a');
   for(let y=42;y<=118;y++)for(let x=122;x<=198;x++){const nx=(x-160)/38,ny=(y-80)/38,d2=nx*nx+ny*ny;if(d2>1)continue;const nz=sqrt(1-d2),lum=max(0,-nx*.6-ny*.5+nz*.6)+(fbm(x*.09,y*.09,3,7)-.5)*.45;px(x,y,gcol(LG,lum,x,y))}
   for(let a=0;a<TAU;a+=.02){const x=160+cos(a)*39,y=80+sin(a)*39;if(cos(a)*-.6-sin(a)*.5>0)dpx(x,y,C('#6ad0ff'),.7)}});
  L1=mkLayer(()=>{for(let y=0;y<H;y++)for(let x=X0;x<X1;x++){if(PANE(x,y))continue;let c=gcol(S('#0a0508','#120609','#0c0407'),y/H,x,y);if(y>150&&mod(x,26)<2)c=C('#5a0c16');
    if(PANE(x-2,y)||PANE(x+2,y)||PANE(x,y-2)||PANE(x,y+2))c=C('#8a1020');px(x,y,c)}
   rect(36,176,128,10,C('#14090e'));rect(48,166,104,10,C('#1a0c12'));rect(60,156,80,10,C('#20101a'));for(const[y,x0,w]of[[176,36,128],[166,48,104],[156,60,80]])rect(x0,y,w,1,C('#8a1020'));
   poly([[84,156],[86,96],[114,96],[116,156]],C('#0a0608'));poly([[88,152],[89,100],[111,100],[112,152]],C('#150c10'));rect(86,96,28,2,C('#8a1020'));
   poly([[92,150],[94,124],[106,124],[108,150]],C('#1a1a22'));ell(100,120,6,6.5,C('#101016'));rect(98,119,4,3,C('#c8b4a0'));
   tline(94,132,90,144,C('#1a1a22'),4);tline(106,132,110,144,C('#1a1a22'),4)});
  L2=mkLayer(()=>{fillGrad(186,H,S('#180609','#0a0308','#050206'));rect(X0,186,X1-X0,1,C('#8a1020'));for(let x=-300;x<W+300;x+=50)line(240+(x-240)*.2,187,x,H,C('#3a0a14'));for(let k=1;k<7;k++)rect(X0,186+fl(84*pow(k/7,1.6)),X1-X0,1,C('#2a0810'))});
  L3=mkLayer(()=>{rect(-30,0,40,H,C('#040204'));rect(9,0,1,H,C('#a01424'));rect(W-10,0,44,H,C('#040204'));rect(W-10,0,1,H,C('#a01424'))})},
 draw(u){
  const cm=camx(u,5,52,1.2),bo=-round(cm*.9);
  blit(L0,-round(cm*.06));twStars(SPACE,u,-cm,.06,[0,0,25]);
  for(let i=0;i<6;i++){const ph=mod(u/(3+i*1.1)+i*.37,1),x=130+i*47-round(cm*.06),y=50+((i*37)%80);if(ph<.14){glow(x,y,9,[255,200,120],(1-ph/.14)*.9,2);px(x,y,C('#ffe8b0'))}}
  {const x=mod(u*3+60,700)-90-round(cm*.06);poly([[x,96],[x+34,100],[x,105]],C('#1c1e2a'));px(x,100,C('#6ab0ff'))}
  blit(L1,-round(cm*.5));blit(L2,bo);
  let act=0,bk=null;for(const b of BOLTS)if(u>=b[0]&&u<b[1]){act=1;bk=b}
  cfg.cx=290+bo;
  if(act){const fl_=.6+.4*hsh(fl(u*20),1,2);glow(100-round(cm*.5),140,150,[70,130,255],.4*fl_,2,110);}
  const s=drawDuel(u,cfg,CH.luke,CH.vader);
  if(act){const sd=fl(u*14),x0=102-round(cm*.5),y0=138,x1=s.xa+8,y1=s.y-26;let pts=[];for(let i=0;i<=16;i++){const t=i/16;pts.push([lerp(x0,x1,t)+(hsh(i,sd,1)-.5)*16*sin(PI*t),lerp(y0,y1,t)+(hsh(i,sd,2)-.5)*24*sin(PI*t)])}
   for(let i=0;i<16;i++){tline(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],C('#4a7aff'),3);dline(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],C('#bcd8ff'),1)}for(let i=0;i<16;i++)line(pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],C('#ffffff'));
   for(let br=0;br<3;br++){const k=2+fl(hsh(br,sd,3)*10),bx=pts[k][0],by=pts[k][1];let px_=bx,py_=by;for(let i=0;i<6;i++){const nx=px_+(hsh(i,sd+br,4)-.3)*14,ny=py_+(hsh(i,sd+br,5)-.5)*14;line(px_,py_,nx,ny,C('#9fc8ff'));px_=nx;py_=ny}}
   glow(x1,y1,26,[120,170,255],.9,2)}
  refl(216,44,.5,.55,0,0,u);
  mist(196,60,[160,20,40],.16,u,5,.02,6);
  blit(L3,-round(cm*1.6))}}
})());
