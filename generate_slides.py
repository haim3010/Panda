#!/usr/bin/env python3
"""Generate slide XML files for slides 11-17 of Panda-Demo.pptx"""

import os

SLIDES_DIR = r"C:\Users\h.monsonego\source\repos\Panda\pptx-unpack\ppt\slides"

# EMU helpers: 1 inch = 914400 EMU
def emu(inches):
    return int(inches * 914400)

def rect_shape(id, name, x, y, w, h, fill_color, alpha=100000, line_color=None, line_alpha=None, line_w=12700, rounded=False):
    line_color = line_color or fill_color
    line_alpha = line_alpha or alpha
    geom = "roundRect" if rounded else "rect"
    round_attr = '<a:avLst><a:gd name="adj" fmla="val 20000"/></a:avLst>' if rounded else '<a:avLst/>'
    alpha_elem = f'<a:alpha val="{alpha}"/>' if alpha < 100000 else ''
    line_alpha_elem = f'<a:alpha val="{line_alpha}"/>' if line_alpha < 100000 else ''
    return f'''      <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="{id}" name="{name}"/>
          <p:cNvSpPr/>
          <p:nvPr/>
        </p:nvSpPr>
        <p:spPr>
          <a:xfrm>
            <a:off x="{emu(x)}" y="{emu(y)}"/>
            <a:ext cx="{emu(w)}" cy="{emu(h)}"/>
          </a:xfrm>
          <a:prstGeom prst="{geom}">
            {round_attr}
          </a:prstGeom>
          <a:solidFill>
            <a:srgbClr val="{fill_color}">{alpha_elem}</a:srgbClr>
          </a:solidFill>
          <a:ln w="{line_w}">
            <a:solidFill>
              <a:srgbClr val="{line_color}">{line_alpha_elem}</a:srgbClr>
            </a:solidFill>
            <a:prstDash val="solid"/>
          </a:ln>
        </p:spPr>
      </p:sp>'''

def oval_shape(id, name, x, y, w, h, fill_color, alpha=100000):
    alpha_elem = f'<a:alpha val="{alpha}"/>' if alpha < 100000 else ''
    return f'''      <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="{id}" name="{name}"/>
          <p:cNvSpPr/>
          <p:nvPr/>
        </p:nvSpPr>
        <p:spPr>
          <a:xfrm>
            <a:off x="{emu(x)}" y="{emu(y)}"/>
            <a:ext cx="{emu(w)}" cy="{emu(h)}"/>
          </a:xfrm>
          <a:prstGeom prst="ellipse">
            <a:avLst/>
          </a:prstGeom>
          <a:solidFill>
            <a:srgbClr val="{fill_color}">{alpha_elem}</a:srgbClr>
          </a:solidFill>
          <a:ln w="12700">
            <a:solidFill>
              <a:srgbClr val="{fill_color}">{alpha_elem}</a:srgbClr>
            </a:solidFill>
            <a:prstDash val="solid"/>
          </a:ln>
        </p:spPr>
      </p:sp>'''

def text_box(id, name, x, y, w, h, text, size=1400, bold=False, color="111827", align="left", valign="ctr", font="Calibri", wrap=True):
    bold_attr = ' b="1"' if bold else ''
    wrap_attr = "square" if wrap else "none"
    algn_map = {"left": "l", "center": "ctr", "right": "r"}
    algn = algn_map.get(align, "l")
    return f'''      <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="{id}" name="{name}"/>
          <p:cNvSpPr/>
          <p:nvPr/>
        </p:nvSpPr>
        <p:spPr>
          <a:xfrm>
            <a:off x="{emu(x)}" y="{emu(y)}"/>
            <a:ext cx="{emu(w)}" cy="{emu(h)}"/>
          </a:xfrm>
          <a:prstGeom prst="rect">
            <a:avLst/>
          </a:prstGeom>
          <a:noFill/>
          <a:ln/>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="{wrap_attr}" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="{valign}"/>
          <a:lstStyle/>
          <a:p>
            <a:pPr algn="{algn}" indent="0" marL="0">
              <a:buNone/>
            </a:pPr>
            <a:r>
              <a:rPr lang="en-US" sz="{size}"{bold_attr} dirty="0">
                <a:solidFill>
                  <a:srgbClr val="{color}"/>
                </a:solidFill>
                <a:latin typeface="{font}" pitchFamily="34" charset="0"/>
              </a:rPr>
              <a:t>{text}</a:t>
            </a:r>
            <a:endParaRPr lang="en-US" sz="{size}" dirty="0"/>
          </a:p>
        </p:txBody>
      </p:sp>'''

def multi_text_box(id, name, x, y, w, h, lines, valign="t", default_align="l"):
    """lines: list of (text, size, bold, color, align) or (text, size, bold, color)"""
    paragraphs = []
    for line in lines:
        if len(line) == 5:
            text, size, bold, color, align = line
        else:
            text, size, bold, color = line
            align = default_align
        bold_attr = ' b="1"' if bold else ''
        algn_map = {"left": "l", "center": "ctr", "right": "r", "l": "l", "ctr": "ctr"}
        algn = algn_map.get(align, "l")
        paragraphs.append(f'''            <a:p>
              <a:pPr algn="{algn}" indent="0" marL="0">
                <a:buNone/>
              </a:pPr>
              <a:r>
                <a:rPr lang="en-US" sz="{size}"{bold_attr} dirty="0">
                  <a:solidFill>
                    <a:srgbClr val="{color}"/>
                  </a:solidFill>
                  <a:latin typeface="Calibri" pitchFamily="34" charset="0"/>
                </a:rPr>
                <a:t>{text}</a:t>
              </a:r>
            </a:p>''')
    return f'''      <p:sp>
        <p:nvSpPr>
          <p:cNvPr id="{id}" name="{name}"/>
          <p:cNvSpPr/>
          <p:nvPr/>
        </p:nvSpPr>
        <p:spPr>
          <a:xfrm>
            <a:off x="{emu(x)}" y="{emu(y)}"/>
            <a:ext cx="{emu(w)}" cy="{emu(h)}"/>
          </a:xfrm>
          <a:prstGeom prst="rect">
            <a:avLst/>
          </a:prstGeom>
          <a:noFill/>
          <a:ln/>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="{valign}"/>
          <a:lstStyle/>
{chr(10).join(paragraphs)}
        </p:txBody>
      </p:sp>'''

def slide_header(id_start, bg="F9FAFB"):
    """Returns shapes for the standard slide header section"""
    return bg

def wrap_slide(slide_num, bg_color, shapes_xml):
    return f'''<?xml version="1.0" encoding="utf-8"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld name="Slide {slide_num}">
    <p:bg>
      <p:bgPr>
        <a:solidFill>
          <a:srgbClr val="{bg_color}"/>
        </a:solidFill>
      </p:bgPr>
    </p:bg>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
{shapes_xml}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr>
    <a:masterClrMapping/>
  </p:clrMapOvr>
</p:sld>'''

