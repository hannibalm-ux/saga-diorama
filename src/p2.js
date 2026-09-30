/* ================= CHARACTERS & DUEL CHOREOGRAPHY ================= */
const SAB={
 blue:{core:'#e6f4ff',body:'#3d8bff',glow:[70,150,255]},
 blue2:{core:'#dfeaff',body:'#2f6bff',glow:[50,110,255]},
 green:{core:'#eaffee',body:'#3ee06a',glow:[60,255,110]},
 red:{core:'#fff0f0',body:'#ff2a2a',glow:[255,50,50]},
 redX:{core:'#fff0f0',body:'#ff2a2a',glow:[255,50,50],cross:1},
 staff:{core:'#fffbe0',body:'#ffc23a',glow:[255,190,60],crackle:1}
};
const CH={
 qui:{h:32,base:'#7b6544',dark:'#4c3d29',light:'#a68f66',skin:'#d9a878',robe:1,head:'qui',belt:'#2c2016',sab:SAB.green,len:27},
 maul:{h:32,base:'#171319',dark:'#0a080d',light:'#3a2a34',skin:'#b3201d',robe:1,head:'maul',belt:'#000000',sab:SAB.red,len:22,dbl:1},
 obiY:{h:32,base:'#8a7350',dark:'#54432c',light:'#b8a072',skin:'#dcae88',robe:1,head:'obiY',belt:'#3a2a1a',sab:SAB.blue,len:27},
 yoda:{h:15,base:'#8a7a4c',dark:'#5a4e30',light:'#b0a070',skin:'#7aa85a',robe:1,head:'yoda',sab:SAB.green,len:17,hopK:1.6},
 dooku:{h:33,base:'#1c1c26',dark:'#101018',light:'#42465a',skin:'#e0bc9a',robe:1,head:'dooku',cape:'#14141c',capeL:'#3a3e54',sab:SAB.red,len:27},
 anak:{h:32,base:'#3a2c22',dark:'#1e1610',light:'#6a5240',skin:'#d8a680',robe:1,head:'anak',belt:'#111111',sab:SAB.blue2,len:27},
 obi3:{h:32,base:'#a08a62',dark:'#6a5638',light:'#d0bb90',skin:'#dcae88',robe:1,head:'obi3',belt:'#3a2a1a',sab:SAB.blue,len:27},
 obiOld:{h:32,base:'#6e5a40',dark:'#40321f',light:'#9a8460',skin:'#d2a684',robe:1,head:'hood',hood:'#5a4830',belt:'#2a2018',sab:SAB.blue,len:27},
 vader:{h:36,base:'#0d0d11',dark:'#050507',light:'#2e2e38',skin:'#111111',head:'vader',cape:'#08080b',capeL:'#25252e',chest:1,glove:'#0a0a0c',belt:'#1a1a20',sab:SAB.red,len:28},
 luke:{h:32,base:'#141418',dark:'#08080b',light:'#34343e',skin:'#e0b48e',head:'luke',glove:'#0a0a0c',belt:'#3a2e22',sab:SAB.green,len:27},
 kylo:{h:35,base:'#0e0e12',dark:'#060608',light:'#30303c',skin:'#e6c8b0',robe:1,head:'kylo',cape:'#0a0a0e',capeL:'#2a2a34',sab:SAB.redX,len:27,glove:'#0a0a0c'},
 rey:{h:31,base:'#c8b08a',dark:'#8a7654',light:'#e6d4ac',skin:'#c99368',head:'rey',belt:'#5a4020',sab:SAB.blue,len:26,leg:'#8a7654'},
 guard:{h:36,base:'#b4181f',dark:'#6a0c12',light:'#f0585c',skin:'#330000',head:'guard',robe:1,belt:'#d8a530',sab:SAB.staff,len:19,dbl:1,leg:'#6a0c12',glove:'#330000'}
};
function geo(f,x,y,face,o){
 const h=f.h,hop=o.hop||0,cr=o.crouch||0,ln=(o.lean||0)*face;
 const legL=fl(h*.42)-cr,hipY=y-hop-legL,tor=fl(h*.34),shY=hipY-tor,hs=max(4,fl(h*.2));
 const sx=x+ln*.6,hx=x+ln,rr=max(3,fl(h*.19)+(o.reach||0)*(h/32));
 return{h,hipY,shY,hs,sx,hx,legL,hand:[sx+face*rr,shY+(o.hy===undefined?4:o.hy)]}
}
function head(f,hx,top,hs,face,u){
 const K=C(f.skin),m=(dx,dy,w,h,c)=>rect(face>0?hx+dx:hx-dx-w,top+dy,w,h,typeof c==='string'?C(c):c);
 switch(f.head){
 case'qui':m(-3,0,6,hs,K);m(-5,-1,8,3,C('#8a7a66'));m(-5,1,3,hs+3,C('#8a7a66'));m(0,hs-2,3,3,C('#8a7a66'));m(1,2,1,1,'#222');break;
 case'maul':m(-3,0,6,hs,'#b3201d');m(-2,0,1,hs,'#111');m(0,0,1,hs-2,'#111');m(2,1,1,hs-2,'#111');m(-3,-2,1,2,'#d8c890');m(-1,-3,1,3,'#d8c890');m(1,-2,1,2,'#d8c890');m(1,2,2,1,'#ffd820');break;
 case'obiY':m(-3,0,6,hs,K);m(-4,-1,8,2,'#a05a2a');m(-4,1,2,3,'#a05a2a');m(-5,2,1,8,'#a05a2a');m(1,2,1,1,'#222');break;
 case'obi3':m(-3,0,6,hs,K);m(-4,-1,8,2,'#9a5a30');m(0,hs-2,3,2,'#9a5a30');m(1,2,1,1,'#222');break;
 case'hood':ell(hx,top+hs/2,hs/2+2.5,hs/2+3,C(f.hood));m(0,2,3,hs-2,K);m(-1,1,4,1,'#111');m(1,hs-2,2,2,'#c8c0b0');break;
 case'dooku':m(-3,0,6,hs,K);m(-4,-1,7,3,'#e8e8f0');m(-4,0,2,hs,'#e8e8f0');m(1,hs-1,2,2,'#dcdce8');m(1,2,1,1,'#222');break;
 case'yoda':ell(hx,top+2,3,3,K);tline(hx-2,top+2,hx-7,top+3,K,2);tline(hx+2,top+2,hx+7,top+3,K,2);m(1,1,1,1,'#222');px(hx,top-1,C('#e6e6e6'));break;
 case'anak':m(-3,0,6,hs,K);m(-4,-1,8,3,'#5a3a20');m(-4,1,2,3,'#5a3a20');m(1,2,1,1,'#222');break;
 case'luke':m(-3,0,6,hs,K);m(-4,-1,8,3,'#d8b868');m(-4,1,2,2,'#d8b868');m(1,2,1,1,'#222');break;
 case'kylo':ell(hx,top+hs/2+.5,hs/2+2.5,hs/2+3,C('#08080b'));m(0,1,3,hs-1,K);m(-3,1,3,hs+2,'#08080b');m(1,2,1,1,'#222');break;
 case'rey':m(-3,0,6,hs,K);m(-3,-1,6,2,'#7a5430');for(let k=0;k<3;k++)disc(hx-face*4,top+k*2.3,1.5,C('#7a5430'));m(1,2,1,1,'#222');break;
 case'guard':m(-4,-2,8,hs+3,'#8a0e14');m(-4,-2,8,1,'#d8a530');m(0,2,4,1,'#000');m(-1,-4,2,3,'#c41a1a');m(-4,hs,8,1,'#d8a530');break;
 case'vader':ell(hx,top+hs/2,hs/2+2,hs/2+1.5,C('#0a0a0d'));m(-4,0,2,hs+1,'#0a0a0d');m(0,2,2,1,'#3a3a46');m(-1,hs-1,4,3,'#1c1c22');m(1,hs,2,1,'#9a9aa8');px(hx+face*-1,top-1,C('#2a2a34'));break}
}
function fig(f,x,y,face,o){
 const g=geo(f,x,y,face,o),u=o.u||0,hipY=g.hipY,shY=g.shY,hs=g.hs,sx=g.sx,fy=y-(o.hop||0),st=o.stride||4;
 const cB=C(f.base),cD=C(f.dark),cL=C(f.light),cBoot=C('#0d0b0e'),legC=C(f.leg||f.dark),skin=C(f.glove||f.skin);
 if(f.cape){const a=sin(u*2.3+x*.04)*2.5,b=sin(u*1.9+1.7)*3.5,x1=x-face*(5+a),x2=x-face*(12+b+f.h*.05);poly([[sx-face*3,shY],[sx+face*1,shY],[x1,fy-1],[x2,fy-3+(b>0?0:1)]],C(f.cape));line(sx-face*3,shY,x2,fy-3,C(f.capeL||f.cape))}
 const fx1=x+face*st,fx2=x-face*st;
 tline(x-face,hipY,fx2,fy-1,cD,3);tline(x+face,hipY,fx1,fy-1,legC,3);rect(fx2-2,fy-2,5,2,cBoot);rect(fx1-2,fy-2,5,2,cBoot);
 if(f.robe){const fw=sin(u*2.6+x*.07)*1.5,fw2=sin(u*2.1+2)*2;poly([[sx-4,shY+3],[sx+4,shY+3],[x+face*2+7+fw,fy-2],[x+face*2-7-fw2,fy-2]],cB);line(x-2,hipY,x-4,fy-3,cD);line(x+2,hipY,x+4,fy-3,cD);line(x+face*5,shY+5,x+face*7+fw,fy-3,cL);line(x-6,fy-2,x+7,fy-2,cD)}
 poly([[sx-4,shY],[sx+4,shY],[x+3,hipY+1],[x-3,hipY+1]],cB);line(sx+face*3,shY+1,x+face*2,hipY,cL);
 rect(x-3,hipY-1,7,2,C(f.belt||'#2a2018'));
 if(f.chest){rect(sx+face*1-1,shY+3,4,3,C('#15151a'));px(sx+face*1,shY+4,(fl(u*3)&1)?C('#ff3030'):C('#3060ff'));px(sx+face*2,shY+4,C('#30ff60'));px(sx+face*2,shY+5,C('#ffd040'))}
 tline(sx-face*2,shY+1,sx-face*6,shY+6+(sin(u*2)>0?1:0),cD,2);px(sx-face*6,shY+7,skin);
 rect(g.hx-1,shY-1,3,2,C(f.skin));
 head(f,g.hx,shY-hs,hs,face,u);
 tline(sx+face*2,shY+1,g.hand[0],g.hand[1],cB,3);rect(g.hand[0]-1,g.hand[1]-1,2,2,skin);
 return g
}
function saber(hand,ang,face,len,sab,u,ph=0,noHilt=false){
 const fk=1+.02*sin(u*53+ph)+.015*sin(u*31+ph*2),L=len*fk,dx=face*cos(ang),dy=sin(ang);
 const x0=hand[0],y0=hand[1],x1=x0+dx*L,y1=y0+dy*L,nx=-dy,ny=dx,body=C(sab.body),core=C(sab.core);
 if(!noHilt)tline(x0-dx*4,y0-dy*4,x0+dx*1.5,y0+dy*1.5,C('#8e94a0'),2);
 dline(x0+nx*2.4,y0+ny*2.4,x1+nx*2.4,y1+ny*2.4,body,.42);dline(x0-nx*2.4,y0-ny*2.4,x1-nx*2.4,y1-ny*2.4,body,.42);
 tline(x0,y0,x1,y1,body,3);line(x0,y0,x1,y1,core);px(x1,y1,core);
 const gk=.9+.1*sin(u*29+ph),n=ceil(L/9);
 for(let i=0;i<=n;i++){const t=i/n;glow(x0+dx*L*t,y0+dy*L*t,15,sab.glow,.30*gk,2)}
 if(sab.cross){const bx=x0+dx*3,by=y0+dy*3;for(const s of[-1,1]){const l=4+3*hsh(fl(u*30),s,ph),ex=bx+nx*s*l,ey=by+ny*s*l;tline(bx,by,ex,ey,body,2);px(ex,ey,core);glow(ex,ey,8,sab.glow,.3,2)}}
 if(sab.crackle){for(let i=0;i<5;i++){const t=hsh(fl(u*26),i,ph+9),jx=(hsh(fl(u*26),i,ph+3)-.5)*4,jy=(hsh(fl(u*26),i,ph+4)-.5)*4;px(x0+dx*L*t+jx,y0+dy*L*t+jy,C('#ffffff'))}}
 return[x1,y1]
}
const CLASH_OFF=[-13,-3,-8,-17];
function duelState(u,cfg,A,B){
 const Tb=cfg.T||1.8,b=fl(u/Tb),p=u/Tb-b,typ=mod(b,4),attA=(b&1)===0;
 const sG=p<.2?0:p<.42?sm((p-.2)/.22):p<.62?1:p<.88?1-sm((p-.62)/.26):0;
 const gap=lerp(cfg.g0,cfg.g1,sG);let xa,xb;
 if(cfg.anchor==='A'){xa=cfg.at;xb=xa+gap}else if(cfg.anchor==='B'){xb=cfg.at;xa=xb-gap}else{const m=cfg.cx+(cfg.roam||0)*sin(u*.31+(cfg.ph||0));xa=m-gap/2;xb=m+gap/2}
 const y=cfg.yfn?cfg.yfn(u):cfg.y;
 const raise=p<.2?sm(p/.2):p<.32?1:p<.42?1-sm((p-.32)/.1):0,ht=sin(PI*clamp((p-.12)/.55)),hopA0=cfg.hop||7;
 const hop=(f,att)=>f.hopK?round(hopA0*f.hopK*ht):(typ===2&&att?round(hopA0*ht):0);
 const oA={u,lean:sG*(attA?3:1),crouch:(typ===1&&!attA)?round(3*sG):0,hop:hop(A,attA),stride:4+round(3*sG),hy:4-11*(attA?raise:0),reach:sG*3};
 const oB={u,lean:sG*(attA?1:3),crouch:(typ===1&&attA)?round(3*sG):0,hop:hop(B,!attA),stride:4+round(3*sG),hy:4-11*(attA?0:raise),reach:sG*3};
 const gA=geo(A,xa,y,1,oA),gB=geo(B,xb,y,-1,oB);
 const off=CLASH_OFF[typ]*(A.h+B.h)/64,Cp={x:(gA.hand[0]+gB.hand[0])/2,y:(gA.hand[1]+gB.hand[1])/2+off};
 const ang=(g,face,att)=>{const tc=atan2(Cp.y-g.hand[1],(Cp.x-g.hand[0])*face),gd=-1.05,w=-2.5;
  if(p<.2)return att?lerp(gd,w,sm(p/.2)):gd+.08*sin(u*3);
  if(p<.42){const q=(p-.2)/.22;return att?lerp(w,tc,q*q):lerp(gd,tc,sm(q))}
  if(p<.62)return tc+.04*sin(u*38);
  if(p<.9)return lerp(tc,gd,sm((p-.62)/.28));return gd};
 return{xa,xb,y,oA,oB,gA,gB,C:Cp,angA:ang(gA,1,attA),angB:ang(gB,-1,!attA),p,b,typ,sG,Tb,attA}
}
function drawDuel(u,cfg,A,B){
 const s=duelState(u,cfg,A,B);
 if(!cfg.noShadow){dell(s.xa,s.y,A.h*.3,2,C('#000000'),.55);dell(s.xb,s.y,B.h*.3,2,C('#000000'),.55)}
 fig(A,s.xa,s.y,1,s.oA);fig(B,s.xb,s.y,-1,s.oB);
 saber(s.gA.hand,s.angA,1,A.len,A.sab,u,0);if(A.dbl)saber(s.gA.hand,s.angA+PI,1,A.len*.9,A.sab,u,1,true);
 saber(s.gB.hand,s.angB,-1,B.len,B.sab,u,2);if(B.dbl)saber(s.gB.hand,s.angB+PI,-1,B.len*.9,B.sab,u,3,true);
 const hold=sm((s.p-.4)/.05)*(1-sm((s.p-.6)/.06));
 if(hold>0){glow(s.C.x,s.C.y,13,[255,235,190],.75*hold,2);dpx(s.C.x,s.C.y,C('#ffffff'),1);px(s.C.x+1,s.C.y,C('#fff4d8'))}
 for(const bb of[s.b,s.b-1]){const tc=(bb+.44)*s.Tb,age=u-tc;if(age>=0&&age<.95){const cs=duelState(tc,cfg,A,B).C;spark(cs.x,cs.y,age,bb*7+(cfg.seed||0),18,C('#fff4d8'),C(cfg.spk||'#ffb040'))}}
 return s
}
/* scale up all characters for readability */
for(const k in CH){CH[k].h=round(CH[k].h*1.22);CH[k].len=round(CH[k].len*1.18)}
CH.yoda.h=25;CH.yoda.len=21;
