import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg font-semibold">FoundUs - Making Lost & Found Easier</p>
        <div className="mt-4 flex justify-center space-x-6">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
        <p className="mt-4 text-sm opacity-80">&copy; {new Date().getFullYear()} FoundUs. All Rights Reserved.</p>
      </div>
    </footer>
  );
}