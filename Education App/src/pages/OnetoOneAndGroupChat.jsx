import { useEffect, useState } from 'react';
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';
import './OnetoOneAndGroupChat.css';

const id = Math.floor(Math.random() * 1000);

function OnetoOneAndGroupChat() {
  const [userInfo] = useState({
    userID: `Samiran${id}`,
    userName: `Samiran${id}`,
    userAvatarUrl: `https://ui-avatars.com/api/?name=Samiran${id}`
  });

  const appID = 1193363811;
  const serverSecret = '5f722bbadfb1ba32960c72bc1ad4c749';

  useEffect(() => {
    const init = async () => {
      try {
        const zimkit = ZIMKitManager.getInstance();
        await zimkit.init(appID);

        // ✅ Use built-in test token generator for development only
        const token = await zimkit.generateKitTokenForTest(
          appID,
          serverSecret,
          userInfo.userID
        );

        await zimkit.connectUser(userInfo, token);
        console.log('✅ Connected as:', userInfo.userID);
      } catch (error) {
        console.error('❌ ZIMKit Init Error:', error);
      }
    };

    init();
  }, [userInfo]);

  return (
    <div className="chat-app">
      <header className="chat-header">
        <h2>💬 RealtimeChatApp</h2>
        <p>Logged in as: <strong>{userInfo.userName}</strong></p>
      </header>
      <main className="chat-main">
        <Common />
      </main>
    </div>
  );
}

export default OnetoOneAndGroupChat;
