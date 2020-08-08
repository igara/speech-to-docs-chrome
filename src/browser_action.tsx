import * as React from "react";
import * as ReactDOM from "react-dom";
import * as style from "../src/browser_action.css";
import * as defines from "../src/defines";

const IndexComponent = () => {
  const [googleDocsURL, setGoogleDocsURL] = React.useState("");
  const [
    speechToTextTab,
    setSpeechToTextTab,
  ] = React.useState<chrome.tabs.Tab | null>(null);

  return (
    <div className={style.wrapper}>
      <h1>speech-to-docs</h1>
      <hr />
      <h2>必要なページ確認</h2>
      <button
        onClick={() => {
          chrome.windows.getAll({}, (windows) => {
            for (const w of windows) {
              chrome.tabs.getAllInWindow(w.id, (tab) => {
                const tabs = (tab as unknown) as chrome.tabs.Tab[];
                for (const t of tabs) {
                  if (t.url === defines.speechToTextURL) setSpeechToTextTab(t);
                }
              });
            }
          });
        }}
      >
        確認
      </button>
      <br />
      Speech To Textページ: {speechToTextTab && "タブ確認済み"}
      <br />
      Google Docsページ: {googleDocsURL && "URL設置済み"}
      <hr />
      <input
        onChange={(e) => setGoogleDocsURL(e.target.value)}
        placeholder="Google Docs URL"
      />
      <button
        onClick={() =>
          window.open(
            googleDocsURL,
            "Google Docs",
            "width=500,toolbar=yes,menubar=yes,scrollbars=yes"
          )
        }
        disabled={!googleDocsURL}
      >
        開く
      </button>
      <br />
      <button
        onClick={() =>
          window.open(
            defines.speechToTextURL,
            "Speech To Text",
            "width=500,toolbar=yes,menubar=yes,scrollbars=yes"
          )
        }
      >
        Speech To Textツールを開く
      </button>
      <hr />
      <button
        onClick={() => {
          if (speechToTextTab && speechToTextTab.id) {
            chrome.tabs.sendMessage(
              speechToTextTab.id,
              { event: "ExecSpeechToDocs" },
              async (response) => {
                const text = response.text;
                console.log(text);
              }
            );
          }
        }}
        disabled={!speechToTextTab}
      >
        開始
      </button>
    </div>
  );
};

ReactDOM.render(<IndexComponent />, document.getElementById("app"));
