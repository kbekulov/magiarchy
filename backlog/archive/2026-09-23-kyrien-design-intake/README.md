# Kyrien canon design intake

Processed only `01_canon design for kyrien.txt` on 23 September 2026. Later pending prompts were not read or integrated.

The supplied beige-jacket sheet replaces all previously displayed Kyrien artwork, including chibis and the two shared scene pages. The written scenes are unchanged. The profile wardrobe no longer lists the withdrawn alternate outfits.

## Source and extraction

- The complete source sheet is preserved byte-for-byte as `char-kyrien-arc-1-beige-jacket-t-pose-source.png` after verification.
- Source canvas: 1719 x 1024 pixels.
- Front crop: x=0, y=0, width=859, height=1024.
- Back crop: x=860, y=0, width=859, height=1024. The unused central column contains background only.
- Both crops use the same uniform scale, fitted within 1122 x 1402 pixels with centered solid background padding. No stretching, cropped fingertips, or changed arm lengths.
- The original separated rear view is retained as `char-kyrien-arc-1-beige-jacket-t-pose-back-before-hand-correction.png`.

## Hand correction

Built-in image generation edited the rear view with this brief: correct only the two hands in a palms-down rear T-pose; show the little-finger edge, with the thumb on the far side and mostly occluded; preserve wrists, arm lengths, clothing, body, head, background, and composition.

Only the reviewed hand regions were composited onto the unchanged rear extraction: x=10, y=254, width=128, height=70; and x=969, y=254, width=125, height=70. Pixel comparison confirmed zero changes outside these rectangles. Front and back were visually reviewed together. The public pair uses descriptive `r2` filenames, and `gallery/t-pose-approved.json` records their hashes and dimensions.

Retired media retain their former relative paths under `retired/`. These files are historical source material, not current design references. New generation must use the selected public pair unless the author approves a later design.
