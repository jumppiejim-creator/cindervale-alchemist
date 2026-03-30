#!/usr/bin/env python3
"""Cindervale Alchemist — Player's Handbook v6.0
Matches v5.3 parchment/border design, adds Settlement & Companion chapters."""
import json, os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, PageBreak,
                                 Table, TableStyle, KeepTogether, Image, Flowable)

PARCHMENT = HexColor('#e8e0d0')
PARCHMENT_DK = HexColor('#d8d0c0')
MAROON = HexColor('#5a2d2d')
GREEN_ACC = HexColor('#4a8a5a')
PURPLE_ACC = HexColor('#7050a0')
ORANGE_ACC = HexColor('#c08030')
CYAN_ACC = HexColor('#4090a0')
GOLD_ACC = HexColor('#b09030')
TEAL_ACC = HexColor('#508070')
TEXT_DARK = HexColor('#2a2018')
TEXT_MED = HexColor('#4a3a28')
TEXT_DIM = HexColor('#6a5a48')
TABLE_HDR = HexColor('#d0c8b8')
TABLE_ROW = HexColor('#e4dcd0')
TABLE_ALT = HexColor('#ece4d8')
BORDER_DK = HexColor('#5a3a2a')
IMG_DIR = '/home/claude/handbook_images/'

class AccentLine(Flowable):
    def __init__(self, color=GREEN_ACC, width=468, thickness=2):
        super().__init__()
        self.color = color; self.line_width = width; self.thickness = thickness; self.height = thickness + 4
    def draw(self):
        self.canv.setStrokeColor(self.color); self.canv.setLineWidth(self.thickness)
        self.canv.line(0, 2, self.line_width, 2)

def draw_page_bg(canvas, doc):
    w, h = letter
    canvas.setFillColor(PARCHMENT); canvas.rect(0, 0, w, h, fill=1, stroke=0)
    m = 28
    canvas.setStrokeColor(BORDER_DK); canvas.setLineWidth(2); canvas.rect(m, m, w-2*m, h-2*m)
    canvas.setLineWidth(0.5); canvas.rect(m+4, m+4, w-2*m-8, h-2*m-8); canvas.rect(m+8, m+8, w-2*m-16, h-2*m-16)

