import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams, useSearchParams } from 'react-router-dom';

const Room = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const role_str = searchParams.get('role') || 'audience';
  const containerRef = useRef(null);
  const initializeRef = useRef(false);

  const appID = 991487129;
  const serverSecret = '902f18dae32103c669afccbcb65b2e0e';
  const username = localStorage.getItem('username') || 'Guest';

  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    Date.now().toString(),
    username
  );

  const role = role_str === 'host'
    ? ZegoUIKitPrebuilt.Host
    : role_str === 'cohost'
    ? ZegoUIKitPrebuilt.Cohost
    : ZegoUIKitPrebuilt.Audience;

  const audienceURL = `${window.location.protocol}//${window.location.host}/room/${roomId}?role=audience`;

  const myMeeting = async (element) => {
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role,
        },
      },
    });
  };

  useEffect(() => {
    if (!roomId) return;
    if (initializeRef.current) return;
    if (containerRef.current) {
      initializeRef.current = true;
      myMeeting(containerRef.current);
    }
  }, [roomId]);

  const styles = {
    shareButton: {
      padding: '8px 12px',
      backgroundColor: '#007bff',
      color: '#fff',
      textDecoration: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      display: 'inline-block',
    },
  };

  return (
    <div>
      <div ref={containerRef}>Inside Room</div>

      {(role_str === 'host' || role_str === 'cohost') && (
        <div style={{ marginTop: 20 }}>
          <h4>Invite Audience</h4>
          <p>Share this link:</p>

          <input
            type="text"
            value={audienceURL}
            readOnly
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />

          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(audienceURL)}&size=150x150`}
            alt="QR Code"
          />

          <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=Join our live stream: ${encodeURIComponent(audienceURL)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.shareButton}
            >
              📲 WhatsApp
            </a>

            {/* Email */}
            <a
              href={`mailto:?subject=Join Our Live Stream&body=Click here to join: ${encodeURIComponent(audienceURL)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.shareButton}
            >
              ✉️ Email
            </a>

            {/* Telegram */}
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(audienceURL)}&text=Join our live stream`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.shareButton}
            >
              📢 Telegram
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(audienceURL)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.shareButton}
            >
              📘 Facebook
            </a>

            {/* Twitter (X) */}
            <a
              href={`https://twitter.com/intent/tweet?text=Join our live stream&url=${encodeURIComponent(audienceURL)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.shareButton}
            >
              🐦 X (Twitter)
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
