'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function DismissButton() {
  const router = useRouter();

  return (
    <button
      className="contents underline text-blue-600"
      onClick={() => {
        Cookies.set('template-banner-hidden', 'true');
        router.refresh();
      }}
    >
      Chiudi &#x2715;
    </button>
  );
}
