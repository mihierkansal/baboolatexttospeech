import { createSignal, For } from "solid-js";
import "baboolastyles/public/plastic.css";
function App() {
  const voices = createSignal<SpeechSynthesisVoice[]>(
    window.speechSynthesis.getVoices()
  );

  const voice = createSignal<SpeechSynthesisVoice>();

  window.speechSynthesis.onvoiceschanged = () => {
    voices[1](
      window.speechSynthesis
        .getVoices()
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter((voice) => voice.lang === "en-US" || voice.lang === "en-GB")
    );
    voice[1](voices[0]()?.[0]);
  };

  const text = createSignal("");

  return (
    <>
      <div class="cnt">
        <textarea
          value={text[0]()}
          onInput={(e) => {
            text[1](e.target.value);
          }}
        ></textarea>
        <div class="btns">
          <select
            onInput={(e) => {
              voice[1](voices[0]().find((v) => v.name === e.target.value));
            }}
            value={voice[0]()?.name}
          >
            <For each={voices[0]()}>
              {(v) => {
                return <option value={v.name}>{v.name}</option>;
              }}
            </For>
          </select>
          <button
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance();
              utterance.text = text[0]();
              utterance.voice = voice[0]()!;
              window.speechSynthesis.speak(utterance);
            }}
          >
            <span>Speak</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