# ============================================================
# SLIDE 11 - DASHBOARD
# ============================================================
def make_slide11():
    shapes = []

    # Background is F9FAFB (light gray)

    # === LEFT PANEL: Title section (orange accent left bar) ===
    # Orange left accent bar
    shapes.append(rect_shape(2, "AccentBar", 0, 0, 0.07, 5.625, "F97316"))

    # Title area background (white card)
    shapes.append(rect_shape(3, "TitleBg", 0.07, 0, 2.8, 5.625, "FFFFFF"))

    # Title
    shapes.append(text_box(4, "Title", 0.2, 0.2, 2.5, 0.45, "Employee Dashboard", 2000, True, "F97316", "left"))
    shapes.append(text_box(5, "Subtitle", 0.2, 0.65, 2.5, 0.35, "Home feed — matches, activities &amp; leaderboard", 1000, False, "6B7280", "left"))

    # Divider line
    shapes.append(rect_shape(6, "Divider", 0.2, 1.1, 2.4, 0.01, "E5E7EB"))

    # GREETING
    shapes.append(text_box(7, "Greeting", 0.2, 1.2, 2.5, 0.45, "Hey, Alex! 👋", 1800, True, "111827", "left"))

    # Coins balance pill
    shapes.append(rect_shape(8, "CoinsBg", 0.2, 1.75, 1.2, 0.32, "FFF7ED", rounded=True))
    shapes.append(text_box(9, "CoinsText", 0.25, 1.78, 1.1, 0.26, "🪙 450 coins", 1000, True, "EA580C", "left"))

    # Avatar circle
    shapes.append(oval_shape(10, "Avatar", 0.35, 2.25, 0.6, 0.6, "F97316"))
    shapes.append(text_box(11, "AvatarTxt", 0.35, 2.27, 0.6, 0.56, "AJ", 1200, True, "FFFFFF", "center"))

    # === MAIN CONTENT AREA ===
    # My Matches section header
    shapes.append(text_box(12, "MatchHeader", 3.1, 0.25, 2.5, 0.35, "My Matches", 1600, True, "111827", "left"))
    shapes.append(text_box(13, "MatchSub", 3.1, 0.6, 2.5, 0.28, "Based on shared hobbies &amp; interests", 1000, False, "6B7280", "left"))

    # Match Card 1 - Sarah Chen
    shapes.append(rect_shape(14, "Card1Bg", 3.1, 1.0, 2.05, 1.55, "FFFFFF"))
    shapes.append(rect_shape(15, "Card1Top", 3.1, 1.0, 2.05, 0.08, "F97316"))
    shapes.append(oval_shape(16, "SC_Circle", 3.5, 1.15, 0.55, 0.55, "F97316"))
    shapes.append(text_box(17, "SC_Init", 3.5, 1.17, 0.55, 0.51, "SC", 1100, True, "FFFFFF", "center"))
    shapes.append(text_box(18, "SC_Name", 3.1, 1.78, 2.05, 0.28, "Sarah Chen", 1100, True, "111827", "center"))
    shapes.append(text_box(19, "SC_Role", 3.1, 2.05, 2.05, 0.24, "Product Designer", 900, False, "6B7280", "center"))
    shapes.append(rect_shape(20, "SC_Score", 3.45, 2.35, 1.35, 0.22, "DCFCE7", rounded=True))
    shapes.append(text_box(21, "SC_ScoreTxt", 3.45, 2.36, 1.35, 0.2, "87% match", 900, True, "16A34A", "center"))

    # Match Card 2 - James Wilson
    shapes.append(rect_shape(22, "Card2Bg", 5.4, 1.0, 2.05, 1.55, "FFFFFF"))
    shapes.append(rect_shape(23, "Card2Top", 5.4, 1.0, 2.05, 0.08, "EC4899"))
    shapes.append(oval_shape(24, "JW_Circle", 5.8, 1.15, 0.55, 0.55, "EC4899"))
    shapes.append(text_box(25, "JW_Init", 5.8, 1.17, 0.55, 0.51, "JW", 1100, True, "FFFFFF", "center"))
    shapes.append(text_box(26, "JW_Name", 5.4, 1.78, 2.05, 0.28, "James Wilson", 1100, True, "111827", "center"))
    shapes.append(text_box(27, "JW_Role", 5.4, 2.05, 2.05, 0.24, "Backend Engineer", 900, False, "6B7280", "center"))
    shapes.append(rect_shape(28, "JW_Score", 5.75, 2.35, 1.35, 0.22, "DCFCE7", rounded=True))
    shapes.append(text_box(29, "JW_ScoreTxt", 5.75, 2.36, 1.35, 0.2, "74% match", 900, True, "16A34A", "center"))

    # Match Card 3 - Mia Patel
    shapes.append(rect_shape(30, "Card3Bg", 7.7, 1.0, 2.05, 1.55, "FFFFFF"))
    shapes.append(rect_shape(31, "Card3Top", 7.7, 1.0, 2.05, 0.08, "EC4899"))
    shapes.append(oval_shape(32, "MP_Circle", 8.1, 1.15, 0.55, 0.55, "EC4899"))
    shapes.append(text_box(33, "MP_Init", 8.1, 1.17, 0.55, 0.51, "MP", 1100, True, "FFFFFF", "center"))
    shapes.append(text_box(34, "MP_Name", 7.7, 1.78, 2.05, 0.28, "Mia Patel", 1100, True, "111827", "center"))
    shapes.append(text_box(35, "MP_Role", 7.7, 2.05, 2.05, 0.24, "Marketing Lead", 900, False, "6B7280", "center"))
    shapes.append(rect_shape(36, "MP_Score", 8.05, 2.35, 1.35, 0.22, "FFF7ED", rounded=True))
    shapes.append(text_box(37, "MP_ScoreTxt", 8.05, 2.36, 1.35, 0.2, "61% match", 900, True, "EA580C", "center"))

    # Upcoming Activities section header
    shapes.append(text_box(38, "ActHeader", 3.1, 2.72, 3.0, 0.35, "Upcoming Activities", 1600, True, "111827", "left"))

    # Activity Row 1
    shapes.append(rect_shape(39, "ActBg1", 3.1, 3.12, 6.65, 0.52, "FFFFFF"))
    shapes.append(rect_shape(40, "ActLine1", 3.1, 3.12, 0.05, 0.52, "F97316"))
    shapes.append(text_box(41, "ActIcon1", 3.2, 3.15, 0.4, 0.45, "🎾", 1600, False, "111827", "left"))
    shapes.append(text_box(42, "ActName1", 3.65, 3.15, 3.5, 0.28, "Friday Tennis Tournament", 1100, True, "111827", "left"))
    shapes.append(text_box(43, "ActDate1", 3.65, 3.42, 3.5, 0.22, "Sat Apr 11 · Central Park", 900, False, "6B7280", "left"))
    shapes.append(rect_shape(44, "RSVPBtn1", 7.25, 3.2, 1.3, 0.35, "F97316", rounded=True))
    shapes.append(text_box(45, "RSVPTxt1", 7.25, 3.22, 1.3, 0.31, "RSVP", 1000, True, "FFFFFF", "center"))

    # Activity Row 2
    shapes.append(rect_shape(46, "ActBg2", 3.1, 3.72, 6.65, 0.52, "FFFFFF"))
    shapes.append(rect_shape(47, "ActLine2", 3.1, 3.72, 0.05, 0.52, "10B981"))
    shapes.append(text_box(48, "ActIcon2", 3.2, 3.75, 0.4, 0.45, "🍳", 1600, False, "111827", "left"))
    shapes.append(text_box(49, "ActName2", 3.65, 3.75, 3.5, 0.28, "Team Cooking Class", 1100, True, "111827", "left"))
    shapes.append(text_box(50, "ActDate2", 3.65, 4.02, 3.5, 0.22, "Tue Apr 14 · Williams Kitchen Studio", 900, False, "6B7280", "left"))
    shapes.append(rect_shape(51, "GoingBtn", 7.25, 3.8, 1.3, 0.35, "E5E7EB", rounded=True))
    shapes.append(text_box(52, "GoingTxt", 7.25, 3.82, 1.3, 0.31, "Going ✓", 1000, True, "6B7280", "center"))

    # Footer stat
    shapes.append(rect_shape(53, "Footer", 3.1, 4.5, 6.65, 0.6, "F97316"))
    shapes.append(text_box(54, "FooterTxt", 3.1, 4.55, 6.65, 0.5, "87 colleagues matched across TechCorp this week  ·  Join the community!", 1100, False, "FFFFFF", "center"))

    return wrap_slide(11, "F9FAFB", "\n".join(shapes))

