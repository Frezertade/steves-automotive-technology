from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math
import os
import subprocess

W, H = 1280, 720
FPS = 30
DURATION = 8
FRAMES = FPS * DURATION
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'media')
os.makedirs(OUT_DIR, exist_ok=True)
MP4 = os.path.join(OUT_DIR, 'hybrid-battery-diagnostic-loop.mp4')
POSTER = os.path.join(OUT_DIR, 'hybrid-battery-diagnostic-poster.jpg')

try:
    FONT_BOLD = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 28)
    FONT_SMALL = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
    FONT_MONO = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf', 16)
except Exception:
    FONT_BOLD = FONT_SMALL = FONT_MONO = ImageFont.load_default()


def lerp(a, b, t):
    return a + (b - a) * t


def project(x, y, z, t):
    # Isometric-ish projection with gentle orbit for pre-rendered 3D feel.
    yaw = -0.42 + 0.08 * math.sin(t * math.tau)
    pitch = 0.58 + 0.035 * math.cos(t * math.tau)
    cy, sy = math.cos(yaw), math.sin(yaw)
    cp, sp = math.cos(pitch), math.sin(pitch)

    x2 = x * cy - z * sy
    z2 = x * sy + z * cy
    y2 = y * cp - z2 * sp
    z3 = y * sp + z2 * cp
    scale = 1.0 / (1.0 + z3 * 0.0015)
    sx = W * 0.53 + x2 * scale
    sy2 = H * 0.55 + y2 * scale
    return sx, sy2


def glow_line(draw, p1, p2, color, width=2):
    for w, alpha in [(width + 10, 35), (width + 5, 70), (width, 220)]:
        draw.line([p1, p2], fill=(*color, alpha), width=w)


