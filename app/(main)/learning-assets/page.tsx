function Assets() {
  const projectAssets = [
    {
      id: 1,
      icon: "ZIP",
      title: "React Starter Templates",
      desc: "Modern React.js project templates with Tailwind CSS",
      folder: "5 Templates",
      rating: "4.9/5",
      downloads: "245 downloads",
      size: "2.3 MB",
    },
    {
      id: 2,
      icon: "JS",
      title: "JavaScript Utility Functions",
      desc: "Collection of useful JavaScript utility functions",
      folder: "50+ Functions",
      rating: "4.8/5",
      downloads: "132 downloads",
      size: "1.1 MB",
    },
    {
      id: 3,
      icon: "PNG",
      title: "UI Icons Pack",
      desc: "500+ pixel-perfect icons for web and mobile",
      folder: " 500 Icons",
      rating: "4.9/5",
      downloads: "225 downloads",
      size: "15.3 MB",
    },
    {
      id: 4,
      icon: "PDF",
      title: "Full-Stack Developer Roadmap",
      desc: "Complete learning path for becoming a full-stack developer",
      folder: "45 Pages",
      rating: "4.9/5",
      downloads: "245 downloads",
      size: "2.3 MB",
    },
    {
      id: 5,
      icon: "MP4",
      title: "React Hooks Masterclass",
      desc: "Complete video series on React Hooks (5 hours)",
      folder: " 12 Videos",
      rating: "4.7/5",
      downloads: "89 downloads",
      size: "1.2 GB",
    },
    {
      id: 6,
      icon: "HTML",
      title: "Landing Page Templates",
      desc: "10 responsive landing page templates with animations",
      folder: "10 Templates",
      rating: "4.5/5",
      downloads: "156 downloads",
      size: "8.6 MB",
    },
  ];
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent via-pink-400 to-blue-400 bg-clip-text text-transparent montserrat text-center">
        ASSETS
      </h1>
      <p className="text-center text-[16px] w-4/5 mx-auto opacity-80 mt-1">
        Download course materials, templates, code snippets, and resources to
        accelerate your learning journey
      </p>
      <section className="relative z-10 px-6 pb-20 mt-8 lg:mt-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            id="assetsGrid"
          >
            {projectAssets.map((asset) => (
              <article
                className="asset-card bg-card-gradient bg-white/10 border border-pink-400/20 hover:shadow-accent/30 shadow-lg backdrop:blur-md rounded-2xl p-6 card-hover download-hover"
                data-category="templates"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="file-icon icon-zip ">{asset.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 text-centr">
                      {asset.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">
                     {asset.desc}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>📁 {asset.folder}</span>
                      <span>⭐ {asset.rating}</span>
                      <span>🔄 {asset.downloads}</span>
                    </div>
                  </div>
                </div>
                <div className="download-progress mb-4"></div>
                <button className="download-btn w-full  bg-gradient-to-br trans from-pink-400 via-purple-400 to-pink-400 cursor-pointer text-white py-3 rounded-xl font-semibold hover:scale-105 flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h8"
                    ></path>
                  </svg>
                  {`Download (${asset.size})`}
                </button>
              </article>
            ))}
          </div>

          {/* <!-- Load More Button --> */}
          <div className="text-center mt-12">
            <button className="bg-card-gradient border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Load More Assets
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Assets;