# ============================================================
# SLIDE 12 - MATCHES
# ============================================================
def make_slide12():
    shapes = []

    # Orange left accent
    shapes.append(rect_shape(2, "AccentBar", 0, 0, 0.07, 5.625, "F97316"))

    # Left panel
    shapes.append(rect_shape(3, "LeftPanel", 0.07, 0, 2.8, 5.625, "FFFFFF"))
    shapes.append(text_box(4, "Title", 0.2, 0.2, 2.5, 0.45, "Smart Matching", 2000, True, "F97316", "left"))
    shapes.append(text_box(5, "Subtitle", 0.2, 0.65, 2.5, 0.35, "AI-powered colleague matching by shared hobbies", 1000, False, "6B7280", "left"))
    shapes.append(rect_shape(6, "Divider", 0.2, 1.1, 2.4, 0.01, "E5E7EB"))

    # Stats
    shapes.append(rect_shape(7, "Stat1Bg", 0.2, 1.25, 1.1, 0.65, "FFF7ED", rounded=True))
    shapes.append(text_box(8, "Stat1Num", 0.2, 1.3, 1.1, 0.3, "2", 2200, True, "F97316", "center"))
    shapes.append(text_box(9, "Stat1Lbl", 0.2, 1.58, 1.1, 0.25, "Connected", 850, False, "6B7280", "center"))

    shapes.append(rect_shape(10, "Stat2Bg", 1.5, 1.25, 1.1, 0.65, "F0FDF4", rounded=True))
    shapes.append(text_box(11, "Stat2Num", 1.5, 1.3, 1.1, 0.3, "5", 2200, True, "16A34A", "center"))
    shapes.append(text_box(12, "Stat2Lbl", 1.5, 1.58, 1.1, 0.25, "New Matches", 850, False, "6B7280", "center"))

    # Filter pills
    shapes.append(rect_shape(13, "FilterAll", 0.2, 2.1, 0.65, 0.28, "F97316", rounded=True))
    shapes.append(text_box(14, "FilterAllTxt", 0.2, 2.12, 0.65, 0.24, "All", 900, True, "FFFFFF", "center"))
    shapes.append(rect_shape(15, "FilterConn", 0.92, 2.1, 1.0, 0.28, "F3F4F6", rounded=True))
    shapes.append(text_box(16, "FilterConnTxt", 0.92, 2.12, 1.0, 0.24, "Connected", 900, False, "6B7280", "center"))
    shapes.append(rect_shape(17, "FilterNew", 2.0, 2.1, 0.65, 0.28, "F3F4F6", rounded=True))
    shapes.append(text_box(18, "FilterNewTxt", 2.0, 2.12, 0.65, 0.24, "New", 900, False, "6B7280", "center"))

    # Match illustration
    shapes.append(text_box(19, "MatchNote", 0.2, 2.55, 2.5, 0.35, "Showing 3 of 7 matches", 950, False, "6B7280", "left"))
    shapes.append(text_box(20, "MatchEmoji", 0.9, 3.2, 1.1, 1.1, "🤝", 5000, False, "F97316", "center"))

    # === MATCH CARDS ===
    # Card 1 - Sarah Chen
    shapes.append(rect_shape(21, "MC1Bg", 3.1, 0.15, 6.65, 1.5, "FFFFFF"))
    shapes.append(oval_shape(22, "MC1Av", 3.25, 0.35, 0.65, 0.65, "EAB308"))
    shapes.append(text_box(23, "MC1AvTxt", 3.25, 0.37, 0.65, 0.61, "SC", 1200, True, "FFFFFF", "center"))
    shapes.append(rect_shape(24, "MC1Score", 4.05, 0.38, 1.2, 0.24, "DCFCE7", rounded=True))
    shapes.append(text_box(25, "MC1ScoreTxt", 4.05, 0.39, 1.2, 0.22, "87% match", 900, True, "16A34A", "center"))
    shapes.append(rect_shape(26, "MC1Conn", 5.35, 0.38, 1.0, 0.24, "DBEAFE", rounded=True))
    shapes.append(text_box(27, "MC1ConnTxt", 5.35, 0.39, 1.0, 0.22, "Connected", 900, True, "2563EB", "center"))
    shapes.append(text_box(28, "MC1Name", 4.05, 0.65, 3.0, 0.3, "Sarah Chen", 1400, True, "111827", "left"))
    shapes.append(text_box(29, "MC1Job", 4.05, 0.93, 3.0, 0.24, "Senior Product Designer · Design · New York", 900, False, "6B7280", "left"))
    shapes.append(text_box(30, "MC1Hobbies", 4.05, 1.17, 3.5, 0.24, "In common: Yoga  Travel  Photography", 900, False, "F97316", "left"))
    shapes.append(rect_shape(31, "MC1Btn", 8.3, 0.55, 1.2, 0.35, "F97316", rounded=True))
    shapes.append(text_box(32, "MC1BtnTxt", 8.3, 0.57, 1.2, 0.31, "Message", 1000, True, "FFFFFF", "center"))

    # Card 2 - Yael Cohen
    shapes.append(rect_shape(33, "MC2Bg", 3.1, 1.82, 6.65, 1.5, "FFFFFF"))
    shapes.append(oval_shape(34, "MC2Av", 3.25, 2.02, 0.65, 0.65, "EC4899"))
    shapes.append(text_box(35, "MC2AvTxt", 3.25, 2.04, 0.65, 0.61, "YC", 1200, True, "FFFFFF", "center"))
    shapes.append(rect_shape(36, "MC2Score", 4.05, 2.05, 1.2, 0.24, "DCFCE7", rounded=True))
    shapes.append(text_box(37, "MC2ScoreTxt", 4.05, 2.06, 1.2, 0.22, "81% match", 900, True, "16A34A", "center"))
    shapes.append(rect_shape(38, "MC2Conn", 5.35, 2.05, 1.0, 0.24, "DBEAFE", rounded=True))
    shapes.append(text_box(39, "MC2ConnTxt", 5.35, 2.06, 1.0, 0.22, "Connected", 900, True, "2563EB", "center"))
    shapes.append(text_box(40, "MC2Name", 4.05, 2.32, 3.0, 0.3, "Yael Cohen", 1400, True, "111827", "left"))
    shapes.append(text_box(41, "MC2Job", 4.05, 2.6, 3.0, 0.24, "UX Researcher · Product · Tel Aviv", 900, False, "6B7280", "left"))
    shapes.append(text_box(42, "MC2Hobbies", 4.05, 2.84, 3.5, 0.24, "In common: Yoga  Photography", 900, False, "F97316", "left"))
    shapes.append(rect_shape(43, "MC2Btn", 8.3, 2.22, 1.2, 0.35, "F97316", rounded=True))
    shapes.append(text_box(44, "MC2BtnTxt", 8.3, 2.24, 1.2, 0.31, "Message", 1000, True, "FFFFFF", "center"))

    # Card 3 - James Wilson
    shapes.append(rect_shape(45, "MC3Bg", 3.1, 3.49, 6.65, 1.45, "FFFFFF"))
    shapes.append(oval_shape(46, "MC3Av", 3.25, 3.69, 0.65, 0.65, "EC4899"))
    shapes.append(text_box(47, "MC3AvTxt", 3.25, 3.71, 0.65, 0.61, "JW", 1200, True, "FFFFFF", "center"))
    shapes.append(rect_shape(48, "MC3Score", 4.05, 3.72, 1.2, 0.24, "DCFCE7", rounded=True))
    shapes.append(text_box(49, "MC3ScoreTxt", 4.05, 3.73, 1.2, 0.22, "78% match", 900, True, "16A34A", "center"))
    shapes.append(text_box(50, "MC3Name", 4.05, 3.99, 3.0, 0.3, "James Wilson", 1400, True, "111827", "left"))
    shapes.append(text_box(51, "MC3Job", 4.05, 4.27, 3.0, 0.24, "Backend Engineer · Engineering · San Francisco", 900, False, "6B7280", "left"))
    shapes.append(rect_shape(52, "MC3ConnBtn", 8.1, 3.75, 1.2, 0.32, "F97316", rounded=True))
    shapes.append(text_box(53, "MC3ConnTxt", 8.1, 3.77, 1.2, 0.28, "Connect", 1000, True, "FFFFFF", "center"))
    shapes.append(rect_shape(54, "MC3SkipBtn", 8.1, 4.15, 1.2, 0.32, "E5E7EB", rounded=True))
    shapes.append(text_box(55, "MC3SkipTxt", 8.1, 4.17, 1.2, 0.28, "Skip", 1000, False, "6B7280", "center"))

    return wrap_slide(12, "F9FAFB", "\n".join(shapes))

