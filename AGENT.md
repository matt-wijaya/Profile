# Portfolio Redesign Instructions

## 1. Current source of truth

The correct baseline is the **older hero layout with the device on the right side**.

Preserve this overall structure:

- small top identity area
- top navigation
- left-side hero content
- large headline on the left
- supporting paragraph below
- CTA buttons below
- a physical retro device on the right side
- dark brown / amber retro-tech visual style

Do NOT preserve the newer simplified Figma composition with:

- large vertical menu on the lower-left
- portrait dominating the page without a device
- the reduced/minimal layout from the simplified version

That simplified version is NOT the desired baseline.

The desired baseline is the older composition with the device on the right.

---

# 2. Main goal

Keep the older right-side-device hero layout, but refine it.

The design should still feel like:

- dark amber retro-tech
- retro-futurist
- institutional / low-tech
- tactile
- old electronic hardware containing digital content

Do not redesign the whole site again.

This is a targeted refinement of the older side-device version.

---

# 3. Typography change

Remove the large serif font used in the hero headline.

Use **Plus Jakarta Sans** instead.

The local font files are already available in:

`/public/fonts/Plus_Jakarta_Sans/`

Do not search online for fonts.

Use `next/font/local`.

Use **Plus Jakarta Sans** for:

- hero headline
- Matthew Wijaya name
- major section headings
- major project titles if needed

Use the existing IBM mono font for:

- navigation
- technical labels
- metadata
- device labels
- interface copy
- small system text

The hero should no longer use serif.

---

# 4. Matthew Wijaya emphasis

The current older layout does not emphasize the name enough.

Make:

`MATTHEW WIJAYA`

much more prominent.

Requirements:

- clearly visible in the hero
- larger than metadata
- use Plus Jakarta Sans
- still smaller than the main headline
- easy to notice immediately

The viewer should immediately understand whose portfolio this is.

Do not hide the name only in tiny top-left metadata.

---

# 5. Keep the right-side device

Keep a physical retro device on the right side of the hero.

Do NOT remove it.

Do NOT replace it with a portrait floating directly on the page.

However, remake the device so it is much simpler.

The device should feel like:

**Game Boy / simple retro handheld / low-tech field device**

Do not copy Nintendo or official Game Boy branding.

Use the concept only.

---

# 6. Device design direction

The current device is too cluttered.

Redesign it to be simpler, clearer, and cleaner.

Use:

- simple rectangular body
- vertical orientation
- large screen
- minimal control layout
- one simple interaction control
- minimal labels
- subtle retro casing detail

Avoid:

- dense telemetry
- many fake machine labels
- too many compartments
- unnecessary buttons
- overly complicated panel structures
- dashboard-like clutter
- too much tiny text

The device should be understandable in one glance.

---

# 7. Screen and portrait

Use the existing portrait asset:

`/public/hero/portrait.webp`

The device screen should be large and portrait-oriented.

Very important:

**Preserve the full portrait aspect ratio.**

Do NOT crop the portrait.

Do NOT use `object-fit: cover` if it crops the face or body.

Prefer:

- `object-fit: contain`
- or canvas rendering that preserves the whole composition

If necessary, allow small padding/letterboxing inside the screen.

Showing the full portrait is more important than filling the entire screen.

---

# 8. Portrait reconstruction interaction

Keep the portrait reconstruction idea.

Initial state:

- portrait is pixelated / unresolved
- coarse amber blocks
- partially reconstructed

Provide only **ONE** main interaction control.

Either:

- one circular button

or:

- one simple joystick

Do not create many controls.

When the user activates the control:

1. the portrait starts very pixelated
2. pixel blocks become progressively smaller
3. details become clearer
4. the portrait fully resolves
5. the final image still retains subtle amber halftone / CRT character

Preferred implementation:

- canvas-based pixelation/de-pixelation
- 4–6 visible stages

Do not use:
- simple fade
- blur-to-sharp only
- plain image swap

The effect should feel like the device is reconstructing the image.

---

# 9. Device control

The interaction control should be simple and obvious.

If using a button:
- one circular button is enough

If using a joystick:
- one small simple joystick is enough

No need for both unless it genuinely improves the interaction.

Accessibility requirements:
- keyboard accessible
- touch accessible
- visible focus state
- minimum 44x44px touch target
- respect `prefers-reduced-motion`

For reduced motion:
- show the resolved portrait immediately or with a minimal transition

---

# 10. Device labels

Keep device labels minimal.

Use only a few useful labels if needed, such as:

- `PORTRAIT`
- `RECONSTRUCT`
- `MW IMAGE UNIT`
- `ACTIVE`

Avoid fake filler text and dense nonsense labels.

The portrait and device silhouette matter more than decorative telemetry.

---

# 11. Hero layout

Preserve the older hero composition:

## Left side
- top nav / identity area
- large headline
- supporting paragraph
- CTA buttons

## Right side
- simplified portrait device

Do NOT switch to the simplified Figma layout.

Do NOT create the vertical left menu composition.

Do NOT move the portrait out of the device.

---

# 12. Hero headline

Keep the hero message:

`I design digital products and build them too.`

Use Plus Jakarta Sans.

No serif.

Use a strong weight and clean modern proportions.

Let the text wrap naturally based on layout width.

Do not force awkward line breaks solely to imitate the old serif rhythm.

---

# 13. Navigation

Keep the existing top navigation structure.

Do not replace it with the vertical lower-left navigation from the simplified Figma version.

Keep:

- Work
- About
- CV
- Contact

Use IBM mono / technical styling.

Keep the amber active state.

---

# 14. CTA buttons

Keep the existing CTA area below the hero copy.

Preserve the idea of:
- primary CTA
- secondary CTA / GitHub

You may refine their styling, but do not remove them entirely.

Keep them consistent with the dark amber retro-tech design.

---

# 15. Color palette

Keep the palette close to the older right-side-device version:

- very dark warm brown / near-black background
- warm cream text
- amber/orange accents
- muted brown device casing

Avoid:
- neon lime
- blue/cyan/purple accents
- overly bright modern gradients

---

# 16. Other website sections

Preserve the rest of the site structure unless needed for consistency.

Keep:
- Selected Work
- More Work
- Experience
- About
- Contact
- project data
- links
- routes
- responsiveness

Only make typography and styling adjustments where necessary.

Do not rebuild unrelated sections from scratch.

---

# 17. Explicitly forbidden

Do NOT:

- preserve the newer simplified Figma homepage as the main layout
- remove the side device
- move to a vertical left-side menu layout
- make the portrait float without a device
- use the serif hero font
- crop the portrait
- clutter the device with dense fake telemetry
- redesign the entire site into a different composition

---

# 18. Critical visual checklist

Before finishing, verify:

1. the site is back to the older hero layout with the device on the right
2. the simplified Figma homepage layout is not being used as the main composition
3. the serif font is replaced with Plus Jakarta Sans
4. Matthew Wijaya is more prominent
5. the right-side device is simpler
6. the portrait is full ratio and not cropped
7. the device has only one main interaction control
8. portrait reconstruction works
9. top navigation is preserved
10. CTA buttons are preserved

---

# 19. After implementation

After editing:

1. run the project
2. fix TypeScript errors
3. fix lint errors
4. fix build errors
5. test desktop layout
6. test mobile layout
7. verify portrait aspect ratio
8. verify interaction works
9. verify keyboard accessibility
10. verify reduced-motion behavior