"""Original 160-second lofi score. No samples or third-party recordings."""
from pathlib import Path
import argparse, wave, subprocess
import numpy as np
parser=argparse.ArgumentParser();parser.add_argument('--ffmpeg',default='ffmpeg');args=parser.parse_args()
SR=32000;beat=60/72;length=48*4*beat;N=int(length*SR)
rng=np.random.default_rng(20261018);mix=np.zeros((N,2),dtype=np.float32)
def add(sound,start,level=1,pan=0):
    signal=(sound[:,None]*np.array([np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)])*level).astype(np.float32)
    np.add.at(mix,(np.arange(len(signal))+int(start*SR))%N,signal)
def note(midi,dur,kind='keys'):
    t=np.arange(int(dur*SR))/SR;f=440*2**((midi-69)/12)
    if kind=='bass':return .8*np.sin(2*np.pi*f*t+.08*np.sin(2*np.pi*2*f*t))*np.minimum(t/.012,1)*np.exp(-t/1.0)
    phase=2*np.pi*f*(t+.0012*np.sin(2*np.pi*.65*t)*.035)
    body=np.sin(phase+1.1*np.sin(phase*2)*np.exp(-t/0.14))+.15*np.sin(phase*3)*np.exp(-t/.45)
    return body*np.minimum(t/.008,1)*np.exp(-t/1.55)*np.minimum((dur-t)/.25,1)
def drum(kind):
    dur={'kick':.32,'snare':.23,'hat':.08}[kind];t=np.arange(int(dur*SR))/SR;n=rng.normal(0,1,len(t))
    if kind=='kick':return np.sin(2*np.pi*(45*t+45*.018*(1-np.exp(-t/.018))))*np.exp(-t/0.065)
    if kind=='snare':return (.65*(n-np.roll(n,1))+.2*np.sin(2*np.pi*178*t))*np.exp(-t/.045)*np.minimum(t/.003,1)
    return (n-np.roll(n,1))*np.exp(-t/.014)*np.minimum(t/.001,1)
chords=[[53,57,60,64,69],[53,59,64,69],[52,55,59,62,67],[55,58,62,64],[53,57,60,65],[55,58,62,67],[55,59,60,64],[55,58,61,64]]
bass=[38,43,36,33,34,40,33,33]
for bar in range(48):
    start=bar*4*beat;ix=bar%8;part=bar//8
    for k,m in enumerate(chords[ix]):
        add(note(m,5.0),start+.025*k,.105,(-.4+.2*k))
        if bar%2==0:add(note(m,3.0),start+2.6*beat+.018*k,.042,.4-.2*k)
    add(note(bass[ix],2.4,'bass'),start,.2,-.05)
    add(note(bass[ix]+(7 if bar%4==2 else 0),1.5,'bass'),start+2.6*beat,.13,.05)
    if part in [1,2,4,5] and bar%4 in [0,2]:
        for j,m in enumerate([chords[ix][-1]+12,chords[ix][-2]+12,chords[ix][-3]+12]):add(note(m,2.4),start+(1.35+j*.65)*beat,.043,(-.2+j*.2))
    strength=.65 if part in [0,3] else 1
    for b in [0,2.35]:add(drum('kick'),start+b*beat,.14*strength)
    for b in [1.04,3.04]:add(drum('snare'),start+b*beat,.035*strength,.15)
    for h in range(8):add(drum('hat'),start+(h*.5+(.075 if h%2 else 0))*beat,.018*strength*(.6 if h%2 else 1),-.35 if h%2 else .35)
dry=mix.copy()
for delay,gain in [(0.113,.08),(.229,.065),(.417,.10),(.834,.045)]:mix+=np.roll(dry,int(delay*SR),axis=0)*gain
mix=np.tanh(mix*1.1);mix*=.76/max(abs(mix).max(),.01)
out=Path('assets/audio');out.mkdir(parents=True,exist_ok=True);wav=Path('qa/talos-night-session.wav');wav.parent.mkdir(exist_ok=True)
with wave.open(str(wav),'wb') as f:f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes((mix*32767).astype('<i2').tobytes())
subprocess.run([args.ffmpeg,'-y','-v','error','-i',str(wav),'-c:a','libmp3lame','-b:a','112k','-metadata','title=Talos - Night Session',str(out/'night-session.mp3')],check=True)
print(f'Original {length:.0f}s score written. Peak {abs(mix).max():.3f}; RMS {np.sqrt(np.mean(mix**2)):.3f}.')