# ============================================================
# SLIDE 13 - ACTIVITIES
# ============================================================
def make_slide13():
    shapes = []

    shapes.append(rect_shape(2, "AccentBar", 0, 0, 0.07, 5.625, "F97316"))
    shapes.append(rect_shape(3, "LeftPanel", 0.07, 0, 2.8, 5.625, "FFFFFF"))
    shapes.append(text_box(4, "Title", 0.2, 0.2, 2.5, 0.45, "Activity Feed", 2000, True, "F97316", "left"))
    shapes.append(text_box(5, "Subtitle", 0.2, 0.65, 2.5, 0.35, "Join activities, earn coins, build real connections", 1000, False, "6B7280", "left"))
    shapes.append(rect_shape(6, "Divider", 0.2, 1.1, 2.4, 0.01, "E5E7EB"))

    shapes.append(text_box(7, "Count", 0.2, 1.25, 2.4, 0.3, "8 activities upcoming", 1000, False, "6B7280", "left"))

    # Filter pills
    shapes.append(rect_shape(8, "FA", 0.2, 1.65, 0.55, 0.27, "F97316", rounded=True))
    shapes.append(text_box(9, "FATxt", 0.2, 1.67, 0.55, 0.23, "All", 875, True, "FFFFFF", "center"))
    shapes.append(rect_shape(10, "FS", 0.82, 1.65, 0.7, 0.27, "F3F4F6", rounded=True))
    shapes.append(text_box(11, "FSTxt", 0.82, 1.67, 0.7, 0.23, "Sport", 875, False, "6B7280", "center"))
    shapes.append(rect_shape(12, "FSo", 1.59, 1.65, 0.7, 0.27, "F3F4F6", rounded=True))
    shapes.append(text_box(13, "FSoTxt", 1.59, 1.67, 0.7, 0.23, "Social", 875, False, "6B7280", "center"))
    shapes.append(rect_shape(14, "FW", 0.2, 2.0, 0.85, 0.27, "F3F4F6", rounded=True))
    shapes.append(text_box(15, "FWTxt", 0.2, 2.02, 0.85, 0.23, "Workshop", 875, False, "6B7280", "center"))
    shapes.append(rect_shape(16, "FT", 1.12, 2.0, 1.0, 0.27, "F3F4F6", rounded=True))
    shapes.append(text_box(17, "FTTxt", 1.12, 2.02, 1.0, 0.23, "Tournament", 875, False, "6B7280", "center"))

    shapes.append(text_box(18, "LeftNote", 0.2, 2.45, 2.4, 0.3, "🏆 12 coins earned this week", 950, False, "F97316", "left"))
    shapes.append(text_box(19, "LeftNote2", 0.2, 2.82, 2.4, 0.3, "You have 3 upcoming RSVPs", 950, False, "6B7280", "left"))
    shapes.append(text_box(20, "LeftEmoji", 0.9, 3.4, 1.1, 1.0, "⚽", 4200, False, "111827", "center"))

    # === ACTIVITY CARD 1 - Soccer ===
    shapes.append(rect_shape(21, "AC1Bg", 3.1, 0.15, 6.65, 2.45, "FFFFFF"))
    shapes.append(rect_shape(22, "AC1Top", 3.1, 0.15, 6.65, 0.1, "10B981"))  # green top bar
    shapes.append(text_box(23, "AC1Icon", 3.2, 0.3, 0.5, 0.4, "⚽", 1600, False, "111827", "left"))
    shapes.append(text_box(24, "AC1Title", 3.75, 0.3, 3.5, 0.35, "5-a-Side Soccer Match", 1400, True, "111827", "left"))
    shapes.append(rect_shape(25, "AC1SportTag", 7.4, 0.32, 0.65, 0.24, "DCFCE7", rounded=True))
    shapes.append(text_box(26, "AC1SportTxt", 7.4, 0.33, 0.65, 0.22, "Sport", 850, True, "16A34A", "center"))
    shapes.append(rect_shape(27, "AC1TimePill", 8.15, 0.32, 0.9, 0.24, "FFF7ED", rounded=True))
    shapes.append(text_box(28, "AC1Time", 8.15, 0.33, 0.9, 0.22, "In 3 days", 850, True, "EA580C", "center"))
    shapes.append(text_box(29, "AC1Desc", 3.2, 0.72, 6.3, 0.28, "A friendly 5-a-side game — all skill levels welcome!", 1000, False, "6B7280", "left"))
    shapes.append(text_box(30, "AC1Details", 3.2, 1.02, 6.3, 0.28, "Sun Apr 19 · Riverside Park · 5 spots left · +120 coins 🪙", 1000, False, "374151", "left"))
    # Progress bar bg
    shapes.append(rect_shape(31, "AC1PBg", 3.2, 1.4, 5.5, 0.12, "E5E7EB", rounded=True))
    shapes.append(rect_shape(32, "AC1PFill", 3.2, 1.4, 2.75, 0.12, "F97316", rounded=True))
    shapes.append(text_box(33, "AC1PText", 8.8, 1.37, 0.8, 0.18, "5/10", 850, False, "6B7280", "center"))
    shapes.append(rect_shape(34, "AC1Btn", 3.2, 1.65, 6.3, 0.4, "F97316", rounded=True))
    shapes.append(text_box(35, "AC1BtnTxt", 3.2, 1.7, 6.3, 0.35, "RSVP — I'm in!", 1200, True, "FFFFFF", "center"))

    # === ACTIVITY CARD 2 - Tennis ===
    shapes.append(rect_shape(36, "AC2Bg", 3.1, 2.75, 6.65, 2.5, "FFFFFF"))
    shapes.append(rect_shape(37, "AC2Top", 3.1, 2.75, 6.65, 0.1, "10B981"))
    shapes.append(text_box(38, "AC2Icon", 3.2, 2.9, 0.5, 0.4, "🎾", 1600, False, "111827", "left"))
    shapes.append(text_box(39, "AC2Title", 3.75, 2.9, 3.5, 0.35, "Tennis Tournament Friday", 1400, True, "111827", "left"))
    shapes.append(rect_shape(40, "AC2SportTag", 7.4, 2.92, 0.65, 0.24, "DCFCE7", rounded=True))
    shapes.append(text_box(41, "AC2SportTxt", 7.4, 2.93, 0.65, 0.22, "Sport", 850, True, "16A34A", "center"))
    shapes.append(rect_shape(42, "AC2TimePill", 8.15, 2.92, 0.9, 0.24, "F3F4F6", rounded=True))
    shapes.append(text_box(43, "AC2Time", 8.15, 2.93, 0.9, 0.22, "In 5 days", 850, False, "6B7280", "center"))
    shapes.append(text_box(44, "AC2Desc", 3.2, 3.32, 6.3, 0.28, "Singles and doubles brackets — compete for glory and coins!", 1000, False, "6B7280", "left"))
    shapes.append(text_box(45, "AC2Details", 3.2, 3.62, 6.3, 0.28, "Fri Apr 18 · TechCorp Sports Hall · 9 going / 16 max · +200 coins 🏆", 1000, False, "374151", "left"))
    shapes.append(rect_shape(46, "AC2Btn", 3.2, 4.05, 6.3, 0.4, "10B981", rounded=True))
    shapes.append(text_box(47, "AC2BtnTxt", 3.2, 4.1, 6.3, 0.35, "✓ Going — Click to cancel", 1200, True, "FFFFFF", "center"))

    return wrap_slide(13, "F9FAFB", "\n".join(shapes))

