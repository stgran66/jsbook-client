import { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
  code: string;
  bundlingErr: string;
}

const html = `
    <html>
      <head>
        <style>html {background-color:white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
          }
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          })
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }

 


          }, false)
        </script>
      </body>
    </html>
  `;

export const Preview: React.FC<PreviewProps> = ({ code, bundlingErr }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className='iframe-wrapper'>
      <iframe
        ref={iframe}
        srcDoc={html}
        sandbox='allow-scripts'
        title='code preview'
      />
      {bundlingErr && <div className='preview-error'>{bundlingErr}</div>}
    </div>
  );
};
