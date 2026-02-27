const promptCode = document.getElementById('prompt-code');
const copyButton = document.getElementById('copy-prompt');
let promptText = '';

async function loadPrompt() {
  try {
    const response = await fetch('GLOBAL_PROMPT.md', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to load prompt (${response.status})`);
    }
    promptText = await response.text();
    promptCode.textContent = promptText;
  } catch (error) {
    promptText =
      '# Global Prompt Unavailable\n\nCould not load `GLOBAL_PROMPT.md`. Ensure the file exists in the project root.';
    promptCode.textContent = promptText;
  }
}

async function copyPromptToClipboard() {
  if (!promptText.trim()) return;

  try {
    await navigator.clipboard.writeText(promptText);
    copyButton.textContent = 'Copied';
  } catch (error) {
    const textArea = document.createElement('textarea');
    textArea.value = promptText;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    copyButton.textContent = 'Copied';
  }

  window.setTimeout(() => {
    copyButton.textContent = 'Copy Markdown';
  }, 1400);
}

copyButton.addEventListener('click', copyPromptToClipboard);
loadPrompt();
