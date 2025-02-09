const EducationSection = () => {
  return (
    <section className="h-screen flex items-center py-20 px-4 animate__animated animate__fadeIn snap-start" id="education">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-12 text-center">Education</h2>
        <div className="space-y-8">
          <div className="bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-xl font-bold">Your Degree</h3>
            <p className="text-gray-300">Your University</p>
            <p className="text-gray-400">2019 - 2023</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;