def build():
    with open('/home/claude/handbook_data.json') as f:
        D = json.load(f)
    outpath = '/home/claude/cindervale_handbook.pdf'
    frame = Frame(56, 52, 500, 688, id='main')
    template = PageTemplate(id='parchment', frames=[frame], onPage=draw_page_bg)
    doc = BaseDocTemplate(outpath, pagesize=letter, pageTemplates=[template])
    W = 500

    S = {
        'title': ParagraphStyle('title', fontSize=32, textColor=MAROON, fontName='Helvetica-Bold', alignment=TA_CENTER, spaceAfter=4, leading=36),
        'subtitle': ParagraphStyle('subtitle', fontSize=16, textColor=TEXT_MED, fontName='Helvetica-Oblique', alignment=TA_CENTER, spaceAfter=8),
        'version': ParagraphStyle('version', fontSize=14, textColor=GREEN_ACC, fontName='Helvetica-Bold', alignment=TA_CENTER, spaceAfter=20),
        'chapter': ParagraphStyle('chapter', fontSize=24, textColor=MAROON, fontName='Helvetica-Bold', spaceBefore=6, spaceAfter=4, leading=28),
        'chapterSub': ParagraphStyle('chapterSub', fontSize=12, textColor=TEXT_DIM, fontName='Helvetica-Oblique', spaceAfter=12, alignment=TA_CENTER),
        'section': ParagraphStyle('section', fontSize=18, textColor=MAROON, fontName='Helvetica-Bold', spaceBefore=12, spaceAfter=4),
        'subsec': ParagraphStyle('subsec', fontSize=14, textColor=MAROON, fontName='Helvetica-Bold', spaceBefore=8, spaceAfter=4),
        'body': ParagraphStyle('body', fontSize=11, textColor=TEXT_DARK, fontName='Helvetica', leading=15, alignment=TA_JUSTIFY, spaceAfter=6),
        'bodySmall': ParagraphStyle('bodySmall', fontSize=10, textColor=TEXT_DARK, fontName='Helvetica', leading=13, spaceAfter=4),
        'flavor': ParagraphStyle('flavor', fontSize=11, textColor=TEXT_DIM, fontName='Helvetica-Oblique', leading=14, spaceAfter=8, leftIndent=12, rightIndent=12),
        'bullet': ParagraphStyle('bullet', fontSize=11, textColor=TEXT_DARK, fontName='Helvetica', leading=14, leftIndent=18, bulletIndent=6, spaceAfter=3),
        'toc': ParagraphStyle('toc', fontSize=13, textColor=MAROON, fontName='Helvetica', leading=22, spaceAfter=1),
        'tocSub': ParagraphStyle('tocSub', fontSize=10, textColor=TEXT_DIM, fontName='Helvetica', leading=14, spaceAfter=4, leftIndent=18),
        'classTitle': ParagraphStyle('classTitle', fontSize=22, textColor=MAROON, fontName='Helvetica-Bold', spaceAfter=2),
        'classStat': ParagraphStyle('classStat', fontSize=12, textColor=TEXT_MED, fontName='Helvetica-Bold', spaceAfter=2),
        'classDesc': ParagraphStyle('classDesc', fontSize=11, textColor=TEXT_DARK, fontName='Helvetica', leading=14, spaceAfter=2),
    }

    def ts(hdr=True):
        b = [('BACKGROUND',(0,0),(-1,-1),TABLE_ALT),('TEXTCOLOR',(0,0),(-1,-1),TEXT_DARK),('FONTNAME',(0,0),(-1,-1),'Helvetica'),('FONTSIZE',(0,0),(-1,-1),9),('LEADING',(0,0),(-1,-1),12),('ALIGN',(0,0),(0,-1),'CENTER'),('ALIGN',(1,0),(-1,-1),'LEFT'),('VALIGN',(0,0),(-1,-1),'TOP'),('GRID',(0,0),(-1,-1),0.5,PARCHMENT_DK),('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5),('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),('ROWBACKGROUNDS',(0,1),(-1,-1),[TABLE_ALT,TABLE_ROW])]
        if hdr: b += [('BACKGROUND',(0,0),(-1,0),TABLE_HDR),('TEXTCOLOR',(0,0),(-1,0),MAROON),('FONTNAME',(0,0),(-1,0),'Helvetica-Bold'),('FONTSIZE',(0,0),(-1,0),10)]
        return TableStyle(b)

    def im(name, w=None, h=None):
        p = IMG_DIR + name
        return Image(p, width=w, height=h) if os.path.exists(p) else Spacer(1, 10)

    story = []

    # ══ COVER ══
    story.append(Spacer(1, 1.8*inch))
    story.append(Paragraph("Cindervale Alchemist", S['title']))
    story.append(Paragraph("<i>Player's Handbook</i>", S['subtitle']))
    story.append(Spacer(1, 8)); story.append(AccentLine(MAROON, W, 1.5)); story.append(Spacer(1, 8))
    story.append(Paragraph("Classes, Prestige Paths, Locations, Factions &amp; Game Systems", S['chapterSub']))
    story.append(Paragraph("Version 6.0 — Settlement &amp; Companion Update", S['version']))
    story.append(Spacer(1, 16))
    story.append(im('cover.jpg', w=W*0.85, h=W*0.85*199/470))
    story.append(PageBreak())

    # ══ TOC ══
    story.append(Paragraph("Table of Contents", S['chapter'])); story.append(AccentLine(MAROON, W, 1))
    for t, sub in [("Chapter 1: Game Overview","Core mechanics, day cycle, and progression"),("Chapter 2: Races","Six playable races and their skill bonuses"),("Chapter 3: Ability Scores &amp; Skills","Stats, skills, and how checks work"),("Chapter 4: Base Classes","Six classes with full feature tables and specializations"),("Chapter 5: Prestige Classes","Eight advanced multiclass paths"),("Chapter 6: Feats","Permanent abilities chosen at even levels"),("Chapter 7: Locations &amp; Regions","Cindervale, Ashfall Crossing &amp; Tidecrest Harbor"),("Chapter 8: Factions &amp; Alignment","Reputation tiers, quest chains, and alignment bonuses"),("Chapter 9: Companion Creatures","Wild companions, loyalty, secondary abilities, and passives"),("Chapter 10: Settlement Investment","10 construction projects that permanently improve your settlement"),("Chapter 11: Core Systems","Brewing, enchanting, foraging, contracts, staff, and more"),("Chapter 12: The Hollow March","Endgame invasion and crisis system"),("Chapter 13: Pass the Torch","Legacy system and lineage bonuses")]:
        story.append(Paragraph(t, S['toc'])); story.append(Paragraph(sub, S['tocSub']))
    story.append(PageBreak())

    # ══ CH1: OVERVIEW ══
    story.append(Paragraph("Chapter 1: Game Overview", S['chapter'])); story.append(AccentLine(MAROON, W, 1))
    story.append(Paragraph("Cindervale Alchemist is a fantasy workshop management RPG. You play an alchemist who arrives in a frontier settlement, builds a workshop, and grows a business through brewing potions, enchanting equipment, foraging ingredients, researching recipes, and managing staff.", S['body']))
    story.append(Paragraph("The Core Loop", S['subsec']))
    story.append(Paragraph("Forage ingredients \u2192 Brew potions \u2192 Sell to customers \u2192 Earn gold &amp; XP \u2192 Level up \u2192 Unlock recipes &amp; features \u2192 Upgrade workshop \u2192 Build faction reputation \u2192 Invest in settlement \u2192 Face the Hollow March", S['body']))
    story.append(Paragraph("The game is structured around a day cycle. Each day you have Energy to spend on activities \u2014 brewing, foraging, enchanting, researching, or managing your workshop. When you rest, the day advances and a morning report shows overnight results.", S['body']))
    story.append(Paragraph(f"The game features 3 locations, {D['recipes_count']} recipes, {D['enchant_count']} enchantments, {D['ingredientCount']} ingredients, 6 base classes with 18 specializations, 8 prestige classes, {len(D['companions'])} companion creatures, 10 settlement projects, and 11 factions.", S['body']))

    # ══ CH2: RACES ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 2: Races", S['chapter'])); story.append(AccentLine(MAROON, W, 1))
    story.append(Paragraph("Your race provides a permanent skill bonus that shapes your early game. Choose based on your intended playstyle.", S['body']))
    rf = {'human':'Humans can talk their way into \u2014 or out of \u2014 just about anything. Centuries of living alongside every other race tends to sharpen the social instincts.','halfling':'Something about those big, earnest eyes makes even the most hardened merchant drop their prices. Halflings have elevated the art of the deal to a cultural institution.','elf':'When you\'ve had four hundred years to read, you develop an instinct for where the answers hide. Elven scholars don\'t just study \u2014 they remember.','dwarf':'Dwarven hands were made for delicate work \u2014 a paradox their thick fingers seem to defy. Every measurement exact, every cut clean. It\'s in the blood.','goliath':'Goliaths simply don\'t tire. Where others flag by afternoon, a Goliath is just getting warmed up. More hours, more work, more everything.','dragonborn':'The old draconic tongue is the root language of all enchantment runes. Dragonborn don\'t learn inscription \u2014 they remember it, the way you remember how to breathe.'}
    for r in D['races']:
        sk = ', '.join(f"+1 {k}" for k in r['skillBonus']) if r['skillBonus'] else ''
        story.append(Paragraph(f"<b>{r['icon']} {r['name']}</b> \u2014 {sk}", S['body']))
        story.append(Paragraph(r['desc'], S['body']))
        if r['id'] in rf: story.append(Paragraph(f'"{rf[r["id"]]}"', S['flavor']))

    # ══ CH3: STATS & SKILLS ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 3: Ability Scores &amp; Skills", S['chapter'])); story.append(AccentLine(MAROON, W, 1))
    story.append(Paragraph("You have 6 ability scores. During creation, distribute points across them. Modifier = (score - 10) / 2, rounded down. Skills use their stat modifier plus rank bonuses.", S['body']))
    story.append(Paragraph("Ability Scores", S['subsec']))
    sd = {'cre':('Creativity','Governs improvisation and experimental brewing. Key stat for Alchemist.'),'inu':('Intuition','Governs attunement and divination. Key stat for Warden.'),'acu':('Acumen','Governs research, analysis, and inscription. Key stat for Scholar and Enchanter.'),'tec':('Technique','Governs precision and refinement. Key stat for Artificer.'),'com':('Commerce','Governs persuasion, networking, and haggling. Key stat for Merchant.'),'dis':('Discipline','Governs endurance, focus, and danger sense. Key stat for combat checks.')}
    for st in D['stats']:
        n, d = sd.get(st['id'], (st['name'], ''))
        story.append(Paragraph(f"<b>{st['icon']} {n}</b> \u2014 {d}", S['body']))
    story.append(Paragraph("Skills", S['subsec']))
    story.append(Paragraph("Skill Ranks: Untrained (0) \u2192 Novice (1) \u2192 Adept (2) \u2192 Expert (3). Higher ranks multiply your proficiency bonus on checks. Skill points earned at each level-up.", S['body']))
    skd = {'improvisation':'Adds to d20 craft roll for CRE-based recipes. Each rank adds proficiency bonus.','aesthetics':'+2g per rank to potion sell & shelf price. +2 XP per rank when brewing.','innovation':'+6% per rank to Research discovery chance (base 20%, cap 65%).','adaptation':'+rank bonus to craft on recipes brewed <5 times. +rank to Experiment Bench.','attunement':'Adds to d20 craft roll for INU-based recipes. Each rank adds proficiency bonus.','danger_sense':'Rank\u00d712% chance to avoid negative expedition events.','arcane_sensitivity':'Full rank modifier added to Inscription check when enchanting.','divination':'Rank\u00d710% per hour to find +1 bonus ingredient. At rank 2+, reveals best yields.','lore':'+rank\u00d74 bonus XP on quest turn-ins. At rank 4+, Research costs 1h instead of 2.','research':'Adds to d20 craft roll for ACU-based recipes. +4% per rank to discovery.','appraisal':'+rank\u00d73g on enchanting rewards. Rank\u00d75% chance selling triggers repeat customer.','analysis':'Rank\u00d75% chance per craft to auto-succeed (treated as natural 20).','precision':'Adds to d20 craft roll for TEC-based recipes. Each rank adds proficiency bonus.','inscription':'THE enchanting skill \u2014 your d20 roll when inscribing enchantments.','extraction':'THE foraging skill \u2014 your d20 roll each expedition hour. Determines yield.','refinement':'Rank\u00d76% chance when crafting to produce a bonus extra at no cost.','haggling':'-rank/2 off shop buy prices. +rank to sell & shelf price. +2% shelf sale chance.','persuasion':'All rep gains multiplied by (1 + rank\u00d76%). Rank\u00d72% spill to allied faction.','networking':'Increases morning potion orders and enchantment customers.','procurement':'Rank\u00d78% chance per rare ingredient to appear in shop at 1.5\u00d7 price.','endurance':'Rank\u00d710% chance any action costs 0 Energy.','efficiency':'-rank hours off expedition travel (min 0). Rank\u00d710% failed extraction still yields 1.','stockpiling':'+rank\u00d72 max shelf. +rank\u00d73 spoilage threshold.','focus':'+rank to Inscription. Rank\u00d75% chance for Masterwork enchantments.'}
    for sk in D['skills']:
        d = skd.get(sk['id'], '')
        sn = next((s['name'] for s in D['stats'] if s['id']==sk['stat']), sk['stat'])
        story.append(Paragraph(f"<b>{sk['icon']} {sk['name']} ({sn[:3].upper()})</b> \u2014 {d}", S['bodySmall']))

    # ══ CH4: CLASSES ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 4: Base Classes &amp; Specializations", S['chapter'])); story.append(AccentLine(MAROON, W, 1))
    story.append(Paragraph("There are 6 base classes. Choose one at character creation, then multiclass into others at level-up. Each has 10 levels of features and 3 specialization paths unlocking at class level 3.", S['body']))
    cc = {'alchemist':GREEN_ACC,'enchanter':PURPLE_ACC,'artificer':ORANGE_ACC,'scholar':CYAN_ACC,'merchant':GOLD_ACC,'warden':TEAL_ACC}
    cs = {'alchemist':('Intuition','Attunement, Improvisation','Brew potions, the core craft loop'),'enchanter':('Creativity','Inscription, Arcane Sensitivity','Inscribe runes, premium gold from customers'),'artificer':('Technique','Precision, Refinement','Optimize everything, salvage failures'),'scholar':('Acumen','Research, Lore','Research, discovery, XP acceleration'),'merchant':('Commerce','Haggling, Networking','Gold generation, staff, shop mastery'),'warden':('Discipline','Extraction, Endurance','Foraging mastery, energy efficiency, endurance')}
    ci = {'alchemist':'alchemist.jpg','enchanter':'enchanter.jpg','artificer':'artificer.jpg','scholar':'scholar.jpg','merchant':'merchant.jpg','warden':'warden.jpg'}
    for cls in D['classes']:
        story.append(PageBreak())
        cid = cls['id']; accent = cc.get(cid, MAROON); ps, pr, tl = cs.get(cid, ('','',''))
        story.append(Paragraph(cls['name'], S['classTitle'])); story.append(AccentLine(accent, W, 2)); story.append(Spacer(1, 6))
        imgf = ci.get(cid)
        if imgf and os.path.exists(IMG_DIR + imgf):
            ip = [Paragraph(f"<b>Primary Stat:</b> {ps}", S['classStat']), Paragraph(f"<b>Proficiencies:</b> {pr}", S['classStat']), Spacer(1, 4), Paragraph(tl, S['classDesc'])]
            it = Table([[im(imgf, w=160, h=210), ip]], colWidths=[170, W-180])
            it.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)]))
            story.append(it)
        story.append(Spacer(1, 8)); story.append(Paragraph("Class Features", S['subsec']))
        rows = [['Lv', 'Feature', 'Description']]
        for f in cls['features']:
            d = f['desc'][:200]+'...' if len(f['desc'])>200 else f['desc']
            rows.append([str(f['classLv']), f['name'], d])
        t = Table(rows, colWidths=[W*0.06, W*0.22, W*0.72]); t.setStyle(ts()); story.append(t)
        if cls['specs']:
            story.append(PageBreak()); story.append(Paragraph(f"{cls['name']} Specializations (Choose at Class Level 3)", S['section'])); story.append(AccentLine(accent, W, 1))
            for sp in cls['specs']:
                story.append(Paragraph(f"<b>{sp['icon']} {sp['name']}</b>", S['subsec']))
                story.append(Paragraph(sp['desc'], S['body']))
                if sp['features']:
                    rows = [['Lv', 'Feature', 'Description']]
                    for f in sp['features']:
                        d = f['desc'][:200]+'...' if len(f['desc'])>200 else f['desc']
                        rows.append([str(f['classLv']), f['name'], d])
                    t = Table(rows, colWidths=[W*0.06, W*0.22, W*0.72]); t.setStyle(ts()); story.append(t)
                story.append(Spacer(1, 6))

    # ══ CH5: PRESTIGE ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 5: Prestige Classes", S['chapter'])); story.append(AccentLine(PURPLE_ACC, W, 1))
    story.append(Paragraph("Prestige Unlock: Reach level 3 in two different base classes. Each prestige class has 5 levels. Leveling a prestige class also advances one parent base class simultaneously.", S['body']))
    pi = {'cartographer':'cartographer.jpg','spellbrewer':'spellbrewer.jpg','magitech_engineer':'magitech.jpg','brand_master':'brand_master.jpg','wildcrafter':'wildcrafter.jpg','antiquarian':'antiquarian.jpg','siege_engineer':'siege_engineer.jpg','arcanist':'arcanist.jpg'}
    for pc in D['prestige']:
        story.append(PageBreak()); story.append(Paragraph(pc['name'], S['classTitle'])); story.append(AccentLine(PURPLE_ACC, W, 2)); story.append(Spacer(1, 6))
        imgf = pi.get(pc['id'])
        if imgf and os.path.exists(IMG_DIR + imgf):
            ip = [Paragraph(f"<b>Requirements:</b> {pc.get('desc','')[:80]}", S['classStat']), Spacer(1, 4), Paragraph(pc['desc'], S['classDesc'])]
            it = Table([[im(imgf, w=140, h=185), ip]], colWidths=[150, W-160])
            it.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)]))
            story.append(it)
        story.append(Spacer(1, 8)); story.append(Paragraph("Prestige Features", S['subsec']))
        if pc['features']:
            rows = [['Lv', 'Feature', 'Description']]
            for f in pc['features']:
                d = f['desc'][:200]+'...' if len(f['desc'])>200 else f['desc']
                rows.append([str(f['lv']), f['name'], d])
            t = Table(rows, colWidths=[W*0.06, W*0.22, W*0.72]); t.setStyle(ts()); story.append(t)

    # ══ CH6: FEATS ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 6: Feats", S['chapter'])); story.append(AccentLine(MAROON, W, 1))
    story.append(Paragraph("Feats are permanent abilities chosen at even character levels (2, 4, 6, 8, 10, 12, 14, 16). Each feat can only be taken once. Choose based on your build and playstyle.", S['body']))
    cats = {}
    for f in D['feats']: cats.setdefault(f.get('cat','general'), []).append(f)
    cn = {'crafting':'Crafting Feats','foraging':'Foraging Feats','enchanting':'Enchanting Feats','commerce':'Commerce Feats','general':'General Feats'}
    for cid in ['crafting','foraging','enchanting','commerce','general']:
        fs = cats.get(cid, [])
        if not fs: continue
        story.append(Paragraph(cn.get(cid, cid.title()), S['subsec']))
        rows = [['Feat', 'Description']]
        for f in fs:
            d = f['desc'][:180]+'...' if len(f['desc'])>180 else f['desc']
            rows.append([f['name'], d])
        t = Table(rows, colWidths=[W*0.28, W*0.72]); t.setStyle(ts()); story.append(t); story.append(Spacer(1, 4))

    # ══ CH7: LOCATIONS ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 7: Locations &amp; Regions", S['chapter'])); story.append(AccentLine(TEAL_ACC, W, 1))
    ld = {'cindervale':'A quiet mountain village built atop the ancient Heartforge. Rich forests and deep caves surround you.','ashfall':'A bustling desert trading post at the crossroads of three caravan routes. Harsh terrain, fierce competition, but unmatched trade access.','tidecrest':'A weathered port town built into sea cliffs. Coral reefs, sunken ships, and an ancient drowned temple lie beneath the waves.'}
    for loc in D['locations']:
        story.append(Paragraph(f"<b>{loc['name']}</b>", S['section']))
        story.append(Paragraph(ld.get(loc['id'], loc.get('desc','')), S['body']))
        lr = sorted([r for r in D['regions'] if r['loc']==loc['id']], key=lambda x: x['diff'])
        if lr:
            rows = [['Region', 'Difficulty', 'Unlock', 'Ingredients']]
            for r in lr: rows.append([r['name'], '\u2605'*r['diff'], f"Lv {r['unlock']}", str(r['ingrCount'])])
            t = Table(rows, colWidths=[W*0.38, W*0.18, W*0.18, W*0.26]); t.setStyle(ts()); story.append(t)
        story.append(Spacer(1, 6))

    # ══ CH8: FACTIONS ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 8: Factions &amp; Alignment", S['chapter'])); story.append(AccentLine(GOLD_ACC, W, 1))
    story.append(Paragraph("Each location has its own friendly factions. Build reputation through quests and donations. At Revered (tier 5) with a completed quest chain, align with a faction for a powerful exclusive bonus. Alignment is purely additive \u2014 no reputation is lost from other factions.", S['body']))
    lf = {'cindervale':['ashwardens','hearthkeepers','veilwalkers','cinderfolk'],'ashfall':['flamekeepers','dustwalkers','sand_merchants','sunweavers'],'tidecrest':['harbormasters','tidekeepers','pearl_divers','corsair_guild','merchant_marine']}
    for lid, fids in lf.items():
        ln = next((l['name'] for l in D['locations'] if l['id']==lid), lid.title())
        story.append(Paragraph(f"{ln} Factions", S['subsec']))
        for f in D['factions']:
            if f['id'] in fids: story.append(Paragraph(f"<b>{f['icon']} {f['name']}</b> \u2014 {f.get('desc','')[:120]}", S['bodySmall']))
        story.append(Spacer(1, 6))

    # ══ CH9: COMPANIONS (NEW) ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 9: Companion Creatures", S['chapter'])); story.append(AccentLine(GREEN_ACC, W, 1))
    story.append(Paragraph(f"The Ranger class (and some feats) unlock companion creatures \u2014 animals and magical beings that assist your workshop. There are <b>{len(D['companions'])} companions</b> across all three locations, each with a unique role, primary ability, secondary ability, and passive bonus.", S['body']))
    story.append(Paragraph("Loyalty &amp; Progression", S['subsec']))
    story.append(Paragraph("Companions have 5 loyalty levels, increasing through daily care and gathering together. Higher loyalty improves primary output and unlocks the secondary ability at loyalty 3+. Companions gain XP from foraging expeditions.", S['body']))
    story.append(Paragraph("Secondary Abilities (Unlock at Loyalty 3)", S['subsec']))
    story.append(Paragraph("All 12 secondary types are fully implemented: gather, organize, guard, fetch, track, comfort, charm, forage, alert, resurrect, inspire, and treasure. Guard blocks negative morning events. Resurrect prevents staff injuries. Organize consolidates inventory stacks.", S['body']))
    for loc in ['cindervale','ashfall','tidecrest']:
        lc = [c for c in D['companions'] if c.get('loc')==loc]
        if not lc: continue
        ln = next((l['name'] for l in D['locations'] if l['id']==loc), loc.title())
        story.append(Paragraph(f"{ln} Companions", S['subsec']))
        rows = [['Companion', 'Role', 'Secondary', 'Passive']]
        for c in lc:
            ps = ', '.join(f"{k}+{v}" for k,v in c.get('passive',{}).items()) if c.get('passive') else '\u2014'
            if len(ps) > 40: ps = ps[:37]+'...'
            rows.append([f"{c['icon']} {c['name']}", c.get('primary','\u2014'), c.get('secondary','\u2014'), ps])
        t = Table(rows, colWidths=[W*0.26, W*0.17, W*0.17, W*0.40]); t.setStyle(ts()); story.append(t); story.append(Spacer(1, 4))

    # ══ CH10: SETTLEMENT (NEW) ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 10: Settlement Investment", S['chapter'])); story.append(AccentLine(ORANGE_ACC, W, 1))
    story.append(Paragraph(f"Starting at level 4, invest gold and location-specific materials to construct permanent settlement projects. There are <b>{len(D['settlementProjects'])} projects</b> in 5 tiers, some requiring prerequisites. Each provides powerful ongoing bonuses.", S['body']))
    story.append(Paragraph("Construction", S['subsec']))
    story.append(Paragraph("Only one project at a time. Staff (up to 3) reduce construction by 1 day each per morning. Material costs vary by location \u2014 Cindervale uses Ashite, Ashfall uses Sandstone Dust, Tidecrest uses Driftstone. A visual skyline grows as projects complete.", S['body']))
    tiers = {}
    for p in D['settlementProjects']: tiers.setdefault(p['tier'], []).append(p)
    for tier in sorted(tiers.keys()):
        story.append(Paragraph(f"Tier {tier}", S['subsec']))
        rows = [['Project', 'Cost', 'Days', 'Effect', 'Requires']]
        for p in tiers[tier]:
            rq = '\u2014'
            if p['req']:
                rp = next((x for x in D['settlementProjects'] if x['id']==p['req']), None)
                rq = rp['name'] if rp else p['req']
            rows.append([f"{p['icon']} {p['name']}", f"{p['cost']['gold']}g", str(p['buildDays']), p['effectDesc'], rq])
        t = Table(rows, colWidths=[W*0.18, W*0.10, W*0.07, W*0.47, W*0.18]); t.setStyle(ts()); story.append(t); story.append(Spacer(1, 4))
    story.append(Paragraph("Project Details", S['subsec']))
    for p in D['settlementProjects']:
        story.append(Paragraph(f"<b>{p['icon']} {p['name']}</b> \u2014 {p['desc']}", S['bodySmall']))

    # ══ CH11: CORE SYSTEMS ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 11: Core Game Systems", S['chapter'])); story.append(AccentLine(MAROON, W, 1))
    for t, d in [('Brewing','Combine ingredients to brew potions. Each recipe has a DC, stat, and ingredient list. Roll skill + modifier vs DC. Quality tiers (Standard, Fine, Masterwork, Grandmaster) require extra ingredients and higher DCs but sell for more. Mastery discounts reduce DC on frequently brewed recipes.'),('Enchanting','Inscribe magical properties onto equipment using the Inscription skill. Customers arrive daily requesting specific enchantments. The substitution system allows using local equivalents via 55+ substitution pairs.'),('Elixir Cabinet','Elixir recipes produce personal buff potions granting temporary stat bonuses (2-5 days). Brewed and consumed from a dedicated cabinet, separate from trade potions.'),('Foraging','Expeditions into regions cost Energy and time. Each hour roll Extraction vs region DC. Random events, companion encounters, and Cartographer discoveries occur.'),('Research','Spend 2 hours to discover new recipes or enchantments. Discovery scales with Innovation and Research skill ranks. The Academy settlement project reduces cost by 1 hour.'),('Staff &amp; Apprentices','Hire apprentices for tasks: brewing, foraging, shopkeeping, researching, constructing, or patrolling. Staff gain XP and level up. Assign to settlement construction to speed projects.'),('Ingredient Contracts','Available at the Market in 3 tiers. Each delivers specific ingredients every morning for ongoing gold cost. 1-3 active contracts scaling with level. Trade Depot reduces contract costs by 40%.'),('Town Events','Random events fire each morning by location and level. Negative events (storms, theft) can be blocked by Fortified Walls (50% chance) or companion Guard abilities.'),('Threat System','Three rival factions per location with threat levels 0-100. Watchtower reduces growth by 15%. Fortified Walls cap at 80 and block 50% negative events. Assign staff to patrol or build outposts.')]:
        story.append(KeepTogether([Paragraph(t, S['subsec']), Paragraph(d, S['body'])]))

    # ══ CH12: HOLLOW MARCH ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 12: The Hollow March", S['chapter'])); story.append(AccentLine(HexColor('#8030a0'), W, 1))
    story.append(Paragraph("The Hollow March is the endgame invasion, triggered at display level 11. Waves of crises arrive every 3-7 days, each presenting multiple simultaneous crises threatening the settlement.", S['body']))
    story.append(Paragraph("Crisis System", S['subsec']))
    rows = [['Path','Cost','Check?','Best For'],['Brew Solution','2-7 potions','Skill vs DC 15-24','Alchemist builds'],['Enchant/Ward','1-4 Energy','Inscription check','Enchanter builds'],['Combat/Lead','1-4 Energy','Discipline check','Warden builds'],['Gold Solution','140-1,480g','Auto-success','Any build (expensive)']]
    t = Table(rows, colWidths=[W*0.22, W*0.22, W*0.28, W*0.28]); t.setStyle(ts()); story.append(t)
    story.append(Spacer(1, 6)); story.append(Paragraph("Failure Consequences:", S['subsec']))
    story.append(Paragraph("Threat spikes (+14 to +32), guaranteed staff injuries (3 days), loss of 3-8 rare ingredients, gold looting, and at wave 6+ random upgrade disabling.", S['body']))
    story.append(Paragraph("Milestones", S['subsec']))
    for b in ["<b>5 Waves Cleared:</b> Pass the Torch unlocked.","<b>10 Waves Cleared:</b> Final Stand \u2014 6-crisis gauntlet, need 4/6. Rewards: +3,000 XP, +800g, threats capped at 25.","<b>Every 3rd Wave:</b> Unique March-exclusive recipe unlocked."]:
        story.append(Paragraph(f"<bullet>\u2022</bullet>{b}", S['bullet']))

    # ══ CH13: TORCH ══
    story.append(PageBreak()); story.append(Paragraph("Chapter 13: Pass the Torch &amp; Legacy", S['chapter'])); story.append(AccentLine(GOLD_ACC, W, 1))
    story.append(Paragraph("After clearing 5 waves of the Hollow March, pass the torch to an apprentice and start a new generation.", S['body']))
    story.append(Paragraph("Torch Flow", S['subsec']))
    for b in ["<b>Step 1 \u2014 Choose Successor:</b> Select one hired apprentice as your next character.","<b>Step 2 \u2014 Choose Heirloom:</b> Pass one workshop upgrade, pre-built from Day 1.","<b>Step 3 \u2014 Choose Legacy Feature:</b> Select one spec/prestige feature chain. All features carry permanently.","<b>Step 4 \u2014 Choose Location:</b> Start at any of the three locations."]:
        story.append(Paragraph(f"<bullet>\u2022</bullet>{b}", S['bullet']))
    story.append(Paragraph("What Carries Over", S['subsec']))
    rows = [['Element','Amount'],['Gold','15% of current (cap 150g)'],['Recipes','Top 3 most-brewed'],['Faction Rep','1/3 of all reputation'],['Museum','Full Antiquarian collection'],['Mentor Bonus','+1 per generation (cap +3/type)'],['Legacy Feature','Selected chain, permanently active'],['Settlement Projects','All completed projects persist']]
    t = Table(rows, colWidths=[W*0.30, W*0.70]); t.setStyle(ts()); story.append(t)
    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>Family Business Network:</b> Daily passive gold based on each ancestor's level and potions brewed.", S['body']))
    story.append(Paragraph("<b>Seasonal Family Caravan:</b> If a previous generation played at a different location, seasonal caravans deliver ingredients from that location.", S['body']))

    # ══ FINAL PAGE ══
    story.append(PageBreak()); story.append(Spacer(1, 2.5*inch))
    story.append(Paragraph('Build your workshop. Master your craft. Shape the world.', ParagraphStyle('end', parent=S['body'], fontSize=16, textColor=MAROON, alignment=TA_CENTER, fontName='Helvetica-Oblique')))
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph('Cindervale Alchemist v6.0 \u2014 Settlement &amp; Companion Update', ParagraphStyle('ver', parent=S['body'], fontSize=12, textColor=GREEN_ACC, alignment=TA_CENTER, fontName='Helvetica-Bold')))

    doc.build(story)
    print(f"Handbook built: {outpath} ({len(story)} flowables)")

if __name__ == '__main__':
    build()
