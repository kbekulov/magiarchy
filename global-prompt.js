const promptCode = document.getElementById('prompt-code');
const toolkitCode = document.getElementById('toolkit-code');

const chapterToolkitText = `# Chapter Construction Toolkit (Writer's Checklist)

Use this set of questions when building **each chapter** or **chapter arc**.  
Not every chapter must answer all of them, but most strong chapters will touch several.

---

## 1. Scene Purpose
- What **changes** in this chapter?
- What new information, shift in power, or event occurs?
- How is the **status quo altered** by the end?

---

## 2. Character Intent
- What does the POV character **want at the beginning** of the chapter?
- What **action or decision** do they take to pursue it?
- Do they **succeed, partially succeed, or fail**?

---

## 3. Conflict or Obstacle
- What stands in the character's way?
- Is the conflict:
  - external (enemy, institution, environment)
  - internal (fear, doubt, moral dilemma)
  - systemic (politics, hidden structures, magical instability)

---

## 4. Emotional Core
- What **emotion** should the reader feel in this chapter?
- Examples:
  - tension
  - curiosity
  - dread
  - relief
  - confusion
  - revelation

---

## 5. Thematic Echo
- Which **core theme** of the story does this chapter reinforce or challenge?
- Example themes in Magiarchy:
  - knowledge vs stability
  - visible authority vs hidden leverage
  - systems under pressure
  - the cost of truth

---

## 6. World Revelation
- What part of the **world system** becomes clearer?
- Does the chapter reveal:
  - institutional mechanics
  - magical rules
  - political dynamics
  - Holumn behavior
  - faction motivations

---

## 7. Stakes Adjustment
- How do the **stakes change** after this chapter?
- Are the consequences now:
  - more dangerous
  - more personal
  - more political
  - more supernatural

---

## 8. Narrative Momentum
- Does this chapter **push the story forward**?
- Does it create:
  - a new problem
  - a deeper mystery
  - a harder decision

---

## 9. Character Transformation
- Does the POV character **learn something new**?
- Does their **belief or understanding shift**?

---

## 10. Ending Hook
- How does the chapter end?
- Possible endings:
  - revelation
  - unresolved tension
  - emotional shift
  - new threat
  - unexpected alliance

The final lines should naturally make the reader want to continue.
`;

async function copyText(text, button) {
  if (!text.trim()) return;

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  button.textContent = 'Copied';
  window.setTimeout(() => {
    button.textContent = button.dataset.defaultLabel || 'Copy';
  }, 1400);
}

async function loadPrompt() {
  let promptText = '';

  try {
    const response = await fetch('GLOBAL_PROMPT.md', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load prompt (${response.status})`);
    }
    promptText = await response.text();
  } catch (error) {
    promptText =
      '# Global Prompt Unavailable\n\nCould not load `GLOBAL_PROMPT.md`. Ensure the file exists in the project root.';
  }

  promptCode.textContent = promptText;

  const promptButton = document.getElementById('copy-prompt');
  promptButton.dataset.defaultLabel = 'Copy Markdown';
  promptButton.addEventListener('click', () => copyText(promptText, promptButton));
}

function loadToolkit() {
  toolkitCode.textContent = chapterToolkitText;

  const toolkitButton = document.getElementById('copy-toolkit');
  toolkitButton.addEventListener('click', () => copyText(chapterToolkitText, toolkitButton));
}

loadPrompt();
loadToolkit();