# ============================================================
# SLIDE 14 - CHAT
# ============================================================
def make_slide14():
    shapes = []

    shapes.append(rect_shape(2, "AccentBar", 0, 0, 0.07, 5.625, "F97316"))
    shapes.append(rect_shape(3, "LeftPanel", 0.07, 0, 2.8, 5.625, "FFFFFF"))
    shapes.append(text_box(4, "Title", 0.2, 0.2, 2.5, 0.45, "1:1 Messaging", 2000, True, "F97316", "left"))
    shapes.append(text_box(5, "Subtitle", 0.2, 0.65, 2.5, 0.35, "Connect directly with your matches", 1000, False, "6B7280", "left"))
    shapes.append(rect_shape(6, "Divider", 0.2, 1.1, 2.4, 0.01, "E5E7EB"))

    shapes.append(text_box(7, "Note1", 0.2, 1.25, 2.4, 0.28, "Realtime via Supabase", 900, False, "6B7280", "left"))
    shapes.append(text_box(8, "Note2", 0.2, 1.55, 2.4, 0.28, "2 unread messages", 900, True, "F97316", "left"))
    shapes.append(text_box(9, "ChatEmoji", 0.85, 2.8, 1.1, 1.1, "💬", 4500, False, "111827", "center"))

    # === MESSAGES PANEL (left of main area) ===
    shapes.append(rect_shape(10, "MsgPanel", 3.1, 0.0, 2.65, 5.625, "FFFFFF"))
    shapes.append(rect_shape(11, "MsgPanelBorder", 5.72, 0.0, 0.02, 5.625, "E5E7EB"))
    shapes.append(text_box(12, "MsgTitle", 3.25, 0.2, 2.3, 0.35, "Messages", 1600, True, "111827", "left"))
    shapes.append(rect_shape(13, "MsgDivider", 3.1, 0.62, 2.62, 0.01, "E5E7EB"))

    # Conv 1 - Sarah Chen
    shapes.append(rect_shape(14, "Conv1Bg", 3.1, 0.63, 2.62, 0.75, "FFF7ED"))
    shapes.append(oval_shape(15, "Conv1Av", 3.25, 0.78, 0.5, 0.5, "F97316"))
    shapes.append(text_box(16, "Conv1AvTxt", 3.25, 0.80, 0.5, 0.46, "SC", 1000, True, "FFFFFF", "center"))
    shapes.append(text_box(17, "Conv1Name", 3.85, 0.7, 1.3, 0.28, "Sarah Chen", 1050, True, "111827", "left"))
    shapes.append(text_box(18, "Conv1Time", 5.25, 0.7, 0.42, 0.28, "2m ago", 850, False, "6B7280", "right"))
    shapes.append(text_box(19, "Conv1Msg", 3.85, 0.97, 1.5, 0.24, "Are you joining the tennis...", 900, False, "6B7280", "left"))
    shapes.append(oval_shape(20, "UnreadBadge1", 5.35, 0.82, 0.26, 0.26, "F97316"))
    shapes.append(text_box(21, "UnreadNum1", 5.35, 0.83, 0.26, 0.24, "2", 900, True, "FFFFFF", "center"))

    shapes.append(rect_shape(22, "MsgDiv1", 3.1, 1.38, 2.62, 0.01, "E5E7EB"))

    # Conv 2 - James Wilson
    shapes.append(oval_shape(23, "Conv2Av", 3.25, 1.55, 0.5, 0.5, "EC4899"))
    shapes.append(text_box(24, "Conv2AvTxt", 3.25, 1.57, 0.5, 0.46, "JW", 1000, True, "FFFFFF", "center"))
    shapes.append(text_box(25, "Conv2Name", 3.85, 1.48, 1.3, 0.28, "James Wilson", 1050, True, "111827", "left"))
    shapes.append(text_box(26, "Conv2Time", 5.2, 1.48, 0.47, 0.28, "1h ago", 850, False, "6B7280", "right"))
    shapes.append(text_box(27, "Conv2Msg", 3.85, 1.75, 1.85, 0.24, "Board games night this Friday 🎲", 900, False, "6B7280", "left"))

    shapes.append(rect_shape(28, "MsgDiv2", 3.1, 2.15, 2.62, 0.01, "E5E7EB"))

    # Conv 3 - Yael Cohen
    shapes.append(oval_shape(29, "Conv3Av", 3.25, 2.32, 0.5, 0.5, "EC4899"))
    shapes.append(text_box(30, "Conv3AvTxt", 3.25, 2.34, 0.5, 0.46, "YC", 1000, True, "FFFFFF", "center"))
    shapes.append(text_box(31, "Conv3Name", 3.85, 2.25, 1.3, 0.28, "Yael Cohen", 1050, True, "111827", "left"))
    shapes.append(text_box(32, "Conv3Time", 5.2, 2.25, 0.47, 0.28, "3h ago", 850, False, "6B7280", "right"))
    shapes.append(text_box(33, "Conv3Msg", 3.85, 2.52, 1.5, 0.24, "Coffee chat tomorrow?", 900, False, "6B7280", "left"))
    shapes.append(oval_shape(34, "UnreadBadge3", 5.35, 2.37, 0.26, 0.26, "6B7280"))
    shapes.append(text_box(35, "UnreadNum3", 5.35, 2.38, 0.26, 0.24, "1", 900, True, "FFFFFF", "center"))

    # === CHAT EMPTY STATE (right panel) ===
    shapes.append(rect_shape(36, "ChatArea", 5.74, 0.0, 4.26, 5.625, "F9FAFB"))
    shapes.append(text_box(37, "ChatEmptyIcon", 7.5, 1.8, 1.0, 1.0, "💬", 4200, False, "D1D5DB", "center"))
    shapes.append(text_box(38, "ChatEmptyTitle", 5.74, 2.9, 4.26, 0.35, "Select a conversation", 1600, True, "374151", "center"))
    shapes.append(text_box(39, "ChatEmptySub", 5.74, 3.3, 4.26, 0.3, "Choose from your matches on the left", 1000, False, "9CA3AF", "center"))

    return wrap_slide(14, "F9FAFB", "\n".join(shapes))

