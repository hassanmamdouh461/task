import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-8 mt-10 sm:mt-16">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-3">
        <p className="text-indigo-600/80 dark:text-indigo-400/80 font-bold text-sm sm:text-base text-center tracking-wide" dir="rtl">
          "اللهم إنا نسألك فهم النبيين، وحفظ المرسلين، والملائكة المقربين"
        </p>
        <div className="text-center text-gray-400 text-xs sm:text-sm" dir="ltr">
          <span>Made by Hassan</span>
        </div>
      </div>
    </footer>
  );
}
