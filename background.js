chrome.commands.onCommand.addListener(async (command) => {
    if (command === "pronounce-word") {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: pronounceSelectedWord,
        });
    }
});

function pronounceSelectedWord() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        const utterance = new SpeechSynthesisUtterance(selectedText);
        const voices = speechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.name === 'Google US English');
        speechSynthesis.speak(utterance);
    } else {
        console.log("No text selected");
    }
}