def frame(idx):
    t = idx / FRAMES
    pulse = 0.5 + 0.5 * math.sin(t * math.tau * 2)
    img = Image.new('RGB', (W, H), '#05070A').convert('RGBA')

    # Background radial glows.
    bg = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bg, 'RGBA')
    for r, a in [(520, 28), (360, 34), (220, 48)]:
        bd.ellipse((W*0.55-r, H*0.55-r, W*0.55+r, H*0.55+r), fill=(16, 245, 212, a))
    for r, a in [(440, 24), (260, 38)]:
        bd.ellipse((W*0.80-r, H*0.30-r, W*0.80+r, H*0.30+r), fill=(56, 189, 248, a))
    img.alpha_composite(bg.filter(ImageFilter.GaussianBlur(70)))
    draw = ImageDraw.Draw(img, 'RGBA')

    # Perspective diagnostic grid.
    horizon_y = 418
    for i in range(-10, 18):
        x0 = W * 0.5 + i * 90
        draw.line([(x0, H), (W*0.55 + i*16, horizon_y)], fill=(56, 189, 248, 32), width=1)
    for j in range(10):
        y = lerp(H, horizon_y, j / 10)
        draw.line([(0, y), (W, y)], fill=(16, 245, 212, max(14, 46-j*3)), width=1)

    # Battery pack base.
    base = [project(-330, 90, -110, t), project(330, 90, -110, t), project(385, 90, 150, t), project(-280, 90, 170, t)]
    top = [project(-330, -58, -110, t), project(330, -58, -110, t), project(385, -58, 150, t), project(-280, -58, 170, t)]
    side1 = [top[0], top[1], base[1], base[0]]
    side2 = [top[1], top[2], base[2], base[1]]
    side3 = [top[2], top[3], base[3], base[2]]
    side4 = [top[3], top[0], base[0], base[3]]

    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow, 'RGBA')
    sd.polygon([(p[0]+16, p[1]+34) for p in base], fill=(0,0,0,160))
    img.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(22)))

    draw.polygon(side1, fill=(10, 17, 32, 235), outline=(16, 245, 212, 80))
    draw.polygon(side2, fill=(7, 21, 36, 235), outline=(56, 189, 248, 90))
    draw.polygon(side3, fill=(11, 18, 30, 230), outline=(16, 245, 212, 60))
    draw.polygon(side4, fill=(8, 14, 24, 230), outline=(56, 189, 248, 50))
    draw.polygon(top, fill=(18, 32, 51, 235), outline=(216, 243, 241, 140))

    # Cells on top surface.
    cols, rows = 8, 3
    for c in range(cols):
        for r in range(rows):
            x = -265 + c * 75
            z = -55 + r * 72
            phase = (c * 0.17 + r * 0.21 + t * 1.9) % 1
            energy = 0.35 + 0.65 * (0.5 + 0.5 * math.sin((phase) * math.tau))
            p = [project(x-28, -68, z-24, t), project(x+28, -68, z-24, t), project(x+31, -68, z+24, t), project(x-25, -68, z+24, t)]
            fill = (9, int(50+90*energy), int(66+70*energy), 220)
            outline = (16, 245, 212, int(85+130*energy))
            draw.polygon(p, fill=fill, outline=outline)
            if energy > 0.82:
                cx = sum(pp[0] for pp in p)/4; cy = sum(pp[1] for pp in p)/4
                draw.ellipse((cx-20, cy-8, cx+20, cy+8), fill=(16,245,212,45))

    # Energy rails.
    for z in [-85, 20, 125]:
        pts = [project(-310, -88, z, t), project(350, -88, z, t)]
        glow_line(draw, pts[0], pts[1], (16, 245, 212), width=2)
    scan_x = -330 + 720 * ((t * 1.25) % 1)
    glow_line(draw, project(scan_x, -116, -120, t), project(scan_x + 50, -116, 170, t), (245, 158, 11), width=3)

    # HUD rings and labels.
    cx, cy = project(410, -138, -10, t)
    for rr, alpha in [(76, 48), (52, 70), (28, 110)]:
        draw.ellipse((cx-rr, cy-rr, cx+rr, cy+rr), outline=(56,189,248,alpha), width=2)
    angle = t * math.tau * 1.4
    draw.arc((cx-76, cy-76, cx+76, cy+76), math.degrees(angle), math.degrees(angle)+95, fill=(16,245,212,220), width=4)
    draw.text((cx+94, cy-48), 'HYBRID PACK', fill=(216,243,241,230), font=FONT_BOLD)
    draw.text((cx+96, cy-10), 'CELL BALANCE 98.7%', fill=(16,245,212,220), font=FONT_MONO)
    draw.text((cx+96, cy+18), 'DIAGNOSTIC SCAN ACTIVE', fill=(56,189,248,210), font=FONT_MONO)

    # Left service label etched into frame.
    draw.rounded_rectangle((58, 58, 360, 150), radius=22, fill=(5,7,10,135), outline=(16,245,212,90), width=1)
    draw.text((84, 78), 'LANCASTER HYBRID', fill=(16,245,212,235), font=FONT_SMALL)
    draw.text((84, 104), 'BATTERY DIAGNOSTICS', fill=(255,255,255,235), font=FONT_BOLD)

    # Scanline overlay + vignette.
    for y in range(0, H, 6):
        draw.line([(0, y), (W, y)], fill=(255,255,255,8), width=1)
    sweep_y = int((t * H * 1.1) % H)
    draw.rectangle((0, sweep_y-2, W, sweep_y+2), fill=(16,245,212,26))

    vignette = Image.new('RGBA', (W, H), (0,0,0,0))
    vd = ImageDraw.Draw(vignette, 'RGBA')
    vd.rectangle((0,0,W,H), outline=(0,0,0,0))
    for k in range(70):
        a = int(k * 2.1)
        vd.rectangle((k, k, W-k, H-k), outline=(0,0,0,a//5))
    img.alpha_composite(vignette)

    return img.convert('RGB')

# Save poster at an attractive mid-loop frame.
frame(FRAMES // 3).save(POSTER, quality=90)

cmd = [
    'ffmpeg', '-y', '-f', 'rawvideo', '-vcodec', 'rawvideo',
    '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
    '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', MP4
]
proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
try:
    for i in range(FRAMES):
        proc.stdin.write(frame(i).tobytes())
finally:
    proc.stdin.close()
ret = proc.wait()
if ret != 0:
    raise SystemExit(ret)
print(MP4)
print(POSTER)
