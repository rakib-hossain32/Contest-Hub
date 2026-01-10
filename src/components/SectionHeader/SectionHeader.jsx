const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="relative pb-10 pt-15 lg:pb-18 lg:pt-20 overflow-hidden text-center">
           

            <div className="relative z-10 px-4">
                <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
                    {title} <span className="text-primary">.</span>
                </h1>
                <p className="text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default SectionHeader;