# ============================================================
# SLIDE 15 - BADGES & LEADERBOARD
# ============================================================
def make_slide15():
    shapes = []

    shapes.append(rect_shape(2, "AccentBar", 0, 0, 0.07, 5.625, "F97316"))
    shapes.append(rect_shape(3, "LeftPanel", 0.07, 0, 2.8, 5.625, "FFFFFF"))
    shapes.append(text_box(4, "Title", 0.2, 0.2, 2.5, 0.45, "Gamification", 2000, True, "F97316", "left"))
    shapes.append(text_box(5, "Subtitle", 0.2, 0.65, 2.5, 0.35, "Coins, badges and friendly competition", 1000, False, "6B7280", "left"))
    shapes.append(rect_shape(6, "Divider", 0.2, 1.1, 2.4, 0.01, "E5E7EB"))

    shapes.append(text_box(7, "Desc1", 0.2, 1.25, 2.4, 0.3, "Earn coins by joining activities", 950, False, "6B7280", "left"))
    shapes.append(text_box(8, "Desc2", 0.2, 1.57, 2.4, 0.3, "Unlock badges for milestones", 950, False, "6B7280", "left"))
    shapes.append(text_box(9, "Desc3", 0.2, 1.89, 2.4, 0.3, "Compete on company leaderboard", 950, False, "6B7280", "left"))
    shapes.append(text_box(10, "LeftEmoji", 0.9, 3.0, 1.1, 1.1, "🏆", 4500, False, "F97316", "center"))

    # === RANK CARD ===
    shapes.append(rect_shape(11, "RankCard", 3.1, 0.15, 6.65, 0.8, "F97316"))
    shapes.append(text_box(12, "RankText", 3.2, 0.2, 4.0, 0.35, "Your Rank  #11  at TechCorp this month", 1400, True, "FFFFFF", "left"))
    shapes.append(text_box(13, "CoinsText", 3.2, 0.52, 4.0, 0.3, "🪙 450 coins  ·  550 more to Gold ⭐", 1000, False, "FFFFFF", "left"))

    # === BADGE GRID ===
    shapes.append(text_box(14, "BadgeHeader", 3.1, 1.1, 3.0, 0.3, "Your Badges", 1400, True, "111827", "left"))

    # Row 1 - earned badges (orange bg)
    badge_data_earned = [
        (3.1, "🤝 First Connection", "✓ Earned"),
        (5.25, "🏃 Activity Starter", "✓ Earned"),
        (7.4, "⭐ Rising Star", "✓ Earned"),
    ]
    for idx, (bx, name, status) in enumerate(badge_data_earned):
        shapes.append(rect_shape(15+idx*3, f"Badge{idx+1}Bg", bx, 1.48, 2.0, 0.75, "FFF7ED", rounded=True))
        shapes.append(text_box(16+idx*3, f"Badge{idx+1}Name", bx+0.08, 1.52, 1.84, 0.32, name, 950, True, "EA580C", "left"))
        shapes.append(text_box(17+idx*3, f"Badge{idx+1}Status", bx+0.08, 1.82, 1.84, 0.28, status, 900, False, "16A34A", "left"))

    # Row 2 - locked badges (gray bg)
    badge_data_locked = [
        (3.1, "🎾 Sports Enthusiast", "0/5 activities"),
        (5.25, "💬 Connector", "0/10 messages"),
        (7.4, "🏆 Top 10", "Rank #11 now"),
    ]
    for idx, (bx, name, status) in enumerate(badge_data_locked):
        shapes.append(rect_shape(24+idx*3, f"Badge{idx+4}Bg", bx, 2.32, 2.0, 0.75, "F3F4F6", rounded=True))
        shapes.append(text_box(25+idx*3, f"Badge{idx+4}Name", bx+0.08, 2.36, 1.84, 0.32, name, 950, False, "6B7280", "left"))
        shapes.append(text_box(26+idx*3, f"Badge{idx+4}Status", bx+0.08, 2.66, 1.84, 0.28, status, 900, False, "9CA3AF", "left"))

    # === LEADERBOARD ===
    shapes.append(text_box(33, "LBHeader", 3.1, 3.22, 3.0, 0.3, "Leaderboard", 1400, True, "111827", "left"))

    # Leaderboard rows
    lb_data = [
        (3.1, 3.62, "🥇", "CP", "22B55F", "Chris Park · Engineering", "DIAMOND", "9333EA", "2100"),
        (3.1, 4.22, "🥈", "OH", "0D9488", "Omar Hassan · R&amp;D", "DIAMOND", "9333EA", "1380"),
        (3.1, 4.82, "🥉", "SC", "EAB308", "Sarah Chen · Design", "GOLD", "CA8A04", "1240"),
    ]
    base_id = 34
    for idx, (lx, ly, medal, initials, av_color, name, level, lvl_color, coins) in enumerate(lb_data):
        shapes.append(rect_shape(base_id+idx*8, f"LB{idx+1}Bg", lx, ly, 6.65, 0.48, "FFFFFF"))
        shapes.append(text_box(base_id+idx*8+1, f"LB{idx+1}Medal", lx+0.1, ly+0.07, 0.35, 0.38, medal, 1600, False, "111827", "left"))
        shapes.append(oval_shape(base_id+idx*8+2, f"LB{idx+1}Av", lx+0.55, ly+0.06, 0.38, 0.38, av_color))
        shapes.append(text_box(base_id+idx*8+3, f"LB{idx+1}AvTxt", lx+0.55, ly+0.07, 0.38, 0.36, initials, 850, True, "FFFFFF", "center"))
        shapes.append(text_box(base_id+idx*8+4, f"LB{idx+1}Name", lx+1.05, ly+0.1, 3.0, 0.3, name, 1050, True, "111827", "left"))
        shapes.append(rect_shape(base_id+idx*8+5, f"LB{idx+1}LvlBg", lx+4.15, ly+0.1, 1.1, 0.27, "F3E8FF", rounded=True))
        shapes.append(text_box(base_id+idx*8+6, f"LB{idx+1}LvlTxt", lx+4.15, ly+0.11, 1.1, 0.25, level, 850, True, lvl_color, "center"))
        shapes.append(text_box(base_id+idx*8+7, f"LB{idx+1}Coins", lx+5.4, ly+0.1, 1.1, 0.3, f"🪙 {coins}", 1100, True, "EA580C", "right"))

    return wrap_slide(15, "F9FAFB", "\n".join(shapes))

