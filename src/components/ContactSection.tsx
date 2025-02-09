const ContactSection = () => {
  return (
    <section className="h-screen flex items-center py-20 px-4 bg-gray-800/50 animate__animated animate__fadeIn snap-start" id="contact">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
        <p className="text-xl mb-8">your.email@example.com</p>
        <div className="flex justify-center gap-6">
          <a href="https://github.com/yourusername" className="hover:text-gray-300 transition">
            GitHub
          </a>
          <a href="https://linkedin.com/in/yourusername" className="hover:text-gray-300 transition">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;