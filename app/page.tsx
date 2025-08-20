import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/dashboard');
  return (
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Add Hero Images Here */}
      {(((process.env.DEMO_LOGIN === 'true') || (process.env.DEMO_LOGIN === '1')) ||
        (process.env.NODE_ENV !== 'production')) && (
        <div className="rounded-md border border-dashed p-3 text-sm text-gray-600">
          Demo login habilitado. Use: demo@example.com / demo1234
        </div>
      )}
     Builder
    </div>
  );
}