# ============================================================
# SLIDE 16 - REWARDS
# ============================================================
def make_slide16():
    shapes = []

    shapes.append(rect_shape(2, "AccentBar", 0, 0, 0.07, 5.625, "F97316"))
    shapes.append(rect_shape(3, "LeftPanel", 0.07, 0, 2.8, 5.625, "FFFFFF"))
    shapes.append(text_box(4, "Title", 0.2, 0.2, 2.5, 0.45, "Reward Store", 2000, True, "F97316", "left"))
    shapes.append(text_box(5, "Subtitle", 0.2, 0.65, 2.5, 0.35, "Spend coins on real perks and treats", 1000, False, "6B7280", "left"))
    shapes.append(rect_shape(6, "Divider", 0.2, 1.1, 2.4, 0.01, "E5E7EB"))

    shapes.append(text_box(7, "Note1", 0.2, 1.25, 2.4, 0.3, "Company-funded perks", 950, False, "6B7280", "left"))
    shapes.append(text_box(8, "Note2", 0.2, 1.57, 2.4, 0.3, "Redeem instantly or save up", 950, False, "6B7280", "left"))
    shapes.append(text_box(9, "LeftEmoji", 0.85, 3.0, 1.1, 1.1, "🎁", 4500, False, "F97316", "center"))

    # Balance card
    shapes.append(rect_shape(10, "BalCard", 3.1, 0.15, 6.65, 0.72, "F97316"))
    shapes.append(text_box(11, "BalTitle", 3.25, 0.18, 3.0, 0.35, "Your balance  🪙 450", 1400, True, "FFFFFF", "left"))
    shapes.append(text_box(12, "BalSub", 3.25, 0.5, 3.0, 0.3, "Redeemed: 0 items", 950, False, "FFFFFF", "left"))

    # Filter pills
    pill_data = [
        (3.1, "All", True),
        (3.78, "Food", False),
        (4.45, "Wellness", False),
        (5.35, "Entertainment", False),
        (6.7, "Learning", False),
        (7.4, "Shopping", False),
        (8.2, "Premium", False),
    ]
    for idx, (px, label, active) in enumerate(pill_data):
        bg = "F97316" if active else "F3F4F6"
        tc = "FFFFFF" if active else "6B7280"
        w = max(0.55, len(label) * 0.1 + 0.25)
        shapes.append(rect_shape(13+idx*2, f"Pill{idx}", px, 1.03, w, 0.27, bg, rounded=True))
        shapes.append(text_box(14+idx*2, f"PillTxt{idx}", px, 1.05, w, 0.23, label, 875, active, tc, "center"))

    # Reward rows
    rewards = [
        (27, "☕", "Free Coffee", "Redeem for a free coffee at the office cafe", "100", True),
        (36, "🍕", "Team Lunch Voucher", "$20 voucher for a team lunch outing", "300", True),
        (45, "🎬", "Cinema Tickets (x2)", "Two tickets to any movie", "500", False),
        (54, "📚", "Book of Your Choice", "Pick any book up to $30", "400", True),
    ]

    base_id = 27
    ry = 1.47
    for i, (_, icon, name, desc, coins, can_redeem) in enumerate(rewards):
        shapes.append(rect_shape(base_id + i*9, f"R{i}Bg", 3.1, ry, 6.65, 0.82, "FFFFFF"))
        shapes.append(text_box(base_id + i*9 + 1, f"R{i}Icon", 3.2, ry+0.2, 0.5, 0.45, icon, 1800, False, "111827", "left"))
        shapes.append(text_box(base_id + i*9 + 2, f"R{i}Name", 3.8, ry+0.08, 3.5, 0.3, name, 1200, True, "111827", "left"))
        shapes.append(text_box(base_id + i*9 + 3, f"R{i}Desc", 3.8, ry+0.38, 3.8, 0.24, desc, 900, False, "6B7280", "left"))
        coins_color = "EA580C" if can_redeem else "9CA3AF"
        shapes.append(text_box(base_id + i*9 + 4, f"R{i}Coins", 7.5, ry+0.1, 0.95, 0.3, f"🪙 {coins}", 1100, True, coins_color, "right"))
        if can_redeem:
            shapes.append(rect_shape(base_id + i*9 + 5, f"R{i}Btn", 8.6, ry+0.2, 1.0, 0.35, "F97316", rounded=True))
            shapes.append(text_box(base_id + i*9 + 6, f"R{i}BtnTxt", 8.6, ry+0.22, 1.0, 0.31, "Redeem", 1000, True, "FFFFFF", "center"))
        else:
            shapes.append(rect_shape(base_id + i*9 + 5, f"R{i}Btn", 8.6, ry+0.2, 1.0, 0.35, "E5E7EB", rounded=True))
            shapes.append(text_box(base_id + i*9 + 6, f"R{i}BtnTxt", 8.6, ry+0.22, 1.0, 0.31, "50 short", 900, False, "9CA3AF", "center"))
        shapes.append(rect_shape(base_id + i*9 + 7, f"R{i}Div", 3.1, ry+0.81, 6.65, 0.01, "E5E7EB"))
        ry += 0.83

    return wrap_slide(16, "F9FAFB", "\n".join(shapes))

