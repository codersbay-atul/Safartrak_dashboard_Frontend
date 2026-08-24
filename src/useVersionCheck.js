import { useState, useEffect } from 'react';
export function useVersionCheck() {
    const [updateAvailable, setUpdateAvailable] = useState(false);
  
    useEffect(() => {
      const currentVersion = __APP_VERSION__; // now comes from vite.config.js
  
      const checkVersion = async () => {
        try {
          const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
          const data = await res.json();
          if (data.version !== currentVersion) {
            setUpdateAvailable(true);
          }
        } catch (e) {}
      };
  
      checkVersion();
      const interval = setInterval(checkVersion, 60000);
      return () => clearInterval(interval);
    }, []);
  
    return updateAvailable;
  }