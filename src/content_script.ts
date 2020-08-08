/**
 * #######################################
 * ブラウザで表示中の画面での処理を行う
 * （DOM操作など）
 * Chrome開発者ツールの処理などもこちらで行える
 * #######################################
 */

/**
 * ContentScript、BackGroundのイベントを拾う
 */
chrome.runtime.onMessage.addListener(async (request, _, sendResponse) => {
  if (request.event === "ExecSpeechToDocs") {
    const textElement = document.querySelector("textarea");
    if (!textElement) return sendResponse({ text: "" });
    const text = textElement.defaultValue;

    return sendResponse({ text });
  }
});