# ============================================================
# SLIDE 17 - PROFILE
# ============================================================
def make_slide17():
    shapes = []

    shapes.append(rect_shape(2, "AccentBar", 0, 0, 0.07, 5.625, "F97316"))
    shapes.append(rect_shape(3, "LeftPanel", 0.07, 0, 2.8, 5.625, "FFFFFF"))
    shapes.append(text_box(4, "Title", 0.2, 0.2, 2.5, 0.45, "Employee Profile", 2000, True, "F97316", "left"))
    shapes.append(text_box(5, "Subtitle", 0.2, 0.65, 2.5, 0.35, "Personal profile with hobbies, level &amp; progress", 1000, False, "6B7280", "left"))
    shapes.append(rect_shape(6, "Divider", 0.2, 1.1, 2.4, 0.01, "E5E7EB"))
    shapes.append(text_box(7, "Desc1", 0.2, 1.25, 2.4, 0.3, "Hobbies drive matching algorithm", 950, False, "6B7280", "left"))
    shapes.append(text_box(8, "Desc2", 0.2, 1.57, 2.4, 0.3, "Level up by participating", 950, False, "6B7280", "left"))
    shapes.append(text_box(9, "Desc3", 0.2, 1.89, 2.4, 0.3, "Track social preferences", 950, False, "6B7280", "left"))
    shapes.append(text_box(10, "LeftEmoji", 0.9, 3.1, 1.1, 1.0, "👤", 4200, False, "F97316", "center"))

    # === PROFILE CARD ===
    shapes.append(rect_shape(11, "ProfileCard", 3.1, 0.0, 6.65, 5.625, "FFFFFF"))

    # Orange header band
    shapes.append(rect_shape(12, "HeaderBand", 3.1, 0.0, 6.65, 1.0, "F97316"))

    # Avatar (overlaps header)
    shapes.append(oval_shape(13, "ProfAv", 5.7, 0.55, 0.85, 0.85, "EA580C"))
    shapes.append(text_box(14, "ProfAvTxt", 5.7, 0.62, 0.85, 0.71, "AJ", 1600, True, "FFFFFF", "center"))

    # Name and title
    shapes.append(text_box(15, "ProfName", 3.2, 1.5, 6.3, 0.38, "Alex Johnson", 1800, True, "111827", "center"))
    shapes.append(text_box(16, "ProfRole", 3.2, 1.87, 6.3, 0.3, "Senior Product Manager  ·  New York, NY", 1000, False, "6B7280", "center"))

    # Level and coins row
    shapes.append(rect_shape(17, "LevelBadge", 4.45, 2.27, 1.1, 0.28, "DBEAFE", rounded=True))
    shapes.append(text_box(18, "LevelTxt", 4.45, 2.28, 1.1, 0.26, "⭐ BEGINNER", 900, True, "2563EB", "center"))
    shapes.append(rect_shape(19, "CoinsBadge", 5.7, 2.27, 1.05, 0.28, "FFF7ED", rounded=True))
    shapes.append(text_box(20, "CoinsTxt", 5.7, 2.28, 1.05, 0.26, "🪙 450", 900, True, "EA580C", "center"))

    # Stats row
    stat_labels = ["8 Matches", "3 Activities", "Product Dept"]
    for i, label in enumerate(stat_labels):
        sx = 3.3 + i * 2.1
        shapes.append(rect_shape(21+i*2, f"Stat{i}Bg", sx, 2.68, 1.85, 0.55, "F9FAFB", rounded=True))
        shapes.append(text_box(22+i*2, f"Stat{i}Txt", sx, 2.74, 1.85, 0.43, label, 1100, True, "374151", "center"))

    # Hobbies section
    shapes.append(text_box(27, "HobHeader", 3.25, 3.38, 2.0, 0.3, "Hobbies", 1100, True, "111827", "left"))
    hobbies = ["🧘 Yoga", "✈️ Travel", "📷 Photography", "📚 Reading"]
    hx = 3.25
    for i, hobby in enumerate(hobbies):
        if i == 2:
            hx = 3.25
        hy = 3.72 if i < 2 else 4.06
        shapes.append(rect_shape(28+i*2, f"H{i}Bg", hx, hy, 1.5, 0.28, "FFF7ED", rounded=True))
        shapes.append(text_box(29+i*2, f"H{i}Txt", hx, hy+0.02, 1.5, 0.24, hobby, 950, False, "EA580C", "center"))
        hx += 1.65

    # Social preferences
    shapes.append(text_box(36, "SocHeader", 3.25, 4.42, 2.5, 0.28, "Social Preferences", 1100, True, "111827", "left"))
    shapes.append(text_box(37, "SocPref1", 3.25, 4.72, 6.3, 0.24, "⚡ Both  ·  📅 Weekly  ·  Workshops · Coffee chats · Team dinners", 950, False, "6B7280", "left"))

    # Progress bar
    shapes.append(text_box(38, "ProgLabel", 3.25, 5.05, 3.0, 0.24, "Progress to Gold ⭐ → 🥇", 1000, True, "374151", "left"))
    shapes.append(text_box(39, "ProgVal", 8.5, 5.05, 1.0, 0.24, "450/1000", 900, False, "6B7280", "right"))
    shapes.append(rect_shape(40, "ProgBg", 3.25, 5.32, 6.3, 0.14, "E5E7EB", rounded=True))
    shapes.append(rect_shape(41, "ProgFill", 3.25, 5.32, 2.835, 0.14, "F97316", rounded=True))

    return wrap_slide(17, "F9FAFB", "\n".join(shapes))

# Generate all slides
slides = {
    11: make_slide11(),
    12: make_slide12(),
    13: make_slide13(),
    14: make_slide14(),
    15: make_slide15(),
    16: make_slide16(),
    17: make_slide17(),
}

for num, xml in slides.items():
    path = os.path.join(SLIDES_DIR, f"slide{num}.xml")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(xml)
    print(f"Written slide{num}.xml")

print("All slides generated!")
