import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">Your Name</div>
        <div className="space-x-6">
          <Link href="#about" className="hover:text-gray-300 transition">About</Link>
          <Link href="#skills" className="hover:text-gray-300 transition">Skills</Link>
          <Link href="#projects" className="hover:text-gray-300 transition">Projects</Link>
          <Link href="#education" className="hover:text-gray-300 transition">Education</Link>
          <Link href="#contact" className="hover:text-gray-300 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;