# Clash Display Font Installation

## 📁 Required Files

Place your **Clash Display** font files in this directory. You'll need:

### Variable Font (Recommended)
- `ClashDisplay-Variable.woff2`
- `ClashDisplay-Variable.woff`
- `ClashDisplay-Variable.ttf`

### OR Individual Weight Files
- `ClashDisplay-Bold.woff2` / `.woff` / `.ttf`
- `ClashDisplay-Semibold.woff2` / `.woff` / `.ttf`
- `ClashDisplay-Medium.woff2` / `.woff` / `.ttf`

## 📥 Where to Get Clash Display

1. **From Designer/Purchase**: If you purchased or downloaded Clash Display, you should have these files
2. **Convert OTF/TTF to Web Fonts**: Use online converters like:
   - https://transfonter.org/
   - https://everythingfonts.com/font-face
   - https://www.fontsquirrel.com/tools/webfont-generator

## 🔧 File Structure

After adding fonts, your directory should look like:
```
public/
  fonts/
    ClashDisplay-Variable.woff2
    ClashDisplay-Variable.woff
    ClashDisplay-Variable.ttf
    ClashDisplay-Bold.woff2
    ClashDisplay-Semibold.woff2
    ClashDisplay-Medium.woff2
    README.md (this file)
```

## ✅ Current Setup

**Space Grotesk**: ✅ Already integrated via Google Fonts
- Used for: Body text, paragraphs, small text, buttons

**Clash Display**: ⏳ Waiting for font files
- Will be used for: Headings (h1-h6), bold text, display text

## 🎨 Usage After Setup

Once fonts are in place, they'll automatically apply:

```jsx
// Headings automatically use Clash Display
<h1>This uses Clash Display</h1>

// Body text uses Space Grotesk
<p>This uses Space Grotesk</p>

// Bold text uses Clash Display
<strong>This uses Clash Display</strong>

// Manual override
<div className="font-heading">Clash Display</div>
<div className="font-body">Space Grotesk</div>
```

## 🚀 Next Steps

1. **Add your Clash Display font files to this folder**
2. **Restart your dev server**: `npm run dev`
3. **Check browser console** for any font loading errors
4. **Enjoy your premium typography!** ✨
