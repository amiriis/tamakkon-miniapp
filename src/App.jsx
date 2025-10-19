import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // بررسی وجود Bale SDK
    if (window?.Bale?.WebApp) {
      const app = window.Bale.WebApp;
        // گرفتن اطلاعات کاربر (اگر موجود باشد)
        const initUser = app.initDataUnsafe?.user || null;
        setUser(initUser);

        // دریافت تم فعلی
        setTheme(app.colorScheme || "light");

        // گوش دادن به تغییر تم
        app.onEvent("themeChanged", (newTheme) => setTheme(newTheme));
    } else {
      console.warn("Bale WebApp SDK not found");
    }
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-4">👋 سلام از مینی‌اپ بله</h1>
      {user ? (
        <p>
          کاربر وارد شده: <strong>{user.first_name}</strong>
        </p>
      ) : (
        <p>اطلاعات کاربر موجود نیست</p>
      )}
    </div>
  );
}

export default App;
